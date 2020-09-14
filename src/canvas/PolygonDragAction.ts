import { Action } from 'app/canvas/Action';
import { Point } from 'app/canvas/Point';
import { PolygonShifter } from 'app/canvas/PolygonShifter';

export class PolygonDragAction implements Action {
    constructor(
        private polygonShifter: PolygonShifter,
        private start: Point,
        private end: Point,
    ) {}

    public do(): boolean {
        return this.move(this.start, this.end);
    }

    public undo(): void {
        this.move(this.end, this.start);
    }

    public toString(): string {
        return `move polygon from ${this.start} to ${this.end}`;
    }

    private move(start: Point, end: Point): boolean {
        return this.polygonShifter.shift(start.vectorTo(end));
    }
}
