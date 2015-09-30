<?php
	// Connect to DB
        
	define("DB_HOST","localhost");
	define("DB_USER","lazuri69_root");
	define("DB_PASSWORD","lazurit");
	define("DB_NAME","lazuri69_lazyrit");


        // Charset send header UTF8
	
	// Connect to DataBase
	$db = mysql_connect(DB_HOST,DB_USER,DB_PASSWORD);
	// MySQL sending charset
	header("Content-Type:text/html; charset='utf-8'");
	mysql_query("SET NAMES utf8");
	if(!$db)
	{
		exit("No connection width DataBase");
	}
		
	# Select DataBase
	if(!mysql_select_db(DB_NAME,$db))
	{
		exit("Wrong DataBase");	
	}
 ?>