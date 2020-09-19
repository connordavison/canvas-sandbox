import { Camera } from 'app/canvas/Camera';

export class PanDownHotkey {
    constructor(private camera: Camera) {}

    public execute(): void {
        this.camera.panDown();
    }
}
