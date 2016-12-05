export class crmProcess {
    constructor(Xrm) {
        this.Xrm= Xrm;
        this.uiProcess = this.Xrm.Page && this.Xrm.Page.ui && this.Xrm.Page.ui.process;
        this.dataProcess = this.Xrm.Page && this.Xrm.Page.data && this.Xrm.Page.data.process;
    }
    reflow() {
        this.uiProcess.reflow.apply(this.uiProcess, arguments);
    }
    setDisplayState() {
        this.uiProcess.setDisplayState.apply(this.uiProcess, arguments);
    }
    setVisible() {
        this.uiProcess.setVisible.apply(this.uiProcess, arguments);
    }
    addOnStageChange() {
        this.dataProcess.addOnStageChange.apply(this.dataProcess, arguments);
    }
    addOnStageSelected() {
        this.dataProcess.addOnStageSelected.apply(this.dataProcess, arguments);
    }
    getActivePath() {
        return this.dataProcess.getActivePath.apply(this.dataProcess, arguments);
    }
    getActiveProcess() {
        return this.dataProcess.getActiveProcess.apply(this.dataProcess, arguments);
    }
    getActiveStage() {
        return this.dataProcess.getActiveStage.apply(this.dataProcess, arguments);
    }
    getEnabledProcesses() {
        return this.dataProcess.getEnabledProcesses.apply(this.dataProcess, arguments);
    }
    moveNext() {
        return this.dataProcess.moveNext.apply(this.dataProcess, arguments);
    }
    movePrevious() {
        return this.dataProcess.movePrevious.apply(this.dataProcess, arguments);
    }
    removeOnStageChange() {
        this.dataProcess.removeOnStageChange.apply(this.dataProcess, arguments);
    }
    removeOnStageSelected() {
        this.dataProcess.removeOnStageSelected.apply(this.dataProcess, arguments);
    }
    setActiveProcess() {
        return this.dataProcess.setActiveProcess.apply(this.dataProcess, arguments);
    }
    setActiveStage() {
        return this.dataProcess.setActiveStage.apply(this.dataProcess, arguments);
    }
}