import { FuzzyMath } from 'app/canvas/FuzzyMath';
import { Vector } from 'app/canvas/Vector';

export class Point {
    constructor(
        private readonly x: number,
        private readonly y: number,
        private readonly z: number,
    ) {}

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public getZ(): number {
        return this.z;
    }

    public getAngleBetween(a: Point, b: Point): number {
        const angle = this.vectorTo(a).angle(this.vectorTo(b));

        if (angle > Math.PI) {
            return angle - 2 * Math.PI;
        }

        return angle;
    }

    public getDistanceSignFromXZLine(a: Point, b: Point): number {
        const minSignedDistanceFromABToThis
            = (this.getX() - a.getX()) * (b.getZ() - a.getZ())
            - (this.getZ() - a.getZ()) * (b.getX() - a.getX());

        return minSignedDistanceFromABToThis < 0 ? -1 : 1;
    }

    public distance(point: Point): number {
        return Math.sqrt(
            (point.x - this.x) ** 2
            + (point.y - this.y) ** 2
            + (point.z - this.z) ** 2
        );
    }

    public gte(point: Point): boolean {
        return this.x >= point.x
            && this.y >= point.y
            && this.z >= point.z;
    }

    public lte(point: Point): boolean {
        return this.x <= point.x
            && this.y <= point.y
            && this.z <= point.z;
    }

    public vectorTo(point: Point): Vector {
        return new Vector(
            point.x - this.x,
            point.y - this.y,
            point.z - this.z,
        );
    }

    public relativeTo(point: Point): Point {
        return new Point(
            this.x - point.x,
            this.y - point.y,
            this.z - point.z,
        );
    }

    public midpointTo(point: Point): Point {
        return this.vectorTo(point)
            .divide(2)
            .movePoint(this);
    }

    public equals(point: Point): boolean {
        return FuzzyMath.eq(this.getX(), point.getX())
            && FuzzyMath.eq(this.getY(), point.getY())
            && FuzzyMath.eq(this.getZ(), point.getZ());
    }

    public toVector(): Vector {
        return new Vector(this.x, this.y, this.z);
    }

    public toString(): string {
        return `{x: ${this.x}, y: ${this.y}, z: ${this.z}}`;
    }
}
