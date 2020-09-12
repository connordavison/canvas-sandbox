import { RotationAnchorRepository } from 'app/canvas/RotationAnchorRepository';
import { Point } from 'app/canvas/Point';
import { MouseListener } from 'app/canvas/MouseListener';
import { RotationAnchorDragTransaction } from 'app/canvas/RotationAnchorDragTransaction';
import { PolygonRotator } from 'app/canvas/PolygonRotator';
import { ActionHistory } from 'app/canvas/ActionHistory';

export class RotationAnchorDragListener implements MouseListener {
    private transaction?: RotationAnchorDragTransaction;

    constructor(
        private polygonRotator: PolygonRotator,
        private rotationAnchorRepository: RotationAnchorRepository,
        private actionHistory: ActionHistory,
    ) {}

    public onMouseDown(point: Point): void {
        const rotationAnchor = this.rotationAnchorRepository.findAtPoint(point);

        if (rotationAnchor) {
            this.transaction = new RotationAnchorDragTransaction(
                rotationAnchor.getPoint(),
                rotationAnchor,
                this.polygonRotator,
            );
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
