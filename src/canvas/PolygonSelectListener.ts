import { MouseListener } from 'app/canvas/MouseListener';
import { Point } from 'app/canvas/Point';
import { PolygonRepository } from 'app/canvas/PolygonRepository';
import { PolygonSelector } from 'app/canvas/PolygonSelector';

export class PolygonSelectListener implements MouseListener {
    constructor(
        private polygonRepository: PolygonRepository,
        private polygonSelector: PolygonSelector,
    ) {}

    public onMouseDown(point: Point): void {
        const polygon = this.polygonRepository.findAtPoint(point);

        if (polygon) {
            this.polygonSelector.select(polygon);
        } else {
            this.polygonSelector.clear();
        }
    }

    public onMouseMove(): void {
        // noop
    }

    public onMouseUp(): void {
        // noop
    }
}
