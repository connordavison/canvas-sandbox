import { RenderingContext } from 'app/canvas/RenderingContext';

export class WindowResizeListener {
    constructor(private renderingContext: RenderingContext) {}

    public register(window: Window): void {
        window.addEventListener('resize', () => this.renderingContext.fitToScreen());
    }
}
