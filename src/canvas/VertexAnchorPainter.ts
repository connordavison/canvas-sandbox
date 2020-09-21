import { RenderingContext } from 'app/canvas/RenderingContext';
import { VertexAnchor } from 'app/canvas/VertexAnchor';

export class VertexAnchorPainter {
    constructor(private renderingContext: RenderingContext) {}

    public paint(anchor: VertexAnchor): void {
        this.renderingContext.drawCircle(anchor.getPosition(), anchor.getRadius());
    }
}
