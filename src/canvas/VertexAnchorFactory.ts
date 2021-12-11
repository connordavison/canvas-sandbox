import { VertexAnchor } from 'app/canvas/VertexAnchor';
import { PolygonVertex } from 'app/geometry/PolygonVertex';

export class VertexAnchorFactory {
    public createFromVertices(vertices: PolygonVertex[]): VertexAnchor[] {
        return vertices.map((vertex) => new VertexAnchor(vertex));
    }
}
