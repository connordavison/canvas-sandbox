import { Point } from 'app/canvas/Point';

export class PointComparator {
    constructor(private epsilon: number = 1E-10) {}

    public equals(a: Point, b: Point): boolean {
        return Math.abs(b.getX() - a.getX()) < this.epsilon
            && Math.abs(b.getY() - a.getY()) < this.epsilon
            && Math.abs(b.getZ() - a.getZ()) < this.epsilon;
    }
}
