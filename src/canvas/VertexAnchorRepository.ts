import { VertexAnchor } from 'app/canvas/VertexAnchor';
import { Point } from 'app/geometry/Point';

export class VertexAnchorRepository {
    private anchors: VertexAnchor[] = [];

    public set(anchors: VertexAnchor[]): void {
        this.anchors = anchors;
    }

    public findAll(): VertexAnchor[] {
        return this.anchors;
    }

    public findAtPoint(point: Point): VertexAnchor {
        return this.anchors.find((anchor) => anchor.isPointOnAnchor(point));
    }

    public clear(): void {
        this.anchors.length = 0;
    }
}
