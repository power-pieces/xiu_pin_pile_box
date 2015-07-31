class GivePowerCmd extends ACmd
{
    public run(id: string, targetId: string): void
    {
        var args: any = {};
        args.id = id;
        args.target_id = targetId;
        NetManager.call("give_power", args, this.onResponse, this);
    }

    private onResponse(data:any): void
    {
        if (data.success == 1)
        {
            Alert.show("助力成功！");
        }
        else
        {
            Alert.show("alert_tip_0");
        }
    }
}