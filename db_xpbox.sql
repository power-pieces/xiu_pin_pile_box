/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : db_xpbox

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2015-07-30 21:56:19
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
INSERT INTO `tbl_share_record` VALUES ('test_id', '1', '2015-07-30 01:15:29', '1438190129');

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
  `last_login_utc` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_user
-- ----------------------------
INSERT INTO `tbl_user` VALUES ('', 'test_name', 'https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/2349df3e3c55ca989cd5efc56d93cd41_121_121.jpg', '5', '0', '0', '0', null, '0');
INSERT INTO `tbl_user` VALUES ('1', 'a', 'https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/2349df3e3c55ca989cd5efc56d93cd41_121_121.jpg', '6', '190', '100', '1437638133', '2015-07-23 15:55:33', '0');
INSERT INTO `tbl_user` VALUES ('2', 'a', 'https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/2349df3e3c55ca989cd5efc56d93cd41_121_121.jpg', '5', '6', '0', '0', '2015-07-23 00:00:00', '0');
INSERT INTO `tbl_user` VALUES ('3', 'jing', 'https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/2349df3e3c55ca989cd5efc56d93cd41_121_121.jpg', '5', '2', '0', '0', null, '0');
INSERT INTO `tbl_user` VALUES ('jing', 'jing', 'https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/2349df3e3c55ca989cd5efc56d93cd41_121_121.jpg', '5', '4', '0', '0', null, '0');
INSERT INTO `tbl_user` VALUES ('test_id', 'test_name', '', '15', '150', '20', '1438184096', '2015-07-29 23:34:56', '1438214400');
