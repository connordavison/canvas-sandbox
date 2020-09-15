import { Action } from 'app/canvas/Action'
import { RotationAnchor } from 'app/canvas/RotationAnchor';

export class RotationAnchorDragAction implements Action {
    constructor(
        private anchor: RotationAnchor,
        private angle: number,
    ) {}

    public do(): void {
        this.rotate(this.angle);
    }

    public undo(): void {
        this.rotate(-this.angle);
    }

    public toString(): string {
        return `rotate polygon ${this.angle} rads about ${this.anchor.getCenterOfRotation()}`;
    }

    private rotate(angle: number): void {
        this.anchor.rotateAngleAboutPoint(angle);
    }
}
