import { Action } from 'app/canvas/Action';
import { Point } from 'app/canvas/Point';
import { RotationAnchor } from 'app/canvas/RotationAnchor';
import { RotationAnchorDragAction } from 'app/canvas/RotationAnchorDragAction';

export class RotationAnchorDragTransaction {
    private start: Point;

    constructor(private anchor: RotationAnchor) {
        this.start = anchor.getAbsolutePosition();
    }

    public commit(position: Point): Action {
        this.update(position);

        return new RotationAnchorDragAction(
            this.anchor,
            this.anchor.getAngleTo(this.start),
        );
    }

    public update(position: Point): void {
        const action = new RotationAnchorDragAction(
            this.anchor,
            this.anchor.getAngleTo(position),
        );

        action.do();
    }
}
