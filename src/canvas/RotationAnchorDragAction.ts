import { Action } from 'app/canvas/Action'
import { Point } from 'app/canvas/Point';
import { RotationAnchor } from 'app/canvas/RotationAnchor';

export class RotationAnchorDragAction implements Action {
    constructor(
        private anchor: RotationAnchor,
        private angle: number,
        private centerOfRotation: Point,
    ) {}

    public do(): void {
        this.rotate(this.angle);
    }

    public undo(): void {
        this.rotate(-this.angle);
    }

    public toString(): string {
        return `rotate polygon ${this.angle} rads about ${this.centerOfRotation}`;
    }

    private rotate(angle: number): void {
        this.anchor.rotateAngleAboutPoint(angle, this.centerOfRotation);
    }
}
