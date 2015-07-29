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
    public userInfo: UserInfo;

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

        this.userInfo.imgPic.source = DataCenter.pic;
        this.userInfo.txtName.text = DataCenter.name;
        this.userInfo.txtScore.text = "总高度：" + DataCenter.totalScore;
        this.userInfo.txtTitle.text = "已获得秀品好礼";
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
            Alert.show("能量不足！");
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