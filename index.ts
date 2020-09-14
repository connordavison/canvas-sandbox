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
import { RotationAnchor } from 'app/canvas/RotationAnchor';
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
import { RotationAnchorLocator } from 'app/canvas/RotationAnchorLocator';
import { RotationAnchorCollisionDetector } from 'app/canvas/RotationAnchorCollisionDetector';
import { PolygonShifterFactory } from 'app/canvas/PolygonShifterFactory';
import { SeparatingAxisCollisionDetector } from 'app/canvas/collision/SeparatingAxisCollisionDetector';
import { RandomPolygonSpawner } from 'app/canvas/RandomQuadrangleSpawner';

const canvas = document.createElement('canvas');

const renderingContext = new RenderingContext(canvas.getContext('2d'));
const gridLayerPainter = new GridLayerPainter(renderingContext);
const polygonPainter = new PolygonPainter(renderingContext);

const aabbFactory = new AxisAlignedBoundingBoxFactory();
const polygonRepository = new PolygonRepository();

const polygonLayerPainter = new PolygonLayerPainter(polygonRepository, polygonPainter);

const actionHistory = new ActionHistory();
const separatingAxisCollisionDetector = new SeparatingAxisCollisionDetector();
const polygonShifterFactory = new PolygonShifterFactory(polygonRepository, separatingAxisCollisionDetector);
const polygonDragListener = new PolygonDragListener(polygonRepository, polygonShifterFactory, actionHistory);

const centroidCalculator = new PolygonCentroidCalculator(aabbFactory);
const rotationAnchorLocator = new RotationAnchorLocator(centroidCalculator);
const rotationAnchorPainter = new RotationAnchorPainter(
    rotationAnchorLocator,
    renderingContext,
);

const collisionDetector = new CollisionDetector(aabbFactory);
const rotationAnchorCollisionDetector = new RotationAnchorCollisionDetector(
    collisionDetector,
    rotationAnchorLocator,
    new Dimensions(15, 0, 15),
);
const rotationAnchorRepository = new RotationAnchorRepository(rotationAnchorCollisionDetector);
const rotationAnchorLayerPainter = new RotationAnchorLayerPainter(rotationAnchorRepository, rotationAnchorPainter);

const rotationAnchorDragListener = new RotationAnchorDragListener(
    rotationAnchorRepository,
    centroidCalculator,
    actionHistory,
);

const polygonSpawner = new RandomPolygonSpawner();
const polygons = polygonSpawner.spawnMany(50);

for (const polygon of polygons) {
    polygonRepository.push(polygon);
    rotationAnchorRepository.push(
        new RotationAnchor(new Vector(0, 0, 80), polygon),
    );
}

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
