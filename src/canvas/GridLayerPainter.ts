import { Camera } from 'app/canvas/Camera';
import { RenderingContext } from 'app/canvas/RenderingContext';
import { Point } from 'app/geometry/Point';

const WIDTH = 500;
const SUBDIVISIONS = 10;

export class GridLayerPainter {
    private readonly pattern: CanvasPattern;

    constructor(
        private readonly context: RenderingContext,
        private readonly camera: Camera,
    ) {
        this.pattern = context.createPattern(this.createPattern(WIDTH, SUBDIVISIONS), 'repeat');
    }

    public paint(): void {
        this.context.save();
        this.context.setFillStyle(this.pattern);
        const { width, height } = this.context.getDimensions();
        const min = this.camera.invert(new Point(0, 0, 0));
        const max = this.camera.invert(new Point(width, 0, height));
        this.context.fillRect(min, max);
        this.context.restore();
    }

    private createPattern(size: number, subdivisions: number) {
        const canvas = document.createElement('canvas');
        const context = new RenderingContext(canvas.getContext('2d'));

        canvas.width = size;
        canvas.height = size;

        context.setStrokeStyle('#EEE');
        this.renderGrid(context, size, size / subdivisions);
        context.setStrokeStyle('#CCC');
        this.renderGrid(context, size, size);

        return canvas;
    }

    private renderGrid(context: RenderingContext, size: number, ds: number): void {
        for (let x = 0; x <= size; x += ds) {
            context.strokeLine(new Point(x, 0, 0), new Point(x, 0, size));

            for (let z = 0; z <= size; z += ds) {
                context.strokeLine(new Point(0, 0, z), new Point(size, 0, z));
            }
        }
    }
}
