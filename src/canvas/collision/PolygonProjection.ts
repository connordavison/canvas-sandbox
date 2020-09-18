export class PolygonProjection {
    constructor(private start: number, private end: number) {}

    public getOverlap(other: PolygonProjection): number {
        return Math.min(this.end, other.end) - Math.max(this.start, other.start);
    }

    public reject(other: PolygonProjection): number {
        if (this.isSeparateFrom(other)) {
            return 0;
        }

        const leftShift = this.start - other.end;
        const rightShift = this.end - other.start;

        if (Math.abs(leftShift) < Math.abs(rightShift)) {
            return leftShift;
        } else {
            return rightShift;
        }
    }

    public isSeparateFrom(other: PolygonProjection): boolean {
        return this.end < other.start || other.end < this.start;
    }
}
