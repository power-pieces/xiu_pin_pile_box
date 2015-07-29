/**
* 弹出提示框
* @author Jing 
*
*/
class ShareTip extends egret.gui.SkinnableComponent
{
    private static ins: ShareTip = new ShareTip();

    public static show()
    {        
        Extend.callReadyShare();
        egret.gui.PopUpManager.addPopUp(ShareTip.ins, true, false);
        this.ins.addListeners();
    }

    public static close()
    {
        egret.gui.PopUpManager.removePopUp(ShareTip.ins);
        this.ins.removeListeners();
    }

  

    public constructor()
    {
        super();
        this.skinName = skins.windows.ShareTipSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }

    public createCompleteEvent(event: egret.gui.UIEvent): void
    {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        
    }

    public addListeners(): void
    {
        Global.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    }

    public removeListeners(): void
    {
        Global.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    }

    private onTouchTap(e: egret.TouchEvent): void
    {        
        ShareTip.close();
    }
}
