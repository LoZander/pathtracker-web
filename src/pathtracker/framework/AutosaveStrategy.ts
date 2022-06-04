import { Tracker } from "./TrackerInterfaces";

export interface AutosaveStrategy {
    autosave(tracker: Tracker): void;
}