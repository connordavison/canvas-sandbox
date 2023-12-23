import { Camera } from 'app/canvas/Camera';
import { LayerPainter } from 'app/canvas/LayerPainter';
import { RenderingContext } from 'app/canvas/RenderingContext';

export class WorldPainter {
    constructor(
        private context: RenderingContext,
        private camera: Camera,
        private layerPainters: LayerPainter[],
    ) {}

    public paint(): void {
        this.context.clear();
        this.context.save();
        this.context.setTransform(this.camera.toMatrix());

        for (const painter of this.layerPainters) {
            painter.paint();
        }

        this.context.restore();
    }
}
