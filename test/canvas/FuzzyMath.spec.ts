import { FuzzyMath } from 'app/canvas/FuzzyMath';
import { expect } from 'chai';

describe('FuzzyMath', () => {
    it('#acos', () => {
        expect(FuzzyMath.acos(1 + 1E-10)).to.equal(0);
        expect(FuzzyMath.acos(-1 - 1E-10)).to.equal(Math.PI);

        const cosine = Math.cos(3 * Math.PI / 4);

        expect(FuzzyMath.acos(cosine)).to.equal(Math.acos(cosine));
    });

    it('#gt', () => {
        expect(FuzzyMath.gt(-1, 0)).to.be.false;
        expect(FuzzyMath.gt(0, 0)).to.be.false;
        expect(FuzzyMath.gt(1E-10, 0)).to.be.false;
        expect(FuzzyMath.gt(-Infinity, 0)).to.be.false;

        expect(FuzzyMath.gt(1, 0)).to.be.true;
        expect(FuzzyMath.gt(Infinity, 0)).to.be.true;
    });

    it('#gte', () => {
        expect(FuzzyMath.gte(-1, 0)).to.be.false;

        expect(FuzzyMath.gte(1, 0)).to.be.true;
        expect(FuzzyMath.gte(0, 0)).to.be.true;
        expect(FuzzyMath.gte(1E-10, 0)).to.be.true;
        expect(FuzzyMath.gte(-1E-10, 0)).to.be.true;
        expect(FuzzyMath.gte(Infinity, 0)).to.be.true;
        expect(FuzzyMath.gte(-Infinity, 0)).to.be.false;
    });

    it('#lt', () => {
        expect(FuzzyMath.lt(0, 0)).to.be.false;
        expect(FuzzyMath.lt(1, 0)).to.be.false;
        expect(FuzzyMath.lt(1E-10, 0)).to.be.false;
        expect(FuzzyMath.lt(-1E-10, 0)).to.be.false;

        expect(FuzzyMath.lt(-1, 0)).to.be.true;
        expect(FuzzyMath.lt(-Infinity, 0)).to.be.true;
    });

    it('#lte', () => {
        expect(FuzzyMath.lte(1, 0)).to.be.false;
        expect(FuzzyMath.lte(Infinity, 0)).to.be.false;

        expect(FuzzyMath.lte(1E-10, 0)).to.be.true;
        expect(FuzzyMath.lte(-1E-10, 0)).to.be.true;
        expect(FuzzyMath.lte(0, 0)).to.be.true;
        expect(FuzzyMath.lte(-1, 0)).to.be.true;
        expect(FuzzyMath.lte(-Infinity, 0)).to.be.true;
    });
});
