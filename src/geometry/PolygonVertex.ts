import { Point } from 'app/geometry/Point';
import { Polygon } from 'app/geometry/Polygon';
import { Vector } from 'app/geometry/Vector';

export class PolygonVertex {
    constructor(
        private polygon: Polygon,
        private id: number,
    ) {}

    public move(vector: Vector): void {
        this.polygon.movePoint(this.id, vector);
    }

    public getPosition(): Point {
        return this.polygon.getPoints()[this.id];
    }
}
