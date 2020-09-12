import { Point } from 'app/canvas/Point';
import { Polygon } from 'app/canvas/Polygon';
import { AxisAlignedBoundingBoxFactory } from 'app/canvas/collision/AxisAlignedBoundingBoxFactory';
import { Dimensions } from 'app/canvas/Dimensions';

export class CollisionDetector {
    constructor(private aabbFactory: AxisAlignedBoundingBoxFactory) {}

    public isPointInPolygon(point: Point, polygon: Polygon): boolean {
        const box = this.aabbFactory.create(polygon.getPoints());

        return box.hasPoint(point);
    }

    public isPointWithinHitboxOfPoint(query: Point, hitbox: Dimensions, point: Point): boolean {
        const box = this.aabbFactory.createAboutPoint(point, hitbox);

        return box.hasPoint(query);
    }
}
