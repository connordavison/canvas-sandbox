import { Camera } from 'app/canvas/Camera';
import { MouseListener } from 'app/canvas/MouseListener';
import { MutexLock } from 'app/canvas/MutexLock';
import { Point } from 'app/canvas/Point';

export class MouseEventRouter {
    private lock: MutexLock<MouseListener> = new MutexLock<MouseListener>();

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
            if (this.lock.isLocked()) {
                return;
            }

            listener.onMouseDown(position, this.lock);
        }
    }

    public onMouseMove(position: Point): void {
        const listener = this.lock.getLocker();

        if (listener) {
            listener.onMouseMove(position);
        }
    }

    public onMouseUp(position: Point): void {
        const listener = this.lock.getLocker();

        if (listener) {
            listener.onMouseUp(position);

            this.lock.unlock();
        }
    }
}
