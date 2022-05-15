import { ControllerImpl } from './pathtracker/gui/ControllerImpl';
import { Controller, Tracker } from './pathtracker/framework/interfaces';
import { GuiImpl } from './pathtracker/gui/GuiImpl';
import { TrackerImpl } from './pathtracker/standard/TrackerImpl';
import { SyncJSONFileManager } from './pathtracker/standard/SyncJSONFileManager';

const tracker: Tracker = new TrackerImpl(new SyncJSONFileManager());
const gui = new GuiImpl(tracker);
const controller: Controller = new ControllerImpl(tracker);
tracker.addTrackerObserver(gui);

window.onload = () => {
    gui.update();
}