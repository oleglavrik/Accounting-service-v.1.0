/* 
    Author name: oleg.lavrik
	Page: reports.js
    Date: 25/04/2014
    Author Email: oleh.lavrik@gmail.com
	
 */

$(document).ready(function() {
	// Заносимо дати при завантаженні сторінки
	var date = new Date();
	var month = date.getMonth()+1;   
	firstDate = date.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-' + '01';
	toDate = date.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-' + (date.getDate() < 10 ? '0' : '') + date.getDate();
	// вносимо стартову дату
	$('.reportDate input[name=raportDateStart]').val(firstDate);
	// вносимо сьогоднішню дату
	$('.reportDate input[name=raportDateEnd]').val(toDate);

	// Налаштування календаря, викликаємо при кліку на поле дати при продажі товару
	$(function(){
		$(".reportDate input[type=text]").datepicker({
			dateFormat: 'yy-mm-dd',
			firstDay: 1,
			dayNames:[
				"Неділя",
				"Понеділок",
				"Вівторок",
				"Середа",
				"Четвер",
				"Пятниця",
				"Субота",
				
			],
			dayNamesMin:[
				"Нед",
				"Пон",
				"Вів",
				"Сер",
				"Чет",
				"Пят",
				"Суб",
				
			],
			monthNames:[
				"Січень",
				"Лютий",
				"Березень",
				"Квітень",
				"Травень",
				"Червень",
				"Липень",
				"Серпень",
				"Вересень",
				"Жовтень",
				"Листопад",
				"Грудень"
			]
			
		});
		
	});

	/*
		* функція для визначення ширини календаря,
		* взалежності від розміру текстового інпута
	*/
	function calendarWidth($textInput)
	{
		// Перший клік, в подальшому перейде на фокус
		$(document).on( "click", $textInput, function() {
			var elementWidth = $(this).width();
			$('#ui-datepicker-div').css("width",elementWidth - 5);
		});
		// Далі фокус
		$(document).on("focus", $textInput, function() {
			var elementWidth = $(this).width();
			$('#ui-datepicker-div').css("width",elementWidth - 5);
		});
	}

    // Сортування таблиці при живій загрузці
    $(".tablesorter").on('click', function(){
		$(this).tablesorter();
	});
    
    //When page loads...
    $(".tab_content").hide(); //Hide all content
    $("ul.tabs li:first").addClass("active").show(); //Activate first tab
    $(".tab_content:first").show(); //Show first tab content

    //On Click Event
    $("ul.tabs li").click(function() {
        $("ul.tabs li").removeClass("active"); //Remove any "active" class
        $(this).addClass("active"); //Add "active" class to selected tab
        $(".tab_content").hide(); //Hide all tab content

        var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
        $(activeTab).fadeIn(); //Fade in the active ID content
        return false;
    });
    
    //equalHeight
    $(function(){
        $('.column').equalHeight();
    });

	/*
		* Плейсхолдер для текстових інпутів
	*/
	function cliker($element){
		$($element).focus(function(){
			window.defaultVal = $(this).val();
			if(this.value == defaultVal)
			{
				this.value = '';
			}
		})
		$($element).blur(function(){
			if(this.value == '')
			{
				this.value = defaultVal;
			}
		})
	}
	
	// ініціалізація плейсхолдера для пошуку
	cliker('.quick_search input');

	// функція отримання куків по імені
	function getCookie(name) {
		var matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}

	// тримаємо рівень доступу поточного користувача
	var level = getCookie('level');

	// фунцкія підрахунку двохмірного масиву
	Object.size = function(obj) 
	{
		var size = 0, key;
		// проходимо по ключах і рахуємо їх
		for(key in obj) 
		{
			if(obj.hasOwnProperty(key)) size++;
		}
		// повертаємо розмір
		return size;
	};

	// qtips
	$('.totalReports span').qtip({
		position: {
	        my: 'bottom left',  
	        at: 'top right', 
	        target: 'event',
            adjust: {
                x: -4
            },
	    }
	});

	$('.totalNotSoldThisMagazine span').qtip({
		position: {
	        my: 'bottom left',  
	        at: 'top right', 
	        target: 'event',
            adjust: {
                x: -4
            },
	    }
	});

	$('.totalNotSoldAllMagazines span').qtip({
		position: {
	        my: 'bottom left',  
	        at: 'top right', 
	        target: 'event',
            adjust: {
                x: -4
            },
	    }
	});

	/*
		функція завантаження Звітів
	*/
	function raportsLoad()
	{

		// перевірка полів дат на пустоту
		if($('.reportDate input[name=raportDateStart]').val() != '' && $('.reportDate input[name=raportDateEnd]').val() != '')
		{
			// Читаємо вхідні данні
			var shop = $('.site_title').val();
			var sDate = $('.reportDate input[name=raportDateStart]').val();
			var eDate = $('.reportDate input[name=raportDateEnd]').val();

			// відправляємо аjax запит за завантаження звіту
			$.ajax({
				type: 'POST',
				url: 'loading-raports.php',
				data: { startDate : sDate, endDate : eDate, magazine : shop, level : level },
				dataType: 'json',
				beforeSend: function(data)
				{
					// Завжди перед відправкою запиту видаляємо все з таблиці
					$('#raportTable tbody').find('tr').remove();
					// loading gif
					$('#raportTable tbody').append(
					"<tr class='emptyTable'>"+
							"<td width='100%' colspan='8' align='center' style='margin:6% 0 0 0;'>"+"<img src='images/ajax-loader.gif' />"+"</td>"+
						"</tr>"
					);
				},
				success: function(data)
				{
					// Завжди перед відправкою запиту видаляємо все з таблиці
					$('#raportTable tbody').find('tr').remove();
					if(level == '0')
					{
						// ВИВІД ТАБЛИЦІ ЗВІТІВ ТА ПІДСУМКИ ДЛЯ АДМІНА	
						// перевіряємо чи існує хоть одни проданий товар
						if(data['0']['errorType'])
						{
							$('#raportTable tbody').append(
								"<tr class='emptyTable'>"+
									"<td width='100%' colspan='7' align='center'>"+data['0']['errorType']+"</td>"+
								"</tr>"
							);
							// якщо немає проданих товарів то ховаємо список підсумків
							$('.totalInputPrice').hide();
							$('.totalSalePrice').hide();
							$('.totalDifferencePrices').hide();
							$('.totalQuantityProducts').hide();

						}else
						{
							// очищаємо перед виводом поля підумків
							$('.totalInputPrice b').html("");
							$('.totalSalePrice b').html("");
							$('.totalQuantityProducts b').html("");

							// показуємо значення підсумків
							$('.totalInputPrice').show();
							$('.totalSalePrice').show();
							$('.totalQuantityProducts').show();

							// встановлюэмо змінні
							// Вхідна ціна
							var totalInputPrice = 0;
							// Вихідна ціна
							var totalStartingPrice = 0;
							// загальна ціна продажу
							var totalSalePrice = 0;
							// Кількість
							var totalQuantityProduct = 0;
							// довжина підмавиву продані продукти основного масиву data
							var arraySizeProducts = Object.size(data['0']);

							// виносимо дані про родані продукти в таблицю
							for(var i = 0; i < arraySizeProducts; i++)
							{
								$('#raportTable tbody').append(
									'<tr>'+
										'<td class="r1">'+data['0'][i]['productName']+'</td>'+ 
										'<td class="r2">'+data['0'][i]['productTypesDescription']+'</td>'+ 
										'<td class="r3">'+data['0'][i]['dateOfPurchase']+'</td>'+
										'<td class="r4">'+data['0'][i]['dateOfSale']+'</td>'+
										'<td class="r5">'+data['0'][i]['inputPrice']+'</td>'+
										'<td class="r6">'+data['0'][i]['startingPrice']+'</td>'+ 
										'<td class="r7">'+data['0'][i]['salePrice']+'</td>'+
									'</tr>'
								);

								// Рахуємо підсумки по товарах [Вхідна ціна, Вихідна ціна, Кількість товару]
								// Вхідна сума
								totalInputPrice = parseFloat(totalInputPrice) + parseFloat(data['0'][i]['inputPrice']);
								// Вихідна сума
								totalStartingPrice = parseFloat(totalStartingPrice) + parseFloat(data['0'][i]['startingPrice']);
								// Загальна ціна продажу
								totalSalePrice = parseFloat(totalSalePrice) + parseFloat(data['0'][i]['salePrice']);
								// Кількість
								totalQuantityProduct++;
							}

							// Всі підсумки обрізаємо все після 2 знаків після коми
							totalInputPrice = totalInputPrice.toFixed(2);
							totalSalePrice = totalSalePrice.toFixed(2);

							// Виводимо підсумки списком
							$('.totalInputPrice b').append(totalInputPrice + ' UAH');
							$('.totalSalePrice b').append(totalSalePrice + ' UAH');
							$('.totalQuantityProducts b').append(totalQuantityProduct + ' шт');	
								
						}
						// перевірка чи існують витрати [адмін]
						if(data['1']['errorType'])
						{
							// очистка полів
							$('.totalCostsPrice b').html("");
							// виводимо, що в даному періоді не існує витрат
							$('.totalCostsPrice b').append(data['1']['errorType']);
							// приховуємо поле різниця сум
							$('.totalDifferencePrices').hide();
						}else
						{	
							// очистка полів
							$('.totalCostsPrice b').html("");
							$('.totalDifferencePrices b').html("");
							
							// довжина підмасиву витрат, з основної data
							var arraySizeCosts = Object.size(data['1']);

							// встановлюємо перемінні загальна сумма витрат і різниця сум
							var totalCostsPrice = 0;
							var totalDifferencePrices = 0;

							// рахуємо загальну сумму витрат
							for(var i = 0; i < arraySizeCosts; i++)
							{
								totalCostsPrice = parseFloat(totalCostsPrice) + parseFloat(data['1'][i]['price']);
							}

							// рахуємо різницю сум
							totalDifferencePrices = parseFloat(totalSalePrice) - parseFloat(totalCostsPrice);

							// Обрізаємо значення до 2 символів після коми
							totalCostsPrice = totalCostsPrice.toFixed(2);
							totalDifferencePrices = totalDifferencePrices.toFixed(2);
							// вносимо данні в поля
							$('.totalCostsPrice b').append(totalCostsPrice + ' UAH');
							$('.totalDifferencePrices b').append(totalDifferencePrices + ' UAH');


						}
						
						// ПІДРАХУНОК ЗАГАЛЬНОЇ СУМИ ВИТРАТ
						if(data['0']['errorType'])
						{
							// немаэ жодного проданого товару
							$('.basicDifferencePrices b').html("");
							$('.basicDifferencePrices').hide();
						}else
						{
							// якщо є товари але немає витрат
							if(data['1']['errorType'] && arraySizeProducts >= 1)
							{
								$('.basicDifferencePrices').show();
								$('.basicDifferencePrices b').html("");
								basicDifferencePrices = parseFloat(totalSalePrice) - parseFloat(totalInputPrice) - parseFloat(0);
								basicDifferencePrices = basicDifferencePrices.toFixed(2);
								$('.basicDifferencePrices b').append(basicDifferencePrices + ' UAH');
							}else
							{
								// якщо існують продані товари та витрати
								if(arraySizeProducts >= 1 && arraySizeCosts >= 1)
								{
									$('.basicDifferencePrices').show();
									$('.basicDifferencePrices b').html("");
									basicDifferencePrices = parseFloat(totalSalePrice) - parseFloat(totalInputPrice) - parseFloat(totalCostsPrice);
									basicDifferencePrices = basicDifferencePrices.toFixed(2);
									$('.basicDifferencePrices b').append(basicDifferencePrices + ' UAH');
								}	
							}
						}

						// ПІДРАХУНОК ТОВАРІВ ЯКІ НЕ ПРОДАНІ ДЛЯ ПОТОЧНОГО МАГАЗИНУ
						$.ajax({
							type: 'POST',
							url: 'raports-get-nsold-products-this-shop.php',
							data: { idShop : $('.site_title').val() },
							dataType: 'json',
							beforeSend: function(data)
							{
								$('.totalNotSoldThisMagazine li b').html("");
							},
							success: function(data)
							{
								if(data['errorType'])
								{
									// вказуємо, що не інснує не проданих товарів для поточного магазину
									$('.notSoldThisQuantity b').append(data['errorType']);

									// приховуємо поля віхідна/вихідна ціна і різниця сум
									$('.notSoldThisInputPrice').hide();
									$('.notSoldThisOutputPrice').hide();
									$('.notSoldThisDifferencePrices').hide();
								}else
								{
									// відновлюємо показ віхідна/вихідна ціна і різниця сум
									$('.notSoldThisInputPrice').show();
									$('.notSoldThisOutputPrice').show();
									$('.notSoldThisDifferencePrices').show();
									// основні перемінні
									var totalNotSoldQuantity = 0;
									var totalNotSoldInputPrice = 0;
									var totalNotSoldOutputPrice = 0;
									var totalNotSoldDifferents = 0;
									for(var i = 0; i < data.length; i++)	
									{
										totalNotSoldInputPrice = parseFloat(totalNotSoldInputPrice) + parseFloat(data[i]['inputPrice']);
										totalNotSoldOutputPrice = parseFloat(totalNotSoldOutputPrice) + parseFloat(data[i]['startingPrice']);
										totalNotSoldQuantity++
									}
									// різниця сум для товарів які не продані, в поточному магазині
									totalNotSoldDifferents = parseFloat(totalNotSoldOutputPrice) - parseFloat(totalNotSoldInputPrice);
									// обрізаємо до 2 занків після коми
									totalNotSoldInputPrice = totalNotSoldInputPrice.toFixed(2);
									totalNotSoldOutputPrice = totalNotSoldOutputPrice.toFixed(2);
									totalNotSoldDifferents = totalNotSoldDifferents.toFixed(2);
									// вносимо дані в поля підсумків
									$('.notSoldThisQuantity b').append(totalNotSoldQuantity + ' шт');
									$('.notSoldThisInputPrice b').append(totalNotSoldInputPrice + ' UAH');
									$('.notSoldThisOutputPrice b').append(totalNotSoldOutputPrice + ' UAH');
									$('.notSoldThisDifferencePrices b').append(totalNotSoldDifferents + ' UAH');
								}	
								

							},
							error: function(xhr,str)
							{
								// повідомлення про помилку 
								showNotification({
									message: "При завантаженні підсумків непроданих товарів для поточного магазину сталася помилка, перезавантажте сторінку(F5) або зверніться до адміністратора",
									type: "error", 
									autoClose: true, 
									duration: 5 
								});	
							}
						});

						//	ПІДРАХУНОК ТОВАРІВ ЯКІ НЕ ПРОДАНІ ДЛЯ ВСІХ МАГАЗИНІВ
						$.ajax({
							type: 'POST',
							url: 'raports-get-nsold-products-all-shop.php',
							dataType: 'json',
							beforeSend: function(data)
							{
								$('.totalNotSoldAllMagazines li b').html("");
							},
							success: function(data)
							{
								if(data['errorType'])
								{
									// вказуємо, що не інснує не проданих товарів для всіх магазинів
									$('.notSoldAllQuantity b').append(data['errorType']);

									// приховуємо поля віхідна/вихідна ціна і різниця сум
									$('.notSoldAllInputPrice').hide();
									$('.notSoldAllOutputPrice').hide();
									$('.notSoldAllDifferencePrices').hide();
								}else
								{
									// відновлюємо показ віхідна/вихідна ціна і різниця сум
									$('.notSoldAllInputPrice').show();
									$('.notSoldAllOutputPrice').show();
									$('.notSoldAllDifferencePrices').show();
									// основні перемінні
									var totalNotSoldAllQuantity = 0;
									var totalNotSoldAllInputPrice = 0;
									var totalNotSoldAllOutputPrice = 0;
									var totalNotSoldAllDifferents = 0;

									for(var i = 0; i < data.length; i++)	
									{
										totalNotSoldAllInputPrice = parseFloat(totalNotSoldAllInputPrice) + parseFloat(data[i]['inputPrice']);
										totalNotSoldAllOutputPrice = parseFloat(totalNotSoldAllOutputPrice) + parseFloat(data[i]['startingPrice']);
										totalNotSoldAllQuantity++
									}
									// різниця сум для товарів які не продані, в поточному магазині
									totalNotSoldAllDifferents = parseFloat(totalNotSoldAllOutputPrice) - parseFloat(totalNotSoldAllInputPrice);	

									// обрізаємо до 2 занків після коми
									totalNotSoldAllInputPrice = totalNotSoldAllInputPrice.toFixed(2);
									totalNotSoldAllOutputPrice = totalNotSoldAllOutputPrice.toFixed(2);
									totalNotSoldAllDifferents = totalNotSoldAllDifferents.toFixed(2);

									// вносимо дані в поля підсумків
									$('.notSoldAllQuantity b').append(totalNotSoldAllQuantity + ' шт');
									$('.notSoldAllInputPrice b').append(totalNotSoldAllInputPrice + ' UAH');
									$('.notSoldAllOutputPrice b').append(totalNotSoldAllOutputPrice + ' UAH');
									$('.notSoldAllDifferencePrices b').append(totalNotSoldAllDifferents + ' UAH');
								}	
							},
							error: function(xhr,str)
							{
								// повідомлення про помилку 
								showNotification({
									message: "При завантаженні підсумків непроданих товарів для всіх магазинів сталася помилка, перезавантажте сторінку(F5) або зверніться до адміністратора",
									type: "error", 
									autoClose: true, 
									duration: 5 
								});
							}
						});
					}else if(level == '1')
					{
						// ВИВІД ТАБЛИЦІ ЗВІТІВ ТА ПІДСУМКИ ДЛЯ МОДЕРАТОРА
						// перевіряємо чи існують витрати
						if(data['0']['errorType'])
						{
							$('#raportTable tbody').append(
								"<tr class='emptyTable'>"+
									"<td width='100%' colspan='5' align='center'>"+data['0']['errorType']+"</td>"+
								"</tr>"
							);

							// якщо немає проданих товарів то ховаємо список підсумків
							$('.totalPrice').hide();
							$('.totalDifferencePrices').hide();
							$('.totalQuantityProducts').hide();
						}else
						{
							// очищаємо перед виводом поля підумків
							$('.totalPrice b').html("");
							$('.totalQuantityProducts b').html("");

							// показуємо значення підсумків
							$('.totalPrice').show();
							$('.totalQuantityProducts').show();
							
							// загальна продажна ціна для модератора
							var totalPrice = 0;
							var totalQuantityProduct = 0;
							// довжина підмавиву продані продукти основного масиву data
							var arraySizeProducts = Object.size(data['0']);
							// рівень модератора, товари існують виводимо їх
							for(var i = 0; i < arraySizeProducts; i++)
							{
								$('#raportTable tbody').append(
									'<tr>'+
										'<td class="m1">'+data['0'][i]['productName']+'</td>'+ 
										'<td class="m2">'+data['0'][i]['productTypesDescription']+'</td>'+ 
										'<td class="m3">'+data['0'][i]['dateOfPurchase']+'</td>'+
										'<td class="m4">'+data['0'][i]['dateOfSale']+'</td>'+
										'<td class="m5">'+data['0'][i]['salePrice']+'</td>'+
									'</tr>'
								);
								// Рахуємо підсумки по товарах [Кількість товару, загальна сума]
								totalPrice = parseFloat(totalPrice) + parseFloat(data['0'][i]['salePrice']);
								totalQuantityProduct++;
							}

							// Всі підсумки обрізаємо все після 2 знаків після коми
							totalPrice = totalPrice.toFixed(2);
							//totalDifferencePrices = totalDifferencePrices.toFixed(2);
							
							// вносимо підсумки
							$('.totalQuantityProducts b').append(totalQuantityProduct + ' шт');
							$('.totalPrice b').append(totalPrice + ' UAH');
						}
						// перевірка чи існують витрати [модератор]
						if(data['1']['errorType'])
						{
							// очистка полів
							$('.totalCostsPrice b').html("");
							// виводимо, що в даному періоді не існує витрат
							$('.totalCostsPrice b').append(data['1']['errorType']);
							// приховуємо поле різниця сум
							$('.totalDifferencePrices').hide();
						}else
						{
							// очистка полів
							$('.totalCostsPrice b').html("");
							$('.totalDifferencePrices b').html("");
							
							// довжина підмасиву витрат, з основної data
							var arraySizeCosts = Object.size(data['1']);

							// встановлюємо перемінні загальна сумма витрат і різниця сум
							var totalCostsPrice = 0;
							var totalDifferencePrices = 0;
							// рахуємо загальну сумму витрат
							for(var i = 0; i < arraySizeCosts; i++)
							{
								totalCostsPrice = parseFloat(totalCostsPrice) + parseFloat(data['1'][i]['price']);
							}

							// рахуємо різницю сум
							totalDifferencePrices = parseFloat(totalPrice) - parseFloat(totalCostsPrice);
							// Обрізаємо значення до 2 символів після коми
							totalCostsPrice = totalCostsPrice.toFixed(2);
							totalDifferencePrices = totalDifferencePrices.toFixed(2);
							// вносимо данні в поля
							$('.totalCostsPrice b').append(totalCostsPrice + ' UAH');
							$('.totalDifferencePrices b').append(totalDifferencePrices + ' UAH');
						}	
					
					}

					// обновляємо таблицю, медод для захищення від багу сортування таблиці
		            $('#raportTable').trigger("update"); 
		            var sorting = [[2,1],[0,0]]; 
		            $('#raportTable').trigger("sorton",[sorting]);
				},
				error: function(xhr, str)
				{
					// виводимо помилку про завантаження рапорту
					showNotification({
						message: "При завантаженні звіту сталася помилка, перезавантажте сторінку або зверніться до адміністратора",
						type: "error", 
						autoClose: true, 
						duration: 3 
					});
				}
			});
		}	
		
	}
	// Ініціалізація виконання функції "Завантаження звітів" [raportsLoad()] при первинному завантаженні сторінки
	$(window).on('load', function(){
		raportsLoad();
	});
	// Ініціалізація виконання функції "Завантаження звітів" [raportsLoad()] при ручному формуванні дати [Сформувати звіт]
	$(document).on('submit','.reportDate',function(){
		raportsLoad();
	});

	// Ініціалізація виконання функції "Завантаження звітів" [raportsLoad()] при зміні магазину [magazine select]
	$('#magazine').change(function(){
		raportsLoad();
	});

	


});	