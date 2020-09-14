import { PolygonRepository } from 'app/canvas/PolygonRepository';
import { Point } from 'app/canvas/Point';
import { MouseListener } from 'app/canvas/MouseListener';
import { ActionHistory } from 'app/canvas/ActionHistory';
import { PolygonDragTransaction } from 'app/canvas/PolygonDragTransaction';
import { PolygonShifterFactory } from 'app/canvas/PolygonShifterFactory';

export class PolygonDragListener implements MouseListener {
    private transaction?: PolygonDragTransaction;

    constructor(
        private polygonRepository: PolygonRepository,
        private polygonShifterFactory: PolygonShifterFactory,
        private actionHistory: ActionHistory,
    ) {}

    public onMouseDown(point: Point): void {
        const targetPolygon = this.polygonRepository.findAtPoint(point);

        if (targetPolygon) {
            this.transaction = new PolygonDragTransaction(
                point,
                this.polygonShifterFactory.createForPolygon(targetPolygon),
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
