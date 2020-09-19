import { Lockable } from 'app/canvas/Lockable';
import { Point } from 'app/canvas/Point';

export interface MouseListener {
    onMouseDown(point: Point, lock: Lockable<MouseListener>): void;
    onMouseMove(point: Point): void;
    onMouseUp(point: Point): void;
}
