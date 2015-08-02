/**
 *
 * @author Jing
 *
 */
class RankItem extends egret.gui.SkinnableComponent
{
    public txtRank: egret.gui.Label;
    public pic: egret.gui.UIAsset;
    public txtName: egret.gui.Label;
    public txtScore: egret.gui.Label;

    public constructor()
    {
        super();
        this.skinName = skins.components.RankItemSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }

    public createCompleteEvent(event: egret.gui.UIEvent): void
    {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }

    public init(rank:number, pic:string, name:string, score:number): void
    {
        this.txtRank.text = rank.toString();
        if (rank <= 3)
        {
            this.txtRank.text = "";
        }
        this.pic.source = pic;
        this.txtName.text = name;
        this.txtScore.text = "最高分：" + score.toString();
    }
}
