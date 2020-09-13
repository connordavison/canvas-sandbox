import { RenderingContext } from 'app/canvas/RenderingContext';
import { RotationAnchor } from 'app/canvas/RotationAnchor';
import { RotationAnchorLocator } from 'app/canvas/RotationAnchorLocator';

export class RotationAnchorPainter {
    constructor(
        private rotationAnchorLocator: RotationAnchorLocator,
        private renderingContext: RenderingContext,
    ) {}

    public paint(anchor: RotationAnchor): void {
        const origin = this.rotationAnchorLocator.locate(anchor);

        this.renderingContext.drawCircle(origin, anchor.getRadius());
    }
}
