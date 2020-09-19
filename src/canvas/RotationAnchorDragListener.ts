import { RotationAnchorRepository } from 'app/canvas/RotationAnchorRepository';
import { Point } from 'app/canvas/Point';
import { MouseListener } from 'app/canvas/MouseListener';
import { RotationAnchorDragTransaction } from 'app/canvas/RotationAnchorDragTransaction';
import { ActionHistory } from 'app/canvas/ActionHistory';
import { Lockable } from 'app/canvas/Lockable';

export class RotationAnchorDragListener implements MouseListener {
    private transaction?: RotationAnchorDragTransaction;

    constructor(
        private rotationAnchorRepository: RotationAnchorRepository,
        private actionHistory: ActionHistory,
    ) {}

    public onMouseDown(point: Point, lock: Lockable<MouseListener>): void {
        const anchor = this.rotationAnchorRepository.findAtPoint(point);

        if (anchor) {
            this.transaction = new RotationAnchorDragTransaction(anchor);
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
