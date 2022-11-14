interface IProtocol {
    send(): string;
}

class Http implements IProtocol {
    send() {
        return "{Result of Http: Sent via HTTP}";
    }
}

class MyWebSocket implements IProtocol {
    send() {
        return "{Result of MyWebSocket: Sent via WebSocket}";
    }
}

abstract class ProtocolCreator {
    public abstract createProtocol(): IProtocol //factory method
    public doWhateverOperation(): string {
        const protocol = this.createProtocol();
        return `ProtocolCreator: same code works with ${protocol.send()} \n`;
    }
}

class HttpCreator extends ProtocolCreator {
    public createProtocol(): IProtocol {
        return new Http();
    }
}

class MyWebSocketCreator extends ProtocolCreator {
    public createProtocol(): IProtocol {
        return new MyWebSocket();
    }
}

function serverCode(protocolCreator: ProtocolCreator) {
    console.log("Server: i'm not aware about protocolCreator's class");
    console.log(protocolCreator.doWhateverOperation());
}

serverCode(new HttpCreator());
serverCode(new MyWebSocketCreator());