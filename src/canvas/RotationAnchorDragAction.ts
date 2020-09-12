import { Action } from 'app/canvas/Action'
import { Point } from 'app/canvas/Point';
import { PolygonRotator } from 'app/canvas/PolygonRotator';
import { RotationAnchor } from 'app/canvas/RotationAnchor';

export class RotationAnchorDragAction implements Action {
    constructor(
        private anchor: RotationAnchor,
        private start: Point,
        private end: Point,
        private polygonRotator: PolygonRotator,
    ) {}

    public do(): void {
        this.rotate(this.start, this.end);
    }

    public undo(): void {
        this.rotate(this.end, this.start);
    }

    private rotate(start: Point, end: Point): void {
        const targetPolygon = this.anchor.getTarget();

        this.polygonRotator.rotate(targetPolygon, start, end);

        this.anchor.setPoint(end);
    }
}
