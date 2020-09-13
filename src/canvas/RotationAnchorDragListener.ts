import { RotationAnchorRepository } from 'app/canvas/RotationAnchorRepository';
import { Point } from 'app/canvas/Point';
import { MouseListener } from 'app/canvas/MouseListener';
import { RotationAnchorDragTransaction } from 'app/canvas/RotationAnchorDragTransaction';
import { ActionHistory } from 'app/canvas/ActionHistory';
import { PolygonCentroidCalculator } from 'app/canvas/PolygonCentroidCalculator';

export class RotationAnchorDragListener implements MouseListener {
    private transaction?: RotationAnchorDragTransaction;

    constructor(
        private rotationAnchorRepository: RotationAnchorRepository,
        private centroidCalculator: PolygonCentroidCalculator,
        private actionHistory: ActionHistory,
    ) {}

    public onMouseDown(point: Point): void {
        const anchor = this.rotationAnchorRepository.findAtPoint(point);

        if (anchor) {
            this.transaction = new RotationAnchorDragTransaction(
                anchor,
                this.centroidCalculator.getCentroid(anchor.getTarget()),
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
