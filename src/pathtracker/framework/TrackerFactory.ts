import { AutoloadStrategy } from "./strategies/AutoloadStrategy";
import { AutosaveStrategy } from "./strategies/AutosaveStrategy";
import { FileManager } from "./FileManager";

export interface TrackerFactory {
    createFileManager(): FileManager;
    createAutosaveStrategy(): AutosaveStrategy;
    createAutoloadStrategy(): AutoloadStrategy;
}