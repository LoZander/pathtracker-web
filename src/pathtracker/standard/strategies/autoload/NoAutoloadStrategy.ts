import { AutoloadStrategy } from "pathtracker/framework/strategies/AutoloadStrategy";
import { Tracker } from "pathtracker/framework/TrackerInterfaces";

export class NoAutoloadStrategy implements AutoloadStrategy {
    autoload(tracker: Tracker): void {}
}