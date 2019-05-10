export class LoadingControllerMock {
    _getPortal(): any { return {} };
    create(options?: any) { 
        return new LoadingMock()
    };
}

class LoadingMock {
    present() { };
    dismiss() { };
    dismissAll() { };
}