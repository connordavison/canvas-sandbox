import { ActionHistory } from 'app/canvas/ActionHistory';
import { Point } from 'app/canvas/Point';
import { Polygon } from 'app/canvas/Polygon';
import { PolygonDragTransaction } from 'app/canvas/PolygonDragTransaction';
import { PolygonMover } from 'app/canvas/PolygonMover';

export class PolygonDragTransactionFactory {
    constructor(
        private polygonShifter: PolygonMover,
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
