import { RenderingContext } from 'app/canvas/RenderingContext';
import { PolygonPainter } from 'app/canvas/PolygonPainter';
import { Dimensions } from 'app/canvas/Dimensions';
import { CollisionDetector } from 'app/canvas/collision/CollisionDetector';
import { AxisAlignedBoundingBoxFactory } from 'app/canvas/collision/AxisAlignedBoundingBoxFactory';
import { PolygonRepository } from 'app/canvas/PolygonRepository';
import { PolygonDragListener } from 'app/canvas/PolygonDragListener';
import { MouseEventRouter } from 'app/canvas/MouseEventRouter';
import { RotationAnchorRepository } from 'app/canvas/RotationAnchorRepository';
import { RotationAnchorPainter } from 'app/canvas/RotationAnchorPainter';
import { PolygonFactory } from 'app/canvas/PolygonFactory';
import { RotationAnchor } from 'app/canvas/RotationAnchor';
import { Point } from 'app/canvas/Point';
import { RotationAnchorDragListener } from 'app/canvas/RotationAnchorDragListener';
import { PolygonCentroidCalculator } from 'app/canvas/PolygonCentroidCalculator';
import { Vector } from 'app/canvas/Vector';
import { GridLayerPainter } from 'app/canvas/GridLayerPainter';
import { WorldPainter } from 'app/canvas/WorldPainter';
import { PolygonLayerPainter } from 'app/canvas/PolygonLayerPainter';
import { RotationAnchorLayerPainter } from 'app/canvas/RotationAnchorLayerPainter';
import { ActionHistory } from 'app/canvas/ActionHistory';
import { RedoHotkey } from 'app/canvas/RedoHotkey';
import { UndoHotkey } from 'app/canvas/UndoHotkey';
import { KeyboardEventRouter } from 'app/canvas/KeyboardEventRouter';
import { PolygonRotator } from 'app/canvas/PolygonRotator';

const canvas = document.createElement('canvas');

const renderingContext = new RenderingContext(canvas.getContext('2d'));
const gridLayerPainter = new GridLayerPainter(renderingContext);
const polygonPainter = new PolygonPainter(renderingContext);

const aabbFactory = new AxisAlignedBoundingBoxFactory();
const collisionDetector = new CollisionDetector(aabbFactory);
const polygonRepository = new PolygonRepository(collisionDetector);

const polygonLayerPainter = new PolygonLayerPainter(polygonRepository, polygonPainter);

const actionHistory = new ActionHistory();
const polygonDragListener = new PolygonDragListener(polygonRepository, actionHistory);

const rotationAnchorRepository = new RotationAnchorRepository(
    collisionDetector,
    new Dimensions(15, 0, 15),
);
const polygonFactory = new PolygonFactory();
const rotationAnchorPainter = new RotationAnchorPainter(
    polygonFactory,
    polygonPainter,
);

const rotationAnchorLayerPainter = new RotationAnchorLayerPainter(rotationAnchorRepository, rotationAnchorPainter);

const polygonCentroidCalculator = new PolygonCentroidCalculator(aabbFactory);
const polygonRotator = new PolygonRotator(polygonCentroidCalculator);
const rotationAnchorDragListener = new RotationAnchorDragListener(
    polygonRotator,
    rotationAnchorRepository,
    actionHistory,
);

const dimensions = new Dimensions(50, 0, 50);
const topFace = dimensions.createTopFace();
topFace.shift(new Vector(125, 0, 75))
polygonRepository.push(topFace);

rotationAnchorRepository.push(
    new RotationAnchor(new Point(100, 0, 100), topFace)
);

const mouseEventRouter = new MouseEventRouter([polygonDragListener, rotationAnchorDragListener]);

mouseEventRouter.register(document);

const worldPainter = new WorldPainter(renderingContext, [
    gridLayerPainter,
    polygonLayerPainter,
    rotationAnchorLayerPainter,
]);

const undoHotkey = new UndoHotkey(actionHistory);
const redoHotkey = new RedoHotkey(actionHistory);
const keyboardEventRouter = new KeyboardEventRouter({
    'z': undoHotkey,
    'x': redoHotkey,
});

keyboardEventRouter.register(document);

const ticksPerSecond = 60;
const msPerTick = 1000 / ticksPerSecond;

document.body.appendChild(canvas);

setInterval(() => {
    renderingContext.fitToScreen();
    worldPainter.paint();
}, msPerTick);
