import { AutoloadStrategy } from "pathtracker/framework/strategies/AutoloadStrategy";
import { AutosaveStrategy } from "pathtracker/framework/strategies/AutosaveStrategy";
import { FileManager } from "pathtracker/framework/FileManager";
import { TrackerFactory } from "pathtracker/framework/TrackerFactory";
import { StandardAutoloadStrategy } from "./strategies/autoload/StandardAutoloadStrategy";
import { StandardAutosaveStrategy } from "./strategies/autosave/StandardAutosaveStrategy";
import { SyncJSONFileManager } from "./filemanager/SyncJSONFileManager";

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