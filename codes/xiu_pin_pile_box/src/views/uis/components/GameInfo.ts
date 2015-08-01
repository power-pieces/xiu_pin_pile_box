/**
*
* @author Jing
*
*/
class GameInfo extends egret.gui.SkinnableComponent
{
    public imgBg: egret.gui.UIAsset;

    public txtInfo: egret.gui.Label;

    public groupPower: egret.gui.Group;

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
        this._info = StringUtil.format("本轮高度：{0}      历史高度：{1}    总高度：{2}", score, best, total);
        for (var i: number = 0; i < power; i++)
        {

        }
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
