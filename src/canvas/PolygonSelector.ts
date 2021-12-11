import { RotationAnchorRepository } from 'app/canvas/RotationAnchorRepository';
import { VertexAnchorFactory } from 'app/canvas/VertexAnchorFactory';
import { VertexAnchorRepository } from 'app/canvas/VertexAnchorRepository';
import { Polygon } from 'app/geometry/Polygon';

export class PolygonSelector {
    constructor(
        private rotationAnchorRepository: RotationAnchorRepository,
        private vertexAnchorFactory: VertexAnchorFactory,
        private vertexAnchorRepository: VertexAnchorRepository,
    ) {}

    public select(polygon: Polygon): void {
        this.rotationAnchorRepository.create(polygon);
        this.vertexAnchorRepository.set(
            this.vertexAnchorFactory.createFromVertices(polygon.getVertices()),
        );
    }

    public clear(): void {
        this.rotationAnchorRepository.clear();
        this.vertexAnchorRepository.clear();
    }
}
