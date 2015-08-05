/**
* 游戏记录
*/
class StatisticCmd extends ACmd
{
    public run(content:string): void
    {
        var args: any = {};
        args.content = content;
        NetManager.implicitCall("statistic", args, null, null);
    }
}