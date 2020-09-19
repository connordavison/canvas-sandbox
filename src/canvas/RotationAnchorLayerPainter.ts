import { LayerPainter } from 'app/canvas/LayerPainter';
import { RotationAnchorPainter } from 'app/canvas/RotationAnchorPainter';
import { RotationAnchorRepository } from 'app/canvas/RotationAnchorRepository';

export class RotationAnchorLayerPainter implements LayerPainter {
    constructor(
        private repository: RotationAnchorRepository,
        private painter: RotationAnchorPainter,
    ) {}

    public paint(): void {
        const anchor = this.repository.get();

        if (anchor) {
            this.painter.paint(anchor);
        }
    }
}
