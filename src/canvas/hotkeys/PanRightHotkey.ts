import { Camera } from 'app/canvas/Camera';

export class PanRightHotkey {
    constructor(private camera: Camera) {}

    public execute(): void {
        this.camera.panRight();
    }
}
