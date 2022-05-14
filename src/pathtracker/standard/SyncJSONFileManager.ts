import { FileManager } from "pathtracker/framework/interfaces";
import fs from 'fs';

export class SyncJSONFileManager implements FileManager {
    read(dir: string): any {
        try {
            const data = fs.readFileSync(dir, 'utf-8');
            const object = JSON.parse(data);
            return object;
        } catch (err) {
            throw new Error(`File cannet be read due to an error. ${err}`);
        }
    }
    write(dir: string, value: any): void {
        const stringValue = JSON.stringify(value, null, 2);
        fs.writeFileSync(dir, stringValue);
    }

}