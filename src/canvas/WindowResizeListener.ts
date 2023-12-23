import { RenderingContext } from 'app/canvas/RenderingContext';

export class WindowResizeListener {
    constructor(private context: RenderingContext) {}

    public register(window: Window): void {
        window.addEventListener('resize', () => this.context.fitToScreen());
    }
}
