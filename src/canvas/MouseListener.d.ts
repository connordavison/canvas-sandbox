import { DragTransaction } from 'app/canvas/DragTransaction';
import { Point } from 'app/geometry/Point';

export interface MouseListener {
    onMouseDown(point: Point): DragTransaction|void;
}
