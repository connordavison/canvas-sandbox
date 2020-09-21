import { ActionHistory } from 'app/canvas/ActionHistory';
import { DragTransaction } from 'app/canvas/DragTransaction';
import { Point } from 'app/canvas/Point';
import { Polygon } from 'app/canvas/Polygon';
import { PolygonDragAction } from 'app/canvas/PolygonDragAction';
import { PolygonShifter } from 'app/canvas/PolygonShifter';

export class PolygonDragTransaction implements DragTransaction {
    private lastPoint: Point;

    constructor(
        private start: Point,
        private polygon: Polygon,
        private polygonShifter: PolygonShifter,
        private actionHistory: ActionHistory
    ) {
        this.lastPoint = start;
    }

    public commit(point: Point): void {
        this.update(point);

        const completeAction = new PolygonDragAction(
            this.polygon,
            this.start.vectorTo(this.lastPoint),
            this.polygonShifter,
        );

        this.actionHistory.push(completeAction);
    }

    public update(point: Point): void {
        const action = new PolygonDragAction(
            this.polygon,
            this.lastPoint.vectorTo(point),
            this.polygonShifter,
        );
        const shift = action.do();

        this.lastPoint = shift.movePoint(this.lastPoint);
    }
}
