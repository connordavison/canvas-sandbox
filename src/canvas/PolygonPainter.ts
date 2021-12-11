import { RenderingContext } from 'app/canvas/RenderingContext';
import { Polygon } from 'app/geometry/Polygon';

export class PolygonPainter {
    constructor(private context: RenderingContext) {}

    public paint(polygon: Polygon): void {
        this.context.setFillStyle('#EAEADA');
        this.context.setStrokeStyle('#444');
        this.context.setLineWidth(2);
        this.context.beginPath();
        this.context.moveTo(polygon.getStart());

        for (const point of polygon.getTail()) {
            this.context.lineTo(point);
        }

        this.context.closePath();
    }
}
