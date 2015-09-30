/* 
    Author name: oleg.lavrik
	Page: index.js
    Date: 17/02/2014
    Author Email: oleh.lavrik@gmail.com
	
 */

$(document).ready(function() {
	// функція підрахунку загальної ціни
	function totalPrices($i,$p)
	{
		var totalSalePrice = 0;
		$($p).html("");
		// обчислення загальної ціни
		$($i).each(function(){
			if($(this).val() == '' || $(this).val() == ' ')
			{
				$(this).value('0');	
			}	
			totalSalePrice = parseFloat(totalSalePrice) + parseFloat($(this).val());
		});
		// вносимо данні в підсомок
		totalSalePrice = parseFloat(totalSalePrice.toFixed(2));
		$($p).append(' ' + totalSalePrice + ' UAH');
	}
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
	}
	// ініціалізація календаря для продажу і редагування товарів
	datePicker('#datepicker');
	datePicker('.editProducts input[name=editDateOfPurchase]');

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
	
	// Ініціалізація функції ширини календаря
	calendarWidth('#datepicker');
	calendarWidth('.editProducts input[name=editDateOfPurchase]');

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
	// ініціалізація cliker для пошуку в склді
	cliker('.quick_search [name=storeSearch]');
	
	
	
	// функція перевірки чекнутих чекбоксів для масової покупки або видалення
	function liveDisplaySettings($elemets,$block)
	{	
		// Перевіряємо кількість чекнутих інпутів
		var chekedCount = $($elemets).length;
		// якщо більше 1 чекнутого інпута то показуємо блок налаштуваннь, інакше ховаємо
		if(chekedCount > 1)
			$($block).show();
		else
			$($block).hide();
	}
	// Виконання функції liveDisplaySettings при кліку для масої покупки або видалення [НЕ АРХІВ]
	$("#storeTable").on("click", "tbody input[type=checkbox]", function(){
		liveDisplaySettings("#storeTable tbody input:checked", '.productsSettingsBox');
	});

	// Виконання функції liveDisplaySettings при кліку для масої покупки або видалення [АРХІВ]
	$("#storeTableArchiv").on("click", "tbody input[type=checkbox]", function(){
		liveDisplaySettings("#storeTableArchiv tbody input:checked", '.productsSettingsBoxArchiv');
	});

	// функція перевірки чекнутих чекбоксів для архівування/розархівування
	function liveDisplayArchive($elemets,$block)
	{
		// Перевіряємо кількість чекнутих інпутів
		var chekedCount = $($elemets).length;
		// якщо більше 1 чекнутого інпута то показуємо блок архів, інакше ховаємо
		if(chekedCount >= 1)
			$($block).show();
		else
			$($block).hide();
	}
	// Виконання функції liveDisplaySettings при кліку для архівуання
	$("#storeTable").on("click", "tbody input[type=checkbox]", function(){
		liveDisplayArchive("#storeTable tbody input:checked", '.archivSettingBox');
	});
	// Виконання функції liveDisplaySettings при кліку для розархівуання
	$("#storeTableArchiv").on("click", "tbody input[type=checkbox]", function(){
		liveDisplayArchive("#storeTableArchiv tbody input:checked", '.unArchivSettingBox');
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

	// qtips

	$('.massCardNumberForm input[name=massCardNumber]').qtip({
		position: {
			
	        my: 'bottom center',  
	        at: 'top center',
	        adjust: {
	        	y:-2
	        } 
	    },
	    show: 'focus',
        hide: 'blur',
	});
	$('.buyProdutDate input[name=buyCardNumber]').qtip({
		position: {
			
	        my: 'bottom center',  
	        at: 'top center',
	        adjust: {
	        	y:-3
	        } 
	    },
	    show: 'focus',
        hide: 'blur',
	});
	
	// функція за
	/*
		 * Функція завантаження таблиці склад товарів [не архів] після загрузки всіх елементів сторінки склад [Таб товари]
	*/
	function loadStore()
	{
		var loadStore = $('.site_title').val();
		// Ajax для загрузки даних іший магазин
		$.ajax({
			type: "POST",
			dataType: 'json',
			url: 'loading-store.php',
			data: {magazine : loadStore, level : level},
			beforeSend: function(result)
			{
				$('#storeTable tbody').append(
					"<tr class='emptyTable'>"+
						"<td width='100%' colspan='8' align='center' style='margin:15% 0 0 0;'>"+"<img src='images/ajax-loader.gif' />"+"</td>"+
					"</tr>"
				);
				
				// перев відпракою ощищаємо поле результатів пошуку
				$('.searchLine').html('');
				// вносимо стандартний запис в поле пошку
				$('input[name=storeSearch]').val("Quick Search");
			},
			success: function(result) 
			{
				// перед кожним виводом очищаємо строки
				$('#storeTable tbody').find('tr').remove();
				// перевірка рівня доступу, взалежності від рівня доступу виводимо різні таблиці
				if(level == '0')
				{
					// ВИВОДИМО ТАБЛИЦЮ ДЛЯ АДМІНА
					// перевіряємо чи є товари в таблиці, якщо немає то виводимо в таблиці повідомлення "Про пусту таблицю", інакше виводим товари
					if(result.errorType)
					{
						$('#storeTable tbody').append(
							"<tr class='emptyTable'>"+
								"<td width='100%' colspan='11' align='center'>"+result.errorType+"</td>"+
							"</tr>"
						);
					}else
					{
						// Проводимо вивід таблиці
						for(var i = 0; i < result.length; i++)
						{
							$('#storeTable tbody').append(
								'<tr>'+
									'<td class="r1"><input type="checkbox" name="itemSelect"></td>'+ 
									'<td class="r2">'+result[i]['productName']+'</td>'+ 
									'<td class="r3">'+result[i]['productTypesDescription']+'</td>'+
									'<td class="r4">'+result[i]['barCode']+'</td>'+
									'<td class="r5">'+result[i]['productSimple']+'</td>'+
									'<td class="r6">'+result[i]['weight']+'</td>'+
									'<td class="r7">'+result[i]['size']+'</td>'+
									'<td class="r8">'+result[i]['dateOfPurchase']+'</td>'+ 
									'<td class="r9">'+result[i]['inputPrice']+'</td>'+
									'<td class="r10">'+result[i]['startingPrice']+'</td>'+ 
									'<td class="r11">'+
										'<form class="buyProduct" method="post" action="javascript:void(null);">'+
											'<input type="image" src="images/shopping_basket.png" title="Buy">'+
											'<input type="text" name="productID" hidden="hidden" value='+result[i]['id']+' />'+
										'</form>'+
										'<form class="editProduct" method="post" action="javascript:void(null);">'+
											'<input type="image" src="images/icn_edit.png" title="Edit">'+
											'<input type="text" name="productID" hidden="hidden" value='+result[i]['id']+' />'+
										'</form>'+
										'<form class="removeProduct" method="post" action="javascript:void(null);">'+
											'<input type="image" src="images/icn_trash.png" title="Trash" class="removeProductSubmit">'+
											'<input type="text" name="productID" hidden="hidden" value='+result[i]['id']+' />'+
										'</form>'+
									'</td>'+
								'</tr>'
							);
						}
					}
				}else if(level == '1')
				{
					// ВИВОДИМО ТАБЛИЦЮ ДЛЯ МОДЕРАТОРА
					// перевіряємо чи є товари в таблиці, якщо немає то виводимо в таблиці повідомлення "Про пусту таблицю", інакше виводим товари
					if(result.errorType)
					{
						$('#storeTable tbody').append(
							"<tr class='emptyTable'>"+
								"<td width='100%' colspan='10' align='center'>"+result.errorType+"</td>"+
							"</tr>"
						);
					}else
					{
						// Проводимо вивід таблиці
						for(var i = 0; i < result.length; i++)
						{
							$('#storeTable tbody').append(
								'<tr>'+
									'<td class="m1"><input type="checkbox" name="itemSelect"></td>'+ 
									'<td class="m2">'+result[i]['productName']+'</td>'+ 
									'<td class="m3">'+result[i]['productTypesDescription']+'</td>'+
									'<td class="m4">'+result[i]['barCode']+'</td>'+
									'<td class="m5">'+result[i]['productSimple']+'</td>'+
									'<td class="m6">'+result[i]['weight']+'</td>'+
									'<td class="m7">'+result[i]['size']+'</td>'+
									'<td class="m8">'+result[i]['dateOfPurchase']+'</td>'+
									'<td class="m9">'+result[i]['startingPrice']+'</td>'+   
									'<td class="m10">'+
										'<form class="buyProduct" method="post" action="javascript:void(null);">'+
											'<input type="image" src="images/shopping_basket.png" title="Buy">'+
											'<input type="text" name="productID" hidden="hidden" value='+result[i]['id']+' />'+
										'</form>'+
									'</td>'+
								'</tr>'
							);
						}
					}
				}	
			},
			error : function(xhr, str){
				// повідомляємо error
				showNotification({
					message: "Помилка при загрузці [Склад товарів, не архів]. Спробуйте ще раз або зверніться до адміністратора.",
					type: "error", 
					autoClose: true, 
					duration: 5 
				});
			}
		});
	}

	// ініціалізація функції завантаження таблиці склад товарів [не архів]
	$(window).on("load", function() {
		loadStore();
	});

	/* 
		* Функція завантаження таблиці склад товарів [АРХІВ ТОВАРІВ] після завантаження всіх елементів сторіки склад [Таб архів товарів]
	*/
	function loadStoreArchive()
	{
		// Отримуємо ID магазину для завантаження складу архіву
		var loadStoreArchive = $('.site_title').val();
		// Відправляємо ajax запит на отримання таблиці товарів з архіву
		$.ajax({
			type: 'POST',
			url : 'loading-store-archive.php',
			data : { loadMagazine : loadStoreArchive, level : level },
			dataType : 'json',
			beforeSend: function(result)
			{
				// перед кожним виводом очищаємо строки
				$('#storeTableArchiv tbody').find('tr').remove();
				// loading gif
				$('#storeTableArchiv tbody').append(
					"<tr class='emptyTable'>"+
						"<td width='100%' colspan='11' align='center' style='margin:15% 0 0 0;'>"+"<img src='images/ajax-loader.gif' />"+"</td>"+
					"</tr>"
				);
				// перев відпракою ощищаємо поле результатів пошуку
				$('.searchLine').html('');
				// вносимо стандартний запис в поле пошку
				$('input[name=storeSearch]').val("Quick Search");
			},
			success: function(result)
			{
				// перед кожним виводом очищаємо строки
				$('#storeTableArchiv tbody').find('tr').remove();
				// перевірка рівня доступу користувача, взалежності від рівня доступу виводи різні таблиці аріхівів
				if(level == '0')
				{
					// ТАБЛИЦЯ АРІХВУ ДЛЯ АДМІНА
					// перевіряємо чи є товари в таблиці архіву, якщо немає виводимо надписв в таблиці, інакше виводимо таблицю архів з товарами
					if(result.errorType)
					{
						$('#storeTableArchiv tbody').append(
							"<tr class='emptyTable'>"+
								"<td colspan='11' align='center' width='100%'>"+result.errorType+"</td>"+
							"</tr>"
						);
					}else
					{
						// Проводимо вивід таблиці
						for(var i = 0; i < result.length; i++)
						{
							$('#storeTableArchiv tbody').append(
								'<tr>'+
									'<td class="r1"><input type="checkbox" name="itemSelect"></td>'+ 
									'<td class="r2">'+result[i]['productName']+'</td>'+ 
									'<td class="r3">'+result[i]['productTypesDescription']+'</td>'+
									'<td class="r4">'+result[i]['barCode']+'</td>'+
									'<td class="r5">'+result[i]['productSimple']+'</td>'+
									'<td class="r6">'+result[i]['weight']+'</td>'+ 
									'<td class="r7">'+result[i]['size']+'</td>'+
									'<td class="r8">'+result[i]['dateOfPurchase']+'</td>'+
									'<td class="r9">'+result[i]['inputPrice']+'</td>'+
									'<td class="r10">'+result[i]['startingPrice']+'</td>'+
									'<td class="r11">'+
										'<form class="buyProduct" method="post" action="javascript:void(null);">'+
											'<input type="image" src="images/shopping_basket.png" title="Buy">'+
											'<input type="text" name="productID" hidden="hidden" value='+result[i]['id']+' />'+
										'</form>'+
										'<form class="editProduct" method="post" action="javascript:void(null);">'+
											'<input type="image" src="images/icn_edit.png" title="Edit">'+
											'<input type="text" name="productID" hidden="hidden" value='+result[i]['id']+' />'+
										'</form>'+
										'<form class="removeProduct" method="post" action="javascript:void(null);">'+
											'<input type="image" src="images/icn_trash.png" title="Trash" class="removeProductSubmit">'+
											'<input type="text" name="productID" hidden="hidden" value='+result[i]['id']+' />'+
										'</form>'+
									'</td>'+
								'</tr>'
							);
						}	
					}
				}else if(level == '1')
				{
					// ТАБЛИЦЯ АРІХВУ ДЛЯ МОДЕРАТОРА
					// перевіряємо чи є товари в таблиці архіву, якщо немає виводимо надписв в таблиці, інакше виводимо таблицю архів з товарами
					if(result.errorType)
					{
						$('#storeTableArchiv tbody').append(
							"<tr class='emptyTable'>"+
								"<td colspan='10' align='center' width='100%'>"+result.errorType+"</td>"+
							"</tr>"
						);
					}else
					{
						// Проводимо вивід таблиці
						for(var i = 0; i < result.length; i++)
						{
							$('#storeTableArchiv tbody').append(
								'<tr>'+
									'<td class="m1"><input type="checkbox" name="itemSelect"></td>'+ 
									'<td class="m2">'+result[i]['productName']+'</td>'+ 
									'<td class="m3">'+result[i]['productTypesDescription']+'</td>'+
									'<td class="m4">'+result[i]['barCode']+'</td>'+
									'<td class="m5">'+result[i]['productSimple']+'</td>'+
									'<td class="m6">'+result[i]['weight']+'</td>'+
									'<td class="m7">'+result[i]['size']+'</td>'+
									'<td class="m8">'+result[i]['dateOfPurchase']+'</td>'+
									'<td class="m9">'+result[i]['startingPrice']+'</td>'+
									'<td class="m10">'+
										'<form class="buyProduct" method="post" action="javascript:void(null);">'+
											'<input type="image" src="images/shopping_basket.png" title="Buy">'+
											'<input type="text" name="productID" hidden="hidden" value='+result[i]['id']+' />'+
										'</form>'+
									'</td>'+
								'</tr>'
							);
						}	
					}
				}	
					
				
			},
			error: function(xhr,str)
			{
				// повідомляємо error
				showNotification({
					message: "Помилка при загрузці [Склад товарів АРХІВ]. Спробуйте ще раз або зверніться до адміністратора.",
					type: "error", 
					autoClose: true, 
					duration: 5 
				});
			}
		});
	
	}
	$(window).on('load', function(){
		// ініціалізація функції завантаження таблиці склад товарів [АРХІВ ТОВАРІВ]
		loadStoreArchive();
	})
	
	/* 
		* Динамічна загрущка даних з різних магазинів [change select] [ПРОСТІ ПРОДУКТИ НЕ В АРХІВІ]
		* назва магазину відправляється на сервер, взалежності від магазину робиться вибірка з БД
		* дані з БД формуються в масив і передається в js
		* далі динамічно виводяться таблиця за допомогою jquery, пред кожним виводом таблці строки очищаються [це все в перший таб Товари]
	*/
	$('.site_title').change(function(){
		// ініціалізація функції завантаження таблиці склад товарів [НЕ АРХІВ]
		loadStore();
	});
	/* 
		* Динамічна загрущка даних з різних магазинів [change select] [АРХІВ]
		* назва магазину відправляється на сервер, взалежності від магазину робиться вибірка з БД
		* дані з БД формуються в масив і передається в js
		* далі динамічно виводяться таблиця за допомогою jquery, пред кожним виводом таблці строки очищаються [це все в другий таб Архів товарів]
	*/	
	$('.site_title').change(function(){
		// ініціалізація функції завантаження таблиці склад товарів [АРХІВ ТОВАРІВ]
		loadStoreArchive();
	});

	// Функція видалення продуту зі складу [ОДИНОЧНА]
	function storeRemoveProduct($table)
	{
		$($table).on('submit', '.removeProduct', function()
		{	
			// перевыряємо чи чекнутий чекбокс, якщо чекнутий тоді виконуємо подальші дії
			var productCheckbox = $(this).parents('tr').find('input[name=itemSelect]:first').prop("checked");
			if(productCheckbox)
			{
				// Виводимо вікно підтвердження на видалення продукту
				if(confirm("Ви справді хочете видалити даний продукт?"))
				{
					// Отримуємо значення ID продукту
					var productID = $(this).find('input[name=productID]').val();
					// отримуємо значення tr який будем видаляти
					var thisRow = $(this).parents('tr');
					// Відправка Ajax для видалення товару
					$.ajax({
						type: 'POST',
						url: 'store-delete-product.php',
						data: { productId : productID },
						dataType: 'json',
						success: function(result) {
							// повідомляємо про що товар видалений
							showNotification({
								message: "Товар видалений",
								type: "success", 
								autoClose: true, 
								duration: 3 
							})
							// видаляємо виділений товар з таблиці 
							thisRow.remove();
							// ховаємо форми ахівування/розархівування і купівля/видалення 
							$('.productsSettingsBox').hide();
							$('.archivSettingBox').hide();
							$('.productsSettingsBoxArchiv').hide();
							$('.unArchivSettingBox').hide();
						},
						error:  function(xhr, str){
							// повідомляємо що сталася помилка
							showNotification({
								message: "При видаленні продукту з БД сталася помилка, спробуйте ще раз або зверніться до адміністратора",
								type: "error", 
								autoClose: true, 
								duration: 3 
							})
						}
					});
				}
				else
				{
					// Вразі відмови користувача, знімаємо поточний чекбокс
					$(this).parents('tr').find('input[name=itemSelect]:first').removeAttr("checked");
				}
			}
			else
			{
				return false;
			}
			
		});
	}

	// Ініціалізація видалення продукту зі сладу [НЕ АРХІВ] 
	storeRemoveProduct('#storeTable');

	// Ініціалізація видалення продукту зі сладу [АРХІВ] 
	storeRemoveProduct('#storeTableArchiv');

	
	// Функція Продажу товарів зі складу [одиночна]
	function storeBuyProduct($table)
	{
		$($table).on('submit', '.buyProduct', function(){
			// перевыряємо чи чекнутий чекбокс, якщо чекнутий тоді виконуємо подальші дії
			var productCheckbox = $(this).parents('tr').find('input[name=itemSelect]:first').prop("checked");
			if(productCheckbox)
			{
				// вносимо дату в поле вибору дати продажу
				var date = new Date();
				var month = date.getMonth()+1;   
				newdate = date.getFullYear()  + '-' + (month < 10 ? '0' : '') + month + '-' +  (date.getDate() < 10 ? '0' : '') + date.getDate();
				$('#datepicker').val(newdate);
				// отримуємо ID продукта який буде проданий
				var bproductID = $(this).find('input[name=productID]').val();
				// отримаємо вихідну ціну для поточного товару, для цього відправимо ajax запит
				$.ajax ({
					type: 'POST',
					url : 'store-get-product-starting-price.php',
					data : { sPriceProductID : bproductID },
					dataType : 'json',
					success: function(data)
					{
						// заносимо отриману вхідну ціну в поле діалового вікна при продажі продукту
						$('.buyProdutDate input[name=startingPrice]').val(data.startingPrice);
					},
					error: function(xhr, str)
					{
						// повідомляємо про помилку завантаження вихіднї ціни
						showNotification({
							message: "При завантаженні ціни продажу сталася помилка, спробуйте вести її в ручну, або зверніться до адміністратора",
							type: "error", 
							autoClose: true, 
							duration: 5 
						});
					}
				});
				// отримуємо значення tr який будем видаляти
				var thisRow = $(this).parents('tr');
				// піднімаємо попане вікно, для визначення дати купівлі товару
				$('#buyDateModal').reveal();
				// при кліку закриття модального вікна видаляємо hendler на відправку форми 
				$('#buyDateModal').on('reveal:close', function () {
					// очистка hendel submit
					$('.buyProdutDate').off('submit');
					// очистка номера картки
					$(".buyProdutDate input[name=buyCardNumber]").val("");	
				});
				cliker('.buyProdutDate input[type=text]');

				// перевірка клієнта на існування 
				// ------------------------------
				var fnum = /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/;
				$('.buyProdutDate input[name=checkCustomerCard]').click(function(){
					// перевірка на пустоту клієнської карти
					if($(".buyProdutDate input[name='buyCardNumber']").val() != '')
					{
						// перевіка на введеність цифр в поле клієнської карти
						if(fnum.test($(".buyProdutDate input[name='buyCardNumber']").val()))
						{
							$.ajax({
								type: 'POST',
								url: 'store-get-clientID.php',
								data: { clientCardNubmer : $('.buyProdutDate input[name=buyCardNumber]').val()},
								dataType: 'json',
								success: function(data)
								{
									if(data.errorType)
									{
										// вказуэмо в яке поле не вірно введено данні
										$(".buyProdutDate input[name='buyCardNumber']").css({'border-color':'#FF3334'});
										$(".buyProdutDate input[name='buyCardNumber']").addClass('emptyField');
										// чекаємо 3 сек і видаляємо підсвітку полів + видаляэмо пустий клас
										setTimeout(function(){
											$(".buyProdutDate").find("input[name='buyCardNumber']").removeAttr('style').removeClass('emptyField');
										},5000);
										//
										showNotification({
											message: "Введено невірний номер карти клієнта, перевірти його ще раз і введіть знову, по цьому номеру карти не існує клієнта",
											type: "error", 
											autoClose: true, 
											duration: 5 
										});
									}else
									{
										// вносимо процент знижки
										$('.perDiscount b').html(data.discount+" %");
										// рахуємо продажну ціну зі знижкою
										var tPrice = $('.buyProdutDate input[name=startingPrice]').val();
										var priceWithDiscount = 0;
										priceWithDiscount = (parseFloat(100) - parseFloat(data.discount))/100 * parseFloat(tPrice);
										priceWithDiscount = parseFloat(priceWithDiscount.toFixed(2)); 
										$('.priceWithDiscount b').html(priceWithDiscount+" UAH");
										// перерахунок при введенні нової ціни на товар
										$('.buyProdutDate input[name=startingPrice]').keyup(function(){
											var priceWithDiscount = 0;	
											if($('.buyProdutDate input[name=startingPrice]').val() != '')
											{
												if(data.discount)
												{
													priceWithDiscount = (parseFloat(100) - parseFloat(data.discount))/100 * parseFloat($(this).val());
													priceWithDiscount = parseFloat(priceWithDiscount.toFixed(2));
													$('.priceWithDiscount b').html(priceWithDiscount+" UAH");
												}	
											}

										});
									}
								},
								error: function(xhr, str)
								{
									// вказуэмо в яке поле не вірно введено данні
									$(".buyProdutDate input[name='buyCardNumber']").css({'border-color':'#FF3334'});
									$(".buyProdutDate input[name='buyCardNumber']").addClass('emptyField');
									// чекаємо 3 сек і видаляємо підсвітку полів + видаляэмо пустий клас
									setTimeout(function(){
										$(".buyProdutDate").find("input[name='buyCardNumber']").removeAttr('style').removeClass('emptyField');
									},5000);
									// помилка при перевірці клієнта 
									showNotification({
										message: "При перевірці клієнської карти стлася помилка, спробуйте ще раз, або зверніться до адміністратора",
										type: "error", 
										autoClose: true, 
										duration: 5 
									});
								}
							});
						}else
						{
							// в поле клієнської картки введено не цифри
							// вказуэмо в яке поле не вірно введено данні
							$(".buyProdutDate input[name='buyCardNumber']").css({'border-color':'#FF3334'});
							$(".buyProdutDate input[name='buyCardNumber']").addClass('emptyField');
							// чекаємо 3 сек і видаляємо підсвітку полів + видаляэмо пустий клас
							setTimeout(function(){
								$(".buyProdutDate").find("input[name='buyCardNumber']").removeAttr('style').removeClass('emptyField');
							},5000);
							showNotification({
								message: "Тільки цифри, введіть цифри!",
								type: "error", 
								autoClose: true, 
								duration: 3 
							});
						}	
						
					}else
					{
						// вказуэмо в яке поле не вірно введено данні
						$(".buyProdutDate input[name='buyCardNumber']").css({'border-color':'#FF3334'});
						$(".buyProdutDate input[name='buyCardNumber']").addClass('emptyField');
						// чекаємо 3 сек і видаляємо підсвітку полів + видаляэмо пустий клас
						setTimeout(function(){
							$(".buyProdutDate").find("input[name='buyCardNumber']").removeAttr('style').removeClass('emptyField');
						},5000);
						showNotification({
							message: "Ведіть номер картки",
							type: "error", 
							autoClose: true, 
							duration: 3 
						});
					}	
				});
				// Ajax відправка даних на сервер, про дату купівлі товару і отримуємо відповідь
				$('.buyProdutDate').submit(function(){
					
					// перевірка на введеність дати та ціни та номер картки
					if($(this).find("input[name='buyDate']").val() !== '' && $(this).find("input[name='startingPrice']").val() !== '' && $(this).find("input[name='buyCardNumber']").val() != '')
					{
						var floatNum = /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/;
						var fnum = /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/
						// отримуємо значення дати яку вибрано
						var byuProductDate = $('.buyProdutDate').find("input[name='buyDate']").val();
						// отримуємо значення ціни продажу товару зі знижкою
						var buyProductPrice = parseFloat($('.priceWithDiscount b').html());
						// отримаємо значення номера картки
						var buyCardNumber = $('.buyProdutDate').find("input[name='buyCardNumber']").val();
						// перевірка на введеність цифр в поле ціни продажу
						if (floatNum.test(buyProductPrice))
						{
							// перевірка на введеність цифр в поле в поле картка клієнта
							if(fnum.test($('.buyProdutDate input[name=buyCardNumber]').val()))
							{
								// Відправка ajax і отримання даних з сервера
								$.ajax({
									type: 'POST',
									url: 'store-buy-product.php',
									data: { productDate : byuProductDate, productID : bproductID, productPrice : buyProductPrice, buyCardNumber : buyCardNumber },
									dataType: 'json',
									success: function(result) {

										// повідомляємо про що товар куплений
										showNotification({
											message: "Товар успішно куплений",
											type: "success", 
											autoClose: true, 
											duration: 3 
										})
										// видаляємо видылений товар з таблиці після купівлі
										thisRow.remove();
										// Очищаємо поле вводу дати
										$("input[name='buyDate']").val("");
										$('.close-reveal-modal').click();
										// ховаємо форми архівування і розархівування
										$('.archivSettingBox').hide();
										$('.unArchivSettingBox').hide();
										// очищаємо значення картки після купівлі продукту
										$(".buyProdutDate input[name='buyCardNumber']").val("");
										// очщищаємо знижку та ціну зі знижкою
										$('.perDiscount b').html("");
										$('.priceWithDiscount b').html("");
										// очистка hendel submit
										$('.buyProdutDate').off('submit');
									},
									error:  function(xhr, str){
										// повідомляємо що сталася помилка
										showNotification({
											message: "При добавленні продукту з БД сталася помилка, спробуйте ще раз або зверніться до адміністратора",
											type: "error", 
											autoClose: true, 
											duration: 3 
										});
									}
								});
							}else
							{
								// перед відправкою в поле в картки клієнта не введено цифри
								$(".buyProdutDate input[name='buyCardNumber']").css({'border-color':'#FF3334'});
								$(".buyProdutDate input[name='buyCardNumber']").addClass('emptyField');
								// чекаємо 3 сек і видаляємо підсвітку полів + видаляэмо пустий клас
								setTimeout(function(){
									$(".buyProdutDate").find("input[name='buyCardNumber']").removeAttr('style').removeClass('emptyField');
								},5000);
								showNotification({
									message: "В поле \"Номер карти клієнта\" доступно вводити тільки цифри, введіть цифри!",
									type: "error", 
									autoClose: true, 
									duration: 5 
								});
							}	
							
							
						}else
						{
							// вказуэмо в яке поле не вірно введено данні
							$(".buyProdutDate input[name='startingPrice']").css({'border-color':'#FF3334'});
							$(".buyProdutDate input[name='startingPrice']").addClass('emptyField');
							// чекаємо 3 сек і видаляємо підсвітку полів + видаляэмо пустий клас
							setTimeout(function(){
								$(".buyProdutDate").find("input[name='startingPrice']").removeAttr('style').removeClass('emptyField');
							},3000);
							// Виводимо повідомлення про помилку вводу
							showNotification({
								message: "Помилка вводу, тільки цифри",
								type: "error", 
								autoClose: true, 
								duration: 5 
							});
						}
						//--------------------------	
					}else
					{
						$('.buyProdutDate').find('input[type=text]').each(function(){
							if ($(this).val() == '')
							{
								// вказуємо які поля пусті, підсвічуємо їх
								$(this).css({'border-color':'#FF3334'});
								$(this).addClass('emptyField');
								// чекаємо 3 сек і видаляємо підсвітку полів + видаляэмо пустий клас
								setTimeout(function(){
									$('.buyProdutDate').find('.emptyField').removeAttr('style').removeClass('emptyField');
								},4000);
							}
						});
						// Не введено дату або ціну
						showNotification({
							message: "Не введено ціну, дату або номер картки клієнта, будь-ласка введіть ціну дату або номер картки",
							type: "error", 
							autoClose: true, 
							duration: 4 
						});
					}
					
				});
				// очищаємо івент submit 
				$(document).off('submit','.buyProdut');
			}else
			{
				return false
			}
		});	
	}

	// Ініціалізація функції для таблиці продуктів на складі [НЕ АРХІВ]
	storeBuyProduct('#storeTable');
	// Ініціалізація функції для таблиці продуктів на складі [АРХІВ]
	storeBuyProduct('#storeTableArchiv');
	
	
	// Функція редагуання продукту із складу[одиночне]
	function storeEditProduct($table,$storeORarchive)
	{
		$($table).on('submit', '.editProduct', function()
		{	
			// перевіряємо чи чекнутий чекбокс, якщо чекнутий тоді виконуємо подальші дії
			var productCheckbox = $(this).parents('tr').find('input[name=itemSelect]:first').prop("checked");
			if(productCheckbox)
			{
				// отримуємо ID продукта який буде редагований[для загрузки вхідних даних про продукт в форму редагування]
				var editProductID = $(this).find("input[name='productID']").val();
				// відправка запиту на сервер про продукт який буде редаговано, і отриманння з сервера даних про продукт
				$.ajax({
					type: 'POST',
					url: 'store-edit-product-input-data.php',
					data: { productID : editProductID, level : level },
					dataType: 'json',
					success: function(result) {
						/* 
							* вносимо дані про продукт в форму редагування
						*/
						// Ід
						$('.editProducts input[name=idProduct]').val(result.id);
						// Артикуль	
						$('.editProducts input[name=editArticul]').val(result.art);
						// Назва продукту
						$('.editProducts input[name=editProductName]').val(result.productName);
						// Дата Закупки 
						$('.editProducts input[name=editDateOfPurchase]').val(result.dateOfPurchase);
						// штрих код
						$('.editProducts input[name=editBarCode]').val(result.barCode);
						// проба
						$('.editProducts input[name=editProductSimple]').val(result.productSimple);
						// вага
						$('.editProducts input[name=editWeight]').val(result.weight);
						// розмір
						$('.editProducts input[name=editSize]').val(result.size); 
						// Вхідна ціна
						$('.editProducts input[name=editInputPrice]').val(result.inputPrice);
						// Вихідна ціна
						$('.editProducts input[name=editStartingPrice]').val(result.startingPrice);		
						// ід магазину
						$('.editProducts input[name=idShop]').val(result.idShop);
						// Тип товару і типи які доступні
							// Внутрішній запит для отримання типів товарів
							$.ajax({
								type     : 'POST',
								url      : 'store-products-type.php',
								data     : { productID : result.id, magazineID : result.idShop },
								dataType : 'json',
								success: function(data)
								{
									$('.productsTypes').find('option').remove();
									for(var i = 0; i < data.length; i++ )
									{
										// вносимо в селект значення з типами товарів 	
										$('.productsTypes').append(
											'<option value="'+data[i]['idProductType']+'">'+data[i]['productTypesDescription']+'</option>'
										);
									}	
								},
								error: function(xhr, str)
								{
									// помилка при загрузці типу продукції
									showNotification({
										message: "Сталася помилка при отримані даних про тип(и) продукт(и)",
										type: "error", 
										autoClose: true, 
										duration: 3 
									})
								}
							});

						// виконуємо функцію клікер для текстових інпутів
						//cliker('.editProducts input[type=text]');
						
					},
					error: function(xhr, str){
						// помилка при загрузці 
						showNotification({
							message: "Сталася помилка при отримані даних про продукт, спробуйте ще раз або зверніться до адміністратора",
							type: "error", 
							autoClose: true, 
							duration: 5 
						})
					}
				})
				
				// піднімаємо попане вікно
				$('#editProduct').reveal();
				// при кліку закриття модального вікна видаляємо hendler на відправку форми 
				$('#editProduct').on('reveal:close', function () {
					// очистка hendel submit
					$('.editProducts').off('submit');	
				});
				
				// відправка форми відредагованих даних про продукт
				$('.editProducts').submit(function(){
					
					
					//alert(editBarCode);

					//alert('ID '+editProductID+ ', '+'Назва продукту - '+ editProductName+', '+'Тип продукту - '+editProductType+ ', '+'Дата закупки - '+editDateOfPurchase+', '+'Вхідна ціна - '+editInputPrice+', '+ 'Вихідна ціна - ' +editStartingPrice+', '+'Штрих код');
					// Перевіряємо чи поля не пусті
					if
					(
						$('.editProducts input[name=editProductName]').val() != '' &&
						$('.editProducts input[name=editDateOfPurchase]').val() != '' &&
						$('.editProducts input[name=editBarCode]').val() != '' &&
						$('.editProducts input[name=editProductSimple]').val() != '' &&
						$('.editProducts input[name=editWeight]').val() != '' &&
						$('.editProducts input[name=editSize]').val() != '' &&
						$('.editProducts input[name=editInputPrice]').val() != '' &&
						$('.editProducts input[name=editStartingPrice]').val() != '' 
					)
					{
						// перевірка на веденість цифр або цифри з плаваючою точкою на текстові інпути вхідна ціна і вихідна ціна
						var float = /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/;
						
						// перевірка на цифру основних полів 
						if
						(
							float.test($('.pricingWrap input[name=editBarCode]').val()) &&
							float.test($('.pricingWrap input[name=editProductSimple]').val()) &&
							float.test($('.pricingWrap input[name=editWeight]').val()) &&
							float.test($('.pricingWrap input[name=editSize]').val()) &&
							float.test($('.pricingWrap input[name=editInputPrice]').val()) &&
							float.test($('.pricingWrap input[name=editStartingPrice]').val())
						)
						{
							// визначаэмо файл обробник, визначаэться по другому параметру функції
							if($storeORarchive == true)
							{
								var fileAction = 'store-edit-product.php';
							}else if($storeORarchive == false)
							{
								var fileAction = 'store-edit-product-archive.php';
							}

							// Отримуємо значення всіх полів про товар і заносимо
							var ID = $(this).find('input[name=idProduct]').val();
							var editIdShop = $(this).find('input[name=idShop]').val();
							var editProductName = $(this).find('input[name=editProductName]').val();
							var editProductType = $(this).find('select[name=editProductTypes]').val();
							var editBarCode = $(this).find('input[name=editBarCode]').val();
							var editProductSimple = $(this).find('input[name=editProductSimple]').val();
							var editWeight = $(this).find('input[name=editWeight]').val();
							var editSize = $(this).find('input[name=editSize]').val();
							var editDateOfPurchase = $(this).find('input[name=editDateOfPurchase]').val();
							var editInputPrice = $(this).find('input[name=editInputPrice]').val();
							var editStartingPrice = $(this).find('input[name=editStartingPrice]').val();

							// ВИКОНАННЯ AJAX ЗАПИТУ РЕДГУВАННЯ ПРОДУКТУ
							// Всі поля для редгування продукту валідні відправляємо ajax на сервер і перезаписуємо дані в БД
							$.ajax({
								type: 'POST',
								url: fileAction,
								data: 
									{ 
										level : level, 
										idShop : editIdShop, 
										id : ID, 
										productName : editProductName, 
										productType : editProductType, 
										dateOfPurchase : editDateOfPurchase,
										editBarCode : editBarCode, 
										editProductSimple : editProductSimple,
										editWeight : editWeight,
										editSize : editSize,
										inputPrice : editInputPrice, 
										startingPrice : editStartingPrice
									},
								dataType: 'json',
								success: function(data) 
								{
									// після оновлення інформаці перед виводом оновленої таблиці, очищаємо стрічки 
									$($table + ' tbody').find('tr').remove();
									// закриваємо попапне вікно
									$('.close-reveal-modal').click();
									// Проводимо вивід таблиці
									for(var i = 0; i < data.length; i++)
									{
										$($table + ' tbody').append(
											'<tr>'+
												'<td class="r1"><input type="checkbox" name="itemSelect"></td>'+ 
												'<td class="r2">'+data[i]['productName']+'</td>'+ 
												'<td class="r3">'+data[i]['productTypesDescription']+'</td>'+
												'<td class="r4">'+data[i]['barCode']+'</td>'+
												'<td class="r5">'+data[i]['productSimple']+'</td>'+
												'<td class="r6">'+data[i]['weight']+'</td>'+
												'<td class="r7">'+data[i]['size']+'</td>'+
												'<td class="r8">'+data[i]['dateOfPurchase']+'</td>'+
												'<td class="r9">'+data[i]['inputPrice']+'</td>'+
												'<td class="r10">'+data[i]['startingPrice']+'</td>'+
												'<td class="r11">'+
													'<form class="buyProduct" method="post" action="javascript:void(null);">'+
														'<input type="image" src="images/shopping_basket.png" title="Buy">'+
														'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
													'</form>'+
													'<form class="editProduct" method="post" action="javascript:void(null);">'+
														'<input type="image" src="images/icn_edit.png" title="Edit">'+
														'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
													'</form>'+
													'<form class="removeProduct" method="post" action="javascript:void(null);">'+
														'<input type="image" src="images/icn_trash.png" title="Trash" class="removeProductSubmit">'+
														'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
													'</form>'+
												'</td>'+
											'</tr>'
										);
											
									}
									// обновляємо таблицю, медод для захищення від багу сортування таблиці
						            $($table).trigger("update"); 
						            var sorting = [[0,0],[0,0]]; 
						            $($table).trigger("sorton",[sorting]);

									// виводимо повідомлення про успішене редагування товару
									showNotification({
										message: "Товар успішно відредагований",
										type: "success", 
										autoClose: true, 
										duration: 3 
									});

									// очщищаємо функцію сабміта форми редагування
									$('.editProducts').off('submit');
								},
								error:  function(xhr, str){
									// виводимо повідомлення про помилку
									 showNotification({
										message: "При редагуванні продукту сталася помилка, спробуйте ще раз, або зверніться до адміністратора",
										type: "error", 
										autoClose: true, 
										duration: 5 
									});
								}
								
							});
						}
						else 
						{
							// не цифра, виводимо повідолення
							$('.pricingWrap input[type=text]').each(function(){
								if (float.test($(this).val()))
								{
								
								}else
								{
									// вказуємо які поля пусті, підсвічуємо їх
									$(this).css({'border-color':'#FF3334'});
									$(this).addClass('emptyField');
									// чекаємо 3 сек і видаляємо підсвітку полів + видаляэмо пустий клас
									setTimeout(function(){
										$('.pricingWrap').find('.emptyField').removeAttr('style').removeClass('emptyField');
									},3000);
								}
							});
							// Виводимо повідомлення про полилку
							showNotification({
								message: "Не вірні значення полів, тільки цілі цифри або цифри з крапкою",
								type: "error", 
								autoClose: true, 
								duration: 3 
							})
						}	

					}else
					{
						// не заповнені поля підсвічуємо і виводимо повідомлення
						$('.editProducts input[type=text]').each(function(){
							if($(this).val() != '')
							{
								
							}else
							{
								// вказуємо які поля пусті, підсвічуємо їх
								$(this).css({'border-color':'#FF3334'});
								$(this).addClass('emptyField');
								// чекаємо 3 сек і видаляємо підсвітку полів + видаляэмо пустий клас
								setTimeout(function(){
									$('.editProducts').find('.emptyField').removeAttr('style').removeClass('emptyField');
								},3000);
							}
						});
						// виводимо повідомлення про незаповненість всіх полів
						showNotification({
							message: "Не заповнені всі поля, будь-ласка заповніть всі поля",
							type: "error", 
							autoClose: true, 
							duration: 3 
						})
					}
					
						
				});
			}
		});
	}
	
	/*
		* РЕДАГУВАННЯ ТОВАРІВ НА СКЛАДІ І В АРХІВІ
		* storeEditProduct('Назва таблиці', true - склад, false - архів)
	*/
	// Ініціалізація функції редагування товару на сладі [НЕ АРХІВ]
	storeEditProduct('#storeTable', true);
	// Ініціалізація функції редагування товару в архіві [АРХІВ]
	storeEditProduct('#storeTableArchiv', false);


	// Відправляємо а продукт/продукти в архів [одиночно і масово] [АРХІВУВАННЯ]
	$(document).on('click', '.archive', function(){
		// отримуємо всі чекнуті інпути
		var checkedRows = $('#storeTable tbody input[type=checkbox]:checked');
		// отримуємо ід товарів які відмічені і заносимо в масив
		var chekedIDProducts = Array();
		$('#storeTable tbody input[type=checkbox]:checked').each(function(){
			chekedIDProducts.push($(this).parents('tr').find('input[name=productID]').val());
		});

		// відправляємо аjax запит про добавлення товару/товарів в архів
		if(confirm("Ви спарвді хочети відправити товар(и) в архів?"))
		{
			$.ajax({
				type: 'POST',
				url: 'store-archiv.php',
				data : { archivIdProducts : chekedIDProducts, level : level },
				dataType: 'json',
				success: function(data)
				{
					// Перевірка, якщо таблиця архіву пуста то видаляємо надпис про пусту таблицю, інакше вносимо товар(и) в таблицю
					if($('#storeTableArchiv tbody tr:last').hasClass('emptyTable'))
					{
						$('#storeTableArchiv tbody tr:last').remove();
					}	
					// Видалямо строки які занесені в архів
					checkedRows.parents('tr').remove();
					// ховаємо форми ахівування і купівля/видалення 
					$('.productsSettingsBox').hide();
					$('.archivSettingBox').hide();
					// виводимо повідомлення про успішене архівування
					showNotification({
						message: "Товар(и) успішно перенесені в архів",
						type: "success", 
						autoClose: true, 
						duration: 3 
					});

					// перевіряємо рівень доступу користувача, взалежності від рівня вносимо різні таблиці
					if(level == '0')
					{
						// ТАБЛИЦЯ ДЛЯ АДМІНА
						// вносимо в таблицю товарів архіву дані про продукт який був перенесений в архів
						for(var i = 0; i < data.length; i++)
						{
							$('#storeTableArchiv tbody').append(
								'<tr>'+
									'<td class="r1"><input type="checkbox" name="itemSelect"></td>'+ 
									'<td class="r2">'+data[i]['productName']+'</td>'+ 
									'<td class="r3">'+data[i]['productTypesDescription']+'</td>'+
									'<td class="r4">'+data[i]['barCode']+'</td>'+
									'<td class="r5">'+data[i]['productSimple']+'</td>'+
									'<td class="r6">'+data[i]['weight']+'</td>'+ 
									'<td class="r7">'+data[i]['size']+'</td>'+
									'<td class="r8">'+data[i]['dateOfPurchase']+'</td>'+
									'<td class="r9">'+data[i]['inputPrice']+'</td>'+
									'<td class="r10">'+data[i]['startingPrice']+'</td>'+
									'<td class="r11">'+
										'<form class="buyProduct" method="post" action="javascript:void(null);">'+
											'<input type="image" src="images/shopping_basket.png" title="Buy">'+
											'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
										'</form>'+
										'<form class="editProduct" method="post" action="javascript:void(null);">'+
											'<input type="image" src="images/icn_edit.png" title="Edit">'+
											'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
										'</form>'+
										'<form class="removeProduct" method="post" action="javascript:void(null);">'+
											'<input type="image" src="images/icn_trash.png" title="Trash" class="removeProductSubmit">'+
											'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
										'</form>'+
									'</td>'+
								'</tr>'
							);
						}
					}else if(level == '1')
					{
						// ТАБЛИЦЯ ДЛЯ МОДЕРАТОРА
						// вносимо в таблицю товарів архіву дані про продукт який був перенесений в архів
						for(var i = 0; i < data.length; i++)
						{
							$('#storeTableArchiv tbody').append(
								'<tr>'+
									'<td class="m1"><input type="checkbox" name="itemSelect"></td>'+ 
									'<td class="m2">'+data[i]['productName']+'</td>'+ 
									'<td class="m3">'+data[i]['productTypesDescription']+'</td>'+
									'<td class="m4">'+data[i]['barCode']+'</td>'+
									'<td class="m5">'+data[i]['productSimple']+'</td>'+
									'<td class="m6">'+data[i]['weight']+'</td>'+ 
									'<td class="m7">'+data[i]['size']+'</td>'+
									'<td class="m8">'+data[i]['dateOfPurchase']+'</td>'+
									'<td class="m9">'+data[i]['startingPrice']+'</td>'+ 
									'<td class="m10">'+
										'<form class="buyProduct" method="post" action="javascript:void(null);">'+
											'<input type="image" src="images/shopping_basket.png" title="Buy">'+
											'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
										'</form>'+
									'</td>'+
								'</tr>'
							);
						}
					}	
					
					// обновляємо таблицю, медод для захищення від багу сортування таблиці
		            $("#storeTableArchiv").trigger("update"); 
		            var sorting = [[0,0],[0,0]]; 
		            $("#storeTableArchiv").trigger("sorton",[sorting]);
				},
				error: function(xhr, str)
				{
					// виводимо повідомлення помилку запису архівування 
					showNotification({
						message: "Помилка перенесення продукту/продуктів в архів, спробуйте ще раз або зверніться до адміністратора",
						type: "error", 
						autoClose: true, 
						duration: 3 
					});

				}
			})

		}else
		{
			// якщо не підтверджено архівування то знімаємо чекбокси з товарів
			checkedRows.removeAttr("checked");
			// ховаємо форми ахівування і купівля/видалення 
			$('.productsSettingsBox').hide();
			$('.archivSettingBox').hide();
		}

	});

	// Розархівування товару/товарів за архіву [РОЗАРХІВУВАННЯ ТОВАРІВ]
	$(document).on('submit', '.unArchive', function(){
		// отримуємо всі чекнуті інпути
		var unArchiveCheckedRows = $('#storeTableArchiv tbody input[type=checkbox]:checked');
		// отримуємо ід товарів які відмічені і заносимо в масив
		var unArchiveChekedIDProducts = Array();

		$('#storeTableArchiv tbody input[type=checkbox]:checked').each(function(){
			unArchiveChekedIDProducts.push($(this).parents('tr').find('input[name=productID]').val());
		});
		// виводимо підтведження розархівування товару/товарів
		if(confirm("Ви справді хочете розархівуати товар(и)"))
		{
			// відправляємо аjax запит про розархівування товару/товарів
			$.ajax({
				type: 'POST',
				url: 'store-unarchive.php',
				data: { unArchiveIDProducts : unArchiveChekedIDProducts, level : level },
				dataType: 'json',
				success: function(data)
				{
					// Перевірка, якщо таблиця продуктів пуста, то робимо надпис про пусту таблицю, інакше вносимо товар(и) в таблицю
					if($('#storeTable tbody tr:last').hasClass('emptyTable'))
					{
						$('#storeTable tbody tr:last').remove();
					}
					// Видалямо строки які розархівовані
					unArchiveCheckedRows.parents('tr').remove();
					// ховаємо форми ахівування/розархівування і купівля/видалення 
					$('.productsSettingsBox').hide();
					$('.archivSettingBox').hide();
					$('.productsSettingsBoxArchiv').hide();
					$('.unArchivSettingBox').hide();
					// виводимо повідомлення про успішене розархівування
					showNotification({
						message: "Товар(и) успішно розархівовані",
						type: "success", 
						autoClose: true, 
						duration: 3 
					});
					// отримуэмо рівень доступу користувача, в залежності від рівня доступу вносимо різні данні
					if(level == '0')
					{
						// ОНОВЛЕННЯ ТАБЛИЦІ ДЛЯ АДМІНА
						// Вносимо в таблицю товарів архіву дані про продукт який був перенесений в архів
						for(var i = 0; i < data.length; i++)
						{
							$('#storeTable tbody').append(
								'<tr>'+
									'<td class="r1"><input type="checkbox" name="itemSelect"></td>'+ 
									'<td class="r2">'+data[i]['productName']+'</td>'+ 
									'<td class="r3">'+data[i]['productTypesDescription']+'</td>'+
									'<td class="r4">'+data[i]['barCode']+'</td>'+
									'<td class="r5">'+data[i]['productSimple']+'</td>'+
									'<td class="r6">'+data[i]['weight']+'</td>'+
									'<td class="r7">'+data[i]['size']+'</td>'+
									'<td class="r8">'+data[i]['dateOfPurchase']+'</td>'+
									'<td class="r9">'+data[i]['inputPrice']+'</td>'+
									'<td class="r10">'+data[i]['startingPrice']+'</td>'+
									'<td class="r11">'+
										'<form class="buyProduct" method="post" action="javascript:void(null);">'+
											'<input type="image" src="images/shopping_basket.png" title="Buy">'+
											'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
										'</form>'+
										'<form class="editProduct" method="post" action="javascript:void(null);">'+
											'<input type="image" src="images/icn_edit.png" title="Edit">'+
											'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
										'</form>'+
										'<form class="removeProduct" method="post" action="javascript:void(null);">'+
											'<input type="image" src="images/icn_trash.png" title="Trash" class="removeProductSubmit">'+
											'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
										'</form>'+
									'</td>'+
								'</tr>'
							);
						}
					}else if(level == '1')
					{
						// ОНОВЛЕННЯ ТАБЛИЦІ ДЛЯ МОДЕРАТОРА
						// Вносимо в таблицю товарів архіву дані про продукт який був перенесений в архів
						for(var i = 0; i < data.length; i++)
						{
							$('#storeTable tbody').append(
								'<tr>'+
									'<td class="m1"><input type="checkbox" name="itemSelect"></td>'+ 
									'<td class="m2">'+data[i]['productName']+'</td>'+ 
									'<td class="m3">'+data[i]['productTypesDescription']+'</td>'+
									'<td class="m4">'+data[i]['barCode']+'</td>'+
									'<td class="m5">'+data[i]['productSimple']+'</td>'+
									'<td class="m6">'+data[i]['weight']+'</td>'+ 
									'<td class="m7">'+data[i]['size']+'</td>'+
									'<td class="m8">'+data[i]['dateOfPurchase']+'</td>'+
									'<td class="m9">'+data[i]['startingPrice']+'</td>'+ 
									'<td class="m10">'+
										'<form class="buyProduct" method="post" action="javascript:void(null);">'+
											'<input type="image" src="images/shopping_basket.png" title="Buy">'+
											'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
										'</form>'+
									'</td>'+
								'</tr>'
							);
						}
					}
					
					// обновляємо таблицю, медод для захищення від багу сортування таблиці
		            $("#storeTable").trigger("update"); 
		            var sorting = [[0,0],[0,0]]; 
		            $("#storeTable").trigger("sorton",[sorting]);
				},
				error: function(xhr, str)
				{
					// виводимо повідомлення помилку запису розархівування 
					showNotification({
						message: "Помилка розархівування продукту/продуктів, спробуйте ще раз або зверніться до адміністратора",
						type: "error", 
						autoClose: true, 
						duration: 3 
					});
				}
			}); 
		}else
		{
			// якщо не підтверджено архівування то знімаємо чекбокси з товарів
			unArchiveCheckedRows.removeAttr("checked");
			// ховаємо форми розархівування і купівля/видалення 
			//$('.productsSettingsBox').hide();
			$('.unArchivSettingBox').hide();
		} 

	});

	
	// функція Масової покупки товарів в складі
	function storeMassBuy($section, $table)
	{
		$($section).on('submit', '.massBuy', function(){
			// отримуємо всі чекнуті інпути
			var checkedRows = $($table + ' tbody input[type=checkbox]:checked');

			// отримуємо значення про товари які будуть продаватись[id art date price productName]
			var chekedArtProducts = Array();
			var chekedIDProducts = Array();
			var chekedNameProducts = Array();
			var chekedPriceProduct = Array();
			var chekedTypeProducts = Array();
			// ініціалізація нової дати
			var date = new Date();
			var month = date.getMonth()+1;   
			newdate = date.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-' + (date.getDate() < 10 ? '0' : '') + date.getDate();
			//
			if(level == '0')
			{
				// отримуємо інформацію про продукти для адміна
				$($table + ' tbody input[type=checkbox]:checked').each(function(){
				// масив який містить артикуль продуктів які будуть продані
				chekedArtProducts.push($(this).parents('tr').find('td.r2').text());
				// масив який містить ід продуктів які будуть продані
				chekedIDProducts.push($(this).parents('tr').find('input[name=productID]').val());
				// масив який мыстить вихідні суми продажів товарів
				chekedPriceProduct.push($(this).parents('tr').find('td.r7').text());
				// масив який містить назви продуктів
				chekedNameProducts.push($(this).parents('tr').find('td.r3').text());
				// масив який містить типи продуктів
				chekedTypeProducts.push($(this).parents('tr').find('td.r4').text());
			});
			}else if(level == '1')
			{
				// отримуємо інформацію про продукти для модератора
				$($table + ' tbody input[type=checkbox]:checked').each(function(){
				// масив який містить артикуль продуктів які будуть продані
				chekedArtProducts.push($(this).parents('tr').find('td.m2').text());
				// масив який містить ід продуктів які будуть продані
				chekedIDProducts.push($(this).parents('tr').find('input[name=productID]').val());
				// масив який мыстить вихідні суми продажів товарів
				chekedPriceProduct.push($(this).parents('tr').find('td.m6').text());
				// масив який містить назви продуктів
				chekedNameProducts.push($(this).parents('tr').find('td.m3').text());
				// масив який містить типи продуктів
				chekedTypeProducts.push($(this).parents('tr').find('td.m4').text());
			});
			}	
			
			// піднімаємо попапне вікно
			$('#massProductBuy').reveal();
			// при кліку закриття модального вікна видаляємо hendler на відправку форми 
			$('#massProductBuy').on('reveal:close', function () {
				// очистка hendel submit
				$('.massProductBuyForm').off('submit');	
			});
			// очищаємо таблицю
			$('#storeProductsBuy tbody tr').remove();
			// вносимо дані в таблицю
			for(var m = 0; m < checkedRows.length; m++)
			{
				$('#storeProductsBuy tbody').append(
					'<tr>'+
						'<td class="b1">'+chekedArtProducts[m]+'</td>'+ 
						'<td class="b2">'+chekedNameProducts[m]+'</td>'+
						'<td class="b3">'+chekedTypeProducts[m]+'</td>'+
						'<td class="b4">'+
							'<form class="massDateOfSaleForm" method="post" action="javascript:void(null);">'+
								'<input type="text" name="massDateOfSale" value="" />'+
							'</form>'+	
						'</td>'+
						'<td class="b5">'+
							'<form class="massPriceOfSaleForm" method="post" action="javascript:void(null);">'+
								'<input type="text" name="massPrice" value="'+chekedPriceProduct[m]+'" />'+
								'<input type="type" hidden="hidden" name="productID" value="'+chekedIDProducts[m]+'"/>'+
							'</form>'+
						'</td>'+			 
					'</tr>'
				);
			}
			
			// ініціалізація функції підрахунку при завантаженні таблиці масової покупки
			totalPrices('#storeProductsBuy input[name=massPrice]','.totalPrice b');
			// ініціалізація функції підрахунку при зміні ціни в полі "продажна ціна" для будь якого продукту
			$('#storeProductsBuy input[name=massPrice]').keyup(function(){
				totalPrices('#storeProductsBuy input[name=massPrice]','.totalPrice b');
			});
			//
			$(".massCardNumberForm").keypress(function (event) {if (event.keyCode == 13) {return false;}});
			// ініціалізація календаря
			datePicker('input[name=massDateOfSale]');;
			// вносимо дату в поле вибору дати продажу
			$('input[name=massDateOfSale]').val(newdate);

			// ініціалізація плейсхолдера для поля з ціною і картка клієнта
			cliker('input[name=massPrice]');
			cliker('input[name=massCardNumber]');

			// обновляємо таблицю, медод для захищення від багу сортування таблиці
            $('#storeProductsBuy').trigger("update"); 
            var sorting = [[0,0],[0,0]]; 
            $('#storeProductsBuy').trigger("sorton",[sorting]);

            // Початок функції numberValidator()
            function numberValidator()
            {
            	// тільки цифри
            	var floatNum = /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/;
				// table and submit
				var table = $('#storeProductsBuy');
				var btn = $('.massProductBuyForm input[name=massBuySubmit]');
				// добавляємо кожному полю яке потрібно провірити
				table.find('input[name=massPrice]').addClass('toCheck');

				// функція провірки полів форми
				function checkInput()
				{
					table.find('input[name=massPrice]').each(function(){
						if(floatNum.test($(this).val()))
						{
							// якщо поле заповнене цифрами то видаляэмо клас toCheck
							$(this).removeClass('toCheck'); 
						}else
						{
							// якщо поле заповнене НЕ цифрами то добавляємо клас toCheck
							$(this).addClass('toCheck');
						}	
					})
				}

				// функція підсвітки полів
				function lightInput()
				{
					table.find('.toCheck').css({'border-color':'#d8512d'});
					// Виводимо повідомлення про помилку вводу
					showNotification({
						message: "Помилка вводу, тільки цифри",
						type: "error", 
						autoClose: true, 
						duration: 3 
					});
					// Через 3 сек видаляємо підсвітку
					setTimeout(function(){
						table.find('.toCheck').removeAttr('style');
					},3000);
				}

				// перевірка полів в реальному часі
				setInterval(function(){
					// запускаємо функцію провірки полів
					checkInput();
					// рахуємо кількість полів яких заповнені не цифри
					var sizeNotNum = table.find('.toCheck').size();
					if(sizeNotNum > 0)
					{
						if(btn.hasClass('disabled'))
						{
							return false;
						}else
						{
							btn.addClass('disabled');
						}	
					}else
					{
						btn.removeClass('disabled');
					}	
				},500);

				// івент відправки форми 
				btn.click(function(){
					if($(this).hasClass('disabled'))
					{
						// підсвічуємо поля які заповнені не цифрами
						lightInput();
						return false;
					}	
				});	
            }
			// Кінець numberValidator()

			// виконанноя функції numberValidator()
			numberValidator();

			// івент відправки товарів на сервер масової покупки
			$('.massProductBuyForm').submit(function(){
				// перевірка існування клієнської карти, відправляємо ajax запит
	            $.ajax({
	            	type: 'POST',
	            	url: 'store-get-clientID.php',
					data: { clientCardNubmer : $('.massCardNumberForm input[name=massCardNumber]').val()},
					dataType: 'json',
	            	success: function(data)
	            	{
	            		// перевірка на існування картки в БД
	            		if(data.errorType)
	            		{
	            			// вказуэмо в яке поле не вірно введено данні
							$(".massCardNumberForm input[name=massCardNumber]").css({'border-color':'#FF3334'});
							$(".massCardNumberForm input[name=massCardNumber]").addClass('emptyField');
							// чекаємо 3 сек і видаляємо підсвітку полів + видаляэмо пустий клас
							setTimeout(function(){
								$(".massCardNumberForm").find("input[name='massCardNumber']").removeAttr('style').removeClass('emptyField');
							},5000);
							//
							showNotification({
								message: "Введено невірний номер карти клієнта, перевірте його ще раз і введіть знову, по цьому номеру карти не існує клієнта",
								type: "error", 
								autoClose: true, 
								duration: 5 
							});
	            		}else
	            		{
	            			var customerID = data.id;
	            			// масиви для отримання інформації про продукти які продаються
							var massPraceArray = Array();
							var massIDArray = Array();
							var massDateArray = Array();

							/* отримаємо дані для передачі на сервер */
							// отримаємо масив дат продаж товарів
							$('#storeProductsBuy').find('input[name=massDateOfSale]').each(function(){
								massDateArray.push($(this).val());
							});
							// отримаємо масив цін по яких будуть продаватись товари
							$('#storeProductsBuy').find('input[name=massPrice]').each(function(){
								massPraceArray.push($(this).val());
							});
							// отримаємо масив ід товарів які будуть продаватись
							$('#storeProductsBuy').find('input[name=productID]').each(function(){
								massIDArray.push($(this).val());
							});
								
							// відправляємо ajax запит назапис в БД
							$.ajax({
								type: 'POST',
								url : 'store-mass-buy-product.php',
								data: { massDateArray : massDateArray, massPraceArray : massPraceArray, massIDArray : massIDArray, customerID : customerID },
								dataType: 'json',
								success: function(data)
								{

									// Видалямо строки товарів які куплені
									checkedRows.parents('tr').remove();
									// ховаємо форми ахівування/розархівування і купівля/видалення 
									$('.productsSettingsBox').hide();
									$('.archivSettingBox').hide();
									$('.productsSettingsBoxArchiv').hide();
									$('.unArchivSettingBox').hide();
									// закриваємо вікно виконуємо
									$('.close-reveal-modal').click();
									// повідомлененя про успішну покупку товарів
									showNotification({
										message: "Товари успішно куплені",
										type: "success", 
										autoClose: true, 
										duration: 3 
									});
									// обновляємо таблицю, медод для захищення від багу сортування таблиці
						            $($table).trigger("update"); 
						            var sorting = [[0,0],[0,0]]; 
						            $($table).trigger("sorton",[sorting]);
						            	
						            // очищаємо івент submit 
									$('.massProductBuyForm').off('submit');
									
								},
								error: function(xhr,str)
								{
									// виводимо повідомлення помилку покупки товарів
									showNotification({
										message: "При покупці товарів сталася помилка, спробуйте ще раз або зверніться до адміністратора",
										type: "error", 
										autoClose: true, 
										duration: 5 
									});
								}
							});	
	            		}	
	            	},
	            	error: function(xhr, str)
	            	{
	            		// помилка при перевірці клієнта 
						showNotification({
							message: "При перевірці клієнської карти стлася помилка, спробуйте ще раз, або зверніться до адміністратора",
							type: "error", 
							autoClose: true, 
							duration: 5 
						});
	            	}
	            });
				
			});

		});
	}

	// Ініціалізація функції масової покупки продуктів [НЕ АРХІВ]
	storeMassBuy('#tab1', '#storeTable');
	// Ініціалізація функції масової покупки продуктів [АРХІВ]
	storeMassBuy('#tab2', '#storeTableArchiv');
	
	// функція Масового видалення товарів з БД на складі
	function storeMassRemove($section, $table)
	{
		$($section).on('submit', '.massRemove', function()
		{
			// отримуємо всі чекнуті інпути
			var checkedRows = $($table + ' tbody input[type=checkbox]:checked');
			// отримуємо ід товарів які відмічені і заносимо в масив
			var chekedIDProducts = Array();
			$($table + ' tbody input[type=checkbox]:checked').each(function(){
				// масив який містить ід продуктів які будуть продані
				chekedIDProducts.push($(this).parents('tr').find('input[name=productID]').val());
			});
			// питаємо користувача чи він дійсно хоче видалити продукт
			if(confirm("Ви справді хочете видалити дані товари?"))
			{
				// Відправляємо ajax запит на видалення товарів з БД
				$.ajax({
					type : 'POST',
					url: 'store-mass-delete-product.php',
					data: { deleteIDProducts : chekedIDProducts },
					dataType : 'json',
					success: function(data)
					{
						// Видалямо строки які видалені з БД
						checkedRows.parents('tr').remove();
						// ховаємо форми ахівування/розархівування і купівля/видалення 
						$('.productsSettingsBox').hide();
						$('.archivSettingBox').hide();
						$('.productsSettingsBoxArchiv').hide();
						$('.unArchivSettingBox').hide();
						// закриваємо попапне вікно
						$('.close-reveal-modal').click();
						// повідомлененя про успішне видалення продуків
						showNotification({
							message: "Товари успішно видалені",
							type: "success", 
							autoClose: true, 
							duration: 3 
						});
						// обновляємо таблицю, медод для захищення від багу сортування таблиці
			            $($table).trigger("update"); 
			            var sorting = [[2,1],[0,0]]; 
			            $($table).trigger("sorton",[sorting]);
					},
					error: function(xhr, str)
					{
						// виводимо повідомлення помилку видалення товарів
						showNotification({
							message: "При видаленні товарів сталася помилка, спробуйте ще раз або зверніться до адміністратора",
							type: "error", 
							autoClose: true, 
							duration: 3 
						});
					}
				})	
			}else
			{
				// якщо не підтверджено видалення то знімаємо чекбокси з товарів
				checkedRows.removeAttr("checked");
				// ховаємо форми ахівування і купівля/видалення 
				$('.productsSettingsBox').hide();
				$('.archivSettingBox').hide();
			}	
			
		});
	}
	
	// Ініціалізація функції масового видалення продуктів [НЕ АРХІВ]
	storeMassRemove('#tab1', '#storeTable');
	
	// Ініціалізація функції масового видалення продуктів [НЕ АРХІВ]
	storeMassRemove('#tab2', '#storeTableArchiv');
	
	// Пошук по товарах[ВСІX ТОВАРИ]
	$('.quick_search').submit(function(){
		// отримуємо заначення ключової фрази
		var searchString = $(this).find('input[name=storeSearch]').val();
		// значення поточного магазину
		var magazine = $('.site_title').find('option:selected').val();
		// якщо пошуковий запит не пустий
		if(searchString)
		{
			// виклик ajax
			$.ajax({
				type : 'POST',
				url: 'store-search.php',
				data: { searchString : searchString, magazine : magazine, level : level },
				dataType: 'json',
				beforeSend: function(data)
				{
					// переходимо на перший таб	
					$('.tabs li [href=#tab1]').click();
					// Видаляємо з таблиці 
					$('#storeTable tbody').find('tr').remove();
				},
				success: function(data)
				{
					// взалежності від рівня доступу користувача виконуємо різний вивід таблиць результатів пошуку
					if(level == '0')
					{
						// ТАБЛИЦЯ РЕЗУЛЬТАТУ ПОШУКУ ДЛЯ АДМІНА
						// перевірка на існування результату пошуку
						if(data.errorType)
						{
							// Нічого не знайдено
							$('.searchLine').val("");
							$('.searchLine').html(
								'<span>'+data.errorType+'</span>'+
								'<a href="#" class="clearSearch" alt="Clear search results" title="Clear search results"></a>'
							);
						}else
						{
							// заносимо результати пошуку перед виводом
							$('.searchLine').val("");
							// якщо великий запит підрізаємо його довжину до 32 символів
							if(searchString.length >= 32)
								searchString = searchString.substr(0,32)+'...';
							$('.searchLine').html(
								'<span>Результати пошуку, за запитом: <b>'+ searchString +'</b>'+'</span>'+
								'<a href="#" class="clearSearch" alt="Clear search results" title="Clear search results"></a>'
							);

						
							// Виносимо знайдені товари в таблицю
							for(var i = 0; i < data.length; i++)
							{
								/* 
									* Перевірка на проданість продукту, взалежності чи продукт проданий виводимо різні таблиці
								*/
								if(data[i]['dateOfSale'] != '0000-00-00' && data[i]['salePrice'] != '0')
								{
									// товар проданий
									$('#storeTable tbody').append(
										'<tr>'+
											'<td class="r1"><input type="checkbox" name="itemSelect"></td>'+ 
											'<td class="r2">'+data[i]['productName']+'</td>'+ 
											'<td class="r3">'+data[i]['productTypesDescription']+'</td>'+
											'<td class="r4">'+data[i]['barCode']+'</td>'+
											'<td class="r5">'+data[i]['productSimple']+'</td>'+
											'<td class="r6">'+data[i]['weight']+'</td>'+
											'<td class="r7">'+data[i]['size']+'</td>'+
											'<td class="r8">'+data[i]['dateOfPurchase']+'</td>'+
											'<td class="r9">'+data[i]['inputPrice']+'</td>'+
											'<td class="r10">'+data[i]['startingPrice']+'</td>'+
											'<td class="r11">'+
												'<form class="backProduct" method="post" action="javascript:void(null);">'+
													'<input type="image" src="images/icn_jump_back.png" value='+data[i]['dateOfSale']+' title="Back product in story">'+
													'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
												'</form>'+
											'</td>'+
										'</tr>'
									);
								}else
								{
									// товар не проданий
									$('#storeTable tbody').append(
										'<tr>'+
											'<td class="r1"><input type="checkbox" name="itemSelect"></td>'+ 
											'<td class="r2">'+data[i]['productName']+'</td>'+ 
											'<td class="r3">'+data[i]['productTypesDescription']+'</td>'+
											'<td class="r4">'+data[i]['barCode']+'</td>'+
											'<td class="r5">'+data[i]['productSimple']+'</td>'+
											'<td class="r6">'+data[i]['weight']+'</td>'+
											'<td class="r7">'+data[i]['size']+'</td>'+
											'<td class="r8">'+data[i]['dateOfPurchase']+'</td>'+
											'<td class="r9">'+data[i]['inputPrice']+'</td>'+
											'<td class="r10">'+data[i]['startingPrice']+'</td>'+
											'<td class="r11">'+
												'<form class="buyProduct" method="post" action="javascript:void(null);">'+
													'<input type="image" src="images/shopping_basket.png" title="Buy">'+
													'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
												'</form>'+
												'<form class="editProduct" method="post" action="javascript:void(null);">'+
													'<input type="image" src="images/icn_edit.png" title="Edit">'+
													'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
												'</form>'+
												'<form class="removeProduct" method="post" action="javascript:void(null);">'+
													'<input type="image" src="images/icn_trash.png" title="Trash" class="removeProductSubmit">'+
													'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
												'</form>'+
											'</td>'+
										'</tr>'
									);
								}
							
							}
							
						}
					}else if(level == '1')
					{
						// ТАБЛИЦЯ РЕЗУЛЬТАТУ ПОШУКУ ДЛЯ МОДЕРАТОРА
						// перевірка на існування результату пошуку
						if(data.errorType)
						{
							// Нічого не знайдено
							$('.searchLine').val("");
							$('.searchLine').html(
								'<span>'+data.errorType+'</span>'+
								'<a href="#" class="clearSearch" alt="Clear search results" title="Clear search results"></a>'
							);

						}else
						{
							// заносимо результати пошуку перед виводом
							$('.searchLine').val("");
							// якщо великий запит підрізаємо його довжину до 32 символів
							if(searchString.length >= 32)
								searchString = searchString.substr(0,32)+'...';
							$('.searchLine').html(
								'<span>Результати пошуку, за запитом: <b>'+ searchString +'</b>'+'</span>'+
								'<a href="#" class="clearSearch" alt="Clear search results" title="Clear search results"></a>'
							);
							// Виносимо знайдені товари в таблицю
							for(var i = 0; i < data.length; i++)
							{
								/* 
									* Перевірка на проданість продукту, взалежності чи продукт проданий виводимо різні таблиці
								*/
								if(data[i]['dateOfSale'] != '0000-00-00' && data[i]['salePrice'] != '0')
								{
									// Продукт проданий
									$('#storeTable tbody').append(
										'<tr>'+
											'<td class="m1"><input type="checkbox" name="itemSelect"></td>'+ 
											'<td class="m2">'+data[i]['productName']+'</td>'+ 
											'<td class="m3">'+data[i]['productTypesDescription']+'</td>'+
											'<td class="m4">'+data[i]['barCode']+'</td>'+
											'<td class="m5">'+data[i]['productSimple']+'</td>'+
											'<td class="m6">'+data[i]['weight']+'</td>'+ 
											'<td class="m7">'+data[i]['size']+'</td>'+
											'<td class="m8">'+data[i]['dateOfPurchase']+'</td>'+
											'<td class="m9">'+data[i]['startingPrice']+'</td>'+   
											'<td class="m10">'+
												'<form class="backProduct" method="post" action="javascript:void(null);">'+
													'<input type="image" src="images/icn_jump_back.png" value='+data[i]['dateOfSale']+' title="Back product in story">'+
													'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
												'</form>'+
											'</td>'+
										'</tr>'
									);
								}else
								{
									// продукт не проданий
									$('#storeTable tbody').append(
										'<tr>'+
											'<td class="m1"><input type="checkbox" name="itemSelect"></td>'+ 
											'<td class="m2">'+data[i]['productName']+'</td>'+ 
											'<td class="m3">'+data[i]['productTypesDescription']+'</td>'+
											'<td class="m4">'+data[i]['barCode']+'</td>'+
											'<td class="m5">'+data[i]['productSimple']+'</td>'+
											'<td class="m6">'+data[i]['weight']+'</td>'+ 
											'<td class="m7">'+data[i]['size']+'</td>'+
											'<td class="m8">'+data[i]['dateOfPurchase']+'</td>'+
											'<td class="m9">'+data[i]['startingPrice']+'</td>'+ 
											'<td class="m10">'+
												'<form class="buyProduct" method="post" action="javascript:void(null);">'+
													'<input type="image" src="images/shopping_basket.png" title="Buy">'+
													'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
												'</form>'+
											'</td>'+
										'</tr>'
									);
								}	
							}
						}
					}	
					// обновляємо таблицю, медод для захищення від багу сортування таблиці
		            $("#storeTable").trigger("update"); 
		            var sorting = [[0,0],[0,0]]; 
		            $("#storeTable").trigger("sorton",[sorting]);	
						
				},
				error: function(xhr, str)
				{
					// виводимо повідомлення помилку видалення товарів
					showNotification({
						message: "При відправці пошукового запиту, сталася помилка, спробуйте ще раз або зверніться до адміністратора",
						type: "error", 
						autoClose: true, 
						duration: 3 
					});
					$('.quick_search input[name=storeSearch]').val('');
					$('.quick_search input[name=storeSearch]').focus();
				}
			})	
		}	
	});
	
	// Повернення товару на склад
	$('#storeTable').on('submit','.backProduct',function(){
		// перевыряємо чи чекнутий чекбокс, якщо чекнутий тоді виконуємо подальші дії
		var productCheckbox = $(this).parents('tr').find('input[name=itemSelect]:first').prop("checked");
		if(productCheckbox)
		{
			if(confirm("Ви справді хочете повернути товар на склад???"))
			{
				// отримуємо ID продукта який буде проданий
				var backProductID = $(this).find('input[name=productID]').val();
				// отримуємо значення tr який будем видаляти
				var backThisRow = $(this).parents('tr');
				// Відправляємо ajax запит
				$.ajax({
					type: 'POST',
					url: 'store-back-product.php',
					data: {backProductID : backProductID},
					dataType: 'json',
					success: function(data)
					{
						// повідомлення про успішне повеннення товару на склад	
						showNotification({
							message: "Товар успішно повернутий на склад, значення[дата продажу] і [ціна продажу] встановлено [0]",
							type: "success", 
							autoClose: true, 
							duration: 5 
						});
						// видаляємо товар з пошуку
						backThisRow.remove();
					},
					error: function(xhr, str)
					{
						// повідомлення про помилку запиту повернення товару на склад
						showNotification({
							message: "При поверненні товару на склад, сталася помилка, спробуйте ще раз або зверніться до адміністратора",
							type: "error", 
							autoClose: true, 
							duration: 5 
						});
					}
				});
			}	
		}else
		{
			// чекбокс не виділений, нічого не робимо
			return false;
		}	
	});

	
	// Функція очищення результатів пошуку, завантаження складу
	$(document).on('click','.clearSearch', function(){
		// ініцалізація функції завантаження складу не архів
		loadStore();
		// ініцалізація функції завантаження складу архів
		loadStoreArchive();
		// очщищаємо пошукове поле
		$('.searchLine').html("");
		// вносимо стандартний занчення для пошуку
		$('input[name=storeSearch]').val("Quick Search");
		
	});
	
	// Добавлення нового товару
	$('.addProduct').click(function(){
		$('#addNewProducModal').reveal();
		// при кліку закриття модального вікна видаляємо hendler на відправку форми 
		$('#addNewProducModal').on('reveal:close', function () {
			// очистка hendel submit
			$('.addProductForm').off('submit');	
		});
		// добавляємо дату в поле дата закупки товару
		var date = new Date();
		var month = date.getMonth()+1;   
		newdate = date.getFullYear()  + '-' + (month < 10 ? '0' : '') + month + '-' +  (date.getDate() < 10 ? '0' : '') + date.getDate();
		$('.addProductForm input[name=productDateOfPurchase]').val(newdate);
		// ініцалізація календаря і фікс на його ширену
		datePicker('.addProductForm input[name=productDateOfPurchase]');
		calendarWidth('.addProductForm input[name=productDateOfPurchase]');
		// отримаэмо ід поточного магазину
		var shopID = $('#magazineSelect option:selected').val();
		// виконуэмо ajax запит для отримання типів товарів для даного магазину
		$.ajax({
			type: 'POST',
			url : 'store-load-types-products.php',
			data: { shopID : shopID },
			dataType: 'json',
			beforeSend: function(data)
			{
				// очищаємо селект з типами магазинів
				$('.addProductForm select').empty();
			},
			success: function(data)
			{
				// заносимо отриманнні данні в селект вибору типів товарів
				for(var h = 0; h < data.length; h++)
				{
					$('.addProductForm select[name=productType]').append(
						'<option value='+data[h]['idProductType']+'>'+data[h]['productTypesDescription']+'</option>'
					)	
				}	
				
			},
			error: function(xhr,str)
			{
				// повідомлення про помилку запиту повернення товару на склад
				showNotification({
					message: "При завантаженні типів товару для поточного магазину, сталася помилка, спробуйте ще раз або зверніться до адміністратора",
					type: "error", 
					autoClose: true, 
					duration: 5 
				});
			}


		});
		// submit відправка форми 
		$('.addProductForm').submit(function(){
			// перевірка на пустоту полів
			if
			(
				$('.addProductForm input[name=productName]').val() != '' && 
				$('.addProductForm select[name=productType]').val() != '' &&  
				$('.addProductForm input[name=productDateOfPurchase]').val() != '' &&
				$('.addProductForm input[name=productBarCode]').val() != '' &&
				$('.addProductForm input[name=productSimple]').val() != '' &&
				$('.addProductForm input[name=productWeight]').val() != '' &&
				$('.addProductForm input[name=productSize]').val() != '' &&
				$('.addProductForm input[name=productInputPrice]').val() != '' && 
				$('.addProductForm input[name=productStartingPrice]').val() != ''
			)
			{
				// перевірка на правильність введення цін
				// перевірка на веденість цифр або цифри з плаваючою точкою на текстові інпути вхідна ціна і вихідна ціна
				var float = /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/;
				// перевіряємо на введеність цифр
				if
				(
					float.test($('.addProductForm input[name=productBarCode]').val()) &&
					float.test($('.addProductForm input[name=productSimple]').val()) &&
					float.test($('.addProductForm input[name=productWeight]').val()) &&
					float.test($('.addProductForm input[name=productSize]').val()) && 
					float.test($('.addProductForm input[name=productInputPrice]').val()) &&
				 	float.test($('.addProductForm input[name=productStartingPrice]').val()) 
				)
				{
					// отримаємо вхідні данні для відправлення на сервер обробки
					var nProductName = $('.addProductForm input[name=productName]').val();
					var nProducType = $('.addProductForm select option:selected').val();
					var nProductDateOfPurchase = $('.addProductForm input[name=productDateOfPurchase]').val();
					var nProductBarCode = $('.addProductForm input[name=productBarCode]').val();
					var nProductProductSimple = $('.addProductForm input[name=productSimple]').val();
					var nProductWeight = $('.addProductForm input[name=productWeight]').val();
					var nProductSize = $('.addProductForm input[name=productSize]').val();
					var nProductInputPrice = $('.addProductForm input[name=productInputPrice]').val();
					var nProductOutputPrice = $('.addProductForm input[name=productStartingPrice]').val();

					// відправляємо ajax запит для запису нового товару
					$.ajax({
						type: 'POST',
						url : 'store-add-new-product.php',
						data: { nShopID : shopID, nProductName : nProductName, nProducType : nProducType, nProductDateOfPurchase : nProductDateOfPurchase, nProductBarCode : nProductBarCode, nProductProductSimple : nProductProductSimple, nProductWeight : nProductWeight, nProductSize : nProductSize, nProductInputPrice : nProductInputPrice, nProductOutputPrice : nProductOutputPrice},
						dataType: 'json',
						beforeSend: function(data)
						{
							// очищаємо строки таблиці товарів
							$('#storeTable tbody').find('tr').remove();

						},
						success: function(data)
						{

							// закриваємо модальне вікно
							$('.close-reveal-modal').click();

							// перевіряємо чи є товари в таблиці, якщо немає то виводимо в таблиці повідомлення "Про пусту таблицю", інакше виводим товари
							if(data.errorType)
							{
								$('#storeTable tbody').append(
									"<tr class='emptyTable'>"+
										"<td width='100%' colspan='11' align='center'>"+data.errorType+"</td>"+
									"</tr>"
								);
							}else
							{
								// Проводимо вивід таблиці
								for(var i = 0; i < data.length; i++)
								{
									$('#storeTable tbody').append(
										'<tr>'+
											'<td class="r1"><input type="checkbox" name="itemSelect"></td>'+ 
											'<td class="r2">'+data[i]['productName']+'</td>'+ 
											'<td class="r3">'+data[i]['productTypesDescription']+'</td>'+
											'<td class="r4">'+data[i]['barCode']+'</td>'+
											'<td class="r5">'+data[i]['productSimple']+'</td>'+
											'<td class="r6">'+data[i]['weight']+'</td>'+
											'<td class="r7">'+data[i]['size']+'</td>'+
											'<td class="r8">'+data[i]['dateOfPurchase']+'</td>'+ 
											'<td class="r9">'+data[i]['inputPrice']+'</td>'+
											'<td class="r10">'+data[i]['startingPrice']+'</td>'+
											'<td class="r11">'+
												'<form class="buyProduct" method="post" action="javascript:void(null);">'+
													'<input type="image" src="images/shopping_basket.png" title="Buy">'+
													'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
												'</form>'+
												'<form class="editProduct" method="post" action="javascript:void(null);">'+
													'<input type="image" src="images/icn_edit.png" title="Edit">'+
													'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
												'</form>'+
												'<form class="removeProduct" method="post" action="javascript:void(null);">'+
													'<input type="image" src="images/icn_trash.png" title="Trash" class="removeProductSubmit">'+
													'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
												'</form>'+
											'</td>'+
										'</tr>'
									);
								}
							}

							// обновляємо таблицю, медод для захищення від багу сортування таблиці
				            $('#storeTable').trigger("update"); 
				            var sorting = [[0,0],[0,0]]; 
				            $('#storeTable').trigger("sorton",[sorting]);

				            // повідомлення про успішне добавлення товару
				            showNotification({
								message: "Товар успішно добавлений",
								type: "success", 
								autoClose: true, 
								duration: 3 
							});
							// очищаємо інформацію про товар який буде доданий з вікна додавання нового товару
							$('.addProductForm input[type=text]').val("");
							$('.addProductForm select').find('option').remove();

							// встановлюємо значення розміру товару по дефолту 0
							$('.addProductForm input[name=productSize]').val("0");
							// очизаємо івент на submit
							$('.addProductForm').off('submit');	
						},
						error: function(data)
						{
							// не всі поля заповнені, виводимо повідомлення та підсвічуємо їх
							showNotification({
								message: "При додаванні нового товару сталася помилка, спробуйде ще раз, або зверніться до адміністратора",
								type: "error", 
								autoClose: true, 
								duration: 3 
							});
						}
					});
				}else
				{
					// не цифра, виводимо повідолення
					$('.priceWraping').find('input[type=text]').each(function(){
						if (float.test($(this).val()))
						{
						
						}else
						{
							// вказуємо які поля пусті, підсвічуємо їх
							$(this).css({'border-color':'#FF3334'});
							$(this).addClass('emptyField');
							// чекаємо 3 сек і видаляємо підсвітку полів + видаляэмо пустий клас
							setTimeout(function(){
								$('.priceWraping').find('.emptyField').removeAttr('style').removeClass('emptyField');
							},3000);

							// Виводимо повідомлення, що не введено цифри
							showNotification({
								message: "Тільки цифри, введіть цифри",
								type: "error", 
								autoClose: true, 
								duration: 3 
							});
						}
					});
				}	

			}else
			{
				// не всі поля заповнені, виводимо повідомлення та підсвічуємо їх
				showNotification({
					message: "Не заповнені всі поля, заповніть всі поля",
					type: "error", 
					autoClose: true, 
					duration: 3 
				});
				$('.addProductForm input[type=text]').each(function(){
					if($(this).val() != '')
					{
						
					}else
					{
						// вказуємо які поля пусті, підсвічуємо їх
						$(this).css({'border-color':'#FF3334'});
						$(this).addClass('emptyField');
						// чекаємо 3 сек і видаляємо підсвітку полів + видаляэмо пустий клас
						setTimeout(function(){
							$('.addProductForm').find('.emptyField').removeAttr('style').removeClass('emptyField');
						},3000);
					}

				});

			}	
		});
	});
	
});


