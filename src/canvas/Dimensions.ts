import { Polygon } from 'app/canvas/Polygon';
import { Point } from 'app/canvas/Point';
import { PolyhedronFace } from 'app/canvas/PolyhedronFace';

export class Dimensions {
    constructor(private height: number, private width: number, private depth: number) {}

    public getHeight(): number {
        return this.height;
    }

    public getWidth(): number {
        return this.width;
    }

    public getDepth(): number {
        return this.depth;
    }

    public createTopFace(): PolyhedronFace {
        return new Polygon([
            new Point(0, this.height, 0),
            new Point(this.width, this.height, 0),
            new Point(this.width, this.height, this.depth),
            new Point(0, this.height, this.depth),
        ]);
    }
}
