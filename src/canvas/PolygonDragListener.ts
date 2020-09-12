import { PolygonRepository } from 'app/canvas/PolygonRepository';
import { Point } from 'app/canvas/Point';
import { MouseListener } from 'app/canvas/MouseListener';
import { ActionHistory } from 'app/canvas/ActionHistory';
import { PolygonDragTransaction } from 'app/canvas/PolygonDragTransaction';

export class PolygonDragListener implements MouseListener {
    private transaction?: PolygonDragTransaction;

    constructor(
        private polygonRepository: PolygonRepository,
        private actionHistory: ActionHistory,
    ) {}

    public onMouseDown(point: Point): void {
        const targetPolygon = this.polygonRepository.findAtPoint(point);

        if (targetPolygon) {
            this.transaction = new PolygonDragTransaction(point, targetPolygon);
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
