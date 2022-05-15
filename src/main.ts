import { ControllerImpl } from './pathtracker/gui/ControllerImpl.js';
import { Controller, Tracker } from './pathtracker/framework/interfaces.js';
import { GuiImpl } from './pathtracker/gui/GuiImpl.js';
import { TrackerImpl } from './pathtracker/standard/TrackerImpl.js';
import { SyncJSONFileManager } from 'pathtracker/standard/SyncJSONFileManager.js';

const tracker: Tracker = new TrackerImpl(new SyncJSONFileManager());
const gui = new GuiImpl(tracker);
const controller: Controller = new ControllerImpl(tracker);
tracker.addTrackerObserver(gui);

window.onload = () => {
    gui.update();
}