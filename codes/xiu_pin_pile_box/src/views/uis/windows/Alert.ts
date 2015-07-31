/**
 * 弹出提示框
 * @author Jing 
 *
 */
class Alert extends egret.gui.SkinnableComponent
{
    public static show(content: string, closeFun: Function = null, thisObj: any = null)
    {
        var alert: Alert = new Alert(closeFun, thisObj);
        alert.setContent(content);
        egret.gui.PopUpManager.addPopUp(alert, true, true);
    }

    public btnOK: egret.gui.Button;
    public txtContent: egret.gui.Label;

    private _closeFun: Function;
    private _content: string = "";

    public constructor(closeFun:Function = null, thisObj:any = null)
    {        
        super();
        if (closeFun)
        {            
            this._closeFun = closeFun.bind(thisObj);
            
        }
        this.skinName = skins.windows.AlertSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }

    public createCompleteEvent(event: egret.gui.UIEvent): void
    {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        this.btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);

        this.txtContent.text = this._content;
    }

    public setContent(content: string)
    {
        this._content = content;
    }

    private onTouchTap(e: egret.TouchEvent): void
    {
        egret.gui.PopUpManager.removePopUp(this);
        if (this._closeFun)
        {
            this._closeFun();
        }
    }
}
