import { SeparatingAxisCollisionDetector } from 'app/canvas/collision/SeparatingAxisCollisionDetector';
import { Point } from 'app/canvas/Point';
import { Polygon } from 'app/canvas/Polygon';
import { PolygonRepository } from 'app/canvas/PolygonRepository';
import { Vector } from 'app/canvas/Vector';

export class PolygonShifter {
    constructor(
        private polygonRepository: PolygonRepository,
        private collisionChecker: SeparatingAxisCollisionDetector,
        private polygon: Polygon
    ) {}

    public shift(start: Point, end: Point): Vector {
        let vector = start.vectorTo(end);

        const projectedPolygon = this.polygon.projectShift(vector);

        for (const polygon of this.polygonRepository.findAll()) {
            if (polygon === this.polygon) {
                continue;
            }

            const collision = this.collisionChecker.collides(projectedPolygon, polygon);

            if (collision) {
                end = collision.pushAway(end);
                vector = start.vectorTo(end);
            }
        }

        this.polygon.shift(vector);

        return vector;
    }
}
