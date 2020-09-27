import { Point } from 'app/canvas/Point';
import { Dimensions } from 'app/canvas/Dimensions';
import { AxisAlignedBoundingBox } from 'app/canvas/collision/AxisAlignedBoundingBox';

export class CollisionDetector {
    public isPointWithinHitboxOfPoint(query: Point, hitbox: Dimensions, point: Point): boolean {
        return AxisAlignedBoundingBox.createAboutPoint(point, hitbox).hasPoint(query);
    }
}
