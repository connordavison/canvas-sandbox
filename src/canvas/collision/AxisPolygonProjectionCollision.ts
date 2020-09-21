import { PolygonProjection } from 'app/canvas/collision/PolygonProjection';
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

    public getRejection(): Vector {
        return this.axis.scale(this.target.reject(this.source));
    }
}
