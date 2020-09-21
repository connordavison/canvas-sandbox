import { ConvexPolygonFace } from 'app/canvas/ConvexPolygonFace';
import { Point } from 'app/canvas/Point';
import { Vector } from 'app/canvas/Vector';
import { expect } from 'chai';

describe('ConvexPolygonFace', () => {
    describe('#isPointOutside', () => {
        const face = new ConvexPolygonFace(
            new Point(0, 0, 4),
            new Point(4, 0, 0),
            new Vector(4, 0, 4),
        );

        it('should be true if point is in front of face', () => {
            expect(face.isPointOutside(new Point(10, 0, 10))).to.be.true;
        });

        it('should be false if point is behind face', () => {
            expect(face.isPointOutside(new Point(0, 0, 0))).to.be.false;
            expect(face.isPointOutside(new Point(-10, 0, -10))).to.be.false;
        });

        it('should be false if point is on face', () => {
            expect(face.isPointOutside(new Point(3, 0, 1))).to.be.false;
        });

        it('should be false if point is the face midpoint', () => {
            expect(face.isPointOutside(new Point(2, 0, 2))).to.be.false;
        });
    });
});
