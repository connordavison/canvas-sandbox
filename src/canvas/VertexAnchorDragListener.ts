import { Point } from 'app/canvas/Point';
import { MouseListener } from 'app/canvas/MouseListener';
import { VertexAnchorDragTransaction } from 'app/canvas/VertexAnchorDragTransaction';
import { ActionHistory } from 'app/canvas/ActionHistory';
import { Lockable } from 'app/canvas/Lockable';
import { VertexAnchorRepository } from 'app/canvas/VertexAnchorRepository';

export class VertexAnchorDragListener implements MouseListener {
    private transaction?: VertexAnchorDragTransaction;

    constructor(
        private vertexAnchorRepository: VertexAnchorRepository,
        private actionHistory: ActionHistory,
    ) {}

    public onMouseDown(point: Point, lock: Lockable<MouseListener>): void {
        const anchor = this.vertexAnchorRepository.findAtPoint(point);

        if (anchor) {
            this.transaction = new VertexAnchorDragTransaction(anchor);
            lock.lock(this);
        }
    }

    public onMouseMove(point: Point): void {
        if (this.transaction) {
            this.transaction.update(point);
        }
    }

    public onMouseUp(point: Point): void {
        if (this.transaction) {
            this.actionHistory.push(this.transaction.commit(point));
            this.transaction = undefined;
        }
    }
}
