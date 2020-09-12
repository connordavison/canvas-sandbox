import { LayerPainter } from 'app/canvas/LayerPainter';
import { RotationAnchorPainter } from 'app/canvas/RotationAnchorPainter';
import { RotationAnchorRepository } from 'app/canvas/RotationAnchorRepository';

export class RotationAnchorLayerPainter implements LayerPainter {
    constructor(
        private repository: RotationAnchorRepository,
        private painter: RotationAnchorPainter,
    ) {}

    public paint(): void {
        for (const anchor of this.repository.findAll()) {
            this.painter.paint(anchor);
        }
    }
}
