import { Point } from 'app/canvas/Point';
import { Polygon } from 'app/canvas/Polygon';

export class PolygonFactory {
    public createXZSquareAboutPoint(point: Point, width: number): Polygon {
        const polygon = new Polygon([
            new Point(0, 0, 0),
            new Point(width / 2, 0, 0),
            new Point(width / 2, 0, width / 2),
            new Point(0, 0, width / 2),
        ]);

        polygon.shift(point.toVector());

        return polygon;
    }
}
