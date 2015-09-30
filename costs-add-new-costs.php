<?php
	# скрипт оброьник додавання новоъ витрати
	# скрипт security
	require_once("security.php");

	# приймаємо вхідні дані
	$magazineID = $_POST['magazineID'];
	$costName = $_POST['costsName'];
	$costDate = $_POST['costsDate'];
	$costPrice = $_POST['costsPrice'];

	# Пишемо в БД нову витрату
	$costQuery = 'INSERT INTO costs (idShop, name, date, price)values("'.mysql_real_escape_string($magazineID).'","'.mysql_real_escape_string($costName).'","'.mysql_real_escape_string($costDate).'","'.mysql_real_escape_string($costPrice).'")';
	$costQuery = mysql_query($costQuery);

	# проводимо вибірку для оновлення інформації
	$newListQuery = 'SELECT * FROM costs WHERE idShop= "'.mysql_real_escape_string($magazineID).'" ORDER BY date DESC';	
	$newListQuery = mysql_query($newListQuery);
	while($data = mysql_fetch_array($newListQuery))
	{
		$updatingCosts[] = $data;
	}

	echo json_encode($updatingCosts);	
?>