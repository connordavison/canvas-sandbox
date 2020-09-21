import { PolygonRepository } from 'app/canvas/PolygonRepository';
import { Point } from 'app/canvas/Point';
import { MouseListener } from 'app/canvas/MouseListener';
import { PolygonDragTransactionFactory } from 'app/canvas/PolygonDragTransactionFactory';
import { DragTransaction } from 'app/canvas/DragTransaction';

export class PolygonDragListener implements MouseListener {
    constructor(
        private polygonRepository: PolygonRepository,
        private polygonDragTransactionFactory: PolygonDragTransactionFactory,
    ) {}

    public onMouseDown(start: Point): DragTransaction|void {
        const target = this.polygonRepository.findAtPoint(start);

        if (target) {
            return this.polygonDragTransactionFactory.create(start, target);
        }
    }
}
