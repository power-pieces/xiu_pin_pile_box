class GameFailWindow extends egret.gui.SkinnableComponent
{
    public static show(score:number)
    {
        var w: GameFailWindow = new GameFailWindow(score);
        egret.gui.PopUpManager.addPopUp(w, true, true);
        AudioDevice.playEffect(AudioName.GAME_RESULT);   
    }

    public txtScore: egret.gui.Label;
    public btnOK: egret.gui.UIAsset;
    public imgLight: egret.gui.UIAsset;

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

        this.txtScore.text = this._score.toString();

        this.btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);

        this.imgLight.anchorX = this.imgLight.anchorY = 0.5;
        this.imgLight.x += this.imgLight.width / 2;
        this.imgLight.y += this.imgLight.height / 2;
    }

    private enterFrameHandler(e: egret.Event): void
    {
        this.imgLight.rotation += 1;
    }

    private onTouchTap(e: egret.TouchEvent): void
    {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        this.btnOK.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        egret.gui.PopUpManager.removePopUp(this);
       
        Global.GAME_LAYER.removeChildren();
        Global.UI_LAYER.removeAllElements();

        if (DataCenter.isLottery != 0)
        {
            DataCenter.isLottery = 0;
            Global.UI_LAYER.addElement(new Lottery(-1));
        }
        else
        {
            Global.UI_LAYER.addElement(new Share());
        }

        //var lotteryScore: number[] = DataCenter.cfg.lotteryScore;
        //var len: number = lotteryScore.length;
        //while (--len > -1)
        //{
        //    if (this._score >= lotteryScore[len])
        //    {
        //        //this.dispose();
        //        Global.UI_LAYER.addElement(new Lottery(len));
        //        return;
        //    }
        //}



        //Global.UI_LAYER.addElement(new Share());
    }
}