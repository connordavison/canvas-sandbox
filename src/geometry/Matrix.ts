import { Point } from 'app/geometry/Point';
import { Vector } from 'app/geometry/Vector';

type MatrixArray = [
    m00: number, m01: number, m02: number, m03: number,
    m10: number, m11: number, m12: number, m13: number,
    m20: number, m21: number, m22: number, m23: number,
    m30: number, m31: number, m32: number, m33: number,
];

export class Matrix {
    private constructor(private entries: MatrixArray) {}

    public static rotateXZ(angle: number): Matrix {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        return new Matrix([
            cos, 0, -sin, 0,
            0, 1, 0, 0,
            sin, 0, cos, 0,
            0, 0, 0, 1
        ]);
    }

    public static scale(sx: number, sy = sx, sz = sx): Matrix {
        return new Matrix([
            sx, 0, 0, 0,
            0, sy, 0, 0,
            0, 0, sz, 0,
            0, 0, 0, 1,
        ]);
    }

    public static translate(tx: number, ty: number, tz: number): Matrix {
        return new Matrix([
            1, 0, 0, tx,
            0, 1, 0, ty,
            0, 0, 1, tz,
            0, 0, 0, 1,
        ]);
    }

    public at(row: number, column: number): number {
        return this.entries[4 * row + column];
    }

    public rotateXZ(angle: number): Matrix {
        return this.multiply(Matrix.rotateXZ(angle));
    }

    public scale(sx: number, sy = sx, sz = sx): Matrix {
        return this.multiply(Matrix.scale(sx, sy, sz));
    }

    public translate(tx: number, ty: number, tz: number): Matrix {
        return this.multiply(Matrix.translate(tx, ty, tz));
    }

    public multiply(other: Matrix): Matrix {
        const [
            a00, a01, a02, a03,
            a10, a11, a12, a13,
            a20, a21, a22, a23,
            a30, a31, a32, a33,
        ] = this.entries;
        const [
            b00, b01, b02, b03,
            b10, b11, b12, b13,
            b20, b21, b22, b23,
            b30, b31, b32, b33,
        ] = other.entries;

        const c00 = a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30;
        const c01 = a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31;
        const c02 = a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32;
        const c03 = a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33;

        const c10 = a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30;
        const c11 = a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31;
        const c12 = a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32;
        const c13 = a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33;

        const c20 = a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30;
        const c21 = a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31;
        const c22 = a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32;
        const c23 = a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33;

        const c30 = a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30;
        const c31 = a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31;
        const c32 = a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32;
        const c33 = a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33;

        return new Matrix([
            c00, c01, c02, c03,
            c10, c11, c12, c13,
            c20, c21, c22, c23,
            c30, c31, c32, c33,
        ]);
    }

    public applyToVector(vector: Vector): Vector {
        return this.applyToPoint(vector.toPoint()).toVector();
    }

    public applyToPoint(point: Point): Point {
        const [
            a00, a01, a02, a03,
            a10, a11, a12, a13,
            a20, a21, a22, a23,
        ] = this.entries;
        const x = point.getX();
        const y = point.getY();
        const z = point.getZ();

        return new Point(
            a00 * x + a01 * y + a02 * z + a03,
            a10 * x + a11 * y + a12 * z + a13,
            a20 * x + a21 * y + a22 * z + a23,
        );
    }
}
