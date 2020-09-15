import { Matrix } from 'app/canvas/Matrix';
import { Point } from 'app/canvas/Point';
import { Polygon } from 'app/canvas/Polygon';

export class RotationAnchor {
    constructor(private target: Polygon) {}

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
        const face = this.target.getFirstClockwiseFace();

        return face.getMidpoint()
            .toVector()
            .add(face.getUnitNormal().scale(20))
            .toPoint();
    }

    public getTarget(): Polygon {
        return this.target;
    }

    public rotateAngleAboutPoint(angle: number): void {
        this.target.transform(Matrix.rotateXZ(angle));
    }
}
