import { Point } from 'app/canvas/Point';
import { RotationAnchor } from 'app/canvas/RotationAnchor';
import { RotationAnchorCollisionDetector } from 'app/canvas/RotationAnchorCollisionDetector';

export class RotationAnchorRepository {
    private anchors: RotationAnchor[] = [];

    constructor(
        private collisionDetector: RotationAnchorCollisionDetector,
    ) {}

    public push(anchor: RotationAnchor): void {
        this.anchors.push(anchor);
    }

    public findAll(): RotationAnchor[] {
        return this.anchors;
    }

    public findAtPoint(point: Point): RotationAnchor {
        return this.anchors.find((anchor: RotationAnchor) => {
            return this.collisionDetector.isPointInsideAnchor(point, anchor);
        });
    }
}
