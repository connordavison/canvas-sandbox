import { AxisAlignedBoundingBox } from 'app/geometry/collision/AxisAlignedBoundingBox';
import { PolygonProjection } from 'app/geometry/collision/PolygonProjection';
import { Matrix } from 'app/geometry/Matrix';
import { Point } from 'app/geometry/Point';
import { PolygonEdge } from 'app/geometry/PolygonEdge';
import { PolygonVertex } from 'app/geometry/PolygonVertex';
import { Vector } from 'app/geometry/Vector';

type PointPredicate = (point: Point) => boolean;

export class Polygon {
    constructor(private points: Point[]) {}

    /**
     * Assumes that polygon is convex and constructed clockwise
     */
    public containsPoint(point: Point): boolean {
        const edges = this.getClockwiseEdges();

        if (edges.length < 3) {
            throw 'Invalid polygon';
        }

        for (const edge of edges) {
            if (edge.isPointOutside(point)) {
                return false;
            }
        }

        return true;
    }

    public getFirstClockwiseEdge(): PolygonEdge {
        const edges = this.getClockwiseEdges();

        if (edges.length === 0) {
            throw 'Invalid polygon';
        }

        return edges[0];
    }

    public getClockwiseEdges(): PolygonEdge[] {
        const edges = [];
        const n = this.points.length;

        for (let i = 0; i < n; i++) {
            const a = this.points[i];
            const b = this.points[(i + 1) % n];

            edges.push(
                new PolygonEdge(
                    a,
                    b,
                    a.vectorTo(b).leftPerpendicularXZ(),
                ),
            );
        }

        return edges;
    }

    public getBoundingBox(): AxisAlignedBoundingBox {
        let minX = Infinity;
        let minY = Infinity;
        let minZ = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;
        let maxZ = -Infinity;

        for (const point of this.points) {
            if (point.getX() < minX) {
                minX = point.getX();
            }

            if (point.getY() < minY) {
                minY = point.getY();
            }

            if (point.getZ() < minZ) {
                minZ = point.getZ();
            }

            if (point.getX() > maxX) {
                maxX = point.getX();
            }

            if (point.getY() > maxY) {
                maxY = point.getY();
            }

            if (point.getZ() > maxZ) {
                maxZ = point.getZ();
            }
        }

        return new AxisAlignedBoundingBox(
            new Point(minX, minY, minZ),
            new Point(maxX, maxY, maxZ),
        );
    }

    public getVertices(): PolygonVertex[] {
        const vertices = [];

        for (let i = 0; i < this.points.length; i++) {
            vertices.push(new PolygonVertex(this, i));
        }

        return vertices;
    }

    public getPoints(): Point[] {
        return this.points;
    }

    public projectOnto(vector: Vector): PolygonProjection {
        let start = Infinity;
        let end = -Infinity;

        for (const point of this.points) {
            const projection = point.toVector().dot(vector);

            if (projection < start) {
                start = projection;
            }

            if (projection > end) {
                end = projection;
            }
        }

        return new PolygonProjection(start, end);
    }

    public getCenter(): Point {
        let sum = new Vector(0, 0, 0);

        for (const point of this.points) {
            sum = sum.add(point.toVector());
        }

        return sum.divide(this.points.length).toPoint();
    }

    public shift(vector: Vector): void {
        this.points = this.points.map((point) => vector.movePoint(point));
    }

    public projectShift(vector: Vector): Polygon {
        return new Polygon(this.points.map((point) => vector.movePoint(point)));
    }

    public some(predicate: PointPredicate): boolean {
        return this.points.some(predicate);
    }

    public getStart(): Point {
        return this.points[0];
    }

    public getTail(): Point[] {
        return this.points.slice(1);
    }

    public transform(matrix: Matrix): void {
        this.points = this.getPointsUnderTransformation(matrix);
    }

    public projectTransform(matrix: Matrix): Polygon {
        return new Polygon(this.getPointsUnderTransformation(matrix));
    }

    private getPointsUnderTransformation(matrix: Matrix): Point[] {
        const center = this.getCenter();

        return this.points.map((point) => {
            return matrix.applyToPoint(point.relativeTo(center))
                .toVector()
                .movePoint(center);
        });
    }

    public movePoint(id: number, vector: Vector): void {
        if (this.points[id]) {
            this.points[id] = vector.movePoint(this.points[id]);
        } else {
            throw 'Target point not a vertex of polygon';
        }
    }

    public clone(): Polygon {
        return new Polygon(this.points);
    }
}
