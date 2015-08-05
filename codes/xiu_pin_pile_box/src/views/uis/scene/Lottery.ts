/**
*
* @author Jing
*
*/
class Lottery extends egret.gui.SkinnableComponent
{
    //奖品和角度的关系
    private static TYPE_ANGLE: number[] = [240, 60, 180, 300, 30, 210, 330, 0, 120, 90, 270, 150];

    public imgBg: egret.gui.UIAsset;

    public imgLottery: egret.gui.UIAsset;
    public imgTitle: egret.gui.UIAsset;
    //public txtTitle: egret.gui.Label;
    //public btnRecord: egret.gui.Button;

    private _type: number = -1;
    public constructor(t:number)
    {
        super();
        this._type = t;
        this.skinName = skins.scene.LotterySkin;      
        this.touchChildren = false;
        this.touchEnabled = true;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this); 
    }

    public createCompleteEvent(event: egret.gui.UIEvent): void
    {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.lottery_touchBeginHandler, this);
        //this.btnRecord.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnRecord_touchBeginHandler, this);
        this.refresh();
    }

    public refresh():void
    {        
        this.imgTitle.source = "lottery_" + DataCenter.rewardScore + "m_png";
        //this.txtTitle.text = DataCenter.cfg.lotteryScore[this._type] + "米高空抽奖点";
        var lottery:any = this.imgLottery;
        lottery.anchorX = 0.5;
        lottery.anchorY = 0.5;
        
        lottery.x += lottery.width / 2;
        lottery.y += lottery.height / 2;

        
    }

    private lottery_touchBeginHandler(e: egret.TouchEvent): void
    {
        AudioDevice.playEffect(AudioName.LOTTERY);
        var angle: number = 360 * 10;
        angle += (360 - Lottery.TYPE_ANGLE[DataCenter.rewardType]);

        var lottery: any = this.imgLottery;
        egret.Tween.get(lottery).to({ rotation: angle }, 5000, egret.Ease.quadOut).call(this.onActionOver, this);   
        Global.stage.touchEnabled = false;     
    }

    private btnRecord_touchBeginHandler(e: egret.TouchEvent): void
    {
        Global.UI_LAYER.removeElement(this);
        Global.UI_LAYER.addElement(new Share());
    }

    private onActionOver(): void
    {
        Global.stage.touchEnabled = true;
        if (DataCenter.rewardType == 0)
        {
            AudioDevice.playEffect(AudioName.LOTTERY_FAIL);
            LotteryFailWindow.show();
        }
        else
        {
            AudioDevice.playEffect(AudioName.LOTTERY_SUCCESS);
            LotteryInfoWindow.show(DataCenter.rewardType, DataCenter.rewardKey);
        }

    }
}
