import { Action } from 'app/canvas/Action';
import { Point } from 'app/canvas/Point';
import { PolygonDragAction } from 'app/canvas/PolygonDragAction';
import { PolygonShifter } from 'app/canvas/PolygonShifter';

export class PolygonDragTransaction {
    private lastPoint: Point;

    constructor(
        private start: Point,
        private polygonShifter: PolygonShifter,
    ) {
        this.lastPoint = start;
    }

    public commit(point: Point): Action {
        this.update(point);

        return new PolygonDragAction(this.polygonShifter, this.start, this.lastPoint);
    }

    public update(point: Point): void {
        const action = new PolygonDragAction(this.polygonShifter, this.lastPoint, point);

        if (action.do()) {
            this.lastPoint = point;
        }
    }
}
