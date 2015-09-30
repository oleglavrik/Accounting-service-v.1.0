<?php 
	# Скрипт видалення користувачів
	
	# скрипт security
	require_once("security.php");
	# отримуємо дані
	$userId = $_POST['deleteUserID'];
	# виконуємо запит на видалення
	$userDelete = 'DELETE FROM users WHERE userId="'.mysql_real_escape_string($userId).'"';
	$userDelete = mysql_query($userDelete);
	# вибираємо всі користувачі за таблиці
	$allUsersQuery = 'SELECT userId, userLogin, userLevel, userHash FROM users';
	$allUsersQuery = mysql_query($allUsersQuery);
	# перевіряємо чи після видалення користувача існує хотяб 1 користувач крім вас
	if(mysql_num_rows($allUsersQuery) == '1')
	{
		$updateUsers['errorType'] = "Не має жодного користувача крім Вас";
	}else
	{
		while($data = mysql_fetch_array($allUsersQuery))
		{
			$updateUsers[] = $data;
		}	
		
	}

	# відповідь
	echo json_encode($updateUsers);
?>
