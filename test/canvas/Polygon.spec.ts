import { Point } from 'app/canvas/Point';
import { Polygon } from 'app/canvas/Polygon';
import { Vector } from 'app/canvas/Vector';
import { expect } from 'chai';

describe('Polygon', () => {
    describe('#getClockwiseFaces', () => {
        const topLeft = new Point(-2, 0, 2);
        const topRight = new Point(2, 0, 2);
        const bottomRight = new Point(2, 0, -2);
        const bottomLeft = new Point(-2, 0, -2);

        const topNormal = new Vector(0, 0, 1);
        const rightNormal = new Vector(1, 0, 0);
        const bottomNormal = new Vector(0, 0, -1);
        const leftNormal = new Vector(-1, 0, 0);

        const rectangleAboutOrigin = new Polygon([topLeft, topRight, bottomRight, bottomLeft]);

        it('should provide ordered faces corresponding to each pair of points', () => {
            const faces = rectangleAboutOrigin.getClockwiseFaces();

            expect(faces.length).to.equal(4);

            expect(faces[0].getStart().equals(topLeft)).to.be.true;
            expect(faces[0].getEnd().equals(topRight)).to.be.true;
            expect(faces[0].getNormal().isParallel(topNormal)).to.be.true;

            expect(faces[1].getStart().equals(topRight)).to.be.true;
            expect(faces[1].getEnd().equals(bottomRight)).to.be.true;
            expect(faces[1].getNormal().isParallel(rightNormal)).to.be.true;

            expect(faces[2].getStart().equals(bottomRight)).to.be.true;
            expect(faces[2].getEnd().equals(bottomLeft)).to.be.true;
            expect(faces[2].getNormal().isParallel(bottomNormal)).to.be.true;

            expect(faces[3].getStart().equals(bottomLeft)).to.be.true;
            expect(faces[3].getEnd().equals(topLeft)).to.be.true;
            expect(faces[3].getNormal().isParallel(leftNormal)).to.be.true;
        });
    });

    describe('#containsPoint', () => {
        const topLeft = new Point(-1, 0, 4);
        const topRight = new Point(2, 0, 1);
        const bottomRight = new Point(2, 0, -2);
        const bottomLeft = new Point(-2, 0, -2);

        const quadrangle = new Polygon([topLeft, topRight, bottomRight, bottomLeft]);

        it('should contain all in-bounds points', () => {
            expect(quadrangle.containsPoint(new Point(0, 0, 0))).to.be.true;
            expect(quadrangle.containsPoint(new Point(-2, 0, -2))).to.be.true;
            expect(quadrangle.containsPoint(new Point(-1, 0, -2))).to.be.true;
            expect(quadrangle.containsPoint(new Point(1, 0, 1))).to.be.true;
            expect(quadrangle.containsPoint(new Point(1, 0, 2))).to.be.true;
        });

        it('should exclude all out-of-bounds points', () => {
            expect(quadrangle.containsPoint(new Point(-10, 0, -10))).to.be.false;
            expect(quadrangle.containsPoint(new Point(3, 0, 3))).to.be.false;
            expect(quadrangle.containsPoint(new Point(1.00001, 0, 3.00001))).to.be.false;
        });
    });
});
