import { ActionHistory } from 'app/canvas/ActionHistory';
import { Camera } from 'app/canvas/Camera';
import { CanvasDragListener } from 'app/canvas/CanvasDragListener';
import { AxisAlignedBoundingBoxFactory } from 'app/canvas/collision/AxisAlignedBoundingBoxFactory';
import { CollisionDetector } from 'app/canvas/collision/CollisionDetector';
import { SeparatingAxisCollisionDetector } from 'app/canvas/collision/SeparatingAxisCollisionDetector';
import { Dimensions } from 'app/canvas/Dimensions';
import { GridLayerPainter } from 'app/canvas/GridLayerPainter';
import { KeyboardEventRouter } from 'app/canvas/KeyboardEventRouter';
import { MouseEventRouter } from 'app/canvas/MouseEventRouter';
import { PanDownHotkey } from 'app/canvas/hotkeys/PanDownHotkey';
import { PanLeftHotkey } from 'app/canvas/hotkeys/PanLeftHotkey';
import { PanRightHotkey } from 'app/canvas/hotkeys/PanRightHotkey';
import { PanUpHotkey } from 'app/canvas/hotkeys/PanUpHotkey';
import { PolygonDragListener } from 'app/canvas/PolygonDragListener';
import { PolygonLayerPainter } from 'app/canvas/PolygonLayerPainter';
import { PolygonPainter } from 'app/canvas/PolygonPainter';
import { PolygonRepository } from 'app/canvas/PolygonRepository';
import { PolygonShifterFactory } from 'app/canvas/PolygonShifterFactory';
import { RandomPolygonSpawner } from 'app/canvas/RandomPolygonSpawner';
import { RedoHotkey } from 'app/canvas/hotkeys/RedoHotkey';
import { RenderingContext } from 'app/canvas/RenderingContext';
import { RotationAnchorCollisionDetector } from 'app/canvas/RotationAnchorCollisionDetector';
import { RotationAnchorDragListener } from 'app/canvas/RotationAnchorDragListener';
import { RotationAnchorLayerPainter } from 'app/canvas/RotationAnchorLayerPainter';
import { RotationAnchorPainter } from 'app/canvas/RotationAnchorPainter';
import { RotationAnchorRepository } from 'app/canvas/RotationAnchorRepository';
import { ScrollListener } from 'app/canvas/ScrollListener';
import { UndoHotkey } from 'app/canvas/hotkeys/UndoHotkey';
import { WorldPainter } from 'app/canvas/WorldPainter';
import { PolygonSelectListener } from 'app/canvas/PolygonSelectListener';
import { PolygonSelector } from 'app/canvas/PolygonSelector';
import { VertexAnchorPainter } from 'app/canvas/VertexAnchorPainter';
import { VertexAnchorLayerPainter } from 'app/canvas/VertexAnchorLayerPainter';
import { VertexAnchorRepository } from 'app/canvas/VertexAnchorRepository';
import { VertexAnchorDragListener } from 'app/canvas/VertexAnchorDragListener';

const canvas = document.createElement('canvas');

const camera = new Camera();
const renderingContext = new RenderingContext(canvas.getContext('2d'), camera);
const gridLayerPainter = new GridLayerPainter(renderingContext);
const polygonPainter = new PolygonPainter(renderingContext);

const aabbFactory = new AxisAlignedBoundingBoxFactory();
const polygonRepository = new PolygonRepository();

const polygonLayerPainter = new PolygonLayerPainter(polygonRepository, polygonPainter);

const actionHistory = new ActionHistory();
const separatingAxisCollisionDetector = new SeparatingAxisCollisionDetector();
const polygonShifterFactory = new PolygonShifterFactory(polygonRepository, separatingAxisCollisionDetector);
const polygonDragListener = new PolygonDragListener(polygonRepository, polygonShifterFactory, actionHistory);

const rotationAnchorPainter = new RotationAnchorPainter(renderingContext);

const collisionDetector = new CollisionDetector(aabbFactory);
const rotationAnchorCollisionDetector = new RotationAnchorCollisionDetector(
    collisionDetector,
    new Dimensions(15, 0, 15),
);
const rotationAnchorRepository = new RotationAnchorRepository(rotationAnchorCollisionDetector);
const rotationAnchorLayerPainter = new RotationAnchorLayerPainter(rotationAnchorRepository, rotationAnchorPainter);

const rotationAnchorDragListener = new RotationAnchorDragListener(
    rotationAnchorRepository,
    actionHistory,
);

const vertexAnchorRepository = new VertexAnchorRepository();
const vertexAnchorPainter = new VertexAnchorPainter(renderingContext);
const vertexAnchorLayerPainter = new VertexAnchorLayerPainter(vertexAnchorRepository, vertexAnchorPainter);
const vertexAnchorDragListener = new VertexAnchorDragListener(vertexAnchorRepository, actionHistory);

const polygonSpawner = new RandomPolygonSpawner();
const polygons = polygonSpawner.spawnMany(20);

for (const polygon of polygons) {
    polygonRepository.push(polygon);
}

const polygonSelector = new PolygonSelector(rotationAnchorRepository, vertexAnchorRepository);
const polygonSelectListener = new PolygonSelectListener(polygonRepository, polygonSelector);

const mouseEventRouter = new MouseEventRouter([
    rotationAnchorDragListener,
    vertexAnchorDragListener,
    polygonSelectListener,
    polygonDragListener,
    new CanvasDragListener(camera),
], camera);

mouseEventRouter.register(document);

const worldPainter = new WorldPainter(renderingContext, [
    gridLayerPainter,
    polygonLayerPainter,
    rotationAnchorLayerPainter,
    vertexAnchorLayerPainter,
]);

const keyboardEventRouter = new KeyboardEventRouter({
    'z': new UndoHotkey(actionHistory),
    'x': new RedoHotkey(actionHistory),
    'ArrowLeft': new PanLeftHotkey(camera),
    'ArrowRight': new PanRightHotkey(camera),
    'ArrowUp': new PanUpHotkey(camera),
    'ArrowDown': new PanDownHotkey(camera),
});

keyboardEventRouter.register(document);

const scrollListener = new ScrollListener(camera);

scrollListener.register(document);

const ticksPerSecond = 60;
const msPerTick = 1000 / ticksPerSecond;

document.body.appendChild(canvas);

setInterval(() => {
    renderingContext.fitToScreen();
    worldPainter.paint();
}, msPerTick);
