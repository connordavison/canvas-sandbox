import { LayerPainter } from 'app/canvas/LayerPainter';
import { VertexAnchorPainter } from 'app/canvas/VertexAnchorPainter';
import { VertexAnchorRepository } from 'app/canvas/VertexAnchorRepository';

export class VertexAnchorLayerPainter implements LayerPainter {
    constructor(
        private repository: VertexAnchorRepository,
        private painter: VertexAnchorPainter,
    ) {}

    public paint(): void {
        for (const anchor of this.repository.findAll()) {
            this.painter.paint(anchor);
        }
    }
}
