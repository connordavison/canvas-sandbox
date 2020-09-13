import { Matrix } from 'app/canvas/Matrix';
import { Point } from 'app/canvas/Point';
import { Polygon } from 'app/canvas/Polygon';
import { Vector } from 'app/canvas/Vector';

export class RotationAnchor {
    constructor(
        private offset: Vector,
        private target: Polygon,
    ) {}

    public getRadius(): number {
        return 5;
    }

    public getOffset(): Vector {
        return this.offset;
    }

    public getAbsolutePosition(origin: Point): Point {
        return this.offset.movePoint(origin);
    }

    public getTarget(): Polygon {
        return this.target;
    }

    public rotateAngleAboutPoint(angle: number, point: Point): void {
        const rotation = Matrix.rotateXZ(angle);

        this.target.transform(rotation, point);
        this.offset = rotation.applyToVector(this.offset);
    }
}
