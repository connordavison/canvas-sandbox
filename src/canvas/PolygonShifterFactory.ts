import { SeparatingAxisCollisionDetector } from 'app/canvas/collision/SeparatingAxisCollisionDetector';
import { Polygon } from 'app/canvas/Polygon';
import { PolygonRepository } from 'app/canvas/PolygonRepository';
import { PolygonShifter } from 'app/canvas/PolygonShifter';

export class PolygonShifterFactory {
    constructor(
        private polygonRepository: PolygonRepository,
        private collisionChecker: SeparatingAxisCollisionDetector,
    ) {}

    public createForPolygon(polygon: Polygon): PolygonShifter {
        return new PolygonShifter(
            this.polygonRepository,
            this.collisionChecker,
            polygon,
        );
    }
}
