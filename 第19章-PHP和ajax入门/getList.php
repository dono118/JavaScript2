<?php
header('content-type:text/html;charset="utf-8"');
error_reporting(0);

// $arr1 = array('leo','momo','zhangsen');

$arr2 = array('username'=>'leo','age'=>32);

echo json_encode($arr2);

// json_encode() 将数据结构转成字符串
// json_decode() 将字符串转成对应的数据结构