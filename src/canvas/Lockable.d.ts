export interface Lockable<T> {
    lock(locker: T): void;
}
