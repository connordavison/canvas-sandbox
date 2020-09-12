import { Matrix } from 'app/canvas/Matrix';
import { Point } from 'app/canvas/Point';
import { Polygon } from 'app/canvas/Polygon';
import { PolygonCentroidCalculator } from 'app/canvas/PolygonCentroidCalculator';

export class PolygonRotator {
    constructor(private centroidCalculator: PolygonCentroidCalculator) {}

    public rotate(polygon: Polygon, start: Point, end: Point): void {
        const centroid = this.centroidCalculator.getCentroid(polygon);
        const angle = centroid.getRelativeAngleBetween(start, end);
        const rotationMatrix = Matrix.rotateXZ(angle);

        polygon.transform(rotationMatrix, centroid);
    }
}
