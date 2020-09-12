import { RenderingContext } from 'app/canvas/RenderingContext';
import { PolygonPainter } from 'app/canvas/PolygonPainter';
import { Dimensions } from 'app/canvas/Dimensions';
import { CollisionDetector } from 'app/canvas/collision/CollisionDetector';
import { AxisAlignedBoundingBoxFactory } from 'app/canvas/collision/AxisAlignedBoundingBoxFactory';
import { PolygonRepository } from 'app/canvas/PolygonRepository';
import { PolygonDragTransaction } from 'app/canvas/action/PolygonDragTransaction';
import { MouseEventRouter } from 'app/canvas/MouseEventRouter';
import { RotationAnchorRepository } from 'app/canvas/RotationAnchorRepository';
import { RotationAnchorPainter } from 'app/canvas/RotationAnchorPainter';
import { PolygonFactory } from 'app/canvas/PolygonFactory';
import { RotationAnchor } from 'app/canvas/RotationAnchor';
import { Point } from 'app/canvas/Point';
import { RotationAnchorDragTransaction } from 'app/canvas/action/RotationAnchorDragTransaction';
import { PolygonCentroidCalculator } from 'app/canvas/PolygonCentroidCalculator';
import { Vector } from 'app/canvas/Vector';
import { GridLayerPainter } from 'app/canvas/GridLayerPainter';

const canvas = document.createElement('canvas');

const renderingContext = new RenderingContext(canvas.getContext('2d'));
const gridLayerPainter = new GridLayerPainter(renderingContext);
const polygonPainter = new PolygonPainter(renderingContext);

const aabbFactory = new AxisAlignedBoundingBoxFactory();
const collisionDetector = new CollisionDetector(aabbFactory);
const polygonRepository = new PolygonRepository(collisionDetector);
const polygonDragTransaction = new PolygonDragTransaction(polygonRepository);

const rotationAnchorRepository = new RotationAnchorRepository(
    collisionDetector,
    new Dimensions(15, 0, 15),
);
const polygonFactory = new PolygonFactory();
const rotationAnchorPainter = new RotationAnchorPainter(
    polygonFactory,
    polygonPainter,
);

const polygonCentroidCalculator = new PolygonCentroidCalculator(aabbFactory);
const rotationAnchorDragTransaction = new RotationAnchorDragTransaction(
    polygonCentroidCalculator,
    rotationAnchorRepository,
);

const dimensions = new Dimensions(50, 0, 50);
const topFace = dimensions.createTopFace();
topFace.shift(new Vector(125, 0, 75))
polygonRepository.push(topFace);

rotationAnchorRepository.push(
    new RotationAnchor(new Point(100, 0, 100), topFace)
);

document.body.appendChild(canvas);

const mouseEventRouter = new MouseEventRouter([polygonDragTransaction, rotationAnchorDragTransaction]);

mouseEventRouter.register(canvas);
renderingContext.fitToScreen();

const ticksPerSecond = 50;
const msPerTick = 1000 / ticksPerSecond;

setInterval(() => {
    renderingContext.clear();

    gridLayerPainter.paint();

    for (const polygon of polygonRepository.findAll()) {
        polygonPainter.paint(polygon);
    }

    for (const rotationAnchor of rotationAnchorRepository.findAll()) {
        rotationAnchorPainter.paint(rotationAnchor);
    }
}, msPerTick)
