import { Action } from 'app/canvas/Action';
import { Point } from 'app/canvas/Point';
import { VertexAnchor } from 'app/canvas/VertexAnchor';
import { VertexAnchorDragAction } from 'app/canvas/VertexAnchorDragAction';

export class VertexAnchorDragTransaction {
    private start: Point;
    private lastPoint: Point;

    constructor(private anchor: VertexAnchor) {
        this.start = anchor.getPosition();
        this.lastPoint = this.start;
    }

    public commit(position: Point): Action {
        this.update(position);

        return new VertexAnchorDragAction(
            this.anchor,
            this.start,
            position,
        );
    }

    public update(position: Point): void {
        const action = new VertexAnchorDragAction(
            this.anchor,
            this.lastPoint,
            position,
        );

        this.lastPoint = position;

        action.do();
    }
}
