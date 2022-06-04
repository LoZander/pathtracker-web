import { Tracker } from "../TrackerInterfaces";

export interface AutoloadStrategy {
    autoload(tracker: Tracker): void;
}