import { PolygonRepository } from 'app/canvas/PolygonRepository';
import { Polygon } from 'app/canvas/Polygon';
import { Point } from 'app/canvas/Point';
import { MouseListener } from 'app/canvas/MouseListener';

class DragStep {
    constructor(private origin: Point, private polygon: Polygon) {}

    move(point: Point): DragStep {
        this.polygon.shift(this.origin.vectorTo(point));

        return new DragStep(point, this.polygon);
    }
}

export class PolygonDragTransaction implements MouseListener {
    private step?: DragStep;

    constructor(private polygonRepository: PolygonRepository) {}

    public onMouseDown(point: Point): void {
        const targetPolygon = this.polygonRepository.findAtPoint(point);

        if (targetPolygon) {
            this.step = new DragStep(point, targetPolygon);
        }
    }

    public onMouseMove(point: Point): void {
        if (this.step) {
            this.step = this.step.move(point);
        }
    }

    public onMouseUp(): void {
        this.step = undefined;
    }
}
