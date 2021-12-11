import { ActionHistory } from 'app/canvas/ActionHistory';
import { DragTransaction } from 'app/canvas/DragTransaction';
import { PolygonDragAction } from 'app/canvas/PolygonDragAction';
import { PolygonMover } from 'app/canvas/PolygonMover';
import { Point } from 'app/geometry/Point';
import { Polygon } from 'app/geometry/Polygon';

export class PolygonDragTransaction implements DragTransaction {
    private lastPoint: Point;

    constructor(
        private start: Point,
        private polygon: Polygon,
        private polygonShifter: PolygonMover,
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
