import { AutoloadStrategy } from "pathtracker/framework/AutoloadStrategy";
import { AutosaveStrategy } from "pathtracker/framework/AutosaveStrategy";
import { FileManager } from "pathtracker/framework/FileManager";
import { TrackerFactory } from "pathtracker/framework/TrackerFactory";
import { StandardAutoloadStrategy } from "./StandardAutoloadStrategy";
import { StandardAutosaveStrategy } from "./StandardAutosaveStrategy";
import { SyncJSONFileManager } from "./SyncJSONFileManager";

export class StandardTrackerFactory implements TrackerFactory {
    createFileManager(): FileManager {
        return new SyncJSONFileManager()
    }
    createAutosaveStrategy(): AutosaveStrategy {
        return new StandardAutosaveStrategy()
    }
    createAutoloadStrategy(): AutoloadStrategy {
        return new StandardAutoloadStrategy();
    }

}