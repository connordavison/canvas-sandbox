import { MoveTransaction } from 'app/canvas/action/MoveTransaction';
import { Point } from 'app/canvas/Point';

export class MouseEventRouter {
    constructor(private moveTransaction: MoveTransaction) {}

    public register(target: EventTarget) {
        target.addEventListener('mousedown', (event: MouseEvent) => this.onMouseDown(event));
        target.addEventListener('mousemove', (event: MouseEvent) => this.onMouseMove(event));
        target.addEventListener('mouseup', () => this.onMouseUp());
    }

    public onMouseDown(event: MouseEvent): void {
        this.moveTransaction.onMouseDown(this.getMousePosition(event));
    }

    public onMouseMove(event: MouseEvent): void {
        this.moveTransaction.onMouseMove(this.getMousePosition(event));
    }

    public onMouseUp(): void {
        this.moveTransaction.onMouseUp();
    }

    private getMousePosition(event: MouseEvent): Point {
        return new Point(event.offsetX, 0, event.offsetY);
    }
}
