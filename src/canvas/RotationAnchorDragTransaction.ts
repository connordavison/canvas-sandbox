import { ActionHistory } from 'app/canvas/ActionHistory';
import { DragTransaction } from 'app/canvas/DragTransaction';
import { RotationAnchor } from 'app/canvas/RotationAnchor';
import { RotationAnchorDragAction } from 'app/canvas/RotationAnchorDragAction';
import { Point } from 'app/geometry/Point';

export class RotationAnchorDragTransaction implements DragTransaction {
    private start: Point;

    constructor(
        private anchor: RotationAnchor,
        private actionHistory: ActionHistory,
    ) {
        this.start = anchor.getAbsolutePosition();
    }

    public commit(position: Point): void {
        this.update(position);

        const completedAction = new RotationAnchorDragAction(
            this.anchor,
            this.anchor.getAngleTo(this.start),
        );

        this.actionHistory.push(completedAction);
    }

    public update(position: Point): void {
        const action = new RotationAnchorDragAction(
            this.anchor,
            this.anchor.getAngleTo(position),
        );

        action.do();
    }
}
