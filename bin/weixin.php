<?php
/**
 * Created by PhpStorm.
 * User: Jing
 * Date: 2015/4/28
 * Time: 20:31
 */

//首先申请公众号，获得appid等信息，并且在公众平台上设置js安全域名。
require_once 'share.php';
require_once 'player.php';
$file = "../token.txt";
$appid = "wx34bbd2b8333f7e32";
$appsecrect = "bf1fcc56a20f7037fb450dada9e21717";
$noncestr = "dajiagame";
$site = "http://photo.hb.vnet.cn/client/index.php";

//首先申请公众号，获得appid等信息，并且在公众平台上设置js安全域名。
//require_once 'share.php';
//require_once 'Player.php';
//$file = "C:/wamp4/www/token.txt";
//$appid = "wx2c9e2b3c3e0cc058";
//$appsecrect = "cf67d528c6aab80cebbfcd0ac20c8aee";
//$noncestr = "dajiagame";

session_start();

//此游戏需要用到分享者的ID
if (isset($_GET["share"]))
{
    $shareid = $_GET["share"];
}
else
{
    $shareid = 0;
}

//微信接受用户许可后的回调地址，可携带开发者自定义的参数
//此游戏只需要加上分享者的ID即可
$backurl = $site."?share=".$shareid;

//得到玩家许可后，系统自动重新进入此页面，并携带自定义参数和code值。
$code = "";

//如果session存在
if(isset($_SESSION["openid"]))
{
    $p = new Player($backurl);
    $p->openid = $_SESSION["openid"];

    //把openid存到session里面
    $p->saveToSession();
    $openid = $_SESSION["openid"];
}else if (isset($_GET['code']))
{
    //没有session,根据code获取用户的信息
    $code = $_GET['code'];
    if($code != "") {
        $p = new Player($backurl);
        $p->getInfoFrom($code, $appid, $appsecrect);
        $p->saveToSession();
        //在此处可以保存用户的昵称头像等信息到数据库，已获取的信息查看Player.php
        $openid = $p->openid;
    }
}else
{
    //如果没有SESSION，且不是授权的回调，则向微信发送网页授权许可请求
    if(!isset($_SESSION["openid"]) && !isset($_GET['code']))
    {
        //发送网页授权许可请求，获取成功后会取得code
        header("Location:https://open.weixin.qq.com/connect/oauth2/authorize?appid=".$appid."&redirect_uri=".urlencode($backurl)."&response_type=code&scope=snsapi_userinfo&state=0#wechat_redirect");
        exit;
    }
}

//获取分享的ticket
getShareToken($appid,$appsecrect,$noncestr,$file,time());


