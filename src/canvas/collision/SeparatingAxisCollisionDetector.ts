import { AxisPolygonProjectionCollision } from 'app/canvas/collision/AxisPolygonProjectionCollision';
import { ConvexPolygonFace } from 'app/canvas/ConvexPolygonFace';
import { Polygon } from 'app/canvas/Polygon';

export class SeparatingAxisCollisionDetector {
    public collides(
        source: Polygon,
        target: Polygon,
    ): AxisPolygonProjectionCollision|undefined {
        const sourceCollisions = this.collidesOnFaces(source, target, source.getClockwiseFaces());
        const targetCollisions = this.collidesOnFaces(source, target, target.getClockwiseFaces());

        if (undefined === sourceCollisions || undefined === targetCollisions) {
            return undefined;
        }

        const allCollisions = sourceCollisions.concat(targetCollisions);
        const minCollision = allCollisions.sort((a: AxisPolygonProjectionCollision, b: AxisPolygonProjectionCollision) => {
            return a.getMagnitude() - b.getMagnitude();
        })[0];

        return minCollision;
    }

    private collidesOnFaces(
        source: Polygon,
        target: Polygon,
        faces: ConvexPolygonFace[],
    ): AxisPolygonProjectionCollision[]|undefined {
        const collisions = [];

        for (const face of faces) {
            const normal = face.getUnitNormal();

            const sourceProjection = source.projectOnto(normal);
            const targetProjection = target.projectOnto(normal);

            if (sourceProjection.isSeparateFrom(targetProjection)) {
                return undefined;
            }

            collisions.push(
                new AxisPolygonProjectionCollision(
                    normal,
                    sourceProjection,
                    targetProjection,
                ),
            );
        }

        return collisions;
    }
}
