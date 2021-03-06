import { Point } from 'app/canvas/Point';
import { Vector } from 'app/canvas/Vector';
import { Matrix } from 'app/canvas/Matrix';
import { ConvexPolygonFace } from 'app/canvas/ConvexPolygonFace';
import { PolygonProjection } from 'app/canvas/collision/PolygonProjection';
import { VertexAnchor } from 'app/canvas/VertexAnchor';
import { AxisAlignedBoundingBox } from 'app/canvas/collision/AxisAlignedBoundingBox';

type PointPredicate = (point: Point) => boolean;

export class Polygon {
    constructor(private points: Point[]) {}

    /**
     * Assumes that polygon is convex and constructed clockwise
     */
    public containsPoint(point: Point): boolean {
        const faces = this.getClockwiseFaces();

        if (faces.length < 3) {
            throw 'Invalid polygon';
        }

        for (const face of this.getClockwiseFaces()) {
            if (face.isPointOutside(point)) {
                return false;
            }
        }

        return true;
    }

    public getFirstClockwiseFace(): ConvexPolygonFace {
        const faces = this.getClockwiseFaces();

        if (faces.length === 0) {
            throw 'Invalid polygon';
        }

        return faces[0];
    }

    public getClockwiseFaces(): ConvexPolygonFace[] {
        const faces = [];
        const n = this.points.length;

        for (let i = 0; i < n; i++) {
            const a = this.points[i];
            const b = this.points[(i + 1) % n];

            faces.push(
                new ConvexPolygonFace(
                    a,
                    b,
                    a.vectorTo(b).leftPerpendicularXZ(),
                ),
            );
        }

        return faces;
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

    public createVertexAnchors(): VertexAnchor[] {
        const anchors = [];

        for (let i = 0; i < this.points.length; i++) {
            anchors.push(new VertexAnchor(this, i));
        }

        return anchors;
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
