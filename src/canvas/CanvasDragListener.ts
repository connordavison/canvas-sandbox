import { Camera } from 'app/canvas/Camera';
import { DragTransaction } from 'app/canvas/DragTransaction';
import { MouseListener } from 'app/canvas/MouseListener';
import { Point } from 'app/geometry/Point';

export class CanvasDragListener implements MouseListener, DragTransaction {
    private start: Point;

    constructor(private camera: Camera) {}

    public onMouseDown(point: Point): DragTransaction {
        this.start = point;

        return this;
    }

    public commit(point: Point): void {
        this.update(point);
        this.start = undefined;
    }

    public update(point: Point): void {
        this.camera.panByVector(this.start.vectorTo(point));
    }
}
