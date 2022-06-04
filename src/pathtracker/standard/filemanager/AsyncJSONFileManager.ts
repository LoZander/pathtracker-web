import { FileManager } from "../../framework/FileManager";
import fs from 'fs';
export class AsyncJSONFileManager implements FileManager {
    async read(dir: string): Promise<any> {
        return new Promise((resolve, reject) => { fs.promises.readFile(dir, 'utf-8')
            .then(data => {
                try {
                    const object = JSON.parse(data);
                    resolve(object);
                } catch (err) {
                    reject(err);
                }
            })
            .catch(err => {throw err});
        });
    }

    write(dir: string, value: any): void {
        const stringValue = JSON.stringify(value, null, 2);
        fs.writeFile(dir, stringValue, (err) => { if(err) throw new Error(`Cannot write file due to error. ${err}`)});
    }   
}