declare namespace api.Require {
    interface TRequire {
        'softInputMgr': softInputMgr
    }
    interface softInputMgr {
        toggleKeyboard(): void
    }
}