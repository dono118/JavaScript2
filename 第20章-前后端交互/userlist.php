<?php
header("Content-type:text/html;charset=utf-8");
//链接数据库
$link = mysqli_connect("localhost", "root", "root");

//2、判断是否连接成功
if (!$link) {
	echo "数据库链接失败";
	exit; //终止后续所有的代码
}

//3、设置字符集
mysqli_set_charset($link, "utf8");

//4、选择数据库
mysqli_select_db($link, "test");

//5、准备sql
$sql = "SELECT * FROM users";

$res = mysqli_query($link, $sql);

$arr = array();

while ($row = mysqli_fetch_assoc($res)) {
	array_push($arr, $row);
}

echo json_encode($arr);

mysqli_close($link);
