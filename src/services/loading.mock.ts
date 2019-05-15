export class LoadingControllerMock {
    _getPortal(): any { return {} };
    create() : any { 
        return new LoadingMock()
    };
}

class LoadingMock {
    present() { };
    dismiss() { };
    dismissAll() { };
}