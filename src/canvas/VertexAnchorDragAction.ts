import { Action } from 'app/canvas/Action';
import { VertexAnchor } from 'app/canvas/VertexAnchor';
import { Point } from 'app/geometry/Point';
import { Vector } from 'app/geometry/Vector';

export class VertexAnchorDragAction implements Action {
    constructor(
        private anchor: VertexAnchor,
        private start: Point,
        private end: Point,
    ) {}

    public do(): void {
        this.move(this.start.vectorTo(this.end));
    }

    public undo(): void {
        this.move(this.end.vectorTo(this.start));
    }

    public toString(): string {
        return `move polygon vertex from ${this.start} to ${this.end}`;
    }

    private move(vector: Vector): void {
        return this.anchor.move(vector);
    }
}
