import { Point } from 'app/canvas/Point';
import { PolygonCentroidCalculator } from 'app/canvas/PolygonCentroidCalculator';
import { RotationAnchor } from 'app/canvas/RotationAnchor';

export class RotationAnchorLocator {
    constructor(private centroidCalculator: PolygonCentroidCalculator) {}

    public locate(anchor: RotationAnchor): Point {
        const point = this.centroidCalculator.getCentroid(anchor.getTarget());

        return anchor.getAbsolutePosition(point);
    }
}
