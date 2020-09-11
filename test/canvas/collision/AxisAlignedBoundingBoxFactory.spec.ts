import { AxisAlignedBoundingBoxFactory } from 'app/canvas/collision/AxisAlignedBoundingBoxFactory';
import { Point } from 'app/canvas/Point';
import { expect } from 'chai';

describe('AxisAlignedBoundingBoxFactory', () => {
    const boxFactory = new AxisAlignedBoundingBoxFactory();

    const points = [
        new Point(5, 0, 5),
        new Point(10, 5, 15),
        new Point(0, -5, -5),
        new Point(-5, -10, -15),
    ];

    const box = boxFactory.create(points);

    it('should have in-bound points', () => {
        expect(box.hasPoint(new Point(10, 5, 15))).to.be.true;
        expect(box.hasPoint(new Point(0, 0, 0))).to.be.true;
        expect(box.hasPoint(new Point(-5, -10, -15))).to.be.true;
        expect(box.hasPoint(new Point(0, 0, 0))).to.be.true;
    });

    it('should not have out-of-bound points', () => {
        expect(box.hasPoint(new Point(-5, -10, -16))).to.be.false;
        expect(box.hasPoint(new Point(-Infinity, 0, 0))).to.be.false;
        expect(box.hasPoint(new Point(0, 1337, 0))).to.be.false;
        expect(box.hasPoint(new Point(1E15, 1E16, 1E17))).to.be.false;
    });
});
