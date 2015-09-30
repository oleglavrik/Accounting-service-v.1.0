<?php
	# скрипт security
	require_once("security.php");
	# ініціалізуємо SMARTY
	require_once("setup.php");

	if(isset($data))
	{
		$smarty->assign("data",$data);
	}

	# Beginning ініціалізація списку магазинів
	$magazineListQuery = 'SELECT * FROM shops';
	$magazineListQuery = mysql_query($magazineListQuery);
	while($data = mysql_fetch_array($magazineListQuery)) {
	 	$magazineList[] = $data;
	}
	$smarty->assign("magazineList",$magazineList);
	# End список магазинів
	
	# beginning правильні URL
	if (isset($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] == "on")
	    $pro = 'https';
	else 
	    $pro = 'http';
	# провірка на піддеректорію
	$port = ($_SERVER["SERVER_PORT"] == "80") ? "" : (":".$_SERVER["SERVER_PORT"]);

	$current_url =  $pro."://".$_SERVER['SERVER_NAME'].dirname($_SERVER['PHP_SELF']);
	$smarty->assign("current_url",$current_url);
	# End правильні URL

	# ініціалізація зміної SMARTY
	
	# ініціалізуємо масив даних про користувача через SMARTY
	$smarty->assign("userData",$userData);
	# підключаємо шаблон головної сторінки[в кінці сторінки]
	$smarty->display("archive-sale.tpl");
 ?>

