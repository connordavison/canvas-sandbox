import { PolygonMover } from 'app/canvas/PolygonMover';
import { Point } from 'app/geometry/Point';
import { Polygon } from 'app/geometry/Polygon';

export class RotationAnchor {
    constructor(
        private target: Polygon,
        private polygonMover: PolygonMover,
    ) {}

    public getRadius(): number {
        return 5;
    }

    public getAngleTo(point: Point): number {
        const centerOfRotation = this.getCenterOfRotation();
        const centerToThis = centerOfRotation.vectorTo(this.getAbsolutePosition());
        const centerToPoint = centerOfRotation.vectorTo(point);

        return centerToThis.signedAngleXZ(centerToPoint);
    }

    public getCenterOfRotation(): Point {
        return this.target.getCenter();
    }

    public getAbsolutePosition(): Point {
        const edge = this.target.getFirstClockwiseEdge();

        return edge.getMidpoint()
            .toVector()
            .add(edge.getUnitNormal().scale(20))
            .toPoint();
    }

    public getTarget(): Polygon {
        return this.target;
    }

    public rotateAngleAboutPoint(angle: number): void {
        this.polygonMover.rotate(this.target, angle);
    }
}
