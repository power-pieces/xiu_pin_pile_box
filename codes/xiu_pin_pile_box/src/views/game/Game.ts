//游戏主体
class Game extends egret.Sprite
{
    public p2: PWorld;
    public bg: egret.Bitmap;
    

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

        egret.Profiler.getInstance().run();
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
        this.createBox(e.stageX, e.stageY);
    }

    private onTick(dt): void
    {
        this.p2.step(dt);
        //this.debug(this.p2);
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

    /**
 * debug模式，使用图形绘制
 */
    private debug(w: PWorld): void
    {
        var factor: number = w.factor;
        var world: p2.World = w.world;

        var canvas: HTMLCanvasElement = document.createElement("canvas");
        var stage: egret.Stage = egret.MainContext.instance.stage;
        var stageWidth: number = stage.stageWidth;
        var stageHeight: number = stage.stageHeight;
        canvas.width = stageWidth;
        canvas.height = stageHeight;
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgba(" + 255 + "," + 255 + "," + 0 + "," + 1 + ")";
        ctx.strokeStyle = "rgba(" + 255 + "," + 0 + "," + 0 + "," + 1 + ")";
        ctx.lineWidth = 1;

        var rendererContext = egret.MainContext.instance.rendererContext;
        var f = rendererContext.onRenderFinish;
        rendererContext.onRenderFinish = function ()
        {
            ctx.clearRect(0, 0, stageWidth, stageHeight);
            var l: number = world.bodies.length;
            for (var i: number = 0; i < l; i++)
            {
                var boxBody: p2.Body = world.bodies[i];
                if (boxBody.sleepState == p2.Body.SLEEPING)
                {
                    ctx.globalAlpha = 0.5;
                }
                else
                {
                    ctx.globalAlpha = 1;
                }
                for (var j: number = 0; j < boxBody.shapes.length; j++)
                {
                    var boxShape: p2.Shape = boxBody.shapes[j];
                    if (boxShape instanceof p2.Rectangle)
                    {
                        var x: number = (boxBody.position[0] + +boxBody.shapeOffsets[j][0]) * factor;
                        var y: number = stageHeight - (boxBody.position[1] + +boxBody.shapeOffsets[j][1]) * factor;
                        var w: number = (<p2.Rectangle>boxShape).width * factor;
                        var h: number = (<p2.Rectangle>boxShape).height * factor;
                        var matrix: egret.Matrix = egret.Matrix.identity.identity();
                        matrix.prependTransform(x, y, 1, 1, 360 - boxBody.angle * 180 / Math.PI, 0, 0, 0, 0);
                        ctx.save();
                        ctx.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
                        ctx.beginPath();
                        ctx.rect(-(<p2.Rectangle>boxShape).width / 2 * factor, -(<p2.Rectangle>boxShape).height / 2 * factor, w, h);
                        ctx.fill();
                        ctx.closePath();
                        ctx.restore();
                    }
                    else if (boxShape instanceof p2.Plane)
                    {
                        ctx.save();
                        ctx.setTransform(1, 0, 0, 1, 0, stageHeight - (boxBody.position[1] + boxBody.shapeOffsets[j][1]) * factor);
                        ctx.beginPath();
                        ctx.moveTo(0, 0);
                        ctx.lineTo(stageWidth, 0);
                        ctx.stroke();
                        ctx.closePath();
                        ctx.restore();
                    }
                    else if (boxShape instanceof p2.Circle)
                    {
                        var x: number = (boxBody.position[0] + boxBody.shapeOffsets[j][0]) * factor;
                        var y: number = stageHeight - (boxBody.position[1] + boxBody.shapeOffsets[j][1]) * factor;
                        var matrix: egret.Matrix = egret.Matrix.identity.identity();
                        matrix.prependTransform(x, y, 1, 1, 360 - boxBody.angle * 180 / Math.PI, 0, 0, 0, 0);
                        ctx.save();
                        ctx.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
                        ctx.beginPath();
                        ctx.arc(0, 0,(<p2.Circle>boxShape).radius * factor, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.closePath();
                        ctx.restore();
                    }
                }
            }
            rendererContext["_cacheCanvasContext"].drawImage(canvas, 0, 0, stageWidth, stageHeight, 0, 0, stageWidth, stageHeight);
            f.call(rendererContext);
        };
    }
}