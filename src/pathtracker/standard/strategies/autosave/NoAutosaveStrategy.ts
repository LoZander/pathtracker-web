import { AutosaveStrategy } from "pathtracker/framework/strategies/AutosaveStrategy";
import { Tracker } from "pathtracker/framework/TrackerInterfaces";

export class NoAutosaveStrategy implements AutosaveStrategy {
    autosave(tracker: Tracker): void {}
}