import { Matrix } from 'app/canvas/Matrix';
import { PolygonCentroidCalculator } from 'app/canvas/PolygonCentroidCalculator';
import { RotationAnchorRepository } from 'app/canvas/RotationAnchorRepository';
import { Point } from 'app/canvas/Point';
import { RotationAnchor } from 'app/canvas/RotationAnchor';
import { MouseListener } from 'app/canvas/MouseListener';

class RotateStep {
    constructor(
        private targetCentroid: Point,
        private anchor: RotationAnchor,
    ) {}

    public rotateTo(point: Point): void {
        const angle = this.targetCentroid.getRelativeAngleBetween(
            this.anchor.getPoint(),
            point,
        );

        const rotationMatrix = Matrix.rotateXZ(angle);

        this.anchor.setPoint(point);
        this.anchor.getTarget().transform(rotationMatrix, this.targetCentroid);
    }
}

export class RotationAnchorDragTransaction implements MouseListener {
    private rotateStep?: RotateStep;

    constructor(
        private polygonCentroidCalculator: PolygonCentroidCalculator,
        private rotationAnchorRepository: RotationAnchorRepository,
    ) {}

    public onMouseDown(point: Point): void {
        const rotationAnchor = this.rotationAnchorRepository.findAtPoint(point);

        if (rotationAnchor) {
            const targetCentroid = this.polygonCentroidCalculator.getCentroid(
                rotationAnchor.getTarget(),
            );

            this.rotateStep = new RotateStep(targetCentroid, rotationAnchor);
        }
    }

    public onMouseMove(point: Point): void {
        if (this.rotateStep) {
            this.rotateStep.rotateTo(point);
        }
    }

    public onMouseUp(): void {
        this.rotateStep = undefined;
    }
}
