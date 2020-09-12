import { Point } from 'app/canvas/Point';

export interface MouseListener {
    onMouseDown(point: Point): void;
    onMouseMove(point: Point): void;
    onMouseUp(point: Point): void;
}
