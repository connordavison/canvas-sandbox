import { Point } from 'app/canvas/Point';
import { Vector } from 'app/canvas/Vector';

type PointPredicate = (point: Point) => boolean;
type PointReducer<T> = (accumulator: T, point: Point) => T;

export class Polygon {
    constructor(private points: Point[]) {}

    public translate(vector: Vector) {
        return new Polygon(
            this.points.map((point) => vector.movePoint(point)),
        );
    }

    public getPoints(): Point[] {
        return this.points;
    }

    public shift(vector: Vector): Polygon {
        return new Polygon(
            this.points.map((point) => vector.movePoint(point)),
        );
    }

    public some(predicate: PointPredicate) {
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

    public clone(): Polygon {
        return new Polygon(this.points);
    }

    *[Symbol.iterator]() {
        yield* this.points;
    }
}
