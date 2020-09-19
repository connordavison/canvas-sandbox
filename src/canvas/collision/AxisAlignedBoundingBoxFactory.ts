import { Point } from 'app/canvas/Point';
import { AxisAlignedBoundingBox } from 'app/canvas/collision/AxisAlignedBoundingBox';
import { Dimensions } from 'app/canvas/Dimensions';

export class AxisAlignedBoundingBoxFactory {
    public create(points: Point[]): AxisAlignedBoundingBox {
        let minX = Infinity;
        let minY = Infinity;
        let minZ = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;
        let maxZ = -Infinity;

        for (const point of points) {
            if (point.getX() < minX) {
                minX = point.getX();
            }

            if (point.getY() < minY) {
                minY = point.getY();
            }

            if (point.getZ() < minZ) {
                minZ = point.getZ();
            }

            if (point.getX() > maxX) {
                maxX = point.getX();
            }

            if (point.getY() > maxY) {
                maxY = point.getY();
            }

            if (point.getZ() > maxZ) {
                maxZ = point.getZ();
            }
        }

        return new AxisAlignedBoundingBox(
            new Point(minX, minY, minZ),
            new Point(maxX, maxY, maxZ),
        );
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
