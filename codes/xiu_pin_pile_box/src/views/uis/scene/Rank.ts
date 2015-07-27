/**
*
* @author Jing
*
*/
class Rank extends egret.gui.SkinnableComponent
{
    public top3: RankItem[] = new RankItem[3];

    public constructor()
    {
        super();
        this.skinName = skins.scene.RankSkin;
    }
}