import { ActionHistory } from 'app/canvas/ActionHistory';
import { Hotkey } from 'app/canvas/Hotkey';

export class RedoHotkey implements Hotkey {
    constructor(private actionHistory: ActionHistory) {}

    public execute(): void {
        if (this.actionHistory.canRedo()) {
            this.actionHistory.redo();
        }
    }
}
