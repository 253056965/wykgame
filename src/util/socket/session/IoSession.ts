import IOhandler from "../handler/IOHandler";
export default interface IoSession {
    getId(): number;
    write(message: any): void;
    read(message:any):void;
    getHandler(): IOhandler;
    getDataForkey(key: string): any;
    setData(key: string, value: any): void;
    removeDataForKey(key: string): void;
    close(): void;
    getRemotAddr(): string;
    
}