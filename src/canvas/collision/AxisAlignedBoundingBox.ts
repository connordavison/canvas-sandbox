import { Dimensions } from 'app/canvas/Dimensions';
import { Point } from 'app/canvas/Point';
import { Polygon } from 'app/canvas/Polygon';

export class AxisAlignedBoundingBox {
    constructor(private min: Point, private max: Point) {}

    public static createAboutPoint(point: Point, dimensions: Dimensions): AxisAlignedBoundingBox {
        const halfDimensionVector = dimensions.toVector().divide(2);
        const translator = point.toVector();

        return new AxisAlignedBoundingBox(
            translator.add(halfDimensionVector.negate()).toPoint(),
            translator.add(halfDimensionVector).toPoint(),
        );
    }

    public collides(polygon: Polygon): boolean {
        return polygon.some((point) => this.hasPoint(point));
    }

    public hasPoint(point: Point): boolean {
        return point.gte(this.min) && point.lte(this.max);
    }

    public getLeft(): number {
        return this.min.getX();
    }

    public getRight(): number {
        return this.max.getX();
    }

    public getTop(): number {
        return this.min.getZ();
    }

    public getBottom(): number {
        return this.max.getZ();
    }

    public getCenter(): Point {
        return this.min.toVector()
            .add(this.max.toVector())
            .divide(2)
            .toPoint();
    }
}
