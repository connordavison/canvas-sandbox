import { Vector } from 'app/geometry/Vector';

export class AxisPolygonProjectionCollision {
    constructor(
        private axis: Vector,
        private rejectionScalar: number,
    ) {}

    public getMagnitude(): number {
        return Math.abs(this.rejectionScalar);
    }

    public getRejection(): Vector {
        return this.axis.scale(this.rejectionScalar);
    }
}
