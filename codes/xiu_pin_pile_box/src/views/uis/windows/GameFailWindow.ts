class GameFailWindow extends egret.gui.SkinnableComponent
{
    public static show(score:number)
    {
        var w: GameFailWindow = new GameFailWindow(score);
        egret.gui.PopUpManager.addPopUp(w, true, true);        
    }

    public txtScore: egret.gui.Label;
    public btnOK: egret.gui.Button;
    private _score: number = 0;
    public constructor(score:number)
    {
        super();
        this._score = score;
        this.skinName = skins.windows.GameFailWindowSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }

    public createCompleteEvent(event: egret.gui.UIEvent): void
    {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);

        this.txtScore.text = "本轮获得高度：" + this._score;

        this.btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);

    }

    private onTouchTap(e: egret.TouchEvent): void
    {
        this.btnOK.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        egret.gui.PopUpManager.removePopUp(this);
       
        Global.GAME_LAYER.removeChildren();
        Global.UI_LAYER.removeAllElements();
        Global.UI_LAYER.addElement(new Share());
    }
}