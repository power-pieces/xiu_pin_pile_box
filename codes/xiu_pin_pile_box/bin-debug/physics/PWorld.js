//物理世界
var PWorld = (function () {
    function PWorld() {
        //物理世界
        this.world = new p2.World();
        if (null != DataCenter.cfg.friction) {
            //摩擦力
            this.world.defaultContactMaterial.friction = DataCenter.cfg.friction;
        }
        if (null != DataCenter.cfg.restitution) {
            //弹力
            this.world.defaultContactMaterial.restitution = DataCenter.cfg.restitution;
        }
        if (null != DataCenter.cfg.stiffness) {
            //硬度
            this.world.defaultContactMaterial.stiffness = Number.MAX_VALUE;
        }
        if (null != DataCenter.cfg.relaxation) {
            //柔软度
            this.world.defaultContactMaterial.relaxation = 0;
        }
        //睡眠模式
        this.world.sleepMode = p2.World.NO_SLEEPING;
        //物理世界的比例
        this.factor = DataCenter.cfg.factor;
        //默认的箱子质量
        this.mass = DataCenter.cfg.mass;
        this.world.on("beginContact", this.onBeginContact, this);
    }
    PWorld.prototype.onBeginContact = function (e) {
        e;
    };
    //物理世界更新
    PWorld.prototype.step = function (dt) {
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
    PWorld.prototype.mappingObject = function (obj) {
        var fw = obj.width / this.factor;
        var fh = obj.height / this.factor;
        var fx = obj.x / this.factor;
        var fy = (Global.stage.stageHeight - obj.y) / this.factor;
        var shape = new p2.Rectangle(fw, fh);
        shape.material = this.world.defaultMaterial;
        var body = new p2.Body({ mass: this.mass, position: [fx, fy] });
        //body.type = p2.Body.KINEMATIC;
        //        body.on( "sleep", function (e:p2.EventEmitter):void {
        //            //body.type = p2.Body.STATIC;
        //                    body.damping = 0.5;
        //                    body.allowSleep = false;
        //                    body.wakeUp();
        //            },this );
        //body.type = p2.Body.KINEMATIC;
        //body.velocity = [0, -1];
        //body.gravityScale = 0;
        body.addShape(shape);
        body.displays = [obj];
        this.world.addBody(body);
    };
    PWorld.prototype.createGround = function () {
        var plane = new p2.Plane();
        plane.material = this.world.defaultMaterial;
        var body = new p2.Body({ mass: 0, position: [0, 0] });
        body.type = p2.Body.STATIC;
        body.addShape(plane);
        this.world.addBody(body);
    };
    PWorld.prototype.drawDebug = function (shape) {
    };
    return PWorld;
})();
//# sourceMappingURL=PWorld.js.map