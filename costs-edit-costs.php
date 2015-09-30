<?php
	# скрипт обробник редагування витрат
	# скрипт security
	require_once("security.php");
	# приймаємо віхідні данні
	$level = $_POST['level'];
	$magazineID = $_POST['idMagazine'];
	$editCostID = $_POST['editCostsID'];
	$editCostsName = $_POST['editCostsName'];
	$editCostsDate = $_POST['editCostsDate'];
	$editCostsPrice = $_POST['editCostsPrice'];
	# перевірка на рівень доступу
	if($level == '0')
	{
		# запит в БД для оновлення інформації про витрату
		$editInfoQuery = "UPDATE costs SET name = '".mysql_real_escape_string($editCostsName)."', date = '".mysql_real_escape_string($editCostsDate)."', price = '".mysql_real_escape_string($editCostsPrice)."' WHERE id='".mysql_real_escape_string($editCostID)."'";
		$editInfoQuery = mysql_query($editInfoQuery);

		# запит на отримання інформації про витрати
		$updateCosts = "SELECT * FROM costs WHERE idShop ='".mysql_real_escape_string($magazineID)."' ORDER BY name";
		$updateCosts = mysql_query($updateCosts);
		while($data = mysql_fetch_array($updateCosts))
		{
			$updateCostsInfo[] = $data;
		}
	}else 
	{
		$updateCostsInfo = false;
	}	
		
	echo json_encode($updateCostsInfo);
?>