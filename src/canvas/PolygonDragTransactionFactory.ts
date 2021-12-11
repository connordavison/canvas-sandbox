import { ActionHistory } from 'app/canvas/ActionHistory';
import { PolygonDragTransaction } from 'app/canvas/PolygonDragTransaction';
import { PolygonMover } from 'app/canvas/PolygonMover';
import { Point } from 'app/geometry/Point';
import { Polygon } from 'app/geometry/Polygon';

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
