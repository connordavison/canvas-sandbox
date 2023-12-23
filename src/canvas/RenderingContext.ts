import { Matrix } from 'app/geometry/Matrix';
import { Point } from 'app/geometry/Point';

interface Dimensions {
    width: number;
    height: number;
}

export class RenderingContext {
    constructor(
        private context: CanvasRenderingContext2D,
    ) {}

    public clear(): void {
        const canvas = this.context.canvas;

        this.context.clearRect(0, 0, canvas.width, canvas.height);
    }

    public getDimensions(): Dimensions {
        return this.context.canvas;
    }

    public fitToScreen(): void {
        const canvas = this.context.canvas;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    public fillRect(min: Point, max: Point): void {
        const minX = min.getX();
        const minZ = min.getZ();
        const dx = max.getX() - minX;
        const dz = max.getZ() - minZ;

        this.context.fillRect(minX, minZ, dx, dz);
    }

    public strokeLine(from: Point, to: Point): void {
        this.beginPath();
        this.moveTo(from);
        this.lineTo(to);
        this.closePath();
    }

    public createPattern(canvas: HTMLCanvasElement, repetition: string): CanvasPattern {
        return this.context.createPattern(canvas, repetition);
    }

    public save(): void {
        this.context.save();
    }

    public restore(): void {
        this.context.restore();
    }

    public setTransform(matrix: Matrix): void {
        // m00, m20, m02, m22, m03*r, m23*r
        this.context.setTransform(
            matrix.at(0, 0),
            matrix.at(2, 0),
            matrix.at(0, 2),
            matrix.at(2, 2),
            matrix.at(0, 3),
            matrix.at(2, 3),
        );
    }

    public setFillStyle(fillStyle: string | CanvasPattern): void {
        this.context.fillStyle = fillStyle;
    }

    public setStrokeStyle(strokeStyle: string): void {
        this.context.strokeStyle = strokeStyle;
    }

    public setLineWidth(lineWidth: number): void {
        this.context.lineWidth = lineWidth;
    }

    public beginPath(): void {
        this.context.beginPath();
    }

    public closePath(): void {
        this.context.closePath();
        this.context.stroke();
        this.context.fill();
    }

    public lineTo(point: Point): void {
        this.context.lineTo(point.getX(), point.getZ());
    }

    public moveTo(point: Point): void {
        this.context.moveTo(point.getX(), point.getZ());
    }

    public drawCircle(origin: Point, radius: number): void {
        this.beginPath();
        this.context.arc(origin.getX(), origin.getZ(), radius, 0, 2 * Math.PI);
        this.closePath();
    }
}
