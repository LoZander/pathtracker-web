import { AutoloadStrategy } from "./AutoloadStrategy";
import { AutosaveStrategy } from "./AutosaveStrategy";
import { FileManager } from "./FileManager";

export interface TrackerFactory {
    createFileManager(): FileManager;
    createAutosaveStrategy(): AutosaveStrategy;
    createAutoloadStrategy(): AutoloadStrategy;
}