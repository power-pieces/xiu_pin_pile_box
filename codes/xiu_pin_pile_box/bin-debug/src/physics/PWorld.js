//物理世界
var PWorld = (function () {
    function PWorld() {
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
    var __egretProto__ = PWorld.prototype;
    //物理世界更新
    __egretProto__.step = function (dt) {
        this.world.step(dt / 1000);
        var world = this.world;
        var stageHeight = egret.MainContext.instance.stage.stageHeight;
        var l = world.bodies.length;
        for (var i = 0; i < l; i++) {
            var boxBody = world.bodies[i];
            if (boxBody.displays) {
                var box = boxBody.displays[0];
                if (box) {
                    box.x = boxBody.position[0] * this.factor;
                    box.y = stageHeight - boxBody.position[1] * this.factor;
                    box.rotation = 360 - boxBody.angle * 180 / Math.PI;
                    if (boxBody.sleepState == p2.Body.SLEEPING) {
                        box.alpha = 0.5;
                    }
                    else {
                        box.alpha = 1;
                    }
                }
            }
        }
    };
    //映射一个物体到物理世界
    __egretProto__.mappingObject = function (obj) {
        var fw = obj.width / this.factor;
        var fh = obj.height / this.factor;
        var fx = obj.x / this.factor;
        var fy = (Global.stage.stageHeight - obj.y) / this.factor;
        var shape = new p2.Rectangle(fw, fh);
        var body = new p2.Body({ mass: this.mass, position: [fx, fy] });
        body.addShape(shape);
        body.displays = [obj];
        this.world.addBody(body);
    };
    __egretProto__.createGround = function () {
        var plane = new p2.Plane();
        var body = new p2.Body({ mass: 2, position: [0, 0] });
        body.type = p2.Body.STATIC;
        body.addShape(plane);
        this.world.addBody(body);
    };
    return PWorld;
})();
PWorld.prototype.__class__ = "PWorld";
//# sourceMappingURL=PWorld.js.map