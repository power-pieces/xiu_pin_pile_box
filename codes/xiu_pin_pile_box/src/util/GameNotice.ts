class GameNotice extends Notice
{
    public constructor(type: string, data: any = null)
    {
        super(type, data);
    }

    //登陆成功
    public static LOGIN_SUCCESS: string = "login_success";
    //给好友助力成功
    public static GIVE_POWER_SUCCESS: string = "give_power_success";
    //获取到排行榜
    public static GOT_RANK: string = "got_rank";
}