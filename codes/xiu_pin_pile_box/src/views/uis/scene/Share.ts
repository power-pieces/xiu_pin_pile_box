/**
*
* @author Jing
*
*/
class Share extends egret.gui.SkinnableComponent
{
    public txtPower: egret.gui.Label;
    public btnGame: egret.gui.Button;
    public btnRank: egret.gui.Button;
    public btnShare: egret.gui.Button;
    public imgPic: egret.gui.UIAsset;
    public txtName: egret.gui.Label;
    public txtScore: egret.gui.Label;
    public listRewards: egret.gui.Group;
    public listFriends: egret.gui.Group;

    public constructor()
    {
        super();
        this.skinName = skins.scene.ShareSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }

    public createCompleteEvent(event: egret.gui.UIEvent): void
    {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this); 
        
        this.addListeners();
        this.txtPower.text = DataCenter.power.toString();

        this.imgPic.source = DataCenter.pic;
        this.txtName.text = DataCenter.nickname;
        this.txtScore.text = DataCenter.totalScore + "";


        for (var k in DataCenter.rewards)
        {
            var rewardItem: RewardItem = new RewardItem(DataCenter.rewards[k]);
            this.listRewards.addElement(rewardItem);
        }

        for (var k in DataCenter.receives)
        {
            var friendItem: FriendItem = new FriendItem(DataCenter.receives[k]);
            this.listFriends.addElement(friendItem);
        }
    }

    public addListeners(): void
    {
        this.btnGame.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnGame_touchBegionHandler, this);
        this.btnRank.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnRank_touchBegionHandler, this);
        this.btnShare.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnShare_touchBegionHandler, this);
    }

    public removeListeners(): void
    {
        this.btnGame.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnGame_touchBegionHandler, this);
        this.btnRank.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnRank_touchBegionHandler, this);
        this.btnShare.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnShare_touchBegionHandler, this);
    }

    private btnGame_touchBegionHandler(e: egret.TouchEvent): void
    {
        if (DataCenter.power <= 0)
        {
            Alert.show("alert_tip_1");
            return;
        }

        Global.UI_LAYER.removeAllElements();
        Global.GAME_LAYER.addChild(new Game());

    }
    private btnRank_touchBegionHandler(e: egret.TouchEvent): void
    {
        Global.UI_LAYER.removeElement(this);
        Global.UI_LAYER.addElement(new Rank());
    }
    private btnShare_touchBegionHandler(e: egret.TouchEvent): void
    {
        
        ShareTip.show();
    }

}