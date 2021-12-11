import { Point } from 'app/geometry/Point';
import { Polygon } from 'app/geometry/Polygon';

export class PolygonRepository {
    private polygons: Polygon[] = [];

    public findAll(): Polygon[] {
        return this.polygons;
    }

    public push(polygon: Polygon): void {
        this.polygons.push(polygon);
    }

    public findAtPoint(point: Point): Polygon {
        return this.polygons.find((polygon) => polygon.containsPoint(point));
    }
}
