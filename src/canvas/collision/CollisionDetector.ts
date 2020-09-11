import { Point } from 'app/canvas/Point';
import { Polygon } from 'app/canvas/Polygon';
import { AxisAlignedBoundingBoxFactory } from 'app/canvas/collision/AxisAlignedBoundingBoxFactory';

export class CollisionDetector {
    constructor(private aabbFactory: AxisAlignedBoundingBoxFactory) {}

    public isPointInPolygon(point: Point, polygon: Polygon) {
        const box = this.aabbFactory.create(polygon.getPoints());

        return box.hasPoint(point);
    }
}
