import { Polygon } from 'app/canvas/Polygon';
import { RotationAnchor } from 'app/canvas/RotationAnchor';
import { RotationAnchorRepository } from 'app/canvas/RotationAnchorRepository';

export class PolygonSelector {
    constructor(private rotationAnchorRepository: RotationAnchorRepository) {}

    public select(polygon: Polygon): void {
        this.rotationAnchorRepository.set(new RotationAnchor(polygon));
    }

    public clear(): void {
        this.rotationAnchorRepository.clear();
    }
}
