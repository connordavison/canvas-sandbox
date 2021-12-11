import { Point } from 'app/geometry/Point';
import { PolygonVertex } from 'app/geometry/PolygonVertex';
import { Vector } from 'app/geometry/Vector';

export class VertexAnchor {
    constructor(private vertex: PolygonVertex) {}

    public move(vector: Vector): void {
        this.vertex.move(vector);
    }

    public isPointOnAnchor(point: Point): boolean {
        return point.distance(this.getPosition()) < this.getRadius();
    }

    public getRadius(): number {
        return 5;
    }

    public getPosition(): Point {
        return this.vertex.getPosition();
    }
}
