import { Action } from 'app/canvas/Action';
import { Point } from 'app/canvas/Point';
import { Vector } from 'app/canvas/Vector';
import { VertexAnchor } from 'app/canvas/VertexAnchor';

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
