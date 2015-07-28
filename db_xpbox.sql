/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50520
Source Host           : localhost:3306
Source Database       : db_xpbox

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2015-07-23 18:19:55
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
  `time` datetime NOT NULL,
  `time_utc` int(11) NOT NULL,
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
  `sender_id` char(64) NOT NULL,
  `receiver_id` char(64) NOT NULL,
  `time` datetime NOT NULL,
  `time_utc` int(11) NOT NULL,
  PRIMARY KEY (`sender_id`,`receiver_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_share_record
-- ----------------------------
INSERT INTO `tbl_share_record` VALUES ('1', '2', '2015-07-23 00:00:00', '123');
INSERT INTO `tbl_share_record` VALUES ('1', '3', '0000-00-00 00:00:00', '0');
INSERT INTO `tbl_share_record` VALUES ('2', '3', '0000-00-00 00:00:00', '0');
INSERT INTO `tbl_share_record` VALUES ('3', '4', '2015-07-23 00:00:00', '1437635952');

-- ----------------------------
-- Table structure for `tbl_user`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_user`;
CREATE TABLE `tbl_user` (
  `id` char(64) NOT NULL COMMENT 'id',
  `name` char(30) NOT NULL COMMENT '昵称',
  `pic` text COMMENT '头像图片',
  `power` int(10) NOT NULL DEFAULT '5' COMMENT '游戏次数',
  `total_score` int(11) NOT NULL DEFAULT '0' COMMENT '累计高度',
  `best_score` int(10) NOT NULL DEFAULT '0' COMMENT '游戏最高分数',
  `best_score_utc` int(11) DEFAULT '0' COMMENT '获得最好分数的时间',
  `best_score_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_user
-- ----------------------------
INSERT INTO `tbl_user` VALUES ('1', 'a', 'none', '0', '190', '100', '1437638133', '2015-07-23 15:55:33');
INSERT INTO `tbl_user` VALUES ('2', 'a', 'none', '5', '6', '0', '0', '2015-07-23 00:00:00');
INSERT INTO `tbl_user` VALUES ('3', 'jing', 'none', '5', '2', '0', '0', null);
INSERT INTO `tbl_user` VALUES ('jing', 'jing', 'none', '5', '4', '0', '0', null);
