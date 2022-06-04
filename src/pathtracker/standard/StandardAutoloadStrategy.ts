import path from "path";
import { AutoloadStrategy } from "pathtracker/framework/AutoloadStrategy";
import { Tracker } from "pathtracker/framework/TrackerInterfaces";

export class StandardAutoloadStrategy implements AutoloadStrategy {
    autoload(tracker: Tracker): void {
        try {
            tracker.load(path.join(__dirname, '..', '..', '..', 'resources', 'autosave.json'));
        } catch (err) {
            tracker.save(path.join(__dirname, '..', '..', '..', 'resources', 'autosave.json'));
        }
    }
}