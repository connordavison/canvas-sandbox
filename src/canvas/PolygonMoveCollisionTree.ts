import { FuzzyMath } from 'app/canvas/FuzzyMath';
import { Polygon } from 'app/canvas/Polygon';
import { PolygonCollisionDetector } from 'app/canvas/PolygonCollisionDetector';
import { Tree } from 'app/canvas/tree/Tree';
import { Vector } from 'app/canvas/Vector';

export class PolygonMoveCollisionTree implements Tree<PolygonMoveCollisionTree> {
    constructor(
        private targetShift: Vector,
        private currentShift: Vector,
        private polygon: Polygon,
        private polygonCollisionDetector: PolygonCollisionDetector,
    ) {}

    public getShift(): Vector {
        return this.currentShift;
    }

    public getChildren(): PolygonMoveCollisionTree[] {
        const projectedPolygon = this.polygon.projectShift(this.currentShift);

        return this.polygonCollisionDetector.findCollisions(projectedPolygon, [this.polygon])
            .map((collision) => {
                return new PolygonMoveCollisionTree(
                    this.targetShift,
                    this.currentShift.add(collision.getRejection()),
                    this.polygon,
                    this.polygonCollisionDetector,
                );
            });
    }

    public isLessThan(node: PolygonMoveCollisionTree): boolean {
        return FuzzyMath.lt(this.getDistanceFromTarget(), node.getDistanceFromTarget());
    }

    private getDistanceFromTarget(): number {
        return this.targetShift.subtract(this.currentShift).lengthSquared();
    }
}
