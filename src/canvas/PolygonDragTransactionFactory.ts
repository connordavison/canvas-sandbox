import { ActionHistory } from 'app/canvas/ActionHistory';
import { Point } from 'app/canvas/Point';
import { Polygon } from 'app/canvas/Polygon';
import { PolygonDragTransaction } from 'app/canvas/PolygonDragTransaction';
import { PolygonShifter } from 'app/canvas/PolygonShifter';

export class PolygonDragTransactionFactory {
    constructor(
        private polygonShifter: PolygonShifter,
        private actionHistory: ActionHistory,
    ) {}

    public create(start: Point, target: Polygon): PolygonDragTransaction {
        return new PolygonDragTransaction(
            start,
            target,
            this.polygonShifter,
            this.actionHistory,
        );
    }
}
