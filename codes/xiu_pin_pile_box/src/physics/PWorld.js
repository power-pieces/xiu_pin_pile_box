var PWorld = (function () {
    function PWorld() {
        this.world = new p2.World();
        this.world.defaultContactMaterial.friction = DataCenter.cfg.friction;
        this.world.defaultContactMaterial.restitution = DataCenter.cfg.restitution;
        this.world.sleepMode = p2.World.NO_SLEEPING;
        this.factor = DataCenter.cfg.factor;
    }
    PWorld.prototype.step = function (dt) {
        this.world.step(dt / 1000);
    };
    PWorld.prototype.mappingObject = function (obj) {
    };
    return PWorld;
})();
