/**
*
* @author Jing
*
*/
class Lottery extends egret.gui.SkinnableComponent
{
    //没有奖励的角度
    static NO_REWARD_ANGLE: number[] = [0, 120, 240];
    //有奖励的角度
    static REWARD_ANGLE: number[] = [60, 180, 300];

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
        switch (this._type)
        {
            case 0:
                this.imgTitle.source = "lottery_100m_png";
                break;
            case 1:
                this.imgTitle.source = "lottery_300m_png";
                break;
            case 2:
                this.imgTitle.source = "lottery_500m_png";
                break;
        }
        //this.txtTitle.text = DataCenter.cfg.lotteryScore[this._type] + "米高空抽奖点";
        var lottery:any = this.imgLottery;
        lottery.anchorX = 0.5;
        lottery.anchorY = 250 / this.imgLottery.height;
        
        lottery.x += lottery.width / 2;
        lottery.y += this.imgLottery.height * this.imgLottery.anchorY;

        
    }

    private lottery_touchBeginHandler(e: egret.TouchEvent): void
    {
        var angle: number = 360 * 10;
        var index:number = parseInt((Math.random() * 3).toString());
        if (DataCenter.rewardType == 0)
        {
            //找个没有奖的°数
            angle += Lottery.NO_REWARD_ANGLE[index];
        }
        else
        {
            //找个有奖的°数
            angle += Lottery.REWARD_ANGLE[index];
        }


        var lottery: any = this.imgLottery;
        egret.Tween.get(lottery).to({ rotation: angle }, 5000, egret.Ease.quadOut).call(this.onActionOver, this);        
    }

    private btnRecord_touchBeginHandler(e: egret.TouchEvent): void
    {
        Global.UI_LAYER.removeElement(this);
        Global.UI_LAYER.addElement(new Share());
    }

    private onActionOver(): void
    {
        if (DataCenter.rewardType == 0)
        {
            LotteryFailWindow.show();
        }
        else
        {
            LotteryInfoWindow.show(DataCenter.rewardType, DataCenter.rewardKey);
        }

    }
}
