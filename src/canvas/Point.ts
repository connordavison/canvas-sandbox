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
}
