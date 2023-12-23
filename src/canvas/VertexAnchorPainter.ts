import { RenderingContext } from 'app/canvas/RenderingContext';
import { VertexAnchor } from 'app/canvas/VertexAnchor';

export class VertexAnchorPainter {
    constructor(private context: RenderingContext) {}

    public paint(anchor: VertexAnchor): void {
        this.context.drawCircle(anchor.getPosition(), anchor.getRadius());
    }
}
