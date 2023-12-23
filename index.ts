import { ActionHistory } from 'app/canvas/ActionHistory';
import { Camera } from 'app/canvas/Camera';
import { CanvasDragListener } from 'app/canvas/CanvasDragListener';
import { CollisionDetector } from 'app/geometry/collision/CollisionDetector';
import { SeparatingAxisCollisionDetector } from 'app/geometry/collision/SeparatingAxisCollisionDetector';
import { Dimensions } from 'app/geometry/Dimensions';
import { GridLayerPainter } from 'app/canvas/GridLayerPainter';
import { PanDownHotkey } from 'app/canvas/hotkeys/PanDownHotkey';
import { PanLeftHotkey } from 'app/canvas/hotkeys/PanLeftHotkey';
import { PanRightHotkey } from 'app/canvas/hotkeys/PanRightHotkey';
import { PanUpHotkey } from 'app/canvas/hotkeys/PanUpHotkey';
import { RedoHotkey } from 'app/canvas/hotkeys/RedoHotkey';
import { UndoHotkey } from 'app/canvas/hotkeys/UndoHotkey';
import { KeyboardEventRouter } from 'app/canvas/KeyboardEventRouter';
import { MouseEventRouter } from 'app/canvas/MouseEventRouter';
import { PolygonDragListener } from 'app/canvas/PolygonDragListener';
import { PolygonDragTransactionFactory } from 'app/canvas/PolygonDragTransactionFactory';
import { PolygonLayerPainter } from 'app/canvas/PolygonLayerPainter';
import { PolygonMover } from 'app/canvas/PolygonMover';
import { PolygonPainter } from 'app/canvas/PolygonPainter';
import { PolygonRepository } from 'app/canvas/PolygonRepository';
import { PolygonSelectListener } from 'app/canvas/PolygonSelectListener';
import { PolygonSelector } from 'app/canvas/PolygonSelector';
import { RandomPolygonSpawner } from 'app/canvas/RandomPolygonSpawner';
import { RenderingContext } from 'app/canvas/RenderingContext';
import { RotationAnchorCollisionDetector } from 'app/canvas/RotationAnchorCollisionDetector';
import { RotationAnchorDragListener } from 'app/canvas/RotationAnchorDragListener';
import { RotationAnchorLayerPainter } from 'app/canvas/RotationAnchorLayerPainter';
import { RotationAnchorPainter } from 'app/canvas/RotationAnchorPainter';
import { RotationAnchorRepository } from 'app/canvas/RotationAnchorRepository';
import { ScrollListener } from 'app/canvas/ScrollListener';
import { VertexAnchorDragListener } from 'app/canvas/VertexAnchorDragListener';
import { VertexAnchorLayerPainter } from 'app/canvas/VertexAnchorLayerPainter';
import { VertexAnchorPainter } from 'app/canvas/VertexAnchorPainter';
import { VertexAnchorRepository } from 'app/canvas/VertexAnchorRepository';
import { WindowResizeListener } from 'app/canvas/WindowResizeListener';
import { WorldPainter } from 'app/canvas/WorldPainter';
import { VertexAnchorFactory } from 'app/canvas/VertexAnchorFactory';

const canvas = document.createElement('canvas');

const camera = new Camera();
const renderingContext = new RenderingContext(canvas.getContext('2d'));
const gridLayerPainter = new GridLayerPainter(renderingContext, camera);
const polygonPainter = new PolygonPainter(renderingContext);
const polygonRepository = new PolygonRepository();

const polygonLayerPainter = new PolygonLayerPainter(polygonRepository, polygonPainter);

const actionHistory = new ActionHistory();
const separatingAxisCollisionDetector = new SeparatingAxisCollisionDetector();
const polygonMover = new PolygonMover(polygonRepository, separatingAxisCollisionDetector);
const polygonDragTransactionFactory = new PolygonDragTransactionFactory(polygonMover, actionHistory);

const rotationAnchorPainter = new RotationAnchorPainter(renderingContext);

const collisionDetector = new CollisionDetector();
const rotationAnchorCollisionDetector = new RotationAnchorCollisionDetector(
    collisionDetector,
    new Dimensions(15, 0, 15),
);
const rotationAnchorRepository = new RotationAnchorRepository(rotationAnchorCollisionDetector, polygonMover);
const rotationAnchorLayerPainter = new RotationAnchorLayerPainter(rotationAnchorRepository, rotationAnchorPainter);

const vertexAnchorFactory = new VertexAnchorFactory();
const vertexAnchorRepository = new VertexAnchorRepository();
const vertexAnchorPainter = new VertexAnchorPainter(renderingContext);
const vertexAnchorLayerPainter = new VertexAnchorLayerPainter(vertexAnchorRepository, vertexAnchorPainter);

const polygonSpawner = new RandomPolygonSpawner();
const polygons = polygonSpawner.spawnMany(20);

for (const polygon of polygons) {
    polygonRepository.push(polygon);
}

const polygonSelector = new PolygonSelector(
    rotationAnchorRepository,
    vertexAnchorFactory,
    vertexAnchorRepository,
);

const mouseEventRouter = new MouseEventRouter([
    new RotationAnchorDragListener(rotationAnchorRepository, actionHistory),
    new VertexAnchorDragListener(vertexAnchorRepository, actionHistory),
    new PolygonSelectListener(polygonRepository, polygonSelector),
    new PolygonDragListener(polygonRepository, polygonDragTransactionFactory),
    new CanvasDragListener(camera),
], camera);

mouseEventRouter.register(document);

const layerPainters = [
    gridLayerPainter,
    polygonLayerPainter,
    rotationAnchorLayerPainter,
    vertexAnchorLayerPainter,
];
const worldPainter = new WorldPainter(renderingContext, camera, layerPainters);

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

const windowResizeListener = new WindowResizeListener(renderingContext);

windowResizeListener.register(window);

const ticksPerSecond = 120;
const msPerTick = 1000 / ticksPerSecond;

document.body.appendChild(canvas);
renderingContext.fitToScreen();

setInterval(() => {
    requestAnimationFrame(() => {
        worldPainter.paint();
    });
}, msPerTick);
