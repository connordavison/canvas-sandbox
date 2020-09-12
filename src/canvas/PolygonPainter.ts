import { Polygon } from 'app/canvas/Polygon';
import { RenderingContext } from 'app/canvas/RenderingContext';

export class PolygonPainter {
    constructor(private context: RenderingContext) {}

    public paint(polygon: Polygon): void {
        this.context.beginPath();
        this.context.moveTo(polygon.getStart());

        for (const point of polygon.getTail()) {
            this.context.lineTo(point);
        }

        this.context.closePath();
    }
}
