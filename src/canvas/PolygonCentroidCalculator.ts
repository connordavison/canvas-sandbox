import { AxisAlignedBoundingBoxFactory } from 'app/canvas/collision/AxisAlignedBoundingBoxFactory';
import { Polygon } from 'app/canvas/Polygon';
import { Point } from 'app/canvas/Point';

export class PolygonCentroidCalculator {
    constructor(private aabbFactory: AxisAlignedBoundingBoxFactory) {}

    public getCentroid(polygon: Polygon): Point {
        return this.aabbFactory.create(polygon.getPoints()).getCenter();
    }
}
