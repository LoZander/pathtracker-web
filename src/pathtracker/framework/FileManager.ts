
export interface FileManager {

    /**
     * Reads the content of a file.
     * @param dir The directory of the file (complete path).
     */
    read(dir: string): any;

    /**
     * Writes a value to a file.
     * @param dir The directory of the file (complete path).
     * @param value The value being written to the file.
     */
    write(dir: string, value: any): void;
}
