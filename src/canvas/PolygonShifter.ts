import { SeparatingAxisCollisionDetector } from 'app/canvas/collision/SeparatingAxisCollisionDetector';
import { Polygon } from 'app/canvas/Polygon';
import { PolygonRepository } from 'app/canvas/PolygonRepository';
import { Vector } from 'app/canvas/Vector';

export class PolygonShifter {
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
}
