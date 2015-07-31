class RewardItem extends egret.gui.SkinnableComponent
{
    public imgIcon: egret.gui.UIAsset;
    private _data: any = null;
    public constructor(data:any)
    {
        super();
        this.skinName = skins.components.RewardItemSkin;
        this._data = data;
    }

    public childrenCreated(): void
    {
        this.imgIcon.source = "r_icon_" + this._data.type + "_png";
    }
}