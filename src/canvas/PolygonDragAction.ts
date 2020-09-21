import { Action } from 'app/canvas/Action';
import { Polygon } from 'app/canvas/Polygon';
import { PolygonShifter } from 'app/canvas/PolygonShifter';
import { Vector } from 'app/canvas/Vector';

export class PolygonDragAction implements Action {
    constructor(
        private polygon: Polygon,
        private vector: Vector,
        private polygonShifter: PolygonShifter,
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
