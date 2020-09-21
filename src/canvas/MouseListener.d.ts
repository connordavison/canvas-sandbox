import { DragTransaction } from 'app/canvas/DragTransaction';
import { Point } from 'app/canvas/Point';

export interface MouseListener {
    onMouseDown(point: Point): DragTransaction|void;
}
