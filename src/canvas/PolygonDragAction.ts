import { Action } from 'app/canvas/Action';
import { PolygonMover } from 'app/canvas/PolygonMover';
import { Polygon } from 'app/geometry/Polygon';
import { Vector } from 'app/geometry/Vector';

export class PolygonDragAction implements Action {
    constructor(
        private polygon: Polygon,
        private vector: Vector,
        private polygonShifter: PolygonMover,
    ) {}

    public do(): Vector {
        return this.move(this.vector);
    }

    public undo(): void {
        this.move(this.vector.negate());
    }

    public toString(): string {
        return `move polygon by ${this.vector}`;
    }

    private move(vector: Vector): Vector {
        return this.polygonShifter.shift(this.polygon, vector);
    }
}
