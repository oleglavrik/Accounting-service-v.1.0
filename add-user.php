<?php
	/* 
		Скрипт добавлення новго користувача,
		дані отримуються від форми через AJAX
	*/
	# скрипт security
	require_once("security.php");
	# Добавлення нового користувача
	$userLogin = $_POST['login'];
	$userPassword = $_POST['password'];
	$userLevel = $_POST['level'];
	
	# рахуємо кіл-сть символів логіна і пароля
	$userLoginCount = strlen($userLogin);
	$userPasswordCount = strlen($userPassword);
		
	# повторна перевірка даних
	if(($userLogin != '' and $userPassword != '' and $userLevel != '') && ($userLoginCount > 3 and $userPasswordCount > 3))
	{
		# Хешуэмо пароль
		$userPassword = md5(md5($userPassword));
		$addUserQuery = 'INSERT INTO users (userLogin, userPassword, userLevel)values("'.mysql_real_escape_string($userLogin).'","'.mysql_real_escape_string($userPassword).'","'.mysql_real_escape_string($userLevel).'")';
		mysql_query($addUserQuery);
	}
	# 
	$updateUsersList = 'SELECT userId, userLogin, userLevel, userHash FROM users';
	$updateUsersList = mysql_query($updateUsersList);
	if(mysql_num_rows($updateUsersList) == '1')
	{
		$updateUsers['errorType'] = "Не має жодного користувача крім Вас";
	}else
	{
		while($data = mysql_fetch_array($updateUsersList))
		{
			$updateUsers[] = $data;
		}	
		
	}
	echo json_encode($updateUsers);
	
	
	
	
?>