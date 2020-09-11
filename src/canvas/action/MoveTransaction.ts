import { PolygonRepository } from 'app/canvas/PolygonRepository';
import { Polygon } from 'app/canvas/Polygon';
import { Point } from 'app/canvas/Point';

export class MoveTransaction {
    private start: Point;
    private targetPolygon: Polygon;

    constructor(private polygonRepository: PolygonRepository) {}

    public onMouseDown(point: Point): void {
        const targetPolygon = this.polygonRepository.findAtPoint(point);

        if (targetPolygon) {
            this.start = point;
            this.targetPolygon = targetPolygon;
        }
    }

    public onMouseMove(point: Point) {
        if (this.targetPolygon && this.start) {
            const newTargetPolygon = this.targetPolygon.shift(this.start.vectorTo(point));

            this.polygonRepository.replace(this.targetPolygon, newTargetPolygon);

            this.targetPolygon = newTargetPolygon;
            this.start = point;
        }
    }

    public onMouseUp(): void {
        this.start = undefined;
        this.targetPolygon = undefined;
    }
}
