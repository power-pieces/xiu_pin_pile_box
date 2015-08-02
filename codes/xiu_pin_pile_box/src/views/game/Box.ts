class Box extends egret.Sprite
{
    public isDrop: boolean = false;
    public isCool: boolean = false;
    private _checkPos: egret.Point = new egret.Point(0, 0);
    private _checkTime: number = 0;
    private _isT: boolean = false;
    private _downBox: Box = null;
    public constructor(isT:boolean = false)
    {
        super();
        this._isT = isT;
        this.init();           
    }

    public setDownBox(downBox: Box)
    {
        this._downBox = downBox;
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
                    DataCenter.scoreGameing += DataCenter.cfg.eachBoxScore;
                    if (this._downBox != null && this._downBox.isDrop)
                    {
                        var boxD: number = Math.abs(this._downBox.x - this.x);
                        if (boxD <= DataCenter.cfg.coolDistance)
                        {
                            this.isCool = true;
                            DataCenter.scoreGameing += DataCenter.cfg.eachBoxScore;
                        }
                    }
                   
                    var strip: Strip = new Strip(Effect.getEffectSheet(this.isCool?"effect_cool_json":"effect_json",this.isCool?"B":"A",1,19), 24);
                    strip.x = this.x;
                    strip.y = this.y - 100;
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