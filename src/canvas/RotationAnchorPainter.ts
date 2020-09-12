import { PolygonFactory } from 'app/canvas/PolygonFactory';
import { PolygonPainter } from 'app/canvas/PolygonPainter';
import { RotationAnchor } from 'app/canvas/RotationAnchor';

export class RotationAnchorPainter {
    constructor(
        private polygonFactory: PolygonFactory,
        private polygonPainter: PolygonPainter,
    ) {}

    public paint(rotationAnchor: RotationAnchor): void {
        const polygon = this.polygonFactory.createXZSquareAboutPoint(
            rotationAnchor.getPoint(),
            10,
        );

        this.polygonPainter.paint(polygon);
    }
}
