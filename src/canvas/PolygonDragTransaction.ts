import { Action } from 'app/canvas/Action';
import { Point } from 'app/canvas/Point';
import { Polygon } from 'app/canvas/Polygon';
import { PolygonDragAction } from 'app/canvas/PolygonDragAction';

export class PolygonDragTransaction {
    private lastPoint: Point;

    constructor(
        private start: Point,
        private polygon: Polygon,
    ) {
        this.lastPoint = start;
    }

    public commit(point: Point): Action {
        this.update(point);

        return new PolygonDragAction(this.polygon, this.start, this.lastPoint);
    }

    public update(point: Point): void {
        const action = new PolygonDragAction(this.polygon, this.lastPoint, point);

        this.lastPoint = point;

        action.do();
    }
}
