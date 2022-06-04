import { ControllerImpl } from './pathtracker/gui/ControllerImpl';
import { Tracker } from './pathtracker/framework/TrackerInterfaces';
import { Controller } from "./pathtracker/framework/GuiInterfaces";
import { GuiImpl } from './pathtracker/gui/GuiImpl';
import { TrackerImpl } from './pathtracker/standard/TrackerImpl';
import { ipcRenderer } from 'electron';
import { SyncJSONFileManager } from './pathtracker/standard/filemanager/SyncJSONFileManager';
import { StandardAutosaveStrategy } from './pathtracker/standard/strategies/autosave/StandardAutosaveStrategy';
import { StandardAutoloadStrategy } from './pathtracker/standard/strategies/autoload/StandardAutoloadStrategy';
import { NoAutoloadStrategy } from './pathtracker/standard/strategies/autoload/NoAutoloadStrategy';
import { NoAutosaveStrategy } from './pathtracker/standard/strategies/autosave/NoAutosaveStrategy';

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