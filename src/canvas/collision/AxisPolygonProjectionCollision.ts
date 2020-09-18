import { PolygonProjection } from 'app/canvas/collision/PolygonProjection';
import { Point } from 'app/canvas/Point';
import { Vector } from 'app/canvas/Vector';

export class AxisPolygonProjectionCollision {
    constructor(
        private axis: Vector,
        private source: PolygonProjection,
        private target: PolygonProjection,
    ) {}

    public getMagnitude(): number {
        return this.source.getOverlap(this.target);
    }

    public pushAway(point: Point): Point {
        return this.axis
            .scale(this.target.reject(this.source))
            .movePoint(point);
    }
}
