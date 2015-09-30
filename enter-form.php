<?php
	# Зэднання з БД
	require_once("config.php");
	# Ініціалізація SMARTY'
	require_once("setup.php");
	# провірка на існування куки з помилкою
	if(isset($_COOKIE['errorAuth']))
		$errorAuth = $_COOKIE['errorAuth'];
	else
		$errorAuth = false;
	# ініціалізація помилки
	$smarty->assign("errorAuth",$errorAuth);
	# підключення форми[в кінці скрипта]
	$smarty->display('enter-form.tpl');	

?>