<?php
		/*
			* Скрипт провірки співпадіння логіна з БД.
			* Перевіряє чи введений логін не співпадає з БД.
		*/
		# скрипт security
		require_once("security.php");
	    // Якщо запит не від Ajax
		if( $_SERVER['HTTP_X_REQUESTED_WITH'] != "XMLHttpRequest" )
			exit("Access denied!");
		// Значення логін	
		$login = $_POST['login'];
		// Звернення до БД
		$loginQuery = "SELECT userLogin FROM users WHERE userLogin = '".mysql_real_escape_string($login)."' LIMIT 1";
		$loginQuerySQL = mysql_query($loginQuery) or die(mysql_error());
		// Перевірка на співпадіння введеного логіна і логінів які існують в БД
		if(mysql_num_rows($loginQuerySQL) > 0)
		{
			echo "already exists";
			exit();
		}	
		else
			echo "free";
?>