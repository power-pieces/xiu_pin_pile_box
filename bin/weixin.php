<?php
/**
 * Created by PhpStorm.
 * User: Jing
 * Date: 2015/4/28
 * Time: 20:31
 */

//首先申请公众号，获得appid等信息，并且在公众平台上设置js安全域名。
//require_once 'share.php';
//require_once 'player.php';
//$file = "../token.txt";
//$appid = "wx34bbd2b8333f7e32";
//$appsecrect = "bf1fcc56a20f7037fb450dada9e21717";
//$noncestr = "dajiagame";
//$site = "http://photo.hb.vnet.cn/client/index.php";

//首先申请公众号，获得appid等信息，并且在公众平台上设置js安全域名。
require_once 'share.php';
require_once 'Player.php';
$file = "C:/wamp4/www/token.txt";
$appid = "wx2c9e2b3c3e0cc058";
$appsecrect = "cf67d528c6aab80cebbfcd0ac20c8aee";
$noncestr = "dajiagame";
$site = "http://www.g6game.com/h5game/xp_box/client/index.php";

session_start();

//此游戏需要用到分享者的ID
if (isset($_GET["share"])) {
    $shareid = $_GET["share"];
} else {
    $shareid = 0;
}

//微信接受用户许可后的回调地址，可携带开发者自定义的参数
//此游戏只需要加上分享者的ID即可
$backurl = $site . "?share=" . $shareid;

//得到玩家许可后，系统自动重新进入此页面，并携带自定义参数和code值。
$code = "";

//如果session存在
if (isset($_SESSION["openid"])) {
    $p = new Player($backurl);
    $p->openid = $_SESSION["openid"];

    //把openid存到session里面
    $p->saveToSession();
    $openid = $_SESSION["openid"];
} else if (isset($_GET['code'])) {
    //没有session,根据code获取用户的信息
    $code = $_GET['code'];
    if ($code != "") {
        $p = new Player($backurl);
        $p->getInfoFrom($code, $appid, $appsecrect);
        $p->saveToSession();
        //在此处可以保存用户的昵称头像等信息到数据库，已获取的信息查看Player.php
        $openid = $p->openid;
    }
} else {
    //如果没有SESSION，且不是授权的回调，则向微信发送网页授权许可请求
    if (!isset($_SESSION["openid"]) && !isset($_GET['code'])) {
        //发送网页授权许可请求，获取成功后会取得code
        header("Location:https://open.weixin.qq.com/connect/oauth2/authorize?appid=" . $appid . "&redirect_uri=" . urlencode($backurl) . "&response_type=code&scope=snsapi_userinfo&state=0#wechat_redirect");
        exit;
    }
}

//获取分享的ticket
getShareToken($appid, $appsecrect, $noncestr, $file, time());
?>

<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script>
    wx.config({
        debug: false,
        appId: '<?php echo $appid;?>',
        //在share.php里面有储值
        timestamp: '<?php echo $GLOBALS["timestamp"];?>',
        nonceStr: '<?php echo $GLOBALS["noncestr"];?>',
        signature: '<?php echo getsignature();?>',
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
    });


    var sharesuccessfunc;
    var sharefuncobj;

    var obj = {};
    //邀请人
    obj.inviter = "<?php echo $shareid;?>";
    //openId
    obj.id = "<?php echo $p->openid;?>";
    //昵称
    obj.name = "<?php echo $p->username;?>";
    //图片
    obj.pic = "<?php echo $p->avatar;?>";
    if ("0" == obj.inviter) {
        obj.inviter = null;
    }
    alert(JSON.stringify(obj));


    //分享的具体信息，请自行添加修改。
    function setTimeLine(shareid) {
        wx.onMenuShareTimeline({
            title: '秀品叠箱子', // 分享标题
            desc: '开发测试', // 分享描述
            link: 'http://www.g6game.com/h5game/xp_box/client/index.php?share=' + shareid, // 分享链接
            imgUrl: '', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                if (sharesuccessfunc != null)
                    sharesuccessfunc.apply(sharefuncobj, []);
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数

            }
        });
    }


    //获取游戏需要的信息
    function getInfo() {
        return obj;
    }

    function setAppMessage(shareid) {
        wx.onMenuShareAppMessage({
            title: '秀品叠箱子', // 分享标题
            desc: '测试', // 分享描述
            link: 'http://www.g6game.com/h5game/xp_box/client/index.php?share=' + shareid, // 分享链接
            imgUrl: '', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                if (sharesuccessfunc != null)
                    sharesuccessfunc.apply(sharefuncobj, []);
            },
            cancel: function () {
            }
        });
    }

    //准备分享
    function readyShare() {
        //alert("分享者ID：" + obj.id + "   名称：" + obj.name);
        setTimeLine(obj.id);
        setAppMessage(obj.id);
    }


    wx.ready(function () {
        readyShare();
    });
</script>


