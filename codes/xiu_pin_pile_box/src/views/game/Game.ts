//游戏主体
class Game extends egret.Sprite
{
    public p2: PWorld;
    public bg: egret.Bitmap;
    public createTime: number = 0;
    //游戏分数
    private _score: number = 0;

    private _info: GameInfo = new GameInfo();

    private _box: Box = new Box();
    private _boxVX: number = 10;
    private _boxs: Box[] = [];
    

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

        this.scrollRect = new egret.Rectangle(0, 0, Global.stage.stageWidth, Global.stage.stageHeight);

        Global.UI_LAYER.addElement(this._info);
        this._info.setInfo(this._score, DataCenter.bestScore, DataCenter.totalScore, DataCenter.power);


        this.addChild(this._box);
        this._box.y = 100;
        this._box.x = 100;
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
        this.createBox(e.localX, e.localY);
        var boxAmount:number = this.p2.world.bodies.length;
        if(boxAmount > DataCenter.cfg.scrollBoxAmount)
        {
            this.scrollMap();
        }       
    }
    
    //滚动地图
    private scrollMap()
    {
        var scrollHeight: number = DataCenter.cfg.scrollHeight;
        var scrollDuration: number = DataCenter.cfg.scrollDuration;
        egret.Tween.get(this.scrollRect).to({ y: this.scrollRect.y - scrollHeight }, scrollDuration);
        this._box.y -= scrollHeight;
    }

    private onTick(dt): void
    {
        if (dt < 10)
        {
            return;
        }
        if (dt > 1000)
        {
            return;
        }

        this.moveBox();
        this.p2.step(dt);
        this.checkScore();
        this.checkGameOver();
        
    }

    private moveBox(): void
    {
        this._box.visible = egret.getTimer() >= this.createTime ? true : false;
        this._box.x += this._boxVX;
        if (this._box.x > 540)
        {
            this._box.x = 540;
            this._boxVX *= -1;
        }
        else if (this._box.x < 100)
        {
            this._box.x = 100;
            this._boxVX *= -1;
        }
    }

    private createBox(x:number, y:number): void
    {
        var box: Box = new Box();
        this._boxs.push(box);
        box.x = this._box.x;        
        box.y = this._box.y;
        this.addChild(box);
        this.p2.mappingObject(box);        
    }

    //检查游戏当前分数
    private checkScore(): void
    {
        var len: number = this._boxs.length;
        var box: Box = null;
        while (--len > -1)
        {
            box = this._boxs[len];
            if (box.isDrop)
            {
                this._score = DataCenter.cfg.eachBoxScore * (len + 1);
                break;
            }
        }
        this._info.setInfo(this._score, DataCenter.bestScore, DataCenter.totalScore, DataCenter.power);
    }

    //检查游戏是否结束
    private checkGameOver(): void
    {
        var len: number = this._boxs.length;
        var box: Box = null;
        while (--len > 0)
        {
            box = this._boxs[len];
            var downBox:Box= this._boxs[len - 1];
            if (box.y >= downBox.y)
            {                
                this.gameOver();
                break;
            }
        }
    }

    private gameOver(): void
    {
        this.removeListeners();
        Alert.show("游戏结束", this.onSureOver, this);
    }

    private onSureOver(): void
    {
        new GameResultCmd().run(DataCenter.id, this._score);

        DataCenter.totalScore += this._score;
        if (this._score > DataCenter.bestScore)
        {
            DataCenter.bestScore = this._score;
        }
        DataCenter.power -= 1;

        this.dispose();        

        var lotteryScore: number[] = DataCenter.cfg.lotteryScore;
        var len: number = lotteryScore.length;
        while (--len > -1)
        {
            if (this._score >= lotteryScore[len])
            {
                Global.UI_LAYER.addElement(new Lottery(len));
                return;
            }
        }

        Global.UI_LAYER.addElement(new Share());
    }

    private dispose(): void
    {
        this.parent.removeChild(this);
        Global.UI_LAYER.removeElement(this._info);
    }
}