class LotteryCmd extends ACmd
{
    public run(id: string, phone: string, name: string, address:string): void
    {
        var args: any = {};
        args.id = id;
        args.phone = phone;
        args.name = name;
        args.address = address;
        NetManager.implicitCall("lottery", args, this.onResponse, this);
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