import { Point } from 'app/canvas/Point';
import { RenderingContext } from 'app/canvas/RenderingContext';

const INTERVAL_X = 25;
const INTERVAL_Z = 25;

export class GridLayerPainter {
    constructor(private context: RenderingContext) {}

    public paint(): void {
        const dimensions = this.context.getDimensions();
        const width = dimensions.getWidth();
        const depth = dimensions.getDepth();

        this.context.setStrokeStyle('#EEE');

        for (let x = INTERVAL_X; x < dimensions.getWidth(); x += INTERVAL_X) {
            this.strokeVertical(x, depth);
            for (let z = INTERVAL_Z; z < dimensions.getDepth(); z+= INTERVAL_Z) {
                this.strokeHorizontal(z, width);
            }
        }
    }

    private strokeHorizontal(z: number, width: number): void {
        this.context.strokeLine(
            new Point(0, 0, z),
            new Point(width, 0, z),
        );
    }

    private strokeVertical(x: number, depth: number): void {
        this.context.strokeLine(
            new Point(x, 0, 0),
            new Point(x, 0, depth),
        );
    }
}
