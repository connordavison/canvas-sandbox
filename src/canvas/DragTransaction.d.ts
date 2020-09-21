import { Point } from 'app/canvas/Point';

export interface DragTransaction {
    commit(point: Point): void;
    update(point: Point): void;
}
