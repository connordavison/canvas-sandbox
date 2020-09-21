import { Point } from 'app/canvas/Point';
import { Polygon } from 'app/canvas/Polygon';
import { Vector } from 'app/canvas/Vector';

export class VertexAnchor {
    constructor(
        private polygon: Polygon,
        private id: number,
    ) {}

    public move(vector: Vector): void {
        this.polygon.movePoint(this.id, vector);
    }

    public isPointOnAnchor(point: Point): boolean {
        return point.distance(this.getPosition()) < this.getRadius();
    }

    public getRadius(): number {
        return 5;
    }

    public getPosition(): Point {
        return this.polygon.getPoints()[this.id];
    }
}
