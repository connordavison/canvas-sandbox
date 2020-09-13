import { Action } from 'app/canvas/Action';
import { Point } from 'app/canvas/Point';
import { RotationAnchor } from 'app/canvas/RotationAnchor';
import { RotationAnchorDragAction } from 'app/canvas/RotationAnchorDragAction';
import { Vector } from 'app/canvas/Vector';

export class RotationAnchorDragTransaction {
    private startOffset: Vector;

    constructor(
        private anchor: RotationAnchor,
        private centerOfRotation: Point,
    ) {
        this.startOffset = anchor.getOffset();
    }

    public commit(position: Point): Action {
        this.update(position);

        return new RotationAnchorDragAction(
            this.anchor,
            this.startOffset.signedAngleXZ(this.anchor.getOffset()),
            this.centerOfRotation,
        );
    }

    public update(position: Point): void {
        const circleToPosition = this.centerOfRotation.vectorTo(position);

        const action = new RotationAnchorDragAction(
            this.anchor,
            this.anchor.getOffset().signedAngleXZ(circleToPosition),
            this.centerOfRotation,
        );

        action.do();
    }
}
