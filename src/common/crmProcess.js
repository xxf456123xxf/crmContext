/**
 * 业务流程操作
 * @module crmProcess
 */
export class crmProcess {
    /**
     *crmProcess 初始化对象
     * @class crmProcess
     * @constructor
    */
    constructor(Xrm) {
        this.Xrm= Xrm;
        this.uiProcess = this.Xrm.Page && this.Xrm.Page.ui && this.Xrm.Page.ui.process;
        this.dataProcess = this.Xrm.Page && this.Xrm.Page.data && this.Xrm.Page.data.process;
    }
    /**
     * @method reflow
     * @return {[type]}
     */
    reflow() {
        this.uiProcess.reflow.apply(this.uiProcess, arguments);
    }
    /**
     * @method setDisplayState
     */
    setDisplayState() {
        this.uiProcess && this.uiProcess.setDisplayState.apply(this.uiProcess, arguments);
    }
    /**
     * @method setVisible
     */
    setVisible() {
        this.uiProcess && this.uiProcess.setVisible.apply(this.uiProcess, arguments);
    }
    /**
     * @method addOnStageChange
     */
    addOnStageChange() {
        this.uiProcess && this.dataProcess.addOnStageChange.apply(this.dataProcess, arguments);
    }
    /**
     * @method addOnStageSelected
     */
    addOnStageSelected() {
        this.uiProcess && this.dataProcess.addOnStageSelected.apply(this.dataProcess, arguments);
    }
    /**
     * @method getActivePath
     * @return {[type]}
     */
    getActivePath() {
        return this.uiProcess && this.dataProcess.getActivePath.apply(this.dataProcess, arguments);
    }
    /**
     * @method getActiveProcess
     * @return {[type]}
     */
    getActiveProcess() {
        return this.uiProcess && this.dataProcess.getActiveProcess.apply(this.dataProcess, arguments);
    }
    /**
     * @method getActiveStage
     * @return {[type]}
     */
    getActiveStage() {
        return this.uiProcess && this.dataProcess.getActiveStage.apply(this.dataProcess, arguments);
    }
    /**
     * @method getEnabledProcesses
     * @return {[type]}
     */
    getEnabledProcesses() {
        return this.uiProcess && this.dataProcess.getEnabledProcesses.apply(this.dataProcess, arguments);
    }
    /**
     * @method moveNext
     * @return {[type]}
     */
    moveNext() {
        return this.uiProcess && this.dataProcess.moveNext.apply(this.dataProcess, arguments);
    }
    /**
     * @method movePrevious
     * @return {[type]}
     */
    movePrevious() {
        return this.uiProcess && this.dataProcess.movePrevious.apply(this.dataProcess, arguments);
    }
    /**
     * @method removeOnStageChange
     * @return {[type]}
     */
    removeOnStageChange() {
        this.uiProcess && this.dataProcess.removeOnStageChange.apply(this.dataProcess, arguments);
    }
    /**
     * @method removeOnStageSelected
     * @return {[type]}
     */
    removeOnStageSelected() {
        this.uiProcess && this.dataProcess.removeOnStageSelected.apply(this.dataProcess, arguments);
    }
    /**
     * @method setActiveProcess
     */
    setActiveProcess() {
        return this.uiProcess && this.dataProcess.setActiveProcess.apply(this.dataProcess, arguments);
    }
    /**
     * @method setActiveStage
     */
    setActiveStage() {
        return this.uiProcess && this.dataProcess.setActiveStage.apply(this.dataProcess, arguments);
    }
}