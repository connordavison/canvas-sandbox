import { AxisAlignedBoundingBoxFactory } from 'app/canvas/collision/AxisAlignedBoundingBoxFactory';
import { Dimensions } from 'app/canvas/Dimensions';
import { Point } from 'app/canvas/Point';
import { expect } from 'chai';

describe('AxisAlignedBoundingBoxFactory', () => {
    const boxFactory = new AxisAlignedBoundingBoxFactory();

    describe('#createByPoints', () => {
        const points = [
            new Point(5, 0, 5),
            new Point(10, 5, 15),
            new Point(0, -5, -5),
            new Point(-5, -10, -15),
        ];

        const box = boxFactory.create(points);

        it('should have in-bound points', () => {
            const inBoundPoints = [
                new Point(10, 5, 15),
                new Point(0, 0, 0),
                new Point(-5, -10, -15),
                new Point(0, 0, 0),
            ];

            for (const point of inBoundPoints) {
                expect(box.hasPoint(point), point.toString()).to.be.true;
            }
        });

        it('should not have out-of-bound points', () => {
            const outOfBoundPoints = [
                new Point(-5, -10, -16),
                new Point(-Infinity, 0, 0),
                new Point(0, 1337, 0),
                new Point(1E15, 1E16, 1E17),
            ];

            for (const point of outOfBoundPoints) {
                expect(box.hasPoint(point), point.toString()).to.be.false;
            }
        });
    });

    describe('#createAboutPoint', () => {
        const point = new Point(0, 0, 0);
        const dimensions = new Dimensions(100, 40, 80);

        const box = boxFactory.createAboutPoint(point, dimensions);

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
