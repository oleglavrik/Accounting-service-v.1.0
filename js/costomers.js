	/* 
    Author name: oleg.lavrik
	Page: costs.js
    Date: 23/05/2014
    Author Email: oleh.lavrik@gmail.com
*/

$(document).ready(function() {
	//Функція налаштування календаря, викликаємо при кліку на поле дати при продажі товару
	function datePicker($element)
	{
		$($element).datepicker({
			changeMonth: true,
			changeYear: true,
			yearRange: "1930:+0",
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
			],
			monthNamesShort:[
				"Січ",
				"Лют",
				"Бер",
				"Кві",
				"Тра",
				"Чер",
				"Лип",
				"Сер",
				"Вер",
				"Жов",
				"Лис",
				"Гру"
			]
			
		});

	};
	// ініціалізація календаря для дати нарождення нового клієнта
	datePicker('.newCostomersForm input[name=costomerDateOfBirth]');

	// ініціалізація календаря для дати нарождення нового клієнта
	datePicker('.editCostomersForm input[name=editCustomerDateOfBirth]');
	

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
	// ініціалізація ширини календаря для поля дати народження нового клієнта
	calendarWidth('.newCostomersForm input[name=costomerDateOfBirth]');
	calendarWidth('.editCostomersForm input[name=editCustomerDateOfBirth]');


   // Сортування таблиці при живій загрузці
    $(".tablesorter").on('click', function(){
		$(this).tablesorter();
	});
    
    // Налаштування контенту
    $(".tab_content").hide(); //Hide all content
    $("ul.tabs li:first").addClass("active").show(); //Activate first tab
    $(".tab_content:first").show(); //Show first tab content

    // зміна табів
    $("ul.tabs li").click(function() {
        $("ul.tabs li").removeClass("active"); //Remove any "active" class
        $(this).addClass("active"); //Add "active" class to selected tab
        $(".tab_content").hide(); //Hide all tab content

        var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
        $(activeTab).fadeIn(); //Fade in the active ID content
        return false;
    });
    
   // висота колонки
    $(function(){
        $('.column').equalHeight();
    });

    // функція отримання куків по імені
	function getCookie(name) {
		var matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}

	// тримаємо рівень доступу поточного користувача
	var level = getCookie('level');

	// функція добавлння нової дати
	function todayDate($element)
	{
		var date = new Date();
		var month = date.getMonth()+1;   
		newdate = date.getFullYear()  + '-' + (month < 10 ? '0' : '') + month + '-' +  (date.getDate() < 10 ? '0' : '') + date.getDate();
		$($element).val(newdate);
	}

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
	// Добавлення нового клієнта
	$('.addCostumers').click(function(event){
		// Заборона браузер івенту на клік
		event = event || window.event;
		if (event.preventDefault) 
		{  
			event.preventDefault(); // якщо метод існує
		}else 
		{ 
			event.returnValue = false; // для < IE 9 
		}
		// При кліку піднімаємо попане вікно добавлення нового клієнта
		$('#newCostomersModal').reveal();
		// при кліку закриття модального вікна видаляємо hendler на відправку форми 
		$('#newCostomersModal').on('reveal:close', function () {
			// очистка hendel submit
			$('.newCostomersForm').off('submit');	
		});

		// івент на відправку форми добавлення нового клієнта
		$('.newCostomersForm').submit(function(){
			// перевірка на заповненість полів
			if($('.newCostomersForm input[name=costumerName]').val() != '' && $('.newCostomersForm input[name=costomerNumberCard]').val() != '' && $('.newCostomersForm input[name=costomerDateOfBirth]').val() != '')
			{
				// перевірка на введеність цифр в поле номер карти
				var float = /^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$/;
				var fnum = /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/;
				if (fnum.test($('.newCostomersForm input[name=costomerNumberCard]').val()))
				{
					// перевірка коректність введення номеру телефону
					if (float.test($('.newCostomersForm input[name=costomerNumberOfTelephone]').val()))
					{
						// запит до БД на отримання інформації, чи унікальна введена клієнська карта
						$.ajax({
							type: 'POST',
							url: 'customer-check-card-number.php',
							data: {checkCustomerNumberCard : $('.newCostomersForm input[name=costomerNumberCard]').val() },
							dataType: 'json',
							success: function(data)
							{
								// перевірка на унікальність введеної клієнської карти
								if(data)
								{
									/* клієнська карта унікальна, посилаємо запит до БД */
									// отримуємо значення полів для передачі на сервер
									var customerName = $('.newCostomersForm input[name=costumerName]').val();
									var customerNumberCard = $('.newCostomersForm input[name=costomerNumberCard]').val();
									var customerNumberTelephone = $('.newCostomersForm input[name=costomerNumberOfTelephone]').val();
									var customerDiscount = $('#discount').val();
									// відправляємо ajax запит для запису в БД
									$.ajax({
										type: 'POST',
										url: 'customers-add-new-costomer.php',
										data: {customerName : customerName, customerNumberCard : customerNumberCard, customerNumberTelephone : customerNumberTelephone, customerDiscount : customerDiscount },
										dataType: 'json',
										beforeSend: function(data)
										{
											// очищаємо таблицю
				            				$('#costomersTable tbody').find('tr').remove();
										},
										success: function(data)
										{

											// закриваэмо попапне вікно
				            				$('.close-reveal-modal').click();
				            				// перевірка рівня доступу в залежності від рівня доступу виводимо різні таблиці
				            				if(level == '0')
				            				{
				            					// Проводимо вивід таблиці для адміна
												for(var i = 0; i < data.length; i++)
												{
													/*
														* перевірка на дієву картку знижок для всіх (Admin)
														* якщо так то позначаємо окремим кольором
													*/

													if(data[i]['actionDis'] == '1')
													{
														$('#costomersTable tbody').append(
															'<tr style="color: #cd0000; font-weight:bold">'+
																'<td class="r1"><input type="checkbox" name="itemSelect"></td>'+ 
																'<td class="r2">'+data[i]['cardNumber']+'</td>'+ 
																'<td class="r3">'+data[i]['userName']+'</td>'+
																'<td class="r4">'+data[i]['totalSum']+'</td>'+
																'<td class="r5">'+data[i]['telephone']+'</td>'+
																'<td class="r6">'+data[i]['discount']+'</td>'+
																'<td class="r7">'+
																	'<form class="editCustomer" method="post" action="javascript:void(null);">'+
																		'<input type="image" src="images/icn_edit.png" title="Edit">'+
																		'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
																	'</form>'+
																	'<form class="removeCustomer" method="post" action="javascript:void(null);">'+
																		'<input type="image" src="images/icn_trash.png" title="Trash" class="removeProductSubmit">'+
																		'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
																	'</form>'+
																'</td>'+
															'</tr>'
														);
													}else
													{
														$('#costomersTable tbody').append(
															'<tr>'+
																'<td class="r1"><input type="checkbox" name="itemSelect"></td>'+ 
																'<td class="r2">'+data[i]['cardNumber']+'</td>'+ 
																'<td class="r3">'+data[i]['userName']+'</td>'+
																'<td class="r4">'+data[i]['totalSum']+'</td>'+
																'<td class="r5">'+data[i]['telephone']+'</td>'+
																'<td class="r6">'+data[i]['discount']+'</td>'+
																'<td class="r7">'+
																	'<form class="editCustomer" method="post" action="javascript:void(null);">'+
																		'<input type="image" src="images/icn_edit.png" title="Edit">'+
																		'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
																	'</form>'+
																	'<form class="removeCustomer" method="post" action="javascript:void(null);">'+
																		'<input type="image" src="images/icn_trash.png" title="Trash" class="removeProductSubmit">'+
																		'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
																	'</form>'+
																'</td>'+
															'</tr>'
														);
													}
												}
				            				}else if(level == '1')
				            				{
				            					// Проводимо вивід таблиці для модератора
												for(var i = 0; i < data.length; i++)
												{
													/*
														* перевірка на дієву картку знижок для всіх (Moderator)
														* якщо так то позначаємо окремим кольором
														color: #cd0000; font-weight:bold
													*/
													if(data[i]['actionDis'] == '1')
													{
														$('#costomersTable tbody').append(
															'<tr style="color: #cd0000; font-weight:bold">'+
																'<td class="m1"><input type="checkbox" name="itemSelect"></td>'+ 
																'<td class="m2">'+data[i]['cardNumber']+'</td>'+ 
																'<td class="m3">'+data[i]['userName']+'</td>'+
																'<td class="m4">'+data[i]['totalSum']+'</td>'+
																'<td class="m5">'+data[i]['telephone']+'</td>'+
																'<td class="m6">'+data[i]['discount']+'</td>'+
															'</tr>'
														);	
													}else
													{
														$('#costomersTable tbody').append(
															'<tr>'+
																'<td class="m1"><input type="checkbox" name="itemSelect"></td>'+ 
																'<td class="m2">'+data[i]['cardNumber']+'</td>'+ 
																'<td class="m3">'+data[i]['userName']+'</td>'+
																'<td class="m4">'+data[i]['totalSum']+'</td>'+
																'<td class="m5">'+data[i]['telephone']+'</td>'+
																'<td class="m6">'+data[i]['discount']+'</td>'+
															'</tr>'
														);
													}	
													
												}
				            				}
				            				// повідомлення про успішне добавлення нового клієнта
											showNotification({
												message: "Новий клієнт успішно добавлений",
												type: "success", 
												autoClose: true, 
												duration: 5 
											});
				            				// очищаємо всі текстові інпути
				            				$('.newCostomersForm input[type=text]').val("");
				            				// дефолтне значення знижки встановлюэмо 0
				            				$('.newCostomersForm input[name=discount]').val("5");
				            				// очистка hendel submit
				            				$('.newCostomersForm').off('submit');
				            			},
										error: function(xhr, str)
										{
											// помилка завантаження
				            				showNotification({
												message: "При добавленні нового користувача сталася помилка, спробуйте ще раз, або зверніться до адміністратора",
												type: "error", 
												autoClose: true, 
												duration: 5 
											});
										}
									});
								}else
								{
									// виводимо повідомлення не унікальність клієнської карти
		            				showNotification({
										message: "Даний номер клієнської картки вже існує в базі заних, спробуйте ввести інший номер картки",
										type: "error", 
										autoClose: true, 
										duration: 4 
									});
									// підсвітка не валідного поля
									$('.newCostomersForm input[name=costomerNumberCard]').css({'border-color':'#FF3334'}).addClass('emptyField');
									// чекаємо 4 сек і видаляємо підсвітку та клас пустоти
									setTimeout(function(){
										$('.newCostomersForm').find('.emptyField').removeAttr('style').removeClass('emptyField');
									},4000);

								}
							},
							error: function(xhr, str)
							{
								// помилка завантаження
	            				showNotification({
									message: "При перевірці інсування аналогічної клієнської карти в базі даних сталася помилка, спробуйте ще раз або зверніться до адміністратора",
									type: "error", 
									autoClose: true, 
									duration: 5 
								});
							}
						});
					}else
					{
						// виводимо повідомлення про не коректний номер телефону
        				showNotification({
							message: "Введено не коректний номер телефону, будь-лака введіть коректний номер телефону",
							type: "error", 
							autoClose: true, 
							duration: 4 
						});
						// підсвітка не валідного поля номеру телефону
						$('.newCostomersForm input[name=costomerNumberOfTelephone]').css({'border-color':'#FF3334'}).addClass('emptyField');
						// чекаємо 4 сек і видаляємо підсвітку та клас пустоти
						setTimeout(function(){
							$('.newCostomersForm').find('.emptyField').removeAttr('style').removeClass('emptyField');
							$('.newCostomersForm input[name=costomerNumberOfTelephone]').val("").focus();
						},4000);
					}	
				}else
				{
					// вказуємо які поля пусті, підсвічуємо їх
					$('.newCostomersForm input[name=costomerNumberCard]').css({'border-color':'#FF3334'});
					$('.newCostomersForm input[name=costomerNumberCard]').addClass('emptyField');
					// чекаємо 3 сек і видаляємо підсвітку полів + видаляэмо пустий клас
					setTimeout(function(){
						$('.newCostomersForm').find('.emptyField').removeAttr('style').removeClass('emptyField');
					},4000);
            		// повідомлення про не заповненість полів
					showNotification({
						message: "Тільки цифри, ведіть тільки цифри",
						type: "error", 
						autoClose: true, 
						duration: 4 
					});
				}
			}else
			{
				// не заповнені поля підсвічуємо і виводимо повідомлення
				$('.newCostomersForm').find('input[type=text]').each(function(){
					if($(this).val() != '')
					{

					}else
					{
						// вказуємо які поля пусті, підсвічуємо їх
						$(this).css({'border-color':'#FF3334'});
						$(this).addClass('emptyField');
						// чекаємо 3 сек і видаляємо підсвітку полів + видаляэмо пустий клас
						setTimeout(function(){
							$('.newCostomersForm').find('.emptyField').removeAttr('style').removeClass('emptyField');
						},3000);
					}
				});
				// повідомлення про не заповненість полів
				showNotification({
					message: "Не заповненні всі поля, заповніть всі поля",
					type: "error", 
					autoClose: true, 
					duration: 3 
				});
			}
		})

	});

	// функція завантаження таблиці клієнтів
	function loadCustomers()
	{
		// відправляємо ajax запит на сервер
		$.ajax({
			type: 'POST',
			url: 'loading-customers.php',
			dataType: 'json',
			beforeSend: function(data)
			{
				// очищаємо таблицю
            	$('#costomersTable tbody').find('tr').remove();
            	// loading gif
				$('#costomersTable tbody').append(
				"<tr class='emptyTable'>"+
						"<td width='100%' colspan='8' align='center' style='margin:15% 0 0 0;'>"+"<img src='images/ajax-loader.gif' />"+"</td>"+
					"</tr>"
				);
			},
			success: function(data)
			{
				// очищаємо таблицю
            	$('#costomersTable tbody').find('tr').remove();
				// перевірка чи існують клієнти для поточного магазину
				if(data.errorType)
				{
					// перевірка рівня доступу
					if(level == '0')
					{
						$('#costomersTable tbody').append(
							"<tr class='emptyTable'>"+
								"<td width='100%' colspan='5' align='center'>"+data.errorType+"</td>"+
							"</tr>"
						);
					}else if(level == '1')
					{
						$('#costomersTable tbody').append(
							"<tr class='emptyTable'>"+
								"<td width='100%' colspan='4' align='center'>"+data.errorType+"</td>"+
							"</tr>"
						);
					}
				}else
				{
					// перевірка рівня доступу, в залежності від рівня доступу, виводимо різні таблиці
					if(level == '0')
					{
						
						// Проводимо вивід таблиці для адміна
						for(var i = 0; i < data.length; i++)
						{
							/* 
								* перевірка на загальну акційну картку, 
								* якщо загальна акціна картка то позначаємо її окремим кольором (ADMIN)
							*/
							if(data[i]['actionDis'] == '1')
							{
								$('#costomersTable tbody').append(
									'<tr style="color: #cd0000; font-weight:bold">'+
										'<td class="r1"><input type="checkbox" name="itemSelect"></td>'+ 
										'<td class="r2">'+data[i]['cardNumber']+'</td>'+ 
										'<td class="r3">'+data[i]['userName']+'</td>'+
										'<td class="r4">'+data[i]['totalSum']+'</td>'+
										'<td class="r5">'+data[i]['telephone']+'</td>'+
										'<td class="r6">'+data[i]['discount']+'</td>'+
										'<td class="r7">'+
											'<form class="editCustomer" method="post" action="javascript:void(null);">'+
												'<input type="image" src="images/icn_edit.png" title="Edit">'+
												'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
											'</form>'+
											'<form class="removeCustomer" method="post" action="javascript:void(null);">'+
												'<input type="image" src="images/icn_trash.png" title="Trash" class="removeProductSubmit">'+
												'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
											'</form>'+
										'</td>'+
									'</tr>'
								);
							}else
							{
								$('#costomersTable tbody').append(
									'<tr>'+
										'<td class="r1"><input type="checkbox" name="itemSelect"></td>'+ 
										'<td class="r2">'+data[i]['cardNumber']+'</td>'+ 
										'<td class="r3">'+data[i]['userName']+'</td>'+
										'<td class="r4">'+data[i]['totalSum']+'</td>'+
										'<td class="r5">'+data[i]['telephone']+'</td>'+
										'<td class="r6">'+data[i]['discount']+'</td>'+
										'<td class="r7">'+
											'<form class="editCustomer" method="post" action="javascript:void(null);">'+
												'<input type="image" src="images/icn_edit.png" title="Edit">'+
												'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
											'</form>'+
											'<form class="removeCustomer" method="post" action="javascript:void(null);">'+
												'<input type="image" src="images/icn_trash.png" title="Trash" class="removeProductSubmit">'+
												'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
											'</form>'+
										'</td>'+
									'</tr>'
								);
							}	
							
						}
					}else if(level == '1')	
					{
						// Проводимо вивід таблиці для модератора
						
						for(var i = 0; i < data.length; i++)
						{
							/* 
								* перевірка на загальну акційну картку, 
								* якщо загальна акціна картка то позначаємо її окремим кольором (MODERATOR)
							*/
							if(data[i]['actionDis'] == '1')
							{
								$('#costomersTable tbody').append(
									'<tr style="color:#cd0000; font-weight:bold">'+
										'<td class="m1"><input type="checkbox" name="itemSelect"></td>'+ 
										'<td class="m2">'+data[i]['cardNumber']+'</td>'+ 
										'<td class="m3">'+data[i]['userName']+'</td>'+
										'<td class="m4">'+data[i]['totalSum']+'</td>'+
										'<td class="m5">'+data[i]['telephone']+'</td>'+
										'<td class="r6">'+data[i]['discount']+'</td>'+
									'</tr>'
								);
							}else
							{
								$('#costomersTable tbody').append(
									'<tr>'+
										'<td class="m1"><input type="checkbox" name="itemSelect"></td>'+ 
										'<td class="m2">'+data[i]['cardNumber']+'</td>'+ 
										'<td class="m3">'+data[i]['userName']+'</td>'+
										'<td class="m4">'+data[i]['totalSum']+'</td>'+
										'<td class="m5">'+data[i]['telephone']+'</td>'+
										'<td class="r6">'+data[i]['discount']+'</td>'+
									'</tr>'
								);
							}
							
						}	
					}
				}		
			},
			error: function(xhr, str)
			{
				// повідомлення про не заповненість полів
				showNotification({
					message: "При завантаженні таблиці клієнтів сталася помилка, спробуйте ще раз (F5), або зверніться до адміністратора",
					type: "error", 
					autoClose: true, 
					duration: 3 
				});
			}
		});
	}

	// завантаження таблиці клієнтів при завантаженні сторінки
	$(window).load(function(){
		loadCustomers();
	});
	// завантаження таблиці клієнтів при зміні магазину
	$('#magazineSelect').change(function(){
		loadCustomers();
	});

	// видалення клієнтів
	$('#costomersTable').on('submit','.removeCustomer',function(){
		// перевыряємо чи чекнутий чекбокс, якщо чекнутий тоді виконуємо подальші дії
		var costsCheckbox = $(this).parents('tr').find('input[name=itemSelect]:first').prop("checked");
		if(costsCheckbox)
		{
			// Виводимо вікно підтвердження на видалення клієнта
			if(confirm("Ви справді хочете видалити клієнта?"))
			{
				// Отримуємо значення ID продукту
				var productID = $(this).find('input[name=productID]').val();
				// отримуємо значення tr який будем видаляти
				var thisRow = $(this).parents('tr');
				// відправляємо ajax запит на видалення 
				$.ajax({
					type: 'POST',
					url: 'customers-delete-customer.php',
					data: { level : level, productID : productID },
					dataType: 'json',
					success: function(data)
					{
						// повідомляємо про що клієнт видалений
						showNotification({
							message: "Клієнт успішно видалений",
							type: "success", 
							autoClose: true, 
							duration: 3 
						})
						// видаляємо виділеного клієнта
						thisRow.remove();
					},
					error: function(xhr,str)
					{
						// повідомляємо що сталася помилка
						showNotification({
							message: "При видаленні кілієнта з БД сталася помилка, спробуйте ще раз або зверніться до адміністратора",
							type: "error", 
							autoClose: true, 
							duration: 5 
						});
					}
				});
			}else
			{
				// вразі відмови користувача, знімаємо поточний чекбокс
				$(this).parents('tr').find('input[name=itemSelect]:first').removeAttr("checked");
			}	
		}else
		{
			return false;
		}	
	});


	// функція відправки фінального ajax запиту для редагування клієнта
	function finalEditAjax() {
		// всі поля заповнені вірно, отримуємо значення полів як будуть передані на сервер для редагування 
		var editCustomerID = $('.editCostomersForm input[name=editСustomerID]').val();
		var editCustomerUserName = $('.editCostomersForm input[name=editСustomerName]').val();
		var editCustomerCardNumber = $('.editCostomersForm input[name=editCustomerCardNumber]').val();
		var editCustomerTotalSum = $('.editCostomersForm input[name=editTotalSum]').val();
		var editCustomerTelephone = $('.editCostomersForm input[name=editNumberOfTelephone]').val();
		var editCustomerDiscount = $('.editCostomersForm input[name=editDiscount]').val();
		var editCustomerFirstPrice = $('.editCostomersForm input[name=firstPrice]').val();
		// відправляємо ajax запит на оновлення інформації про клієнта
		$.ajax({
			type: 'POST',
			url: 'customers-edit-customers.php',
			data: {level : level, editCustomerID : editCustomerID, editCustomerUserName : editCustomerUserName, editCustomerCardNumber : editCustomerCardNumber, editCustomerTotalSum : editCustomerTotalSum, editCustomerTelephone : editCustomerTelephone, editCustomerDiscount : editCustomerDiscount, editCustomerFirstPrice : editCustomerFirstPrice },
			dataType: 'json',
			success: function(data)
			{
				// очищаємо таблицю
				$('#costomersTable tbody').find('tr').remove();
				// закриваємо попапне вікно
				$('.close-reveal-modal').click();
				// Проводимо вивід таблиці для адміна
				for(var i = 0; i < data.length; i++)
				{
					/*
						* перевірка на дієву картку знижок для всіх (Moderator)
						* якщо так то позначаємо окремим кольором
					*/
					if(data[i]['actionDis'] == '1')
					{
						$('#costomersTable tbody').append(
							'<tr style ="color: #cd0000; font-weight:bold">'+
								'<td class="r1"><input type="checkbox" name="itemSelect"></td>'+ 
								'<td class="r2">'+data[i]['cardNumber']+'</td>'+ 
								'<td class="r3">'+data[i]['userName']+'</td>'+
								'<td class="r4">'+data[i]['totalSum']+'</td>'+
								'<td class="r5">'+data[i]['telephone']+'</td>'+
								'<td class="r6">'+data[i]['discount']+'</td>'+
								'<td class="r7">'+
									'<form class="editCustomer" method="post" action="javascript:void(null);">'+
										'<input type="image" src="images/icn_edit.png" title="Edit">'+
										'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
									'</form>'+
									'<form class="removeCustomer" method="post" action="javascript:void(null);">'+
										'<input type="image" src="images/icn_trash.png" title="Trash" class="removeProductSubmit">'+
										'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
									'</form>'+
								'</td>'+
							'</tr>'
						);
					}else
					{
						$('#costomersTable tbody').append(
							'<tr>'+
								'<td class="r1"><input type="checkbox" name="itemSelect"></td>'+ 
								'<td class="r2">'+data[i]['cardNumber']+'</td>'+ 
								'<td class="r3">'+data[i]['userName']+'</td>'+
								'<td class="r4">'+data[i]['totalSum']+'</td>'+
								'<td class="r5">'+data[i]['telephone']+'</td>'+
								'<td class="r6">'+data[i]['discount']+'</td>'+
								'<td class="r7">'+
									'<form class="editCustomer" method="post" action="javascript:void(null);">'+
										'<input type="image" src="images/icn_edit.png" title="Edit">'+
										'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
									'</form>'+
									'<form class="removeCustomer" method="post" action="javascript:void(null);">'+
										'<input type="image" src="images/icn_trash.png" title="Trash" class="removeProductSubmit">'+
										'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
									'</form>'+
								'</td>'+
							'</tr>'
						);
					}	
					
				}
				// виводимо повідомлення про помилку
				showNotification({
					message: "Клієнт успішно відредагований",
					type: "success", 
					autoClose: true, 
					duration: 3 
				});
				// обновляємо таблицю, медод для захищення від багу сортування таблиці
	            $('#costomersTable').trigger("update"); 
	            var sorting = [[0,0],[0,0]]; 
	            $('#costomersTable	').trigger("sorton",[sorting]);
				// очщищаємо функцію сабміта форми редагування
				$(document).off('submit','.editCostomersForm');
				// очщищаємо функцію сабміта форми редагування
				$('.editCostomersForm').off('submit');
				
			},
			error: function(xhr,str)
			{
				// виводимо повідомлення про помилку
				showNotification({
					message: "При редагуванні клієнта сталася помилка, спробуйте ще раз, або зверніться до адміністратора",
					type: "error", 
					autoClose: true, 
					duration: 5 
				});
			}
		});
	}

	// редагування клієнта
	$('#costomersTable').on('submit','.editCustomer',function(){
		// перевіряємо чи чекнутий чекбокс, якщо чекнутий тоді виконуємо подальші дії
		var customerCheckbox = $(this).parents('tr').find('input[name=itemSelect]:first').prop("checked");
		if(customerCheckbox)
		{
			// виконуємо функцію клікер для текстових інпутів
			cliker('.editCostomersForm input[type=text]');
			// отримуємо ID клієнта який буде відредагований
			var editCustomerID = $(this).find("input[name='productID']").val();
			var oldValue = $(this).find("input[name='editCustomerCardNumber']").val();
			// відправляємо ajax запит для отрмання інформації про клієнта який буде відредагований
			$.ajax({
				type: 'POST',
				url: 'customers-edit-customer-input-data.php',
				data: {level : level, editCustomerID : editCustomerID },
				dataType: 'json',
				beforeSend: function(data)
				{
					// очищаємо текстові інпути форми радагування таблиці
					$('.editCostomersForm input[type=text]').val("");
				},
				success: function(data)
				{
					// піднімаємо попапне вікно редагування клієнта
					$('#editCustomerModal').reveal();
					// при кліку закриття модального вікна видаляємо hendler на відправку форми 
					$('#editCustomerModal').on('reveal:close', function () {
						// очистка hendel submit
						$('.editCostomersForm').off('submit');	
					});
					// вносимо данні про клієнта в форму для редагування
					$('.editCostomersForm input[name=editСustomerID]').val(data.id);
					$('.editCostomersForm input[name=editСustomerName]').val(data.userName);
					$('.editCostomersForm input[name=editCustomerCardNumber]').val(data.cardNumber);
					$('.editCostomersForm input[name=editTotalSum]').val(data.totalSum);
					$('.editCostomersForm input[name=editNumberOfTelephone]').val(data.telephone);
					$('.editCostomersForm input[name=editDiscount]').val(data.discount);
					$('.editCostomersForm input[name=firstPrice]').val(data.firstPrice);
					// змінна загруженої(не редагованої карти клієнта) для порівняння
					window.loadingCartNumber = data.cardNumber;
					
				},
				error: function(xhr,str)
				{
					// повідомляємо що сталася помилка
					showNotification({
						message: "Сталася помилка при отримані даних про клієнта, спробуйте ще раз або зверніться до адміністратора",
						type: "error", 
						autoClose: true, 
						duration: 5 
					});
				}
			});
			//
			
			// відправка відредагованих даних
			$('.editCostomersForm').submit(function(){
				
				// перевірка на пустоту
				if($('.editCostomersForm input[name=editСustomerName]').val() != '' && $('.editCostomersForm input[name=editCustomerCardNumber]').val() && $('.editCostomersForm input[name=editTotalSum]').val() != '' && $('.editCostomersForm input[name=editNumberOfTelephone]').val() != '' && $('.editCostomersForm input[name=editDiscount]').val() != '')
				{
					var float = /^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$/;
					var fnum = /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/;
					// перевірка на коректність введення номеру телефону
					if(float.test($('.editCostomersForm input[name=editNumberOfTelephone]').val()))
					{
						// телефон корекний

						// перевірка на введеність цифр в поле номер карти
						if
						(
							fnum.test($('.editCostomersForm input[name=editTotalSum]').val()) && 
							fnum.test($('.editCostomersForm input[name=editDiscount]').val()) &&
							fnum.test($('.editCostomersForm input[name=firstPrice]').val())
						)
						{
							// порівнюємо значення номера картки до редагування і після редагування 
							if(loadingCartNumber == $('.editCostomersForm input[name=editCustomerCardNumber]').val())
							{
								// номер картки не змінювався відправляємо ajax на редагування
								finalEditAjax();
							}else
							{
								/* номер картки змінювався, пере віряємо чи номер картки унікальний */
								// запит до БД на отримання інформації, чи унікальна введена клієнська карта
								$.ajax({
									type: 'POST',
									url: 'customer-check-card-number.php',
									data: {checkCustomerNumberCard : $('.editCostomersForm input[name=editCustomerCardNumber]').val() },
									dataType: 'json',
									success: function(data)
									{
										// якщо картка унікальна то відправляємо аjax на редагування
										if(data)
										{
											// ajax на редагування
											finalEditAjax();										
										}else
										{
											
											// виводимо повідомлення не унікальність клієнської карти
				            				showNotification({
												message: "Даний номер клієнської картки вже існує в базі заних, спробуйте ввести інший номер картки",
												type: "error", 
												autoClose: true, 
												duration: 4 
											});
											// підсвітка не валідного поля
											$('.editCostomersForm input[name=editCustomerCardNumber]').css({'border-color':'#FF3334'}).addClass('emptyField');
											// чекаємо 4 сек і видаляємо підсвітку та клас пустоти
											setTimeout(function(){
												$('.editCostomersForm').find('.emptyField').removeAttr('style').removeClass('emptyField');
											},4000);
										}
										// очистка hendel submit
										$('.editCostomersForm').off('submit');		
									},
									error: function(xhr, str)
									{
										// помилка перевірці аналогічної карти в БД
			            				showNotification({
											message: "При перевірці інсування аналогічної клієнської карти в базі даних сталася помилка, спробуйте ще раз або зверніться до адміністратора",
											type: "error", 
											autoClose: true, 
											duration: 5 
										});
									}
								});	
							}	
						}else
						{	
							$('.numberCheck input[type=text]').each(function(){
								// не число, вказуємо яке поле не вірно заповнене і повідомлення про помилку
								if (fnum.test($(this).val()))
								{
										
								}else
								{
									// вказуємо які поля пусті, підсвічуємо їх
									$(this).css({'border-color':'#FF3334'});
									$(this).addClass('emptyField');
									// чекаємо 3 сек і видаляємо підсвітку полів + видаляэмо пустий клас
									setTimeout(function(){
										$('.editCostomersForm').find('.emptyField').removeAttr('style').removeClass('emptyField');
									},3000);

									// Виводимо повідомлення про полилку
									showNotification({
										message: "Не вірне значення поля(ів), тільки цілі цифри ",
										type: "error", 
										autoClose: true, 
										duration: 3 
									});
								}	
							});
							
						}
					}else
					{
						// терефон не корекний

						// не число, вказуємо яке поле не вірно заповнене і повідомлення про помилку
						if (float.test($('.editCostomersForm input[name=editNumberOfTelephone]').val()))
						{
							
						}else
						{
							// вказуємо в яке поле ввели не корекний номер телефону
							$('.editCostomersForm input[name=editNumberOfTelephone]').css({'border-color':'#FF3334'});
							$('.editCostomersForm input[name=editNumberOfTelephone]').addClass('emptyField');
							// чекаємо 3 сек і видаляємо підсвітку полів + видаляэмо пустий клас
							setTimeout(function(){
								$('.editCostomersForm').find('.emptyField').removeAttr('style').removeClass('emptyField');
							},3000);

							// Виводимо повідомлення про полилку
							showNotification({
								message: "Не коректний номер телефону, введыть корекний номер телефону",
								type: "error", 
								autoClose: true, 
								duration: 3 
							});
						}	
					}	
				}else
				{
					// не заповнені поля підсвічуємо і виводимо повідомлення
					$('.editCostomersForm').find('input[type=text]').each(function(){
						if($(this).val() != '')
						{
							
						}else
						{
							// вказуємо які поля пусті, підсвічуємо їх
							$(this).css({'border-color':'#FF3334'});
							$(this).addClass('emptyField');
							// чекаємо 3 сек і видаляємо підсвітку полів + видаляэмо пустий клас
							setTimeout(function(){
								$('.editCostomersForm').find('.emptyField').removeAttr('style').removeClass('emptyField');
							},3000);
						}
					});
					// виводимо повідомлення про незаповненість всіх полів
					showNotification({
						message: "Не заповнені всі поля, будь-ласка заповніть всі поля",
						type: "error", 
						autoClose: true, 
						duration: 3 
					});
				}
					
			});	
		}else
		{
			return false;
		}	
	});
});



