import { FuzzyMath } from 'app/canvas/FuzzyMath';
import { Point } from 'app/canvas/Point';

export class Vector {
    constructor(
        private readonly x: number,
        private readonly y: number,
        private readonly z: number,
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

    public rightPerpendicularXZ(): Vector {
        return new Vector(
            this.z,
            this.y,
            -this.x,
        );
    }

    public leftPerpendicularXZ(): Vector {
        return new Vector(
            -this.z,
            this.y,
            this.x,
        );
    }

    public negate(): Vector {
        return new Vector(-this.x, -this.y, -this.z);
    }

    public projectOnto(vector: Vector): Vector {
        const unit = vector.normalize();

        return unit.scale(this.dot(unit));
    }

    public isParallel(vector: Vector): boolean {
        return this.normalize()
            .equals(vector.normalize());
    }

    public normalize(): Vector {
        return this.divide(this.length());
    }

    public divide(divisor: number): Vector {
        if (divisor === 0) {
            throw 'Cannot divide vector by zero';
        }

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

    public scaleToLength(length: number): Vector {
        return this.divide(this.length()).scale(length);
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

    public signedAngleXZ(vector: Vector): number {
        let angle = this.angle(vector);
        const cross = this.cross(vector);
        const normal = new Vector(0, -1, 0);

        if (normal.dot(cross) < 0) {
            angle = -angle;
        }

        return angle;
    }

    public angle(vector: Vector): number {
        return FuzzyMath.acos(this.cos(vector));
    }

    public cos(vector: Vector): number {
        const magnitudeProduct = this.length() * vector.length();

        if (magnitudeProduct === 0) {
            throw 'Angle is not defined for zero vectors.';
        }

        return this.dot(vector) / magnitudeProduct;
    }

    public cross(vector: Vector): Vector {
        return new Vector(
            this.y * vector.z - this.z * vector.y,
            this.z * vector.x - this.x * vector.z,
            this.x * vector.y - this.y * vector.x,
        );
    }

    public movePoint(point: Point): Point {
        return new Point(
            this.x + point.getX(),
            this.y + point.getY(),
            this.z + point.getZ(),
        );
    }

    public equals(vector: Vector): boolean {
        return FuzzyMath.eq(this.x, vector.x)
            && FuzzyMath.eq(this.y, vector.y)
            && FuzzyMath.eq(this.z, vector.z);
    }

    public toPoint(): Point {
        return new Point(this.x, this.y, this.z);
    }
}
