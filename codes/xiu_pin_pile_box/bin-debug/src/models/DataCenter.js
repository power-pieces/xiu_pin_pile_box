var DataCenter = (function () {
    function DataCenter() {
    }
    var __egretProto__ = DataCenter.prototype;
    //配置文件
    DataCenter.cfg = null;
    //平台获取的信息
    DataCenter.openInfo = null;
    //用户ID
    DataCenter.id = null;
    //昵称
    DataCenter.name = null;
    //图片
    DataCenter.pic = null;
    //剩余游戏次数
    DataCenter.power = 0;
    //累计获得分数
    DataCenter.totalScore = 0;
    //目前最好分数
    DataCenter.bestScore = 0;
    //取得目前最好分数的日期
    DataCenter.bestScoreTime = null;
    //给我助力的好友
    DataCenter.receives = null;
    //领取的奖励
    DataCenter.rewards = null;
    //自己的排名
    DataCenter.selfRank = 0;
    //排行榜
    DataCenter.rankList = null;
    return DataCenter;
})();
DataCenter.prototype.__class__ = "DataCenter";
//# sourceMappingURL=DataCenter.js.map