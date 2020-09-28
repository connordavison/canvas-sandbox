import { TreeSearcher } from 'app/canvas/tree/TreeSearcher';
import { Matrix } from 'app/canvas/Matrix';
import { Polygon } from 'app/canvas/Polygon';
import { Vector } from 'app/canvas/Vector';
import { PolygonCollisionDetector } from 'app/canvas/PolygonCollisionDetector';
import { PolygonMoveCollisionTree } from 'app/canvas/PolygonMoveCollisionTree';

export class PolygonMover {
    constructor(
        private polygonCollisionDetector: PolygonCollisionDetector,
    ) {}

    public shift(polygon: Polygon, vector: Vector): Vector {
        const searcher = new TreeSearcher<PolygonMoveCollisionTree>();

        const minimalLeaf = searcher.findMinimalLeaf(
            new PolygonMoveCollisionTree(
                vector,
                vector,
                polygon,
                this.polygonCollisionDetector,
            ),
            5,
        );

        const shift = minimalLeaf?.getShift() ?? Vector.zero();

        polygon.shift(shift);

        return shift;
    }

    public rotate(polygon: Polygon, angle: number): void {
        const matrix = Matrix.rotateXZ(angle);
        const projectedPolygon = polygon.projectTransform(matrix);
        const collisions = this.polygonCollisionDetector.findCollisions(projectedPolygon, [polygon]);

        if (collisions.length === 0) {
            polygon.transform(matrix);
        }
    }
}
