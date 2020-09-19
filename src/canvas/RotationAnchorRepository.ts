import { Point } from 'app/canvas/Point';
import { RotationAnchor } from 'app/canvas/RotationAnchor';
import { RotationAnchorCollisionDetector } from 'app/canvas/RotationAnchorCollisionDetector';

export class RotationAnchorRepository {
    private anchor?: RotationAnchor;

    constructor(
        private collisionDetector: RotationAnchorCollisionDetector,
    ) {}

    public set(anchor: RotationAnchor): void {
        this.anchor = anchor;
    }

    public get(): RotationAnchor|undefined {
        return this.anchor;
    }

    public clear(): void {
        this.anchor = undefined;
    }

    public findAtPoint(point: Point): RotationAnchor {
        if (this.anchor
            && this.collisionDetector.isPointInsideAnchor(point, this.anchor)
        ) {
            return this.anchor;
        } else {
            return undefined;
        }
    }
}
