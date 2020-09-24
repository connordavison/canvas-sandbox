import { Polygon } from 'app/canvas/Polygon';
import { RotationAnchorRepository } from 'app/canvas/RotationAnchorRepository';
import { VertexAnchorRepository } from 'app/canvas/VertexAnchorRepository';

export class PolygonSelector {
    constructor(
        private rotationAnchorRepository: RotationAnchorRepository,
        private vertexAnchorRepository: VertexAnchorRepository,
    ) {}

    public select(polygon: Polygon): void {
        this.rotationAnchorRepository.create(polygon);
        this.vertexAnchorRepository.set(polygon.createVertexAnchors());
    }

    public clear(): void {
        this.rotationAnchorRepository.clear();
        this.vertexAnchorRepository.clear();
    }
}
