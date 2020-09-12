import { Action } from 'app/canvas/Action';
import { Point } from 'app/canvas/Point';
import { PolygonRotator } from 'app/canvas/PolygonRotator';
import { RotationAnchor } from 'app/canvas/RotationAnchor';
import { RotationAnchorDragAction } from 'app/canvas/RotationAnchorDragAction';

export class RotationAnchorDragTransaction {
    private lastPoint: Point;

    constructor(
        private start: Point,
        private anchor: RotationAnchor,
        private polygonRotator: PolygonRotator,
    ) {
        this.lastPoint = start;
    }

    public commit(point: Point): Action {
        this.update(point);

        return new RotationAnchorDragAction(this.anchor, this.start, this.lastPoint, this.polygonRotator);
    }

    public update(point: Point): void {
        const action = new RotationAnchorDragAction(
            this.anchor,
            this.lastPoint,
            point,
            this.polygonRotator,
        );

        action.do();

        this.lastPoint = point;
    }
}
