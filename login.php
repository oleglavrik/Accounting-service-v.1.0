<?php
	// скрипт авторизації
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
	
	# Зєднуємося з БД
	require_once("config.php");
	# перевіряємо чи відправлена форма
	if(isset($_POST['submit']))
	{
		$query = mysql_query("SELECT userId, userPassword, userLevel FROM users WHERE userLogin='".mysql_real_escape_string($_POST['login'])."' LIMIT 1");
		# Витягуємо данні про користувача про клієнта
		$data = mysql_fetch_assoc($query);
		# Перевірка введеного паролю
		if($data['userPassword'] === md5(md5($_POST['password'])))
		{
			# генеруємо унікальну стрічку
			$hash = md5(generateCode(10));
			# записуємо в БД хеш
			mysql_query("UPDATE users SET userHash='".$hash."' WHERE userId='".$data['userId']."'");
			# записуємо куки
			setcookie("id", $data['userId'], time() + 3600);
			setcookie("hash", $hash, time() + 3600);
			setcookie("level", $data['userLevel'], time() + 3600);
			setcookie("login", $_POST['login'], time() + 3600);
			# встановлення часової куки
			setcookie("timeLeftCurrent", "+3600", time() + 3600);
			# Перенаправлення на сторінку перевірки
			header("Location: check.php");
			exit();
		}
		else
		{
			# ведено не вірний логін або пароль, затираємо куки і записуємо нову куку з помилкою
			setcookie("id", "", time() - 3600);
			setcookie("hash", "", time() - 3600);
			setcookie("errorAuth","Ведено невірний логін або пароль, спробуйте ще раз");
			header("Location: enter-form.php");
		}
	}
	
?>
