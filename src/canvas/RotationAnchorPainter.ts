import { RenderingContext } from 'app/canvas/RenderingContext';
import { RotationAnchor } from 'app/canvas/RotationAnchor';

export class RotationAnchorPainter {
    constructor(private context: RenderingContext) {}

    public paint(anchor: RotationAnchor): void {
        this.context.drawCircle(anchor.getAbsolutePosition(), anchor.getRadius());
    }
}
