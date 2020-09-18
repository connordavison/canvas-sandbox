import { PolygonProjection } from 'app/canvas/collision/PolygonProjection';
import { expect } from 'chai';

describe('PolygonProjection', () => {
    describe('#getOverlap', () => {
        it('should handle partial overlaps', () => {
            const left = new PolygonProjection(-5, 2);
            const right = new PolygonProjection(-1, 7);

            expect(left.getOverlap(right)).to.equal(3);
            expect(right.getOverlap(left)).to.equal(3);
        });

        it('should handle complete overlaps', () => {
            const projection = new PolygonProjection(-8, 4);
            const subprojection = new PolygonProjection(-3, 0);

            expect(projection.getOverlap(subprojection)).to.equal(3);
            expect(subprojection.getOverlap(projection)).to.equal(3);
        });
    });

    describe('#reject', () => {
        const tests = [
            { source: new PolygonProjection(2, 7), target: new PolygonProjection(5, 9), expected: 2 },
            { source: new PolygonProjection(2, 9), target: new PolygonProjection(6, 8), expected: 3 },
            { source: new PolygonProjection(6, 9), target: new PolygonProjection(2, 7), expected: -1 },
            { source: new PolygonProjection(2, 9), target: new PolygonProjection(3, 5), expected: -3 },
            { source: new PolygonProjection(3, 5), target: new PolygonProjection(2, 9), expected: 3 },
            { source: new PolygonProjection(7, 10), target: new PolygonProjection(2, 11), expected: -4 },
            { source: new PolygonProjection(-11, -5), target: new PolygonProjection(-7, -4), expected: 2 },
            { source: new PolygonProjection(0, -5), target: new PolygonProjection(0, 5), expected: 0 },
            { source: new PolygonProjection(-2, -5), target: new PolygonProjection(3, 5), expected: 0 },
        ];

        it('should provide the minimal shift to target required to prevent overlap with source', () => {
            for (const { source, target, expected } of tests) {
                expect(source.reject(target)).to.equal(expected);
            }
        });
    });
});
