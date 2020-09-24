import { SeparatingAxisCollisionDetector } from 'app/canvas/collision/SeparatingAxisCollisionDetector';
import { Matrix } from 'app/canvas/Matrix';
import { Polygon } from 'app/canvas/Polygon';
import { PolygonRepository } from 'app/canvas/PolygonRepository';
import { Vector } from 'app/canvas/Vector';

export class PolygonMover {
    constructor(
        private polygonRepository: PolygonRepository,
        private collisionChecker: SeparatingAxisCollisionDetector,
    ) {}

    public shift(polygon: Polygon, vector: Vector): Vector {
        const projectedPolygon = polygon.projectShift(vector);

        for (const otherPolygon of this.polygonRepository.findAll()) {
            if (otherPolygon === polygon) {
                continue;
            }

            const collision = this.collisionChecker.collides(projectedPolygon, otherPolygon);

            if (collision) {
                return this.shift(polygon, vector.add(collision.getRejection()));
            }
        }

        polygon.shift(vector);

        return vector;
    }

    public rotate(polygon: Polygon, angle: number): void {
        const matrix = Matrix.rotateXZ(angle);
        const projectedPolygon = polygon.projectTransform(matrix);

        for (const otherPolygon of this.polygonRepository.findAll()) {
            if (otherPolygon === polygon) {
                continue;
            }

            const collision = this.collisionChecker.collides(projectedPolygon, otherPolygon);

            if (collision) {
                return;
            }
        }

        polygon.transform(matrix);
    }
}
