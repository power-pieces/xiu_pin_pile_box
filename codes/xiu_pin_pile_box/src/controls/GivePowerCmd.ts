class GivePowerCmd extends ACmd
{
    public run(id: string, targetId: string): void
    {
        var args: any = {};
        args.id = id;
        args.target_id = targetId;
        NetManager.implicitCall("give_power", args, this.onResponse, this);
    }

    private onResponse(jsonStr: string): void
    {
        var data: any = JSON.parse(jsonStr);
        if (data.error)
        {

        }
        NoticeManager.sendNotice(new GameNotice(GameNotice.GIVE_POWER_SUCCESS));
    }
}