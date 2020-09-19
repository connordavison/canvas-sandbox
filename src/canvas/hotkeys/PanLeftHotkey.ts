import { Camera } from 'app/canvas/Camera';
import { Hotkey } from 'app/canvas/Hotkey';

export class PanLeftHotkey implements Hotkey {
    constructor(private camera: Camera) {}

    public execute(): void {
        this.camera.panLeft();
    }
}
