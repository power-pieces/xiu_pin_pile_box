//物理世界
var PWorld = (function () {
    function PWorld() {
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
    var __egretProto__ = PWorld.prototype;
    //物理世界更新
    __egretProto__.step = function (dt) {
        this.world.step(dt / 1000);
    };
    //映射一个物体到物理世界
    __egretProto__.mappingObject = function (obj) {
    };
    return PWorld;
})();
PWorld.prototype.__class__ = "PWorld";
//# sourceMappingURL=PWorld.js.map