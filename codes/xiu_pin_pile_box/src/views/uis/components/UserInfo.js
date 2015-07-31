var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var UserInfo = (function (_super) {
    __extends(UserInfo, _super);
    function UserInfo() {
        _super.call(this);
        this.skinName = skins.components.UserInfoSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }
    UserInfo.prototype.setUserInfo = function (userInfo) {
        this._userInfo = userInfo;
        this.refresh();
    };
    UserInfo.prototype.createCompleteEvent = function (event) {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        if (null == this._userInfo) {
            this.imgPic.source = DataCenter.pic;
            this.txtName.text = DataCenter.nickname;
            this.txtScore.text = "总高度：" + DataCenter.totalScore;
            this.txtTitle.text = "已获得秀品好礼";
        }
    };
    UserInfo.prototype.refresh = function () {
        if (null == this._userInfo) {
            this.imgPic.source = DataCenter.pic;
            this.txtName.text = DataCenter.nickname;
            this.txtScore.text = "总高度：" + DataCenter.totalScore;
            this.txtTitle.text = "已获得秀品好礼";
        }
        else {
            this.imgPic.source = this._userInfo.pic;
            this.txtName.text = this._userInfo.name;
            this.txtScore.text = "总高度：" + this._userInfo.totalScore;
            this.txtTitle.text = this._userInfo.name + "，已获得秀品好礼";
        }
    };
    return UserInfo;
})(egret.gui.SkinnableComponent);
