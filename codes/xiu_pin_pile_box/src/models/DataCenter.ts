class DataCenter
{
    //配置文件
    public static cfg: any = null;
    //平台获取的信息
    public static openInfo: any = null;    
    //用户ID
    public static id: string = null;
    //昵称
    public static nickname: string = null;
    //图片
    public static pic: string = null;
    //剩余游戏次数
    public static power: number = 0;
    //累计获得分数
    public static totalScore: number = 0;      
    //目前最好分数
    public static bestScore: number = 0;       
    //取得目前最好分数的日期
    public static bestScoreTime: string = null;
    //给我助力的好友
    public static receives: any[] = null;
    //领取的奖励
    public static rewards: any[] = null;
    //自己的排名
    public static selfRank: number = 0;
    //排行榜
    public static rankList: any[] = null;



    //邀请人的ID
    public static inviter: string = null;
    //邀请人的名称
    public static inviterName: string = null;
    //邀请人的图片
    public static inviterPic: string = null;
    //邀请人最好分数
    public static inviterTotalScore: number = 0;
    //邀请人的奖品列表
    public static inviterRewards: any[] = null;
}