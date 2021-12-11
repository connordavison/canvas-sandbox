import { MouseListener } from 'app/canvas/MouseListener';
import { PolygonRepository } from 'app/canvas/PolygonRepository';
import { PolygonSelector } from 'app/canvas/PolygonSelector';
import { Point } from 'app/geometry/Point';

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
}
