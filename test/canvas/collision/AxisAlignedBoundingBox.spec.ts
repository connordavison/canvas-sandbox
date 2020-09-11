import { AxisAlignedBoundingBox } from 'app/canvas/collision/AxisAlignedBoundingBox';
import { Point } from 'app/canvas/Point';
import { expect } from 'chai';

describe('AxisAlignedBoundingBox', () => {
    describe('fully-bounded box', () => {
        const box = new AxisAlignedBoundingBox(
            new Point(-10, -10, -10),
            new Point(10, 10, 10),
        );

        it('should contain points within it', () => {
            expect(box.hasPoint(new Point(0, 0, 0))).to.be.true;
            expect(box.hasPoint(new Point(5, 5, -5))).to.be.true;
            expect(box.hasPoint(new Point(-8.5, 1.5, 8.5))).to.be.true;
            expect(box.hasPoint(new Point(-9, -9, -9))).to.be.true;
        });

        it('should contain boundary points', () => {
            expect(box.hasPoint(new Point(10, 10, 10))).to.be.true;
            expect(box.hasPoint(new Point(-10, -10, -10))).to.be.true;
            expect(box.hasPoint(new Point(10, 0, -10))).to.be.true;
        });

        it('should not contain points outside of it', () => {
            expect(box.hasPoint(new Point(15, 0, 0))).to.be.false;
            expect(box.hasPoint(new Point(0, -15, 0))).to.be.false;
            expect(box.hasPoint(new Point(0, 0, 15))).to.be.false;
            expect(box.hasPoint(new Point(Infinity, Infinity, Infinity))).to.be.false;
            expect(box.hasPoint(new Point(-Infinity, -Infinity, -Infinity))).to.be.false;
        });
    });

    describe('unbounded box', () => {
        const box = new AxisAlignedBoundingBox(
            new Point(-Infinity, -Infinity, -Infinity),
            new Point(Infinity, Infinity, Infinity),
        );

        it('should contain all points', () => {
            expect(box.hasPoint(new Point(0, 0, 0))).to.be.true;
            expect(box.hasPoint(new Point(-Infinity, -Infinity, -Infinity))).to.be.true;
            expect(box.hasPoint(new Point(Infinity, Infinity, Infinity))).to.be.true;
        });
    });
});
