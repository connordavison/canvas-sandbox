import { ActionHistory } from 'app/canvas/ActionHistory';
import { MouseListener } from 'app/canvas/MouseListener';
import { DragTransaction } from 'app/canvas/DragTransaction';
import { Point } from 'app/canvas/Point';
import { RotationAnchorDragTransaction } from 'app/canvas/RotationAnchorDragTransaction';
import { RotationAnchorRepository } from 'app/canvas/RotationAnchorRepository';

export class RotationAnchorDragListener implements MouseListener {
    constructor(
        private rotationAnchorRepository: RotationAnchorRepository,
        private actionHistory: ActionHistory,
    ) {}

    public onMouseDown(point: Point): DragTransaction|undefined {
        const anchor = this.rotationAnchorRepository.findAtPoint(point);

        if (anchor) {
            return new RotationAnchorDragTransaction(anchor, this.actionHistory);
        }
    }
}
