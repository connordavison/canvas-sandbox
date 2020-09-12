import { Point } from 'app/canvas/Point';
import { CollisionDetector } from 'app/canvas/collision/CollisionDetector';
import { RotationAnchor } from 'app/canvas/RotationAnchor';
import { Dimensions } from 'app/canvas/Dimensions';

export class RotationAnchorRepository {
    private anchors: RotationAnchor[] = [];

    constructor(private collisionDetector: CollisionDetector, private hitbox: Dimensions) {}

    public push(anchor: RotationAnchor): void {
        this.anchors.push(anchor);
    }

    public findAll(): RotationAnchor[] {
        return this.anchors;
    }

    public findAtPoint(point: Point): RotationAnchor {
        return this.anchors.find((anchor: RotationAnchor) => {
            return this.collisionDetector.isPointWithinHitboxOfPoint(
                point,
                this.hitbox,
                anchor.getPoint(),
            );
        });
    }
}
