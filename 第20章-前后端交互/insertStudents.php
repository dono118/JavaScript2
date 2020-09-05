<?php
header("Content-type:text/html;charset=utf-8");
//统一发返回格式
$responseData = array("code" => 0, "message" => "");
// var_dump($_POST);
$name = $_POST['name'];
$english = $_POST["english"];
$math = $_POST['math'];
$chinese = $_POST["chinese"];

//1、链接数据库
$link = mysqli_connect("localhost", "root", "root");
//2、判断是否链接成功
if (!$link) {
	$responseData['code'] = 1;
	$responseData['message'] = "数据库链接失败";
	//返回到前台页面你
	echo json_encode($responseData);
	exit;
}
//3、设置字符集
mysqli_set_charset($link, "utf8");

//4、选择数据库
mysqli_select_db($link, "test");

//5、准备sql语句进行插入操作
$sql = "INSERT INTO t_stu(name,english,math,chinese) VALUES('{$name}',{$english},{$math},{$chinese})";

//6、发送sql语句
$res = mysqli_query($link, $sql);

if (!$res) {
	$responseData['code'] = 2;
	$responseData['message'] = "添加学员成绩失败";
	//返回到前台页面你
	echo json_encode($responseData);
	exit;
} else {
	$responseData['message'] = "添加学员成绩成功";
	//返回到前台页面你
	echo json_encode($responseData);
}
//关闭数据库
mysqli_close($link);
