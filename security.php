<?php 
	/*
		* Основиний скрипт для захисту входження на будь яку сторінку,
		* користувача який не авторизований.
	*/
	# генерація унікальної строки
	function generateCode($length=6) {
		$chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHI JKLMNOPRQSTUVWXYZ0123456789";
		$code = "";
		$clen = strlen($chars) - 1;  
		while (strlen($code) < $length) {
			$code .= $chars[mt_rand(0,$clen)];  
		}
		return $code;
	}	

	# Зэднання з БД
	require_once("config.php");
	# перевіряємо чи існує часова кука і чи вона не пуста
	if(isset($_COOKIE['timeLeftCurrent']) && $_COOKIE['timeLeftCurrent'] != "")
	{
		# Перевірка чи існують даткові куки і чи вони не пусті
		if((isset($_COOKIE['id']) and isset($_COOKIE['hash'])) && ($_COOKIE['id'] != "" and $_COOKIE['hash'] != ''))
		{
			$userQuery = mysql_query("SELECT * FROM users WHERE userId = '".intval($_COOKIE['id'])."' LIMIT 1");
			$userData = mysql_fetch_assoc($userQuery);
			# порівнянн додаткових кук з записами для конкретного юзера
			if(($userData['userHash'] !== $_COOKIE['hash']) or ($userData['userId'] !== $_COOKIE['id']) )
			{
				# Витираэмо куки і перенаправляємо на сторінку авторизації
				setcookie("id", "", time() - 3600, "/");
				setcookie("hash", "", time() - 3600, "/");
				setcookie("errorAuth", "", time() - 3600, "/");
				setcookie("timeLeftCurrent", "", time() - 3600, "/");
				header("Location: enter-form.php");
			}else
			{
				# перезаписуэмо куки ще на годину
				setcookie("id", $_COOKIE['id'], time() + 3600);
				setcookie("hash", $_COOKIE['hash'], time() + 3600);
				setcookie("level", $_COOKIE['level'], time() + 3600);
				setcookie("login", $_COOKIE['login'], time() + 3600);
				# Дозволяэмо доступ, + перезаписоюємо часову куку ще на годину
				setcookie("timeLeftCurrent", "+3600", time() + 3600);
				/* beginning testing code */
				# перевірка доступу, захист від несанксціонованого доступу модератора 
				if($userData['userLevel'] == '1')
				{
					if(
						basename($_SERVER['SCRIPT_FILENAME']) == 'settings.php' or
						basename($_SERVER['SCRIPT_FILENAME']) == 'archive-sale.php'
					)
					{
						header("Location: index.php");
						exit();
					}	
				}
				/* end testing code */	
			}
		}else
		{
			# витираємо куки і перенаправляємо на сторінку авторизації
			setcookie("id", "", time() - 3600, "/");
			setcookie("hash", "", time() - 3600, "/");
			setcookie("errorAuth", "", time() - 3600, "/");
			setcookie("timeLeftCurrent", "", time() - 3600, "/");
			header("Location: enter-form.php");
		}
	}else
	{
		# Витираэмо куки і перенаправляємо на сторінку авторизації
		setcookie("id", "", time() - 3600, "/");
		setcookie("hash", "", time() - 3600, "/");
		setcookie("errorAuth", "", time() - 3600, "/");
		setcookie("timeLeftCurrent", "", time() - 3600, "/");
		header("Location: enter-form.php");
	}	

	
?>