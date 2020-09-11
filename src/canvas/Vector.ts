import { Point } from 'app/canvas/Point';

export class Vector {
    constructor(
        private x: number,
        private y: number,
        private z: number,
    ) {}

    public add(vector: Vector): Vector {
        return new Vector(
            this.x + vector.x,
            this.y + vector.y,
            this.z + vector.z,
        );
    }

    public subtract(vector: Vector): Vector {
        return new Vector(
            this.x - vector.x,
            this.y - vector.y,
            this.z - vector.z,
        );
    }

    public hadamard(vector: Vector): Vector {
        return new Vector(
            this.x * vector.x,
            this.y * vector.y,
            this.z * vector.z,
        );
    }

    public projectOnto(vector: Vector): Vector {
        const unit = vector.normalize();

        return unit.scale(this.dot(unit));
    }

    public normalize(): Vector {
        return this.divide(this.length());
    }

    public divide(divisor: number): Vector {
        return new Vector(
            this.x / divisor,
            this.y / divisor,
            this.z / divisor,
        );
    }

    public scale(factor: number): Vector {
        return new Vector(
            this.x * factor,
            this.y * factor,
            this.z * factor,
        );
    }

    public length(): number {
        return Math.sqrt(this.lengthSquared());
    }

    public lengthSquared(): number {
        return this.dot(this);
    }

    public dot(vector: Vector): number {
        return this.x * vector.x
            + this.y * vector.y
            + this.z * vector.z;
    }

    public equals(errorSquared: number = 1E-8): boolean {
        return this.lengthSquared() < errorSquared;
    }

    public movePoint(point: Point) {
        return new Point(
            this.x + point.getX(),
            this.y + point.getY(),
            this.z + point.getZ(),
        );
    }

    public toPoint(): Point {
        return new Point(this.x, this.y, this.z);
    }
}
