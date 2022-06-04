import path from "path";
import { AutoloadStrategy } from "pathtracker/framework/strategies/AutoloadStrategy";
import { Tracker } from "pathtracker/framework/TrackerInterfaces";

export class StandardAutoloadStrategy implements AutoloadStrategy {
    autoload(tracker: Tracker): void {
        try {
            tracker.load(path.join('resources', 'autosave.json'));
        } catch (err) {
            tracker.save(path.join('resources', 'autosave.json'));
        }
    }
}