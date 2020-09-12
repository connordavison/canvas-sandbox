import { Vector } from 'app/canvas/Vector';

export class Point {
    constructor(
        private x: number,
        private y: number,
        private z: number,
    ) {}

    public setX(x: number): void {
        this.x = x;
    }

    public getX(): number {
        return this.x;
    }

    public setY(y: number): void {
        this.y = y;
    }

    public getY(): number {
        return this.y;
    }

    public setZ(z: number): void {
        this.z = z;
    }

    public getZ(): number {
        return this.z;
    }

    public getRelativeAngleBetween(a: Point, b: Point): number {
        return this.getDistanceSignFromXZLine(a, b)
            * this.vectorTo(a).angle(this.vectorTo(b));
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
            point.x - this.x,
            point.y - this.y,
            point.z - this.z,
        );
    }

    public toVector(): Vector {
        return new Vector(this.x, this.y, this.z);
    }

    public toString(): string {
        return `{x: ${this.x}, y: ${this.y}, z: ${this.z}}`;
    }
}
