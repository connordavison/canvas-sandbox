import { Polygon } from 'app/canvas/Polygon';
import { Point } from 'app/canvas/Point';
import { PolyhedronFace } from 'app/canvas/PolyhedronFace';
import { Vector } from 'app/canvas/Vector';

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

    public createTopFace(): PolyhedronFace {
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
