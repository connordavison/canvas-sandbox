import { Point } from 'app/canvas/Point';

export class RenderingContext {
    constructor(private context: CanvasRenderingContext2D) {}

    public clear(): void {
        const canvas = this.context.canvas;

        this.context.clearRect(0, 0, canvas.width, canvas.height);
    }

    public fitToScreen(): void {
        const canvas = this.context.canvas;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    public beginPath(): void {
        this.context.beginPath();
        this.context.fillStyle = '#F00';
        this.context.strokeStyle = '#00F';
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
}
