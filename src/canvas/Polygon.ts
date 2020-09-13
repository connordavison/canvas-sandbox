import { Point } from 'app/canvas/Point';
import { Vector } from 'app/canvas/Vector';
import { Matrix } from 'app/canvas/Matrix';

type PointPredicate = (point: Point) => boolean;

export class Polygon {
    constructor(private points: Point[]) {}

    public getPoints(): Point[] {
        return this.points;
    }

    public shift(vector: Vector): void {
        this.points = this.points.map((point) => vector.movePoint(point));
    }

    public some(predicate: PointPredicate): boolean {
        return this.points.some(predicate);
    }

    public getStart(): Point {
        return this.points[0];
    }

    public getTail(): Point[] {
        return this.points.slice(1);
    }

    public transform(matrix: Matrix, origin: Point): void {
        this.points = this.points.map((point) => {
            return matrix.applyToPoint(point.relativeTo(origin))
                .toVector()
                .movePoint(origin);
        });
    }

    public clone(): Polygon {
        return new Polygon(this.points);
    }
}
