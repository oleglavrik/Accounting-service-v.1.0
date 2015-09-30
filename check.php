<?php 
	// script check auth
	# connect to DB
	require_once("config.php");
	# check isset cookie
	if (isset($_COOKIE['id']) and isset($_COOKIE['hash']))
	{
		# if login & password true, relock to index
		$query = mysql_query("SELECT * FROM users WHERE userId = '".intval($_COOKIE['id'])."' LIMIT 1");
		$userData = mysql_fetch_assoc($query);
		# check data 
		if(($userData['userHash'] !== $_COOKIE['hash']) or ($userData['userId'] !== $_COOKIE['id']) )
		{
			# remove cookie and relock to enter-form.php
			setcookie("id", "", time() - 3600, "/");
			setcookie("hash", "", time() - 3600, "/");
			setcookie("timeLeftCurrent", "", time() - 3600, "");
			setcookie("errorAuth","Помилка авторизації, спробуйте ще раз");
			header("Location:enter-form.php");
		}else
		{
			# success auth and relock to index
			header("Location:index.php");
		}
	}else
	{
		# error cookie off
		echo "<div>Включіть в налащтуваннях браузера куки, або скористайтесь іншим браузером<div>";
	}
?>