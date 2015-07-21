/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : db_xpbox

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2015-07-22 01:24:24
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `tbl_user`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_user`;
CREATE TABLE `tbl_user` (
  `id` char(64) NOT NULL COMMENT 'id',
  `name` char(30) NOT NULL COMMENT '昵称',
  `pic` text COMMENT '头像图片',
  `power` int(10) NOT NULL DEFAULT '0' COMMENT '游戏次数',
  `best_score` int(10) NOT NULL DEFAULT '0' COMMENT '游戏最高分数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_user
-- ----------------------------
