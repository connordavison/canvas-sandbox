import { ActionHistory } from 'app/canvas/ActionHistory';
import { Hotkey } from 'app/canvas/Hotkey';

export class UndoHotkey implements Hotkey {
    constructor(private actionHistory: ActionHistory) {}

    public execute(): void {
        if (this.actionHistory.canUndo()) {
            this.actionHistory.undo();
        }
    }
}
