import { Point } from 'app/geometry/Point';
import { PolygonEdge } from 'app/geometry/PolygonEdge';
import { Vector } from 'app/geometry/Vector';
import { expect } from 'chai';

describe('PolgonEdge', () => {
    describe('#isPointOutside', () => {
        const edge = new PolygonEdge(
            new Point(0, 0, 4),
            new Point(4, 0, 0),
            new Vector(4, 0, 4),
        );

        it('should be true if point is in front of edge', () => {
            expect(edge.isPointOutside(new Point(10, 0, 10))).to.be.true;
        });

        it('should be false if point is behind edge', () => {
            expect(edge.isPointOutside(new Point(0, 0, 0))).to.be.false;
            expect(edge.isPointOutside(new Point(-10, 0, -10))).to.be.false;
        });

        it('should be false if point is on edge', () => {
            expect(edge.isPointOutside(new Point(3, 0, 1))).to.be.false;
        });

        it('should be false if point is the edge midpoint', () => {
            expect(edge.isPointOutside(new Point(2, 0, 2))).to.be.false;
        });
    });
});
