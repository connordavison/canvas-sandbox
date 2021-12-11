import { Point } from 'app/geometry/Point';

export interface DragTransaction {
    commit(point: Point): void;
    update(point: Point): void;
}
