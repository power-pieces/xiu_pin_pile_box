/**
*
* @author Jing
*
*/
class BeShare extends egret.gui.SkinnableComponent
{
    public imgPic: egret.gui.UIAsset;
    public txtName: egret.gui.Label;
    public txtRank: egret.gui.BitmapLabel;
    public btnGivePower: egret.gui.Button;
    public btnGame: egret.gui.Button;
    public rectAPK: egret.gui.Rect;

    public constructor()
    {
        super();
        this.skinName = skins.scene.BeShareSkin;       
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }

    public createCompleteEvent(event: egret.gui.UIEvent): void
    {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
       

        NoticeManager.addNoticeAction(GameNotice.GOT_INVITER_INFO, this.gotInviterInfoHandler.bind(this));

        new GetInfoCmd().run(DataCenter.inviter);


        this.btnGivePower.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnGivePower_touchBeginHandler, this);
        this.btnGame.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnGame_touchBeginHandler, this);
        

    }



    public gotInviterInfoHandler(n: GameNotice): void
    {
        this.imgPic.source = DataCenter.inviterPic;
        this.txtName.text = DataCenter.inviterName;
        //this.txtScore.text = DataCenter.inviterTotalScore + "";
        //this.txtScore.letterSpacing = 2;
        //this.txtTitle.text = DataCenter.inviterName + "，已获得秀品好礼";

        //for (var k in DataCenter.inviterRewards)
        //{
        //    var rewardItem: RewardItem = new RewardItem(DataCenter.rewards[k]);
        //    this.listRewards.addElement(rewardItem);
        //}
        this.txtRank.text = DataCenter.inviterRank.toString();
        this.txtRank.letterSpacing = 2;
    }

    public btnGivePower_touchBeginHandler(e: egret.TouchEvent): void
    {
        AudioDevice.playEffect(AudioName.CLICK);
        new GivePowerCmd().run(DataCenter.id, DataCenter.inviter);
    }

    public btnGame_touchBeginHandler(e: egret.TouchEvent): void
    {
        AudioDevice.playEffect(AudioName.CLICK);
        Global.UI_LAYER.removeAllElements();
        Global.UI_LAYER.addElement(new Intro());
    }
}
