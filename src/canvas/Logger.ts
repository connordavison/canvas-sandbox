export class Logger {
    public log(message: string): void {
        const timestamp = new Date().toLocaleString();

        console.debug(`[${timestamp}]: ${message}`);
    }
}

export const logger = new Logger();
