class Strip extends egret.Bitmap
{
    private _sheet: egret.Texture[] = null;
    private _interval: number = 0;
    private _changeTime: number = 0;
    private _index: number = 0;

    public constructor(sheet:egret.Texture[], fps:number)
    {
        super();

        this._sheet = sheet;
        this._interval = (1000 / fps) >> 0;

        egret.Ticker.getInstance().register(this.onTick, this);

        this.anchorX = this.anchorY = 0.5;
    }

    private onTick(dt): void
    {
        var now: number = egret.getTimer();
        if (now > this._changeTime)
        {
            if (this._index == this._sheet.length)
            {
                egret.Ticker.getInstance().unregister(this.onTick, this);
                if (this.parent)
                {
                    this.parent.removeChild(this);
                }
                return;
            }

            this._changeTime = now + this._interval;
            this.texture = this._sheet[this._index++];
        }

    }
} 