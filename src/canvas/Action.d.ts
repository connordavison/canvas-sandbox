export interface Action {
    do(): void;
    undo(): void;
    toString(): string;
}
