import IoSession from '../session/IoSession'
export default interface IOhandler {
    sessionIdle(session: IoSession): void;
    exceptionCaught(session: IoSession, err: Error): void;
    messageReceived(session: IoSession, message: any): void;
    sessionOpened(session: IoSession): void;
    sessionClosed(session: IoSession): void;
    messageSent(session: IoSession, message: any): void;
}