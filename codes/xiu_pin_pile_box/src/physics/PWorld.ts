//物理世界
class PWorld
{
    public world: p2.World;
    public factor: number;
    public constructor()
    {
        //物理世界
        this.world = new p2.World();
        //摩擦力
        this.world.defaultContactMaterial.friction = DataCenter.cfg.friction;
        //弹力
        this.world.defaultContactMaterial.restitution = DataCenter.cfg.restitution;
        //柔软度
        //world.defaultContactMaterial.relaxation = Number.MAX_VALUE;
        //睡眠模式
        this.world.sleepMode = p2.World.NO_SLEEPING;

        //物理世界的比例
        this.factor = DataCenter.cfg.factor;
    }

    //物理世界更新
    public step(dt)
    {
        this.world.step(dt / 1000);
    }

    //映射一个物体到物理世界
    public mappingObject(obj:egret.DisplayObject)
    {

    }
}