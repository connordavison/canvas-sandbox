import { Polygon } from 'app/canvas/Polygon';
import { RotationAnchor } from 'app/canvas/RotationAnchor';
import { RotationAnchorRepository } from 'app/canvas/RotationAnchorRepository';
import { VertexAnchorRepository } from 'app/canvas/VertexAnchorRepository';

export class PolygonSelector {
    constructor(
        private rotationAnchorRepository: RotationAnchorRepository,
        private vertexAnchorRepository: VertexAnchorRepository,
    ) {}

    public select(polygon: Polygon): void {
        this.rotationAnchorRepository.set(new RotationAnchor(polygon));
        this.vertexAnchorRepository.set(polygon.createVertexAnchors());
    }

    public clear(): void {
        this.rotationAnchorRepository.clear();
        this.vertexAnchorRepository.clear();
    }
}
