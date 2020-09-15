import { Matrix } from 'app/canvas/Matrix';
import { Point } from 'app/canvas/Point';
import { Polygon } from 'app/canvas/Polygon';
import { Vector } from 'app/canvas/Vector';

export class RandomPolygonSpawner {
    public spawnMany(number: number): Polygon[] {
        const polygons = [];

        for (let i = 0; i < number; i++) {
            polygons.push(this.spawn());
        }

        return polygons;
    }

    public spawn(): Polygon {
        const sides = Random.integer(3, 8);
        const radius = Random.integer(20, 70);
        const vertices = [];

        for (let i = 0; i < sides; i++) {
            const vertex = this.spawnVertex(radius, i * 2 * Math.PI / sides);

            vertices.push(vertex);
        }

        const polygon = new Polygon(vertices);

        polygon.transform(
            Matrix.rotateXZ(Random.angle()),
            new Point(0, 0, 0)
        );

        polygon.shift(
            new Vector(
                Random.integer(0, 2000),
                0,
                Random.integer(0, 1000),
            ),
        );


        return polygon;
    }

    private spawnVertex(radius: number, angle: number): Point {
        return Matrix.rotateXZ(-angle)
            .applyToPoint(new Point(0, 0, radius));

    }
}

class Random {
    public static angle(): number {
        return 2 * Math.PI * Math.random();
    }

    public static integer(min: number, max: number): number {
        return min + Math.floor(Math.random() * Math.floor(max - min));
    }
}
