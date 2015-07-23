<?php

class User
{
	/**
	 * 用户登陆
	 */
	public function login(&$params, &$res)
	{
        $openId = mysql_escape_string($params->openId);
        $name = mysql_escape_string($params->name);
        $pic = mysql_escape_string($params->pic);
        $sql = "INSERT INTO tbl_user(id,name,pic) VALUES('%s','%s','%s') ON DUPLICATE KEY UPDATE name='%s',pic='%s'";
        $sql = sprintf($sql, $openId, $name, $pic, $name, $pic);

		$st = new SqlHelper();
		$st->conn();
		$result = $st->modify($sql);
        $st->close();

		if($result)
		{

			//数据登陆成功，开始获取用户数据
            $data = $this->getUserInfo($openId);
            $data['receives'] = $this->getReceives($openId);
            $data['rewards'] = $this->getRewards($openId);
            $res['data'] = $data;
		}
		else
		{
            $res['error'] = 1;
		}

	}

    /**
     * 获取用户信息
     * @param $id
     */
    private function getUserInfo($id)
    {
        $sql = "SELECT * FROM tbl_user WHERE id='%s'";
        $sql = sprintf($sql, mysql_escape_string($id));
        $st = new SqlHelper();
        $st->conn();
        $result = $st->query($sql);
        $result = $result[0];
        $st->close();
        return $result;
    }

    /**
     * 收到的助力信息
     * @param $id
     * @return array|bool
     */
    private function getReceives($id)
    {
        $sql = "SELECT id,name,pic FROM tbl_share_record AS t1 LEFT JOIN tbl_user AS t2 ON t1.sender_id = t2.id WHERE receiver_id = '%d'";
        $sql = sprintf($sql, mysql_escape_string($id));
        $st = new SqlHelper();
        $st->conn();
        $result = $st->query($sql);
        $st->close();
        return $result;
    }

    /**
     * 收到的奖励信息
     * @param $id
     * @return array|bool
     */
    function getRewards($id)
    {
        $sql = "SELECT * FROM tbl_rewards WHERE id='%s';";
        $sql = sprintf($sql, mysql_escape_string($id));
        $st = new SqlHelper();
        $st->conn();
        $result = $st->query($sql);
        $st->close();
        return $result;
    }


    /**
     * 给好友助力
     * @param $params
     * @param $res
     */
    public function give_power(&$params, &$res)
    {
        $id = $params->id;
        $target_id = $params->target_id;

        $sql = "INSERT INTO tbl_share_record(sender_id,receiver_id,time,time_utc) VALUES('%s','%s',CURDATE(),%d)";
        $sql = sprintf($sql, mysql_escape_string($id), mysql_escape_string($target_id), time());
        $st = new SqlHelper();
        $st->conn();
        $result = $st->modify($sql);
        $st->close();
        if(false == $result)
        {
            $res['error'] = 2;
        }
    }

    /**
     * 发送抽奖信息
     * @param $params
     * @param $res
     */
    public function lottery(&$params, &$res)
    {
        $id = mysql_escape_string($params->id);
        $phone  = mysql_escape_string($params->phone);
        $name = mysql_escape_string($params->name);
        $address = mysql_escape_string($params->address);


    }

    /**
     * 提交游戏结果
     * @param $params
     * @param $res
     */
    public function game_result(&$params, &$res)
    {
        $id = mysql_escape_string($params->id);
        $score = intval($params->score);

        $user = $this->getUserInfo($id);
        if(intval($user['power']) <= 0)
        {
            $res['error'] = 1;
            return;
        }

        $sql = null;
        if(intval($user['best_score']) < $score)
        {
            //新纪录
            $sql = "UPDATE tbl_user SET total_score=total_score + %d,power=power-1,best_score=%d,best_score_utc=%d,best_score_time=NOW() WHERE id='%s';";
            $sql = sprintf($sql, $score, $score, time(), $id);
        }
        else
        {
            $sql = "UPDATE tbl_user SET total_score=total_score + %d,power=power-1 WHERE id='%s'";
            $sql = sprintf($sql, $score, $id);
        }

        $st = new SqlHelper();
        $st->conn();
        $result = $st->modify($sql);
        $st->close();
        if(false == $result)
        {
            $res['error'] = 2;
        }
    }

    /**
     * 获取排行榜
     * @param $params
     * @param $res
     */
    public function get_rank(&$params, &$res)
    {
        $sql="SELECT id,name,pic,total_score FROM tbl_user ORDER BY total_score DESC LIMIT 0,20";
        $st = new SqlHelper();
        $st->conn();
        $result = $st->query($sql);
        $st->close();
        return $result;
    }
}