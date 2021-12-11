import { AxisAlignedBoundingBox } from 'app/geometry/collision/AxisAlignedBoundingBox';
import { Dimensions } from 'app/geometry/Dimensions';
import { Point } from 'app/geometry/Point';
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

        it('should know its center point', () => {
            expect(box.getCenter().equals(new Point(0, 0, 0))).to.be.true;
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

    describe('#createAboutPoint', () => {
        const point = new Point(0, 0, 0);
        const dimensions = new Dimensions(100, 40, 80);

        const box = AxisAlignedBoundingBox.createAboutPoint(point, dimensions);

        it('should have in-bound points', () => {
            const inBoundPoints = [
                new Point(0, 0, 0),
                new Point(50, 20, 40),
                new Point(-50, -20, -40),
                new Point(-10, 5, 5),
            ];

            for (const point of inBoundPoints) {
                expect(box.hasPoint(point), point.toString()).to.be.true;
            }
        })
    });
});
