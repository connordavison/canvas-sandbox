import { Point } from 'app/canvas/Point';
import { AxisAlignedBoundingBox } from 'app/canvas/collision/AxisAlignedBoundingBox';
import { Dimensions } from 'app/canvas/Dimensions';

export class AxisAlignedBoundingBoxFactory {
    public create(points: Point[]): AxisAlignedBoundingBox {
        const min = new Point(Infinity, Infinity, Infinity);
        const max = new Point(-Infinity, -Infinity, -Infinity);

        for (const point of points) {
            if (point.getX() < min.getX()) {
                min.setX(point.getX());
            }

            if (point.getY() < min.getY()) {
                min.setY(point.getY());
            }

            if (point.getZ() < min.getZ()) {
                min.setZ(point.getZ());
            }

            if (point.getX() > max.getX()) {
                max.setX(point.getX());
            }

            if (point.getY() > max.getY()) {
                max.setY(point.getY());
            }

            if (point.getZ() > max.getZ()) {
                max.setZ(point.getZ());
            }
        }

        return new AxisAlignedBoundingBox(min, max);
    }

    public createAboutPoint(point: Point, dimensions: Dimensions): AxisAlignedBoundingBox {
        const halfDimensionVector = dimensions.toVector().divide(2);
        const translator = point.toVector();

        return new AxisAlignedBoundingBox(
            translator.add(halfDimensionVector.negate()).toPoint(),
            translator.add(halfDimensionVector).toPoint(),
        );
    }
}
