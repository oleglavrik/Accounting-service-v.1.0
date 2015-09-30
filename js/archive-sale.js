/* 
    Author name: oleg.lavrik
	Page: archive-sale.js
    Date: 20/10/2014
    Author Email: oleh.lavrik@gmail.com
*/

$(document).ready(function() {

   // Сортування таблиці при живій загрузці
	/*
    $(".tablesorter").on('click', function(){
		$(this).tablesorter();
	});
	
	*/
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
	
	$("#archiveSaleTable").on("click", "tbody input[type=checkbox]", function(){
		liveDisplaySettings("#archiveSaleTable tbody input:checked", '.productsSettingsBoxArchiv');
	});
	
	// Виділення всіх чекбоксів
	$(function () {
		$('#selectAllProducts').on('change', function() {
			$('td.r1 input').prop('checked', this.checked);
			liveDisplaySettings("#archiveSaleTable tbody input:checked", '.productsSettingsBoxArchiv');
		});
	});
	
	// функція перевірки чекнутих чекбоксів для масової покупки або видалення
	
    
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

	
	// функція завантаження таблиці архіву продаж
	function loadArchiveSale()
	{
		// отримуємо id магазину
		var shopID = $('.site_title').val();
		// відправляємо ajax запит на сервер
		$.ajax({
			type: 'POST',
			url: 'loading-archive-sale.php',
			data: {shopID : shopID},
			dataType: 'json',
			beforeSend: function(data)
			{
				$('#archiveSaleTable tbody').append(
					"<tr class='emptyTable'>"+
						"<td width='100%' colspan='8' align='center' style='margin:15% 0 0 0;'>"+"<img src='images/ajax-loader.gif' />"+"</td>"+
					"</tr>"
				);
				
			},
			success: function(data)
			{
				
				// очищаємо таблицю
            	$('#archiveSaleTable tbody').find('tr').remove();
				// перевірка на існування витрат
				if(data.errorType)
				{
					// перевірка рівня доступу
					if(level == '0')
					{
						$('#archiveSaleTable tbody').append(
							"<tr class='emptyTable'>"+
								"<td width='100%' colspan='5' align='center'>"+data.errorType+"</td>"+
							"</tr>"
						);
					}else if(level == '1')
					{
						$('#archiveSaleTable tbody').append(
							"<tr class='emptyTable'>"+
								"<td width='100%' colspan='4' align='center'>"+data.errorType+"</td>"+
							"</tr>"
						);
					}	
					
				}else
				{
					// перевірка рівня доступу
    				if(level == '0')
    				{
    					// Проводимо вивід таблиці 
						for(var i = 0; i < data.length; i++)
						{
							$('#archiveSaleTable tbody').append(
								'<tr>'+
									'<td class="r1"><input type="checkbox" name="itemSelect"></td>'+ 
									'<td class="r2">'+data[i]['productName']+'</td>'+ 
									'<td class="r3">'+data[i]['barCode']+'</td>'+
									'<td class="r4">'+data[i]['dateOfSale']+'</td>'+
									'<td class="r5">'+data[i]['salePrice']+'</td>'+
									'<td class="r6">'+

										'<form class="removeCosts" method="post" action="javascript:void(null);">'+
											'<input type="image" src="images/icn_trash.png" title="Trash" class="removeProductSubmit">'+
											'<input type="text" name="productID" hidden="hidden" value='+data[i]['id']+' />'+
										'</form>'+
									'</td>'+
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
					message: "При завантаженні таблиці архіву продаж сталася помилка, спробуйте ще раз (F5), або зверніться до адміністратора",
					type: "error", 
					autoClose: true, 
					duration: 3 
				});
			}
		});
	}
	// завантаження таблиці архіву продаж при завантаженні сторінки
	$(window).load(function(){
		loadArchiveSale();
	});
	// завантаження таблиці архіву продаж при зміні магазину
	$('#magazineSelect').change(function(){
		loadArchiveSale();
	});	

	// видалення прорданого товару з архіву продаж
	$('#archiveSaleTable').on('submit','.removeCosts',function(){

		// перевыряємо чи чекнутий чекбокс, якщо чекнутий тоді виконуємо подальші дії
		var costsCheckbox = $(this).parents('tr').find('input[name=itemSelect]:first').prop("checked");
		if(costsCheckbox)
		{	
			// Виводимо вікно підтвердження на видалення проданого товару
			if(confirm("Ви справді хочете видалити проданий товар з Бази данних нажавжди?!!"))
			{
				// Отримуємо значення ID продукту
				var productID = $(this).find('input[name=productID]').val();
				// отримуємо значення tr який будем видаляти
				var thisRow = $(this).parents('tr');
				// відправляємо ajax запит на видалення 
				$.ajax({
					type: 'POST',
					url: 'archive-sale-delete-sale.php',
					data : {level : level, productID : productID},
					dataType: 'json',
					success: function(data)
					{
						// повідомляємо про, що товар успішно видалений
						showNotification({
							message: "Проданий товар успішно видалений з Бази Даних назавжди!",
							type: "success", 
							autoClose: true, 
							duration: 3 
						})
						// видаляємо виділений рядок
						thisRow.remove();
					},
					error: function(xhr,str)
					{
						// повідомляємо що сталася помилка
						showNotification({
							message: "При видаленні товару з БД сталася помилка, спробуйте ще раз або зверніться до адміністратора",
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
	
	// функція Масового видалення товарів з Архіву продаж
	function storeMassRemove($table)
	{
		$('.massRemove').submit(function()
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
			if(confirm("Ви справді хочете видалити дані товари нажавди з Бази даних?"))
			{
				// Відправляємо ajax запит на видалення товарів з БД
				$.ajax({
					type : 'POST',
					url: 'archiv-sale-mass-delete-product.php',
					data: { deleteIDProducts : chekedIDProducts },
					dataType : 'json',
					success: function(data)
					{
						// Видалямо строки які видалені з БД
						checkedRows.parents('tr').remove();
						// ховаємо форми ахівування/розархівування і купівля/видалення 
						$('.productsSettingsBoxArchiv').hide();
						// повідомлененя про успішне видалення продуків
						showNotification({
							message: "Товари успішно видалені з Бази даних",
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
			}	
			
		});
	}
	// Ініціалізація функції масового видалення продуктів(проданих) з архіву продаж
	storeMassRemove('#archiveSaleTable');

});



