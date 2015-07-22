/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : db_xpbox

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2015-07-22 21:42:06
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `tbl_rewards`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_rewards`;
CREATE TABLE `tbl_rewards` (
  `i` int(11) NOT NULL AUTO_INCREMENT,
  `id` char(64) NOT NULL,
  `reward_pic` text,
  PRIMARY KEY (`i`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_rewards
-- ----------------------------

-- ----------------------------
-- Table structure for `tbl_share_record`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_share_record`;
CREATE TABLE `tbl_share_record` (
  `i` int(11) NOT NULL AUTO_INCREMENT,
  `sender_id` char(64) NOT NULL,
  `receiver_id` char(64) NOT NULL,
  PRIMARY KEY (`i`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_share_record
-- ----------------------------

-- ----------------------------
-- Table structure for `tbl_user`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_user`;
CREATE TABLE `tbl_user` (
  `id` char(64) NOT NULL COMMENT 'id',
  `name` char(30) NOT NULL COMMENT '昵称',
  `pic` text COMMENT '头像图片',
  `power` int(10) NOT NULL DEFAULT '0' COMMENT '游戏次数',
  `total_score` int(11) NOT NULL DEFAULT '0' COMMENT '累计高度',
  `best_score` int(10) NOT NULL DEFAULT '0' COMMENT '游戏最高分数',
  `best_score_utc` int(11) DEFAULT '0' COMMENT '获得最好分数的时间',
  `best_score_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_user
-- ----------------------------
