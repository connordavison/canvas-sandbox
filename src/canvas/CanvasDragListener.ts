import { Camera } from 'app/canvas/Camera';
import { Lockable } from 'app/canvas/Lockable';
import { MouseListener } from 'app/canvas/MouseListener';
import { Point } from 'app/canvas/Point';

export class CanvasDragListener implements MouseListener {
    private start: Point;

    constructor(private camera: Camera) {}

    public onMouseDown(point: Point, lock: Lockable<MouseListener>): void {
        this.start = point;
        lock.lock(this);
    }

    public onMouseMove(point: Point): void {
        if (this.start) {
            this.update(point);
        }
    }

    public onMouseUp(point: Point): void {
        if (this.start) {
            this.update(point);
            this.start = undefined;
        }
    }

    private update(point: Point): void {
        this.camera.panByVector(this.start.vectorTo(point));
    }
}
