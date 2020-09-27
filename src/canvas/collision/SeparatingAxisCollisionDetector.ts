import { AxisPolygonProjectionCollision } from 'app/canvas/collision/AxisPolygonProjectionCollision';
import { ConvexPolygonFace } from 'app/canvas/ConvexPolygonFace';
import { Polygon } from 'app/canvas/Polygon';

export class SeparatingAxisCollisionDetector {
    public collides(
        source: Polygon,
        target: Polygon,
    ): AxisPolygonProjectionCollision|undefined {
        const faces = source.getClockwiseFaces().concat(target.getClockwiseFaces());
        const collisions = this.collidesOnFaces(source, target, faces);

        if (undefined === collisions) {
            return undefined;
        }

        const minCollision = collisions.sort((a: AxisPolygonProjectionCollision, b: AxisPolygonProjectionCollision) => {
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
                    targetProjection.reject(sourceProjection),
                ),
            );
        }

        return collisions;
    }
}
