import { RenderingContext } from 'app/canvas/RenderingContext';
import { PolygonPainter } from 'app/canvas/PolygonPainter';
import { Dimensions } from 'app/canvas/Dimensions';
import { CollisionDetector } from 'app/canvas/collision/CollisionDetector';
import { AxisAlignedBoundingBoxFactory } from 'app/canvas/collision/AxisAlignedBoundingBoxFactory';
import { PolygonRepository } from 'app/canvas/PolygonRepository';
import { MoveTransaction } from 'app/canvas/action/MoveTransaction';
import { MouseEventRouter } from 'app/canvas/MouseEventRouter';

const canvas = document.createElement('canvas');

const renderingContext = new RenderingContext(canvas.getContext('2d'));
const polygonPainter = new PolygonPainter(renderingContext);

const aabbFactory = new AxisAlignedBoundingBoxFactory();
const collisionDetector = new CollisionDetector(aabbFactory);
const polygonRepository = new PolygonRepository(collisionDetector);
const moveTransaction = new MoveTransaction(polygonRepository);
const mouseEventRouter = new MouseEventRouter(moveTransaction);

const dimensions = new Dimensions(0, 50, 50);
let topFace = dimensions.createTopFace();
polygonRepository.push(topFace);

document.body.appendChild(canvas);
mouseEventRouter.register(canvas);
renderingContext.fitToScreen();

const ticksPerSecond = 120;
const msPerTick = 1000 / ticksPerSecond;

setInterval(() => {
    for (const polygon of polygonRepository.findAll()) {
        renderingContext.clear();
        polygonPainter.paint(polygon);
    }
}, msPerTick)
