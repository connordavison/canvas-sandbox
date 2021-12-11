import { FuzzyMath } from 'app/geometry/FuzzyMath';
import { Point } from 'app/geometry/Point';
import { Vector } from 'app/geometry/Vector';

const ZOOM_STEP = 0.2;
const ZOOM_MIN = 0.2;
const ZOOM_MAX = 4;

const PAN_STEP = 10;

export class Camera {
    private pan = Vector.zero();
    private zoom = 1;

    public panLeft(): void {
        this.pan = this.pan.add(new Vector(PAN_STEP, 0, 0));
    }

    public panRight(): void {
        this.pan = this.pan.subtract(new Vector(PAN_STEP, 0, 0));
    }

    public panUp(): void {
        this.pan = this.pan.add(new Vector(0, 0, PAN_STEP));
    }

    public panDown(): void {
        this.pan = this.pan.subtract(new Vector(0, 0, PAN_STEP));
    }

    public panByVector(vector: Vector): void {
        this.pan = this.pan.add(vector);
    }

    public zoomIn(point: Point): void {
        if (FuzzyMath.lt(this.zoom, ZOOM_MAX)) {
            this.changeZoom(point, ZOOM_STEP);
        }
    }

    public zoomOut(point: Point): void {
        if (FuzzyMath.gt(this.zoom, ZOOM_MIN)) {
            this.changeZoom(point, -ZOOM_STEP);
        }
    }

    private changeZoom(point: Point, dz: number): void {
        const c = point.toVector();
        const z0 = this.zoom;
        const z1 = this.zoom + dz;

        this.pan = this.pan.add(c)
            .scale(z1 / z0)
            .subtract(c);
        this.zoom = z1;
    }

    public apply(point: Point): Point {
        return this.pan.movePoint(point).scale(1 / this.zoom);
    }

    public invert(point: Point): Point {
        return this.pan.negate().movePoint(point.scale(this.zoom));
    }

    public findMouseEvent(event: MouseEvent): Point {
        return this.invert(new Point(event.offsetX, 0, event.offsetY));
    }

    public applyZoom(number: number): number {
        return number / this.zoom;
    }
}
