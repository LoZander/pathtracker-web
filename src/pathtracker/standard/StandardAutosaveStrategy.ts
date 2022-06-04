import path from "path";
import { Tracker } from "pathtracker/framework/TrackerInterfaces";
import { AutosaveStrategy } from "pathtracker/framework/AutosaveStrategy";

export class StandardAutosaveStrategy implements AutosaveStrategy {
    autosave(tracker: Tracker): void {
        tracker.save(path.join(__dirname, '..', 'autosave.json'));
    }
}