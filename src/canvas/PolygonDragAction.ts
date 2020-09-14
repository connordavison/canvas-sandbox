import { Action } from 'app/canvas/Action';
import { Point } from 'app/canvas/Point';
import { Polygon } from 'app/canvas/Polygon';

export class PolygonDragAction implements Action {
    constructor(
        private polygon: Polygon,
        private start: Point,
        private end: Point,
    ) {}

    public do(): void {
        this.move(this.start, this.end);
    }

    public undo(): void {
        this.move(this.end, this.start);
    }

    public toString(): string {
        return `move polygon from ${this.start} to ${this.end}`;
    }

    private move(start: Point, end: Point): void {
        this.polygon.shift(start.vectorTo(end));
    }
}
