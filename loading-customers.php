<?php
	# скрипт обробник завантаження витрат при загрузці сторінки
	# скрипт security
	require_once("security.php");
	# отримаємо вхідні дані
	$magazineID = $_POST['shopID'];
	# відправляємо запит до БД на отримання списку клієнтів для поточного магазину
	$customersQuery = 'SELECT * FROM customers ORDER BY cardNumber ASC';
	$customersQuery	= mysql_query($customersQuery);
	# перевірка чи є хотя б одна витрата в БД
	if(mysql_num_rows($customersQuery) == '0')
	{
		$loadingCustomers['errorType'] = "Не має жодного клієнта для поточного магазину";
	}else
	{
		# заносимо в масив отриманні дані з БД
		while($data = mysql_fetch_array($customersQuery))
		{
			$loadingCustomers[] = $data;
		}	
	}
	echo json_encode($loadingCustomers);
?>
	