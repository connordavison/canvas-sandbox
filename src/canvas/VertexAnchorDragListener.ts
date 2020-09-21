import { ActionHistory } from 'app/canvas/ActionHistory';
import { DragTransaction } from 'app/canvas/DragTransaction';
import { MouseListener } from 'app/canvas/MouseListener';
import { Point } from 'app/canvas/Point';
import { VertexAnchorDragTransaction } from 'app/canvas/VertexAnchorDragTransaction';
import { VertexAnchorRepository } from 'app/canvas/VertexAnchorRepository';

export class VertexAnchorDragListener implements MouseListener {
    constructor(
        private vertexAnchorRepository: VertexAnchorRepository,
        private actionHistory: ActionHistory,
    ) {}

    public onMouseDown(point: Point): DragTransaction|undefined {
        const anchor = this.vertexAnchorRepository.findAtPoint(point);

        if (anchor) {
            return new VertexAnchorDragTransaction(anchor, this.actionHistory);
        }
    }
}
