import { Point } from 'app/canvas/Point';
import { Vector } from 'app/canvas/Vector';
import { Matrix } from 'app/canvas/Matrix';

type PointPredicate = (point: Point) => boolean;
type PointReducer<T> = (accumulator: T, point: Point) => T;

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

    public reduce<T>(reducer: PointReducer<T>, initial: T): T {
        return this.points.reduce(reducer, initial);
    }

    public getStart(): Point {
        return this.points[0];
    }

    public getTail(): Point[] {
        return this.points.slice(1);
    }

    public transform(matrix: Matrix, origin: Point): void {
        this.points = this.points.map((point) => {
            return matrix.apply(point.relativeTo(origin))
                .relativeTo(origin);
        });
    }

    public clone(): Polygon {
        return new Polygon(this.points);
    }
}
