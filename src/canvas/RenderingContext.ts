import { Dimensions } from 'app/canvas/Dimensions';
import { Point } from 'app/canvas/Point';

export class RenderingContext {
    constructor(private context: CanvasRenderingContext2D) {}

    public clear(): void {
        const canvas = this.context.canvas;

        this.context.clearRect(0, 0, canvas.width, canvas.height);
    }

    public getDimensions(): Dimensions {
        const canvas = this.context.canvas;

        return new Dimensions(canvas.width, 0, canvas.height);
    }

    public fitToScreen(): void {
        const canvas = this.context.canvas;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    public strokeLine(from: Point, to: Point): void {
        this.beginPath();
        this.moveTo(from);
        this.lineTo(to);
        this.closePath();
    }

    public setFillStyle(fillStyle: string): void {
        this.context.fillStyle = fillStyle;
    }

    public setStrokeStyle(strokeStyle: string): void {
        this.context.strokeStyle = strokeStyle;
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
