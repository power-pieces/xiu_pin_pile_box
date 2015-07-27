/**
*
* @author Jing
*
*/
class BeShare extends egret.gui.SkinnableComponent
{
    public userInfo: UserInfo;
    public txtRank: egret.gui.Label;
    public btnGivePower: egret.gui.Button;
    public btnGame: egret.gui.Button;

    public constructor()
    {
        super();
        this.skinName = skins.scene.BeShareSkin;       
    }
}
