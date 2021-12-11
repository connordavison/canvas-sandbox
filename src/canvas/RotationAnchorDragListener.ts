import { ActionHistory } from 'app/canvas/ActionHistory';
import { DragTransaction } from 'app/canvas/DragTransaction';
import { MouseListener } from 'app/canvas/MouseListener';
import { RotationAnchorDragTransaction } from 'app/canvas/RotationAnchorDragTransaction';
import { RotationAnchorRepository } from 'app/canvas/RotationAnchorRepository';
import { Point } from 'app/geometry/Point';

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
