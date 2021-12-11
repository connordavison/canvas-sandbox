import { RotationAnchor } from 'app/canvas/RotationAnchor';
import { CollisionDetector } from 'app/geometry/collision/CollisionDetector';
import { Dimensions } from 'app/geometry/Dimensions';
import { Point } from 'app/geometry/Point';

export class RotationAnchorCollisionDetector {
    constructor(
        private collisionDetector: CollisionDetector,
        private hitbox: Dimensions,
    ) {}

    public isPointInsideAnchor(point: Point, anchor: RotationAnchor): boolean {
        return this.collisionDetector.isPointWithinHitboxOfPoint(
            point,
            this.hitbox,
            anchor.getAbsolutePosition(),
        );
    }
}
