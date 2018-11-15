import ProtocolCodecFactory from "../../util/socket/codecfactory/ProtocolCodecFactory";
import IoSession from "../../util/socket/session/IoSession";
import ProtocolEncoder from "../../util/socket/codecfactory/ProtocolEncoder";
import ProtocolDecoder from "../../util/socket/codecfactory/ProtocolDecoder";
import FbProtocolEncoder from "./FbProtocolEncoder";
import FbProtocolDecoder from "./FbProtocolDecoder";
export default class FbProtocolCodecFactory implements ProtocolCodecFactory {
    private _encoder: ProtocolEncoder = new FbProtocolEncoder();
    private _decoder: ProtocolDecoder = new FbProtocolDecoder();
    getEncoder(session: IoSession): ProtocolEncoder {
        return this._encoder;
    }
    getDecoder(session: IoSession): ProtocolDecoder {
        return this._decoder;
    }
}