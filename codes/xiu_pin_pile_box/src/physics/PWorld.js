var PWorld = (function () {
    function PWorld() {
        this.world = new p2.World();
        if (null != DataCenter.cfg.friction) {
            this.world.defaultContactMaterial.friction = DataCenter.cfg.friction;
        }
        if (null != DataCenter.cfg.restitution) {
            this.world.defaultContactMaterial.restitution = DataCenter.cfg.restitution;
        }
        if (null != DataCenter.cfg.stiffness) {
            this.world.defaultContactMaterial.stiffness = Number.MAX_VALUE;
        }
        if (null != DataCenter.cfg.relaxation) {
            this.world.defaultContactMaterial.relaxation = 0;
        }
        this.world.sleepMode = p2.World.NO_SLEEPING;
        this.factor = DataCenter.cfg.factor;
        this.mass = DataCenter.cfg.mass;
        this.world.on("beginContact", this.onBeginContact, this);
    }
    PWorld.prototype.onBeginContact = function (e) {
        e;
    };
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
                    var newX = (boxBody.position[0] * this.factor) >> 0;
                    var newY = (stageHeight - boxBody.position[1] * this.factor) >> 0;
                    box.setPosition(newX, newY);
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
    PWorld.prototype.mappingObject = function (obj) {
        var fw = obj.width / this.factor;
        var fh = obj.height / this.factor;
        var fx = obj.x / this.factor;
        var fy = (Global.stage.stageHeight - obj.y) / this.factor;
        var shape = new p2.Rectangle(fw, fh);
        shape.material = this.world.defaultMaterial;
        var body = new p2.Body({ mass: this.mass, position: [fx, fy] });
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
