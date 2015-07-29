/**
*
* @author Jing
*
*/
class Lottery extends egret.gui.SkinnableComponent
{
    public imgBg: egret.gui.UIAsset;

    public imgLottery: egret.gui.UIAsset;
    public txtTitle: egret.gui.Label;
    public btnRecord: egret.gui.Button;

    private _type: number = -1;
    public constructor(t:number)
    {
        super();
        this._type = t;
        this.skinName = skins.scene.LotterySkin;      
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this); 
    }

    public createCompleteEvent(event: egret.gui.UIEvent): void
    {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        this.imgLottery.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.lottery_touchBeginHandler, this);
        this.btnRecord.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnRecord_touchBeginHandler, this);
        this.refresh();
    }

    public refresh():void
    {
        this.txtTitle.text = DataCenter.cfg.lotteryScore[this._type] + "米高空抽奖点";
        var lottery: any = this.imgLottery;
        lottery.anchorX = lottery.anchorY = 0.5;
        
        lottery.x += lottery.width / 2;
        lottery.y += lottery.height / 2;
    }

    private lottery_touchBeginHandler(e: egret.TouchEvent): void
    {
        var lottery: any = this.imgLottery;
        egret.Tween.get(lottery).to({ rotation: 900 }, 1000);        
    }

    private btnRecord_touchBeginHandler(e: egret.TouchEvent): void
    {
        Global.UI_LAYER.removeElement(this);
        Global.UI_LAYER.addElement(new Share());
    }
}
