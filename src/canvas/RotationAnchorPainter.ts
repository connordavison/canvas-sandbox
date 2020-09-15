import { RenderingContext } from 'app/canvas/RenderingContext';
import { RotationAnchor } from 'app/canvas/RotationAnchor';

export class RotationAnchorPainter {
    constructor(private renderingContext: RenderingContext) {}

    public paint(anchor: RotationAnchor): void {
        this.renderingContext.drawCircle(anchor.getAbsolutePosition(), anchor.getRadius());
    }
}
