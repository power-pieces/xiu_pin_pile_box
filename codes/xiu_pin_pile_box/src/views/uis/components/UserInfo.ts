/**
*
* @author Jing
*
*/
class UserInfo extends egret.gui.SkinnableComponent
{
    public imgPic: egret.gui.UIAsset;
    public txtName: egret.gui.Label;
    public txtScore: egret.gui.Label;
    public txtTitle: egret.gui.Label;
    public list: egret.gui.Group;

    private _userInfo: any;
    public constructor()
    {
        super();
        
        this.skinName = skins.components.UserInfoSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }

    public setUserInfo(userInfo:any): void
    {
        this._userInfo = userInfo;
        this.refresh();
    }

    public createCompleteEvent(event: egret.gui.UIEvent): void
    {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);     
        
        if (null == this._userInfo)
        {
            this.imgPic.source = DataCenter.pic;
            this.txtName.text = DataCenter.nickname;
            this.txtScore.text = "总高度：" + DataCenter.totalScore;
            this.txtTitle.text = "已获得秀品好礼";
        }
        
    }

    public refresh(): void
    {
        if (null == this._userInfo)
        {
            this.imgPic.source = DataCenter.pic;
            this.txtName.text = DataCenter.nickname;
            this.txtScore.text = "总高度：" + DataCenter.totalScore;
            this.txtTitle.text = "已获得秀品好礼";
        }
        else
        {
            this.imgPic.source = this._userInfo.pic;
            this.txtName.text = this._userInfo.name;
            this.txtScore.text = "总高度：" + this._userInfo.totalScore;
            this.txtTitle.text = this._userInfo.name + "，已获得秀品好礼";
        }
    }
}