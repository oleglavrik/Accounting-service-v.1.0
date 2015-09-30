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
	};
	// ініціалізація календаря для нової витрати
	datePicker('.newCostsForm input[name=dateOfCosts]');

	// ініціалізація календаря для редагування витрати
	datePicker('.editCostsForm input[name=editDateOfCosts]');

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
	// ініціалізація ширини календаря для поля дати нової затрати
	calendarWidth('.newCostsForm input[name=dateOfCosts]');

	// ініціалізація ширини календаря для поля дати нової затрати
	calendarWidth('.editCostsForm input[name=editDateOfCosts]');

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

	// Добавлення нової витрати 
	$('.addCosts').click(function(event){

		// Заборона браузер івенту на клік
		event = event || window.event;
		if (event.preventDefault) 
		{  
			event.preventDefault(); // якщо метод існує
		}else 
		{ 
			event.returnValue = false; // для < IE 9 
		}
		// При кліку піднімаємо попане вікно
		$('#newCostsModal').reveal();
		// при кліку закриття модального вікна видаляємо hendler на відправку форми 
		$('#newCostsModal').on('reveal:close', function () {
			// очистка hendel submit
			$('.newCostsForm').off('submit');	
		});

		// вносимо дату в поле вибору дати продажу
		todayDate('.newCostsForm input[name=dateOfCosts]');

		// івент на відпрвку форму добавлення нової затрати
		$('.newCostsForm').submit(function(){
			// перевірка на взаповненість полів
			if($('.newCostsForm input[name=costsName]').val() != '' && $('.newCostsForm input[name=dateOfCosts]').val() != '' && $('.newCostsForm input[name=costsPrice]').val() != '')
			{
				// тільки цифри
            	var float = /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/;
            	if (float.test($('.newCostsForm input[name=costsPrice]').val()))
            	{
            		// отримуємо данні для передачі в на сервер
            		var magazineID = $('.site_title').val();
            		var costsName = $('.newCostsForm input[name=costsName]').val();
            		var costsDate = $('.newCostsForm input[name=dateOfCosts]').val();
            		var costsPrice = $('.newCostsForm input[name=costsPrice]').val();
            		// відправляємо ajax запит
            		$.ajax({
            			type: 'POST',
            			url: 'costs-add-new-costs.php',
            			data: { magazineID : magazineID, costsName : costsName, costsDate : costsDate, costsPrice : costsPrice },
            			dataType: 'json',
            			beforeSend: function(data)
            			{
            				// очищаємо таблицю
            				$('#costsTable tbody').find('tr').remove();
            				// loading gif
            				$('#costsTable tbody').append(
								"<tr class='emptyTable'>"+
									"<td width='100%' colspan='8' align='center' style='margin:15% 0 0 0;'>"+"<img src='images/ajax-loader.gif' />"+"</td>"+
								"</tr>"
							);
							$('.newCostsForm').find('input[type=text]').val("");
            			},
            			success: function(data)
            			{
            				// закриваэмо попапне вікно
            				$('.close-reveal-modal').click();
            				// очищаємо таблицю
            				$('#costsTable tbody').find('tr').remove();
            				
            				// перевірка рівня доступу, в залежності від рівня доступу, виводимо різні таблиці
            				if(level == '0')
            				{
            					// Проводимо вивід таблиці для адміна
								for(var i = 0; i < data.length; i++)
								{
									$('#costsTable tbody').append(
										'<tr>'+
											'<td class="r1"><input type="checkbox" name="itemSelect"></td>'+ 
											'<td class="r2">'+data[i]['name']+'</td>'+ 
											'<td class="r3">'+data[i]['date']+'</td>'+
											'<td class="r4">'+data[i]['price']+'</td>'+
											'<td class="r5">'+
												'<form class="editCosts" method="post" action="javascript:void(null);">'+
													'<input type="image" src="images/icn_edit.png" title="Edit">'+
													'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
												'</form>'+
												'<form class="removeCosts" method="post" action="javascript:void(null);">'+
													'<input type="image" src="images/icn_trash.png" title="Trash" class="removeProductSubmit">'+
													'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
												'</form>'+
											'</td>'+
										'</tr>'
									);
								}	
            				}else if(level == '1')
            				{
            					// Проводимо вивід таблиці для модератора
								for(var i = 0; i < data.length; i++)
								{
									$('#costsTable tbody').append(
										'<tr>'+
											'<td class="m1"><input type="checkbox" name="itemSelect"></td>'+ 
											'<td class="m2">'+data[i]['name']+'</td>'+ 
											'<td class="m3">'+data[i]['date']+'</td>'+
											'<td class="m4">'+data[i]['price']+'</td>'+
										'</tr>'
									);
								}	
            				}	
            				

							// повідомлення про успішне добавлення нової витрати
							showNotification({
								message: "Витрата успішно добавлена",
								type: "success", 
								autoClose: true, 
								duration: 5 
							});
							// очищаємо всі текстові інпути
            				$('.newCostsForm input[type=text]').val("");
            				// очистка hendel submit
            				$('.newCostsForm').off('submit');
            			},
            			error: function(xhr, str)
            			{
            				// помилка завантаження
            				showNotification({
								message: "При створенні нової витарати сталася помилка, спробуйте ще раз, або зверніться до адміністратора",
								type: "error", 
								autoClose: true, 
								duration: 5 
							});
            			}
            		});
            	}else
            	{
            		// вказуємо які заповнені не вірно
					$('.newCostsForm input[name=costsPrice]').css({'border-color':'#FF3334'});
					$('.newCostsForm input[name=costsPrice]').addClass('emptyField');
					// чекаємо 3 сек і видаляємо підсвітку полів + видаляэмо пустий клас
					setTimeout(function(){
						$('.newCostsForm').find('.emptyField').removeAttr('style').removeClass('emptyField');
					},4000);
            		// повідомлення про не заповненість полів
					showNotification({
						message: "Тільки цифри або цифри через крапку, будь-ласка введіть валідні значеня",
						type: "error", 
						autoClose: true, 
						duration: 4 
					});
            	}	
			}else
			{

				// не заповнені поля підсвічуємо і виводимо повідомлення
				$('.newCostsForm').find('input[type=text]').each(function(){
					if($(this).val() != '')
					{
						
					}else
					{
						// вказуємо які поля пусті, підсвічуємо їх
						$(this).css({'border-color':'#FF3334'});
						$(this).addClass('emptyField');
						// чекаємо 3 сек і видаляємо підсвітку полів + видаляэмо пустий клас
						setTimeout(function(){
							$('.newCostsForm').find('.emptyField').removeAttr('style').removeClass('emptyField');
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


		});
	});
	
	// функція завантаження таблиці витрат
	function loadCosts()
	{
		// отримуємо id магазину
		var shopID = $('.site_title').val();
		// відправляємо ajax запит на сервер
		$.ajax({
			type: 'POST',
			url: 'loading-costs.php',
			data: {shopID : shopID},
			dataType: 'json',
			beforeSend: function(data)
			{
				$('#costsTable tbody').append(
					"<tr class='emptyTable'>"+
						"<td width='100%' colspan='8' align='center' style='margin:15% 0 0 0;'>"+"<img src='images/ajax-loader.gif' />"+"</td>"+
					"</tr>"
				);
				
			},
			success: function(data)
			{
				// очищаємо таблицю
            	$('#costsTable tbody').find('tr').remove();
				// перевірка на існування витрат
				if(data.errorType)
				{
					// перевірка рівня доступу
					if(level == '0')
					{
						$('#costsTable tbody').append(
							"<tr class='emptyTable'>"+
								"<td width='100%' colspan='5' align='center'>"+data.errorType+"</td>"+
							"</tr>"
						);
					}else if(level == '1')
					{
						$('#costsTable tbody').append(
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
							$('#costsTable tbody').append(
								'<tr>'+
									'<td class="r1"><input type="checkbox" name="itemSelect"></td>'+ 
									'<td class="r2">'+data[i]['name']+'</td>'+ 
									'<td class="r3">'+data[i]['date']+'</td>'+
									'<td class="r4">'+data[i]['price']+'</td>'+
									'<td class="r5">'+
										'<form class="editCosts" method="post" action="javascript:void(null);">'+
											'<input type="image" src="images/icn_edit.png" title="Edit">'+
											'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
										'</form>'+
										'<form class="removeCosts" method="post" action="javascript:void(null);">'+
											'<input type="image" src="images/icn_trash.png" title="Trash" class="removeProductSubmit">'+
											'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
										'</form>'+
									'</td>'+
								'</tr>'
							);
						}	
    				}else if(level == '1')
    				{
    					// Проводимо вивід таблиці для модератора
						for(var i = 0; i < data.length; i++)
						{
							$('#costsTable tbody').append(
								'<tr>'+
									'<td class="m1"><input type="checkbox" name="itemSelect"></td>'+ 
									'<td class="m2">'+data[i]['name']+'</td>'+ 
									'<td class="m3">'+data[i]['date']+'</td>'+
									'<td class="m4">'+data[i]['price']+'</td>'+
								'</tr>'
							);
						}	
    				}		
				}

			},
			error:  function(xhr,str)
			{
				// повідомлення про не заповненість полів
				showNotification({
					message: "При завантаженні таблиці витрат сталася помилка, спробуйте ще раз (F5), або зверніться до адміністратора",
					type: "error", 
					autoClose: true, 
					duration: 3 
				});
			}
		});
	}
	// завантаження таблиці витрат при завантаженні сторінки
	$(window).load(function(){
		loadCosts ();
	});
	// завантаження таблиці витрат при зміні магазину
	$('#magazineSelect').change(function(){
		loadCosts ();
	});	

	// видалення витрати
	$('#costsTable').on('submit','.removeCosts',function(){

		// перевыряємо чи чекнутий чекбокс, якщо чекнутий тоді виконуємо подальші дії
		var costsCheckbox = $(this).parents('tr').find('input[name=itemSelect]:first').prop("checked");
		if(costsCheckbox)
		{	
			// Виводимо вікно підтвердження на видалення витрати
			if(confirm("Ви справді хочете видалити витрату?"))
			{
				// Отримуємо значення ID продукту
				var productID = $(this).find('input[name=productID]').val();
				// отримуємо значення tr який будем видаляти
				var thisRow = $(this).parents('tr');
				// відправляємо ajax запит на видалення 
				$.ajax({
					type: 'POST',
					url: 'costs-delete-costs.php',
					data : {level : level, productID : productID},
					dataType: 'json',
					success: function(data)
					{
						// повідомляємо про, що витрата успішно видалена
						showNotification({
							message: "Витрата успішно видалена",
							type: "success", 
							autoClose: true, 
							duration: 3 
						})
						// видаляємо виділений 
						thisRow.remove();
					},
					error: function(xhr,str)
					{
						// повідомляємо що сталася помилка
						showNotification({
							message: "При видаленні витрати з БД сталася помилка, спробуйте ще раз або зверніться до адміністратора",
							type: "error", 
							autoClose: true, 
							duration: 3 
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

	// редагування витарат
	$('#costsTable').on('submit','.editCosts',function(){
		// перевіряємо чи чекнутий чекбокс, якщо чекнутий тоді виконуємо подальші дії
		var costsCheckbox = $(this).parents('tr').find('input[name=itemSelect]:first').prop("checked");
		if(costsCheckbox)
		{
			// отримуємо ID витрати яка буде відредагована
			var editCostsID = $(this).find("input[name='productID']").val();
			// відправляємо ajax запит для отрмання інформації про витрату
			$.ajax({
				type: 'POST',
				url: 'costs-edit-costs-input-data.php',
				data: {level : level, editCostsID : editCostsID},
				dataType: 'json',
				beforeSend: function(data)
				{
					// очищаємо текстові інпути форми радагування таблиці
					$('.editCostsForm input[type=text]').val("");
				},
				success: function(data)
				{
					// вносимо данні про витрату в форму для редагування
					$('.editCostsForm input[name=editСostsID]').val(data.id); 
					$('.editCostsForm input[name=editСostsName]').val(data.name);
					$('.editCostsForm input[name=editDateOfCosts]').val(data.date);
					$('.editCostsForm input[name=editCostsPrice]').val(data.price);

					// виконуємо функцію клікер для текстових інпутів
					cliker('.editCostsForm input[type=text]');
				},
				error: function(xhr, str)
				{
					// повідомляємо що сталася помилка
					showNotification({
						message: "Сталася помилка при отримані даних про витрату, спробуйте ще раз або зверніться до адміністратора",
						type: "error", 
						autoClose: true, 
						duration: 5 
					});
				}
			});
			// піднімаємо попане вікно
			$('#editCostsModal').reveal();
			// при кліку закриття модального вікна видаляємо hendler на відправку форми 
			$('#editCostsModal').on('reveal:close', function () {
				// очистка hendel submit
				$('.editCostsForm').off('submit');	
			});

			//відправка відредагованих даних 
			$('.editCostsForm').submit('submit',function(){
				// перевірка на пустоту
				if($('.editCostsForm input[name=editСostsName]').val() != '' && $('.editCostsForm input[name=editDateOfCosts]').val() != '' && $('.editCostsForm input[name=editCostsPrice]').val() != '')
				{
					// перевірка на цифру
					var float = /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/;
					if(float.test($('.editCostsForm input[name=editCostsPrice]').val()))
					{
						// отримуємо значення полів як будуть передані на сервер для редагування
						var idMagazine = $('.site_title').val();
						var editCostsID = $('.editCostsForm input[name=editСostsID]').val();
						var editCostsName = $('.editCostsForm input[name=editСostsName]').val();
						var editCostsDate = $('.editCostsForm input[name=editDateOfCosts]').val();
						var editCostsPrice = $('.editCostsForm input[name=editCostsPrice]').val();
						// відправляємо ajax запит на оновлення інформації про виплату
						$.ajax({
							type: 'POST',
							url: 'costs-edit-costs.php',
							data: {level : level, idMagazine : idMagazine, editCostsID : editCostsID, editCostsName : editCostsName, editCostsDate : editCostsDate, editCostsPrice : editCostsPrice},
							dataType: 'json',
							success: function(data)
							{
								// очищаємо таблицю
								$('#costsTable tbody').find('tr').remove();
								// закриваємо попапне вікно
								$('.close-reveal-modal').click();
								// обновлюємо інформацію про витрати
								for(var i = 0; i < data.length; i++)
								{
									$('#costsTable tbody').append(
										'<tr>'+
											'<td class="r1"><input type="checkbox" name="itemSelect"></td>'+ 
											'<td class="r2">'+data[i]['name']+'</td>'+ 
											'<td class="r3">'+data[i]['date']+'</td>'+
											'<td class="r4">'+data[i]['price']+'</td>'+
											'<td class="r5">'+
												'<form class="editCosts" method="post" action="javascript:void(null);">'+
													'<input type="image" src="images/icn_edit.png" title="Edit">'+
													'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
												'</form>'+
												'<form class="removeCosts" method="post" action="javascript:void(null);">'+
													'<input type="image" src="images/icn_trash.png" title="Trash" class="removeProductSubmit">'+
													'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
												'</form>'+
											'</td>'+
										'</tr>'
									);
								}
								// виводимо повідомлення про помилку
								 showNotification({
									message: "Витрата успішно відредагована",
									type: "success", 
									autoClose: true, 
									duration: 3 
								});
								// обновляємо таблицю, медод для захищення від багу сортування таблиці
					            $('#costsTable').trigger("update"); 
					            var sorting = [[0,0],[0,0]]; 
					            $('#costsTable').trigger("sorton",[sorting]);
					            // очщищаємо функцію сабміта форми редагування
								$('.editCostsForm').off('submit');
							},
							error: function(xhr,str)
							{
								// виводимо повідомлення про помилку
								showNotification({
									message: "При редагуванні витрати сталася помилка, спробуйте ще раз, або зверніться до адміністратора",
									type: "error", 
									autoClose: true, 
									duration: 5 
								});
							}
						});
					}else
					{
						// не число, вказуємо яке поле не вірно заповнене і повідомлення про помилку
						if (float.test($('.editCostsForm input[name=editCostsPrice]').val()))
						{
						
						}else
						{
							// вказуємо які поля пусті, підсвічуємо їх
							$('.editCostsForm input[name=editCostsPrice]').css({'border-color':'#FF3334'});
							$('.editCostsForm input[name=editCostsPrice]').addClass('emptyField');
							// чекаємо 3 сек і видаляємо підсвітку полів + видаляэмо пустий клас
							setTimeout(function(){
								$('.editCostsForm').find('.emptyField').removeAttr('style').removeClass('emptyField');
							},3000);

							// Виводимо повідомлення про полилку
							showNotification({
								message: "Не вірне значення поля, тільки цілі цифри або цифри з крапкою",
								type: "error", 
								autoClose: true, 
								duration: 3 
							});
						}
					}	
				}else
				{
					// не заповнені поля підсвічуємо і виводимо повідомлення
					$('.editCostsForm').find('input[type=text]').each(function(){
						if($(this).val() != '')
						{
							
						}else
						{
							// вказуємо які поля пусті, підсвічуємо їх
							$(this).css({'border-color':'#FF3334'});
							$(this).addClass('emptyField');
							// чекаємо 3 сек і видаляємо підсвітку полів + видаляэмо пустий клас
							setTimeout(function(){
								$('.editCostsForm').find('.emptyField').removeAttr('style').removeClass('emptyField');
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



