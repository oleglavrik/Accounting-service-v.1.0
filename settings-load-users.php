<?php
	# Скрипт обробник завантаження всіх користувачів в налаштуваннях для адміна
	# скрипт security
	require_once("security.php");
	# Запит до БД для виводу всіх коритсувачів  
	$usersQuery = 'SELECT userId, userLogin, userLevel, userHash FROM users';
	$usersQuery = mysql_query($usersQuery);
	# перевірка на існування користувачів в БД
	if(mysql_num_rows($usersQuery) == '1')
	{
		$usersInfo['errorType'] = "Не має жодного користувача крім Вас";
	}else
	{
		# заносимо дані про користувачів в масив, для предачі в js скрипт
		for($i = 0; $i < mysql_num_rows($usersQuery); $i++)
		{
			$usersInfo[] = mysql_fetch_array($usersQuery, MYSQL_ASSOC);
		}	
	}

	# формуємо відповідь
	echo json_encode($usersInfo);	
	
?>