class KeysItem extends egret.gui.SkinnableComponent
{
    public imgIcon: egret.gui.UIAsset;
    public listKeys: egret.gui.Group;
    public bg: egret.gui.UIAsset;

    private _datas: any[];

    public constructor(datas:any[])
    {
        this._datas = datas;
        super();
        this.skinName = skins.components.KeysItemSkin;
        
    }

    public childrenCreated(): void
    {
        if (this._datas.length > 0)
        {
            this.imgIcon.source = "r_icon_" + this._datas[0].type + "_png";

            var addH: number = 0;
            for (var i: number = 0; i < this._datas.length; i++)
            {
                var data: any = this._datas[i];
                var text: egret.gui.TextInput = new egret.gui.TextInput();
                text.text = data.key;
                
                text.width = this.listKeys.width;
                this.listKeys.addElement(text);

                addH += 40 + 6;
                
            } 

            
            this.bg.height += addH;
            this.height = this.bg.height;
        }
    }


}