import { PolygonMover } from 'app/canvas/PolygonMover';
import { RotationAnchor } from 'app/canvas/RotationAnchor';
import { RotationAnchorCollisionDetector } from 'app/canvas/RotationAnchorCollisionDetector';
import { Point } from 'app/geometry/Point';
import { Polygon } from 'app/geometry/Polygon';

export class RotationAnchorRepository {
    private anchor?: RotationAnchor;

    constructor(
        private collisionDetector: RotationAnchorCollisionDetector,
        private polygonMover: PolygonMover,
    ) {}

    public create(polygon: Polygon): void {
        this.anchor = new RotationAnchor(polygon, this.polygonMover);
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
