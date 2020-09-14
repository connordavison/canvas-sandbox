import { SeparatingAxisCollisionDetector } from 'app/canvas/collision/SeparatingAxisCollisionDetector';
import { Polygon } from 'app/canvas/Polygon';
import { PolygonRepository } from 'app/canvas/PolygonRepository';
import { Vector } from 'app/canvas/Vector';

export class PolygonShifter {
    constructor(
        private polygonRepository: PolygonRepository,
        private collisionChecker: SeparatingAxisCollisionDetector,
        private polygon: Polygon
    ) {}

    public shift(vector: Vector): boolean {
        const projectedPolygon = this.polygon.projectShift(vector);

        for (const polygon of this.polygonRepository.findAll()) {
            if (polygon !== this.polygon
                && this.collisionChecker.collides(polygon, projectedPolygon)
            ) {
                return false;
            }
        }

        this.polygon.shift(vector);

        return true;
    }
}
