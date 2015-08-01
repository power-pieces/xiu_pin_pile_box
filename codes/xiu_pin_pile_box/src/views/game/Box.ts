class Box extends egret.Sprite
{
    public static getBoxEffectSheet():egret.Texture[]
    {
        var sheet: egret.Texture[] = [];
        
        var ss: egret.SpriteSheet = RES.getRes("effect_json");

        for (var i: number = 1; i <= 9; i++)
        {
            sheet.push(ss.getTexture("a1000" + i));
        }

        for (var i: number = 10; i <= 34; i++)
        {
            sheet.push(ss.getTexture("a100" + i));
        }
        return sheet;
    }

    public isDrop: boolean = false;
    private _checkPos: egret.Point = new egret.Point(0, 0);
    private _checkTime: number = 0;
    private _isT: boolean = false;
    public constructor(isT:boolean = false)
    {
        super();
        this._isT = isT;
        this.init();           
    }

    private init()
    {
        var bmd: egret.Bitmap = Texture.createBitmap(this._isT?"box_t_png":"box_png");
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
                   
                    var strip: Strip = new Strip(Box.getBoxEffectSheet(), 24);
                    strip.x = this.x;
                    strip.y = this.y;
                    this.parent.addChild(strip);

                    AudioDevice.playEffect(AudioName.HIT_BOX);
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