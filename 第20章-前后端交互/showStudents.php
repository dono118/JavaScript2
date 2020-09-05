<?php
header("Content-type:text/html;charset=utf-8");
/*
	链接数据库  天龙八部
*/
//1、链接数据库
/*
	第一个参数：链接数据库的IP/域名
	第二个参数：用户名
	第三个参数：密码
*/
$link = mysqli_connect("localhost", "root", "root");

//2、判断是否连接成功
if (!$link) {
	echo "链接失败";
	exit; //终止后续所有的代码
}

//3、设置字符集
mysqli_set_charset($link, "utf8");

//4、选择数据库
mysqli_select_db($link, "test");

//5、准备sql语句
$sql = "SELECT * FROM t_stu";

//6、发送sql语句 
$res = mysqli_query($link, $sql);

//设置表头
echo "<table border = '1'>";
echo "<tr><th>学生学号</th><th>学生姓名</th><th>英语成绩</th><th>数学成绩</th><th>语文成绩<th></tr>";

//7、处理结果
while ($row = mysqli_fetch_assoc($res)) {
	echo "<tr><td>{$row['id']}</td><td>{$row['name']}</td><td>{$row['english']}</td><td>{$row['math']}</td><td>{$row['chinese']}</td></tr>";
}
echo "</table>";

//8、关闭数据库
mysqli_close($link);
