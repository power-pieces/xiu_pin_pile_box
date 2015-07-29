/**
*
* @author Jing
*
*/
class GameInfo extends egret.gui.SkinnableComponent
{
    public imgBg: egret.gui.UIAsset;

    public txtInfo: egret.gui.Label;

    private _info: string = "";

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
        this.refresh();
    }

    public setInfo(score:number, best:number, total:number, power:number): void
    {
        this._info = StringUtil.format("本轮高度：{0}      历史高度：{1}    总高度：{2}    体力：{3}", score, best, total, power);
        this.refresh();
    }

    public refresh(): void
    {
        if (this.initialized)
        {
            this.txtInfo.text = this._info;
        }
    }
}
