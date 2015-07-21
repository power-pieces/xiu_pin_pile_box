//物理世界
class PWorld
{
    public world: p2.World;
    public factor: number;
    public mass: number;
    public constructor()
    {
        //物理世界
        this.world = new p2.World();
        //摩擦力
        this.world.defaultContactMaterial.friction = DataCenter.cfg.friction;
        //弹力
        this.world.defaultContactMaterial.restitution = DataCenter.cfg.restitution;
        //硬度
        this.world.defaultContactMaterial.stiffness = DataCenter.cfg.stiffness;
        //柔软度
        this.world.defaultContactMaterial.relaxation = DataCenter.cfg.relaxation;
        //睡眠模式
        this.world.sleepMode = p2.World.NO_SLEEPING;

        //物理世界的比例
        this.factor = DataCenter.cfg.factor;

        this.mass = DataCenter.cfg.mass;
    }

    //物理世界更新
    public step(dt)
    {
        this.world.step(dt / 1000);

        var world: p2.World = this.world;

        var stageHeight: number = egret.MainContext.instance.stage.stageHeight;
        var l = world.bodies.length;
        for (var i: number = 0; i < l; i++)
        {
            var boxBody: p2.Body = world.bodies[i];
            if (boxBody.displays)
            {
                var box: egret.DisplayObject = boxBody.displays[0];
                if (box)
                {
                    box.x = boxBody.position[0] * this.factor;
                    box.y = stageHeight - boxBody.position[1] * this.factor;
                    box.rotation = 360 - boxBody.angle * 180 / Math.PI;
                    if (boxBody.sleepState == p2.Body.SLEEPING)
                    {
                        box.alpha = 0.5;
                    }
                    else
                    {
                        box.alpha = 1;
                    }
                }
            }
        }
    }

    //映射一个物体到物理世界
    public mappingObject(obj:egret.DisplayObject)
    {
        var fw: number = obj.width / this.factor;
        var fh: number = obj.height / this.factor;
        var fx: number = obj.x / this.factor;
        var fy: number = (Global.stage.stageHeight - obj.y) / this.factor;

        var shape: p2.Rectangle = new p2.Rectangle(fw, fh);
        var body: p2.Body = new p2.Body({ mass: this.mass, position: [fx, fy] });
        body.addShape(shape);
        body.displays = [obj];

        this.world.addBody(body);        
    }

    public createGround()
    {
        var plane: p2.Plane = new p2.Plane();
        var body: p2.Body = new p2.Body({ mass: 2, position: [0, 0] });
        body.type = p2.Body.STATIC;
        body.addShape(plane);    
        
        this.world.addBody(body);       
    }
}