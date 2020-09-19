import { Camera } from 'app/canvas/Camera';
import { Point } from 'app/canvas/Point';

export class ScrollListener {
    constructor(private camera: Camera) {}

    public register(target: EventTarget): void {
        target.addEventListener('wheel', (event: WheelEvent) => {
            const position = this.camera.findMouseEvent(event);

            if (event.deltaY > 0) {
                this.scrollUp(position);
            } else {
                this.scrollDown(position);
            }
        });
    }

    public scrollUp(position: Point): void {
        this.camera.zoomIn(position);
    }

    public scrollDown(position: Point): void {
        this.camera.zoomOut(position);
    }
}
