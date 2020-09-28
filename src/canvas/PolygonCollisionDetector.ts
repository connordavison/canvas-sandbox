import { AxisPolygonProjectionCollision } from 'app/canvas/collision/AxisPolygonProjectionCollision';
import { SeparatingAxisCollisionDetector } from 'app/canvas/collision/SeparatingAxisCollisionDetector';
import { Polygon } from 'app/canvas/Polygon';
import { PolygonRepository } from 'app/canvas/PolygonRepository';

export class PolygonCollisionDetector {
    constructor(
        private polygonRepository: PolygonRepository,
        private collisionDetector: SeparatingAxisCollisionDetector,
    ) {}

    public findCollisions(polygon: Polygon, ignored: Polygon[]): AxisPolygonProjectionCollision[] {
        const collisions = [];

        for (const otherPolygon of this.polygonRepository.findAll()) {
            if (ignored.includes(otherPolygon)) {
                continue;
            }

            const collision = this.collisionDetector.collides(polygon, otherPolygon);

            if (collision) {
                collisions.push(collision);
            }
        }

        return collisions;
    }
}
