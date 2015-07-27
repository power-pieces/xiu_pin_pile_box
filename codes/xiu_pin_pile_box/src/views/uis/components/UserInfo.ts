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

    public constructor()
    {
        super();
        this.skinName = skins.components.UserInfoSkin;
    }
}