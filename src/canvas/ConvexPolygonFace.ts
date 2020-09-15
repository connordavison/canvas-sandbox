import { Point } from 'app/canvas/Point';
import { Vector } from 'app/canvas/Vector';

export class ConvexPolygonFace {
    constructor(private start: Point, private end: Point, private normal: Vector) {}

    public isPointOutside(point: Point): boolean {
        const midpoint = this.getMidpoint();
        const midpointToPoint = midpoint.vectorTo(point);

        return midpointToPoint.dot(this.getNormal()) > 0;
    }

    public getStart(): Point {
        return this.start;
    }

    public getEnd(): Point {
        return this.end;
    }

    public getUnitNormal(): Vector {
        return this.normal.normalize();
    }

    public getNormal(): Vector {
        return this.normal;
    }

    public getMidpoint(): Point {
        return this.start.midpointTo(this.end);
    }
}
