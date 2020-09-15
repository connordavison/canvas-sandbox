import { CollisionDetector } from 'app/canvas/collision/CollisionDetector';
import { Dimensions } from 'app/canvas/Dimensions';
import { Point } from 'app/canvas/Point';
import { RotationAnchor } from 'app/canvas/RotationAnchor';

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
