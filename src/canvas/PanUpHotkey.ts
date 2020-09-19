import { Camera } from 'app/canvas/Camera';

export class PanUpHotkey {
    constructor(private camera: Camera) {}

    public execute(): void {
        this.camera.panUp();
    }
}
