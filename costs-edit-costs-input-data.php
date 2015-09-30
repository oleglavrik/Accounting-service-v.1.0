<?php
	# скрипт обробник отримання інформації про витрату для редагування
	# скрипт security
	require_once("security.php");
	# приймаємо вхідні данні
	$level = $_POST['level'];
	$costsID = $_POST['editCostsID'];
	# перевірка на рівень доступу
	if($level == '0')
	{
		# виконуємо запит на отримання інформації про витрату
		$costsQuery = 'SELECT * FROM costs WHERE id = "'.mysql_real_escape_string($costsID).'"';
		$costsQuery = mysql_query($costsQuery);
		$costInfo = array();
		while($data = mysql_fetch_array($costsQuery))
		{
			$costInfo = $data;
		}	
	}else 
	{
		$costInfo = fasle;
	}	
	
	echo json_encode($costInfo);	
?>