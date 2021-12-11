import { Point } from 'app/geometry/Point';
import { Dimensions } from 'app/geometry/Dimensions';
import { AxisAlignedBoundingBox } from 'app/geometry/collision/AxisAlignedBoundingBox';

export class CollisionDetector {
    public isPointWithinHitboxOfPoint(query: Point, hitbox: Dimensions, point: Point): boolean {
        return AxisAlignedBoundingBox.createAboutPoint(point, hitbox).hasPoint(query);
    }
}
