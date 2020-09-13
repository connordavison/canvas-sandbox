import { CollisionDetector } from 'app/canvas/collision/CollisionDetector';
import { Dimensions } from 'app/canvas/Dimensions';
import { Point } from 'app/canvas/Point';
import { RotationAnchor } from 'app/canvas/RotationAnchor';
import { RotationAnchorLocator } from 'app/canvas/RotationAnchorLocator';

export class RotationAnchorCollisionDetector {
    constructor(
        private collisionDetector: CollisionDetector,
        private rotationAnchorLocator: RotationAnchorLocator,
        private hitbox: Dimensions,
    ) {}

    public isPointInsideAnchor(point: Point, rotationAnchor: RotationAnchor): boolean {
        const anchorLocation = this.rotationAnchorLocator.locate(rotationAnchor);

        return this.collisionDetector.isPointWithinHitboxOfPoint(
            point,
            this.hitbox,
            anchorLocation,
        );
    }
}
