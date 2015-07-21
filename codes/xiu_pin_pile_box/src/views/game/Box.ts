class Box extends egret.Sprite
{
    public constructor()
    {
        super();
        this.init();           
    }

    private init()
    {
        var bmd: egret.Bitmap = Texture.createBitmap("box_jpg");
        this.addChild(bmd);
    }
}