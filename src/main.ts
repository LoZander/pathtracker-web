import { ControllerImpl } from './pathtracker/gui/ControllerImpl';
import { Tracker } from './pathtracker/framework/TrackerInterfaces';
import { Controller } from "./pathtracker/framework/GuiInterfaces";
import { GuiImpl } from './pathtracker/gui/GuiImpl';
import { TrackerImpl } from './pathtracker/standard/TrackerImpl';
import { ipcRenderer } from 'electron';
import { StandardTrackerFactory } from './pathtracker/standard/StandardTrackerFactory';
import { SyncJSONFileManager } from './pathtracker/standard/SyncJSONFileManager';
import { NoAutoloadStrategy } from './pathtracker/standard/NoAutoloadStrategy';
import { StandardAutosaveStrategy } from './pathtracker/standard/StandardAutosaveStrategy';
import { StandardAutoloadStrategy } from './pathtracker/standard/StandardAutoloadStrategy';

const tracker: Tracker = new TrackerImpl({
    createFileManager: () => new SyncJSONFileManager(),
    createAutoloadStrategy: () => new StandardAutoloadStrategy(),
    createAutosaveStrategy: () => new StandardAutosaveStrategy()
});
const gui = new GuiImpl(tracker);
tracker.addTrackerObserver(gui);
const controller: Controller = new ControllerImpl(tracker);

ipcRenderer.on('request_next_turn', (event,_) => {
    tracker.nextTurn();
});
ipcRenderer.on('request_save', (event,savefile) => {
    tracker.save(savefile);

});
ipcRenderer.on('request_load', (event,savefile) => {
    if(savefile === undefined) return;
    tracker.load(savefile);
});
ipcRenderer.on('request_clear', (event,_) => {
    tracker.clear();
});

window.onload = () => {
    gui.update();
}