var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameNotice = (function (_super) {
    __extends(GameNotice, _super);
    function GameNotice(type, data) {
        if (data === void 0) { data = null; }
        _super.call(this, type, data);
    }
    GameNotice.LOGIN_SUCCESS = "login_success";
    GameNotice.GIVE_POWER_SUCCESS = "give_power_success";
    GameNotice.GOT_RANK = "got_rank";
    GameNotice.GOT_INVITER_INFO = "got_inviter_info";
    return GameNotice;
})(Notice);
