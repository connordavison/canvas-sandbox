import { Camera } from 'app/canvas/Camera';
import { DragTransaction } from 'app/canvas/DragTransaction';
import { MouseListener } from 'app/canvas/MouseListener';
import { Point } from 'app/geometry/Point';

export class MouseEventRouter {
    private dragTransaction?: DragTransaction|void;

    constructor(
        private listeners: MouseListener[],
        private camera: Camera,
    ) {}

    public register(target: EventTarget): void {
        target.addEventListener('mousedown', (event: MouseEvent) => {
            this.onMouseDown(this.camera.findMouseEvent(event));
        });

        target.addEventListener('mousemove', (event: MouseEvent) => {
            this.onMouseMove(this.camera.findMouseEvent(event));
        });

        target.addEventListener('mouseup', (event: MouseEvent) => {
            this.onMouseUp(this.camera.findMouseEvent(event));
        });
    }

    public onMouseDown(position: Point): void {
        for (const listener of this.listeners) {
            if (this.dragTransaction) {
                return;
            }

            this.dragTransaction = listener.onMouseDown(position);
        }
    }

    public onMouseMove(position: Point): void {
        if (this.dragTransaction) {
            this.dragTransaction.update(position);
        }
    }

    public onMouseUp(position: Point): void {
        if (this.dragTransaction) {
            this.dragTransaction.commit(position);
            this.dragTransaction = undefined;
        }
    }
}
