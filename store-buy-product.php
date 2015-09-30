<?php
	/* 
		* Скрипт купівлі нового продукту на складі
	*/
	# скрипт security
	require_once("security.php");
	// Отримуємо вхідні дані
	$productDate = $_POST['productDate'];
	$productID = $_POST['productID'];
	$productSalePrice = $_POST['productPrice'];
	$prductsClentID = $_POST['buyCardNumber'];
	// отримаємо ціну першої закупки, знижку і загальну ціну закупок для певного клієнта по номеру картки
	$sql = 'SELECT firstPrice,discount,totalSum,actionDis FROM customers WHERE cardNumber = "'.mysql_real_escape_string($prductsClentID).'"';
	$sql = mysql_query($sql);
	$cInfo = mysql_fetch_assoc($sql);


	// значення 0 або 1 якщо 1 то клієнт акційний загальний для всіх покупок спеціально для акцій
	$actionDis = $cInfo['actionDis'];

	// перевірка на акційного загального для всіх клієнта, якщо аккційний то пропускаємо всі вирахування
	if($actionDis == '0')
	{
		// переша ціна поку покупок для даного клієнта 
		$customerFirstPrice = $cInfo['firstPrice'];
		// перевіряємо чи знижка не 20% якщо, 20% то процентну знижку нараховувати не потрібно
		if($cInfo['discount'] != '20')
		{
			// перевірка чи існує перша закупка клієнта, якщо ні(тобто 0 клієнт нічого не купляв) то записуємо 1 покупку в поле firstPrice
			if($customerFirstPrice == '0')
			{
				$firstPriceSQL = 'UPDATE customers SET firstPrice = '.mysql_real_escape_string($productSalePrice).' WHERE cardNumber = "'.mysql_real_escape_string($prductsClentID).'"';
				mysql_query($firstPriceSQL);
				// вибираємо перезаписану першу ціну і перезаписуємо її
				$fpSQL = 'SELECT firstPrice FROM customers WHERE cardNumber = "'.mysql_real_escape_string($prductsClentID).'" ';
				$fpSQL = mysql_query($fpSQL);
				$fpInfo = mysql_fetch_assoc($fpSQL);
				$customerFirstPrice = $fpInfo['firstPrice'];
			}
			// сумуємо загальну ціну покупок по даному клієнту
			$customerTotalPrice = (float)$cInfo['totalSum'] + (float)$productSalePrice;

			// рахуэмо різницю між загальною ціною покупок і першою ціною покупок ($customerTotalPrice - $customerFirstPrice)
			$customerDifPrice = (float)$customerTotalPrice - (float)$customerFirstPrice;

			// розраховуємо процентну ставку

			if($customerDifPrice >= 1000)
			{
				if($customerDifPrice >= 2000)
				{
					if($customerDifPrice >= 3000)
					{
						if($customerDifPrice >= 4000)
						{
							if($customerDifPrice >= 5000)
							{
								if($customerDifPrice >= 6000)
								{
									if($customerDifPrice >= 7000)
									{
										if($customerDifPrice >= 8000)
										{
											if($customerDifPrice >= 9000)
											{
												if($customerDifPrice >= 10000)
												{
													$discount = 15;
												}else
												{
													$discount = 14;
												}	
											}else
											{
												$discount = 13;
											}	
										}else
										{
											$discount = 12;
										}	
									}else
									{
										$discount = 11;
									}	
								}else
								{
									$discount = 10;
								}	
							}else
							{
								$discount = 9;
							}	
						}else
						{
							$discount = 8;
						}	
					}else
					{
						$discount = 7;		
					}	
				}else
				{
					$discount = 6;
				}	
			}else
			{
				$discount = 5;
			}	
			
			
			

			// записуэмо результати 
			$finalResult = 'UPDATE customers SET
												totalSum = '.mysql_real_escape_string($customerTotalPrice).',
												firstPrice = '.mysql_real_escape_string($customerFirstPrice).',
												difPrice = '.mysql_real_escape_string($customerDifPrice).',
												discount = '.mysql_real_escape_string($discount).'
							WHERE cardNumber = "'.mysql_real_escape_string($prductsClentID).'"					
							';
			mysql_query($finalResult);


		}elseif($cInfo['discount'] == '20') {
			$customerTotalPrice = (float)$cInfo['totalSum'] + (float)$productSalePrice;
			$totalPriceSQL = 'UPDATE customers SET 
												totalSum = '.mysql_real_escape_string($customerTotalPrice).'
							WHERE cardNumber = "'.mysql_real_escape_string($prductsClentID).'"';						
			mysql_query($totalPriceSQL);
		}
	}	
		


	// Виконуємо запит для обновлення запису в БД
	$buyQuery = 'UPDATE store SET dateOfSale = "'.$productDate.'", salePrice = "'.$productSalePrice.'", idCustomer = "'.$prductsClentID.'" WHERE id = "'.$productID.'" ';
	$buyQuery = mysql_query($buyQuery);
	echo json_encode($buyQuery);
	
?>