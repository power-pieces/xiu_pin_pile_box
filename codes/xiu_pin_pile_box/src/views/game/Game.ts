//游戏主体
class Game extends egret.Sprite
{
    public p2: PWorld;
    public bg: egret.Bitmap;
    

    public constructor()
    {
        super();
        this.init();
    }

    private init():void
    {
        this.p2 = new PWorld();
        this.bg = Texture.createBitmap("tower_jpg");
        this.addChild(this.bg);
        this.bg.y = Global.stage.stageHeight - this.bg.height;
    }

    public addListeners(): void
    {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegionHandler, this);
        
        egret.Ticker.getInstance().register(this.onTick, this);
    }

    public removeListeners(): void
    {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegionHandler, this);
        
        egret.Ticker.getInstance().unregister(this.onTick, this);
    }

    private touchBegionHandler(e: egret.TouchEvent): void
    {

    }

    private onTick(dt): void
    {
        this.p2.step(dt);
    }
}