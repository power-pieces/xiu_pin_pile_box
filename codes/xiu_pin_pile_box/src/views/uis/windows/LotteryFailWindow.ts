class LotteryFailWindow extends egret.gui.SkinnableComponent
{
    public static show()
    {
        var w: LotteryFailWindow = new LotteryFailWindow();
        egret.gui.PopUpManager.addPopUp(w, true, true);
    }




    public constructor()
    {
        super();
        this.skinName = skins.windows.LotteryFailWindowSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }

    public createCompleteEvent(event: egret.gui.UIEvent): void
    {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);


        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);

    }

    private onTouchTap(e: egret.TouchEvent): void
    {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        egret.gui.PopUpManager.removePopUp(this);

        //Global.GAME_LAYER.removeChildren();
        Global.UI_LAYER.removeAllElements();
        Global.UI_LAYER.addElement(new Share());
    }
}