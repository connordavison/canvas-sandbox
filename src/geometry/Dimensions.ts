import { Face } from 'app/geometry/Face';
import { Point } from 'app/geometry/Point';
import { Polygon } from 'app/geometry/Polygon';
import { Vector } from 'app/geometry/Vector';

export class Dimensions {
    constructor(private width: number, private height: number, private depth: number) {}

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

    public getDepth(): number {
        return this.depth;
    }

    public createTopFace(): Face {
        return new Polygon([
            new Point(0, this.height, 0),
            new Point(0, this.height, this.depth),
            new Point(this.width, this.height, this.depth),
            new Point(this.width, this.height, 0),
        ]);
    }

    public toVector(): Vector {
        return new Vector(this.width, this.height, this.depth);
    }
}
