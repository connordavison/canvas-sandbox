import { Hotkey } from 'app/canvas/Hotkey';

export class KeyboardEventRouter {
    constructor(private hotkeys: Record<string, Hotkey>) {}

    public register(root: EventTarget): void {
        root.addEventListener('keydown', (event: KeyboardEvent) => {
            const hotkey = this.hotkeys[event.key];

            if (hotkey) {
                hotkey.execute();
            }
        });
    }
}
