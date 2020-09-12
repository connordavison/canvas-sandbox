import { Point } from 'app/canvas/Point';
import { Polygon } from 'app/canvas/Polygon';

export class AxisAlignedBoundingBox {
    constructor(private min: Point, private max: Point) {}

    public collides(polygon: Polygon): boolean {
        return polygon.some((point) => this.hasPoint(point));
    }

    public hasPoint(point: Point): boolean {
        return point.gte(this.min) && point.lte(this.max);
    }

    public getCenter(): Point {
        return this.min.toVector()
            .add(this.max.toVector())
            .divide(2)
            .toPoint();
    }
}
