//游戏主体
class Game extends egret.Sprite
{
    public p2: PWorld;
    public bg: egret.Bitmap;
    public createTime: number = 0;
    

    public constructor()
    {
        super();
        this.init();
        this.addListeners();
    }

    private init():void
    {
        this.touchEnabled = true;        
        this.p2 = new PWorld();
        this.p2.createGround();
        this.bg = Texture.createBitmap("tower_jpg");
        this.addChild(this.bg);
        this.bg.y = Global.stage.stageHeight - this.bg.height;

        this.scrollRect = new egret.Rectangle(0,0,Global.stage.stageWidth, Global.stage.stageHeight);
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
        if(egret.getTimer() < this.createTime)
        {
            return;
        }
        
        this.createTime = egret.getTimer() + DataCenter.cfg.createBoxInterval;
        
        var boxAmount:number = this.p2.world.bodies.length;
        if(boxAmount > DataCenter.cfg.scrollBoxAmount)
        {
            this.scrollMap();
        }
        this.createBox(e.localX, e.localY);

    }
    
    //滚动地图
    private scrollMap()
    {
        var scrollHeight: number = DataCenter.cfg.scrollHeight;
        var scrollDuration: number = DataCenter.cfg.scrollDuration;
        egret.Tween.get(this.scrollRect).to({ y: this.scrollRect.y -  scrollHeight}, scrollDuration);
    }

    private onTick(dt): void
    {
        this.p2.step(dt);
    }

    private createBox(x:number, y:number): void
    {
        var box: Box = new Box();
        box.anchorX = 0.5;
        box.anchorY = 0.5;
        box.x = x;        
        box.y = y;
        this.addChild(box);
        this.p2.mappingObject(box);
    }
}