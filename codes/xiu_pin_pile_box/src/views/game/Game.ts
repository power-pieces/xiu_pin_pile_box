//游戏主体
class Game extends egret.Sprite
{
    public p2: PWorld;
    public bg: egret.Bitmap;
    public createTime: number = 0;
    //游戏分数
    //private _score: number = 0;

    private _info: GameInfo = new GameInfo();

    private _box: Box = new Box(true);
    private _plane: egret.Bitmap = null;
    private _planeVX: number = 10;
    private _boxs: Box[] = [];
    private _gotHeight: boolean[] = [false, false, false];
    

    public constructor()
    {
        super();
        this.init();
        this.addListeners();
    }

    private init():void
    {
        DataCenter.scoreGameing = 0;
        AudioDevice.playBGM(AudioName.BGM_GAME);
        this.touchEnabled = true;        
        this.p2 = new PWorld();
        this.p2.createGround();
        this.bg = Texture.createBitmap("game_bg_png");
        this.addChild(this.bg);
        this.bg.y = Global.stage.stageHeight - this.bg.height;

        this.scrollRect = new egret.Rectangle(0, 0, Global.stage.stageWidth, Global.stage.stageHeight);

        Global.UI_LAYER.addElement(this._info);
        this._info.setInfo(DataCenter.scoreGameing, DataCenter.bestScore, DataCenter.totalScore, DataCenter.power);

        this._plane = Texture.createBitmap("plane_png");
        this._plane.anchorOffsetX = 117;
        this._plane.anchorOffsetY = 189;
        this.addChild(this._plane);
        this.addChild(this._box);
        this._plane.y = this._box.y = 300;
        this._box.x = this._plane.x;
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
        egret.Tween.get(this._plane).to({ y: this._plane.y -= scrollHeight }, scrollDuration);
        egret.Tween.get(this.scrollRect).to({ y: this.scrollRect.y - scrollHeight }, scrollDuration);
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

        this.movePlane();
        this.p2.step(dt);
        this.checkScore();
        this.checkGameOver();
        
    }

    private movePlane(): void
    {
        this._box.visible = egret.getTimer() >= this.createTime ? true : false;

        var left: number = 100;
        var right: number = Global.stage.stageWidth - left;
        
        this._plane.x += this._planeVX;
        if (this._plane.x > right)
        {
            this._plane.x = right;
            this._planeVX *= -1;
            this._plane.scaleX = 1;
        }
        else if (this._box.x < left)
        {
            this._plane.x = left;
            this._planeVX *= -1;
            this._plane.scaleX = -1;
        }

        this._box.x = this._plane.x;
        this._box.y = this._plane.y;
    }

    private createBox(x:number, y:number): void
    {
        AudioDevice.playEffect(AudioName.DROP_BOX);
        var box: Box = new Box();
        
        if (this._boxs.length > 0)
        {
            box.setDownBox(this._boxs[this._boxs.length - 1]);
        }
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
        //while (--len > -1)
        //{
        //    box = this._boxs[len];
        //    if (box.isDrop)
        //    {
        //        DataCenter.scoreGameing = DataCenter.cfg.eachBoxScore * (len + 1);
                var strip: Strip;
                if (DataCenter.lotteryPoint + DataCenter.scoreGameing >= 500 && this._gotHeight[0] == false)
                {
                    this._gotHeight[0] = true;
                    AudioDevice.playEffect(AudioName.BOX_HEIGHT_ENOUGH);

                    strip = new Strip(Effect.getEffectSheet("got_500m_json", "", 1, 27), 24);
                }
                //else if (DataCenter.scoreGameing >= 200 && this._gotHeight[1] == false)
                //{
                //    this._gotHeight[1] = true;
                //    AudioDevice.playEffect(AudioName.BOX_HEIGHT_ENOUGH);

                //    strip = new Strip(Effect.getEffectSheet("got_200m_json", "D", 1, 27), 24);
                //}
                //else if (DataCenter.scoreGameing >= 340 && this._gotHeight[2] == false)
                //{
                //    this._gotHeight[2] = true;
                //    AudioDevice.playEffect(AudioName.BOX_HEIGHT_ENOUGH);

                //    strip = new Strip(Effect.getEffectSheet("got_340m_json", "E", 1, 27), 24);
                //}

                if (null != strip)
                {
                    strip.x = Global.stage.stageWidth / 2;
                    strip.y = 250;
                    Global.GAME_LAYER.addChild(strip);
                    //this.addChild(strip);
                }
                //break;
            //}
        //}

        //TODO 检查有多少个COOL

        this._info.setInfo(DataCenter.scoreGameing, DataCenter.bestScore, DataCenter.totalScore, DataCenter.power);
    }

    //检查游戏是否结束
    private checkGameOver(): void
    {
        var len: number = this._boxs.length;
        var box: Box = null;
        while (--len > 0)
        {
            box = this._boxs[len];
            var downBox: Box = this._boxs[len - 1];
            if (box.y >= downBox.y - (downBox.height / 2))
            {                
                this.gameOver();
                break;
            }
        }
    }

    private gameOver(): void
    {
        this.removeListeners();

        this.onSureOver();
        //Alert.show("游戏结束", this.onSureOver, this);
    }

    private onSureOver(): void
    {
        DataCenter.lotteryPoint += DataCenter.scoreGameing;
        AudioDevice.playBGM(AudioName.BGM);
        new GameResultCmd().run(DataCenter.id, DataCenter.scoreGameing);

        DataCenter.totalScore += DataCenter.scoreGameing;
        if (DataCenter.scoreGameing > DataCenter.bestScore)
        {
            DataCenter.bestScore = DataCenter.scoreGameing;
        }
        DataCenter.power -= 1;

            

        //var lotteryScore: number[] = DataCenter.cfg.lotteryScore;
        //var len: number = lotteryScore.length;
        //while (--len > -1)
        //{
        //    if (DataCenter.scoreGameing >= lotteryScore[len])
        //    {
        //        this.dispose();   
        //        Global.UI_LAYER.addElement(new Lottery(len));
        //        return;
        //    }
        //}

        GameFailWindow.show(DataCenter.scoreGameing);
        //Global.UI_LAYER.addElement(new Share());
    }

    private dispose(): void
    {
        this.parent.removeChild(this);
        Global.UI_LAYER.removeElement(this._info);
    }
}