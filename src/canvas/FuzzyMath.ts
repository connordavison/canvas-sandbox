const EPSILON = 1E-8;

export class FuzzyMath {
    public static acos(cosine: number): number {
        return Math.acos(FuzzyMath.clampStrict(cosine, -1, 1));
    }

    public static clampStrict(value: number, min: number, max: number): number {
        if (FuzzyMath.gt(value, max)
            || FuzzyMath.lt(value, min)
        ) {
            throw RangeError(`Value ${value} not between ${min} and ${max}`);
        }

        return FuzzyMath.clamp(value, min, max);
    }

    public static clamp(value: number, min: number, max: number): number {
        if (FuzzyMath.lte(value, min)) {
            value = min;
        } else if (FuzzyMath.gte(value, max)) {
            value = max;
        }

        return value;
    }

    public static eq(a: number, b: number): boolean {
        return Math.abs(b - a) < EPSILON;
    }

    public static gt(a: number, b: number): boolean {
        return a > b + EPSILON;
    }

    public static gte(a: number, b: number): boolean {
        return a > b - EPSILON;
    }

    public static lt(a: number, b: number): boolean {
        return a < b - EPSILON;
    }

    public static lte(a: number, b: number): boolean {
        return a < b + EPSILON;
    }
}
