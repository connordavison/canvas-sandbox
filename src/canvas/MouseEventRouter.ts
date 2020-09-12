import { MouseListener } from 'app/canvas/MouseListener';
import { Point } from 'app/canvas/Point';

export class MouseEventRouter {
    constructor(private listeners: MouseListener[]) {}

    public register(target: EventTarget): void {
        target.addEventListener('mousedown', (event: MouseEvent) => this.onMouseDown(event));
        target.addEventListener('mousemove', (event: MouseEvent) => this.onMouseMove(event));
        target.addEventListener('mouseup', (event: MouseEvent) => this.onMouseUp(event));
    }

    public onMouseDown(event: MouseEvent): void {
        this.listeners.forEach((listener) => listener.onMouseDown(this.getMousePosition(event)));
    }

    public onMouseMove(event: MouseEvent): void {
        this.listeners.forEach((listener) => listener.onMouseMove(this.getMousePosition(event)));
    }

    public onMouseUp(event: MouseEvent): void {
        this.listeners.forEach((listener) => listener.onMouseUp(this.getMousePosition(event)));
    }

    private getMousePosition(event: MouseEvent): Point {
        return new Point(event.offsetX, 0, event.offsetY);
    }
}
