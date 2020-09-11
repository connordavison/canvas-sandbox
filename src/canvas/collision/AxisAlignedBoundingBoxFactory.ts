import { Point } from 'app/canvas/Point';
import { AxisAlignedBoundingBox } from 'app/canvas/collision/AxisAlignedBoundingBox';

export class AxisAlignedBoundingBoxFactory {
    public create(points: Point[]) {
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
}
