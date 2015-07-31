class FriendItem extends egret.gui.SkinnableComponent
{
    public imgPic: egret.gui.UIAsset;
    public txtName: egret.gui.Label;
    private _data: any = null;
    public constructor(data: any)
    {
        super();
        this.skinName = skins.components.FriendItemSkin;
        this._data = data;
    }

    public childrenCreated(): void
    {
        this.imgPic.source = this._data.pic;
        this.txtName.text = this._data.name;
    }
}