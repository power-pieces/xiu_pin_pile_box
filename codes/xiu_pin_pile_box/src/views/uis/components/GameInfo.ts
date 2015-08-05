/**
*
* @author Jing
*
*/
class GameInfo extends egret.gui.SkinnableComponent
{
    public imgBg: egret.gui.UIAsset;

    public txtScore: egret.gui.Label;
    public txtBest: egret.gui.Label;
    public txtTotal: egret.gui.Label;

    public groupPower: egret.gui.Group;

    private _score: string;
    private _best: string;
    private _total: string;

    public constructor()
    {
        super();
        this.skinName = skins.components.GameInfoSkin;
        this.setInfo(0, 0, 0, 0);
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }

    public createCompleteEvent(event: egret.gui.UIEvent): void
    {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        for (var i: number = 0; i < DataCenter.power; i++)
        {
            if (i > 10)
            {
                break;
            }
            this.groupPower.addElement(new egret.gui.UIAsset("power_png"));
        }
        this.refresh();
    }

    public setInfo(score:number, best:number, total:number, power:number): void
    {
        this._score = "SCORE:" + score;
        this._best = "单局最高:" + best;
        this._total = "总高度:" + total;

        this.refresh();
    }

    public refresh(): void
    {
        if (this.initialized)
        {
            this.txtScore.text = this._score;
            this.txtBest.text = this._best;
            this.txtTotal.text = this._total;

        }
    }
}
