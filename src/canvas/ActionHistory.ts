import { Action } from 'app/canvas/Action';
import { logger } from 'app/canvas/Logger';

export class ActionHistory {
    private undoStack: Action[] = [];
    private redoStack: Action[] = [];

    public push(action: Action): void {
        this.log(`Did "${action.toString()}"`);
        this.undoStack.push(action);
        this.redoStack.length = 0;
    }

    public undo(): void {
        const action = this.undoStack.pop();

        if (!action) {
            return;
        }

        action.undo();

        this.log(`Undone "${action.toString()}"`);

        this.redoStack.push(action);
    }

    public redo(): void {
        const action = this.redoStack.pop();

        if (!action) {
            return;
        }

        action.do();

        this.log(`Redone "${action.toString()}"`);

        this.undoStack.push(action);
    }

    public canUndo(): boolean {
        return this.undoStack.length > 0;
    }

    public canRedo(): boolean {
        return this.redoStack.length > 0;
    }

    public clear(): void {
        this.undoStack.length = 0;
        this.redoStack.length = 0;
    }

    private log(message: string): void {
        logger.log(`[ActionHistory] ${message}`);
    }
}
