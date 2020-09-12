import { Point } from 'app/canvas/Point';
import { RenderingContext } from 'app/canvas/RenderingContext';

const MINOR_INTERVAL = 25;
const MAJOR_INTERVAL = 250;

export class GridLayerPainter {
    constructor(private context: RenderingContext) {}

    public paint(): void {
        this.context.setStrokeStyle('#EEE');
        this.strokeInterval(MINOR_INTERVAL);
        this.context.setStrokeStyle('#CCC');
        this.strokeInterval(MAJOR_INTERVAL);
    }

    private strokeInterval(interval: number) {
        const dimensions = this.context.getDimensions();
        const width = dimensions.getWidth();
        const depth = dimensions.getDepth();

        for (let x = interval; x < dimensions.getWidth(); x += interval) {
            this.strokeVertical(x, depth);
            for (let z = interval; z < dimensions.getDepth(); z+= interval) {
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
