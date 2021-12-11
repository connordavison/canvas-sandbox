import { AxisPolygonProjectionCollision } from 'app/geometry/collision/AxisPolygonProjectionCollision';
import { Polygon } from 'app/geometry/Polygon';
import { PolygonEdge } from 'app/geometry/PolygonEdge';

export class SeparatingAxisCollisionDetector {
    public collides(
        source: Polygon,
        target: Polygon,
    ): AxisPolygonProjectionCollision|undefined {
        const edges = source.getClockwiseEdges().concat(target.getClockwiseEdges());
        const collisions = this.collidesOnEdges(source, target, edges);

        if (undefined === collisions) {
            return undefined;
        }

        const minCollision = collisions.sort((a: AxisPolygonProjectionCollision, b: AxisPolygonProjectionCollision) => {
            return a.getMagnitude() - b.getMagnitude();
        })[0];

        return minCollision;
    }

    private collidesOnEdges(
        source: Polygon,
        target: Polygon,
        edges: PolygonEdge[],
    ): AxisPolygonProjectionCollision[]|undefined {
        const collisions = [];

        for (const edge of edges) {
            const normal = edge.getUnitNormal();

            const sourceProjection = source.projectOnto(normal);
            const targetProjection = target.projectOnto(normal);

            if (sourceProjection.isSeparateFrom(targetProjection)) {
                return undefined;
            }

            collisions.push(
                new AxisPolygonProjectionCollision(
                    normal,
                    targetProjection.reject(sourceProjection),
                ),
            );
        }

        return collisions;
    }
}
