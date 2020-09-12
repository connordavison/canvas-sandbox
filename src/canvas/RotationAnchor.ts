import { Point } from 'app/canvas/Point';
import { Polygon } from 'app/canvas/Polygon';

export class RotationAnchor {
    constructor(private point: Point, private target: Polygon) {}

    public getPoint(): Point {
        return this.point;
    }

    public setPoint(point: Point): void {
        this.point = point;
    }

    public getTarget(): Polygon {
        return this.target;
    }
}
