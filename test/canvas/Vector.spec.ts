import { Vector } from 'app/canvas/Vector';
import { expect } from 'chai';

describe('Vector', () => {
    describe('#signedAngleXZ', () => {
        const vectors = [
            { a: new Vector(10, 0, 0), b: new Vector(0, 0, 10), expected: Math.PI / 2 },
            { a: new Vector(10, 0, 0), b: new Vector(0, 0, -10), expected: -Math.PI / 2 },
            {
                a: new Vector(10, 0, 0),
                b: new Vector(5 * Math.SQRT2, 0, -5 * Math.SQRT2),
                expected: -Math.PI / 4,
            },
        ];

        it('should yield angles within -π and π', () => {
            vectors.forEach(({a, b, expected}) => {
                expect(a.signedAngleXZ(b)).to.equal(expected);
            });
        });
    });
});
