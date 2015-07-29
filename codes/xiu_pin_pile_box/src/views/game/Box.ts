class Box extends egret.Sprite
{
    public isDrop: boolean = false;
    private _checkPos: egret.Point = new egret.Point(0, 0);
    private _checkTime: number = 0;

    public constructor()
    {
        super();
        this.init();           
    }

    private init()
    {
        var bmd: egret.Bitmap = Texture.createBitmap("box_jpg");
        this.addChild(bmd);

        this.anchorX = 0.5;
        this.anchorY = 0.5;
    }

    public setPosition(x:number, y:number): void
    {
        if (false == this.isDrop)
        {
            //误差值
            var tolerance: number = DataCenter.cfg.tolerance;
            //检查时间间隔
            var checkInterval: number = DataCenter.cfg.stopCheckInterval; 

            var dx: number = Math.abs(x - this._checkPos.x);
            var dy: number = Math.abs(y - this._checkPos.y);
            var now: number = egret.getTimer();
            
            if (dx < tolerance && dy < tolerance )
            {
                var interval = now - this._checkTime;
                if (interval >= checkInterval)
                {
                    this.isDrop = true;
                }                
            }
            else
            {
                this._checkPos.x = x;
                this._checkPos.y = y;
                this._checkTime = now;
            }

        }

        this.x = x;
        this.y = y;
    }
}