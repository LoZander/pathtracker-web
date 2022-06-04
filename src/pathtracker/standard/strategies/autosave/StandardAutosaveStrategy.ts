import path from "path";
import { Tracker } from "../../../framework/TrackerInterfaces";
import { AutosaveStrategy } from "../../../framework/strategies/AutosaveStrategy";

export class StandardAutosaveStrategy implements AutosaveStrategy {
    autosave(tracker: Tracker): void {
        tracker.save(path.join('resources', 'autosave.json'));
    }
}