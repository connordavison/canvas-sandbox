import { ConvexPolygonFace } from 'app/canvas/ConvexPolygonFace';
import { Point } from 'app/canvas/Point';
import { Polygon } from 'app/canvas/Polygon';
import { Vector } from 'app/canvas/Vector';

export class SeparatingAxisCollisionDetector {
    public collides(source: Polygon, target: Polygon): boolean {
        const faces: ConvexPolygonFace[] = source.getClockwiseFaces()
            .concat(target.getClockwiseFaces());

        for (const face of faces) {
            const normal = face.getNormal();

            const sourceProjection = this.projectPointsOntoVector(source.getPoints(), normal);
            const targetProjection = this.projectPointsOntoVector(target.getPoints(), normal);

            if (sourceProjection.isSeparateFrom(targetProjection)) {
                return false;
            }
        }

        return true;
    }

    public projectPointsOntoVector(points: Point[], vector: Vector): PolygonProjection {
        let min = Infinity;
        let max = -Infinity;

        for (const point of points) {
            const projection = point.toVector().dot(vector);

            if (projection < min) {
                min = projection;
            }

            if (projection > max) {
                max = projection;
            }
        }

        return new PolygonProjection(min, max);
    }
}

class PolygonProjection {
    constructor(private min: number, private max: number) {}

    public isSeparateFrom(other: PolygonProjection): boolean {
        return this.max < other.min || other.max < this.min;
    }
}
