import { Lockable } from 'app/canvas/Lockable';

export class MutexLock<T> implements Lockable<T>{
    private locker?: T;

    public lock(locker: T): void {
        this.locker = locker;
    }

    public isLocked(): boolean {
        return Boolean(this.locker);
    }

    public getLocker(): T {
        return this.locker;
    }

    public unlock(): void {
        this.locker = undefined;
    }
}
