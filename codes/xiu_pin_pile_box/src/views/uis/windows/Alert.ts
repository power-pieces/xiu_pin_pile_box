/**
 * 弹出提示框
 * @author Jing 
 *
 */
class Alert extends egret.gui.SkinnableComponent
{
    public static show(content: string)
    {
        var alert: Alert = new Alert();
        egret.gui.PopUpManager.addPopUp(alert, true, true);
    }

    public btnOK: egret.gui.Button;
    public txtContent: egret.gui.Label;

    public constructor()
    {
        super();
        this.skinName = skins.windows.AlertSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }

    public createCompleteEvent(event: egret.gui.UIEvent): void
    {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        this.btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    }

    public setContent(content: string)
    {
        this.txtContent.text = content;
    }



    private onTouchTap(e: egret.TouchEvent): void
    {
        egret.gui.PopUpManager.removePopUp(this);
    }
}
