/* 
    Author name: oleg.lavrik
	Page:setting.js
    Date: 17/02/2014
    Author Email: oleh.lavrik@gmail.com
 */

$(document).ready(function() {
	// функція добавлення нового типу продукту
	function addTypeProduct()
	{
		var MaxInputs       = 50; 
		var InputsWrapper   = $("#typeProductBox"); 
		var AddButton       = $("#addNewType"); 

		var x = InputsWrapper.length; 
		var FieldCount = 1; 
		$(InputsWrapper).append('<div><label>Тип товару <span>*</span></label><input type="text" name="mytext[]" id="field_'+ FieldCount +'" value=""/><a href="#" class="removeclass"><img src="images/clear-search.png" title="Видалити тип товару" /></a></div>');
		$(AddButton).click(function (e)  
		{
		        if(x <= MaxInputs) 
		        {
		            FieldCount++; 
		            $(InputsWrapper).append('<div><label>Тип товару <span>*</span></label><input type="text" name="mytext[]" id="field_'+ FieldCount +'" value=""/><a href="#" class="removeclass"><img src="images/clear-search.png" title="Видалити тип товару" /></a></div>');
		            x++; 
		        }
		return false;
		});

		$("body").on("click",".removeclass", function(e){ 
		        if( x > 1 ) {
		                $(this).parent('div').remove(); 
		                x--; 
		        }
		return false;
		})
	}
	// ініціалізація добавлення нового типу продукту
	addTypeProduct()
    
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

	// отримэмо одноразовий хеш користувача
	var singleHash = getCookie('hash');

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
	// Сортування таблиці при живій загрузці
    $(".tablesorter").on('click', function(){
		$(this).tablesorter();
	});
    //  завантаження всіх існуючих користувачів в таблицю 
    $(window).on('load', function(){
    	// відправляємо ajax запит на отримання всіх користувачів
    	$.ajax({
    		type : 'POST',
    		url : 'settings-load-users.php',
    		dataType: 'json',
    		beforeSend: function(data)
    		{
    			// перед завантаженням таблиці очищаємо строки
    			$('#allUsers tbody').find('tr').remove();
    		},
    		success: function(data)
    		{
    			// Виводимо таблицю користувачів
    			if(data.errorType)
    			{
    				$('#allUsers tbody').append(
						"<tr class='emptyTable'>"+
							"<td width='100%' colspan='4' align='center'>"+data.errorType+"</td>"+
						"</tr>"
					);
    			}else
    			{
    				for(var i = 0; i < data.length; i++)
    				{
    					// перевіряємо рівень доступу і переводимо його в текст
    					if(data[i]['userLevel'] == '0')
    						data[i]['userLevel'] = 'Admin';
    					else if(data[i]['userLevel'] == '1')
    						data[i]['userLevel'] = 'Moderator';
    					// не вививодимо залогіненого користувача
    					if(data[i]['userHash'] != singleHash)
    					{
    						$('#allUsers tbody').append(
			    				'<tr>'+ 
									'<td><input class="userRadio" type="radio" name="userRadio" /></td>'+ 
									'<td>'+data[i]['userLogin']+'</td>'+ 
									'<td>'+data[i]['userLevel']+'</td>'+
									'<td>'+
										'<form class="userInfoForm" action="javascript:void(null)"  method="post">'+
											'<input type="image" class="deleteUser" src="images/icn_trash.png" title="Trash" />'+
											'<input type="text" name="userId" hidden="hidden" value="'+data[i]['userId']+'" />'+
										'</form>'+
									'</td>'+
								'</tr>'
							);
    					}	
    				}	
    			}	
    		},
    		error: function(data)
    		{
    			// повідомляємо що сталася помилка
				showNotification({
					message: "При завантаженні списку користувачів сталася помилка, спробуйте перезавантажити сторінку (F5), або зверніться до адміністратора",
					type: "error", 
					autoClose: true, 
					duration: 5 
				});
    		}
    	});
    });
    // Добавлення нового користувача
	$('.addUser').click(function(event){
		// Заборона браузер івенту на клік
		event = event || window.event;
		if (event.preventDefault) 
		{  
			event.preventDefault(); // якщо метод існує
		}else 
		{ 
			event.returnValue = false; // для < IE 9 
		}
		// піднімаємо попне вікно добавлення ногового користувача
		$('#addUser').reveal();

		// при кліку закриття модального вікна видаляємо hendler на відправку форми 
		$('#addUser').on('reveal:close', function () {
			// очистка hendel submit
			$('#addNewUser').off('submit');	
		});

		$('#addNewUser').submit('submit',function(){
			// отримуємо значення полів
			var login = $('#addNewUser [name=userLogin]').val();
			var password = $('#addNewUser [name=userPassword]').val();
			var passwordAgain = $('#addNewUser [name=userPasswordAgain]').val();
			// Виконуємо основні перевірки
			if(login.length > 3 && password.length > 3 && passwordAgain.length > 3)
			{
				// перевірка на наявність введеного логіну в БД
				$.post("check-login.php", {login: login}, function(data){
					if(data == 'free')
					{
						// Перевіряємо чи введені паролі рівні
						if(password !== passwordAgain)
						{
							/*
								* Введені паролі не рівні,
								* підсвічуємо поля + добавляємо клас
							*/
							$('#addNewUser [name=userPassword]').css({'border-color':'#FF3334'}).addClass('emptyField');
							$('#addNewUser [name=userPasswordAgain]').css({'border-color':'#FF3334'}).addClass('emptyField');
							// Показуємо повідомлення помилку про нерівність полів
							showNotification({
								message: "Введені паролі не рівні, спробуйте ще раз",
								type: "warning", 
								autoClose: true, 
								duration: 3 
							})
							// чекаємо 3 сек і видаляємо підсвітку та клас пустоти
							setTimeout(function(){
								$('#addNewUser').find('.emptyField').removeAttr('style').removeClass('emptyField');
								return false;
							},3000);
						}else
						{
							/*
								* Ведені паролі є рівні,
								* всі умови виконані пишемо в БД нового користувача
							*/
							
							var userName = $('#addNewUser [name=userLogin]').val();
							var userPassword = $('#addNewUser [name=userPassword]').val();
							var userLevel = $('#addNewUser [name=userLevel]').val();
							$.ajax({
							  	type: 'POST',
							  	url: 'add-user.php',
							  	data: {login : userName, password : userPassword, level : userLevel},
							  	dataType: 'json',
							  	beforeSend: function(data)
							  	{
							  		$('#allUsers tbody').find('tr').remove();
							  	},
							  	success: function(data) 
							  	{
								  	// Закриваємо модальне вікно
									$('.close-reveal-modal').click();

									// очищаємо текстові поля 
									$(".addNewUserText").val("");

									// переводимо назву рівня доступу з числа в текст для користувача
									if(data.level == '0')
										data.level = 'Admin';
									else if(data.level == '1')
										data.level = 'Moderator';

									// Виводимо таблицю користувачів
					    			if(data.errorType)
					    			{
					    				$('#allUsers tbody').append(
											"<tr class='emptyTable'>"+
												"<td width='100%' colspan='4' align='center'>"+data.errorType+"</td>"+
											"</tr>"
										);
					    			}else
					    			{
					    				for(var f = 0; f < data.length; f++)
					    				{
					    					// перевіряємо рівень доступу і переводимо його в текст
					    					if(data[f]['userLevel'] == '0')
					    						data[f]['userLevel'] = 'Admin';
					    					else if(data[f]['userLevel'] == '1')
					    						data[f]['userLevel'] = 'Moderator';
					    					// не вививодимо залогіненого користувача
					    					if(data[f]['userHash'] == singleHash)
					    					{
					    						continue;
					    					}else
					    					{
					    						$('#allUsers tbody').append(
								    				'<tr>'+ 
														'<td><input class="userRadio" type="radio" name="userRadio" /></td>'+ 
														'<td>'+data[f]['userLogin']+'</td>'+ 
														'<td>'+data[f]['userLevel']+'</td>'+
														'<td>'+
															'<form class="userInfoForm" action="javascript:void(null)"  method="post">'+
																'<input type="image" class="deleteUser" src="images/icn_trash.png" title="Trash" />'+
																'<input type="text" name="userId" hidden="hidden" value="'+data[f]['userId']+'" />'+
															'</form>'+
														'</td>'+
													'</tr>'
												);
					    					}	
					    				}
					    			}	
					    			// обновляємо таблицю, медод для захищення від багу сортування таблиці
						            $('#allUsers').trigger("update"); 
						            var sorting = [[0,0],[0,0]]; 
						            $('#allUsers').trigger("sorton",[sorting]);		
									// повідомляємо про добавлення нового користувача
									showNotification({
										message: "Добавлено нового користувача",
										type: "success", 
										autoClose: true, 
										duration: 3 
									});
									
									// очистка івенту на submit 
									$('#addNewUser').off('submit');	
							  	},
								error:  function(xhr, str){
									// повідомляємо що сталася помилка
									showNotification({
										message: "Сталася помилка, спробуйте ще раз",
										type: "error", 
										autoClose: true, 
										duration: 3 
									});
									// очищаємо поля
									$(".addNewUserText").val("");
								}

							});
						}
					}else if(data == 'already exists')
					{
						// Виводимо повідомлення про існуючий логін
						showNotification({
							message: "Ведений логін вже існує, спробуйте інший",
							type: "error", 
							autoClose: true, 
							duration: 3 
						})
						// Підсвічуємо інпут логіна
						$('#addNewUser [name=userLogin]').css({'border-color':'#FF3334'}).addClass('emptyField');
						// при кліку юзера по полю логіна видалити значення поля 
						$('#addNewUser [name=userLogin]').click(function(){
							$(this).val("");
						})
						// чекаємо 3 сек і видаляємо підсвітку, та витираємо значення введеного логіна, видаляємо пустий клас
						setTimeout(function(){
							$('#addNewUser').find('.emptyField').removeAttr('style').removeClass('emptyField');
						},3000);
						return false;
					}else
					{
						// повідомлення про помилку
						showNotification({
							message: "Помилка при перевірці логіна",
							type: "error", 
							autoClose: true, 
							duration: 3 
						})
						return false;
					}
				});
				
			}else
			{
				// перевіряємо які пусті поля і показуємо їх
				$('#addNewUser').find('.rfield').each(function(){
					if($(this).val() != '' && $(this).val().length > 3)
					{
						// поле не є пусте і більше 3 символів
					}else
					{
						// вказуємо які поля пусті, підсвічуємо їх
						$(this).css({'border-color':'#FF3334'});
						$(this).addClass('emptyField');
						// чекаємо 3 сек і видаляємо підсвітку полів + видаляэмо пустий клас
						setTimeout(function(){
							$('#addNewUser').find('.emptyField').removeAttr('style').removeClass('emptyField');
						},3000);
					}
				})
				// Виводимо повідомлення про помилку
				showNotification({
					message: "Дані поля є обовязковими для заповнення, мінімум 4 символи",
					type: "error", 
					autoClose: true, 
					duration: 3 
				})
			}
			
		});

	});

	// Видалення користувачів
	$('#allUsers').on('submit', '.userInfoForm', function(){
		// отримуємо значення радіо кнопки
		var cracked = $(this).parents('tr').find('.userRadio:first').prop("checked");
		
		// Виконуємо якісь дії якщо раідокнока вибрана
		if(cracked)
		{
			// Провіряємо на чи адмін справді хоче видалити користувача
			if(confirm("Ви справді хочете видалити даного користувача?"))
			{
				var deleteUserID = $(this).find('input[name=userId]').val();
				// Відправка Ajax
				$.ajax({
				  type: 'POST',
				  url: 'delete-user.php',
				  data: {deleteUserID : deleteUserID},
				  dataType: 'json',
				  beforeSend: function(data)
				  {
				  	$('#allUsers tbody').find('tr').remove();
				  },
				  success: function(data) 
				  {
				  	// Виводимо таблицю користувачів
	    			if(data.errorType)
	    			{
	    				$('#allUsers tbody').append(
							"<tr class='emptyTable'>"+
								"<td width='100%' colspan='4' align='center'>"+data.errorType+"</td>"+
							"</tr>"
						);
	    			}else
	    			{
	    				for(var l = 0; l < data.length; l++)
	    				{
	    					// перевіряємо рівень доступу і переводимо його в текст
	    					if(data[l]['userLevel'] == '0')
	    						data[l]['userLevel'] = 'Admin';
	    					else if(data[l]['userLevel'] == '1')
	    						data[l]['userLevel'] = 'Moderator';
	    					// не вививодимо залогіненого користувача
	    					if(data[l]['userHash'] == singleHash)
	    					{
	    						continue;
	    					}else
	    					{
	    						$('#allUsers tbody').append(
				    				'<tr>'+ 
										'<td><input class="userRadio" type="radio" name="userRadio" /></td>'+ 
										'<td>'+data[l]['userLogin']+'</td>'+ 
										'<td>'+data[l]['userLevel']+'</td>'+
										'<td>'+
											'<form class="userInfoForm" action="javascript:void(null)"  method="post">'+
												'<input type="image" class="deleteUser" src="images/icn_trash.png" title="Trash" />'+
												'<input type="text" name="userId" hidden="hidden" value="'+data[l]['userId']+'" />'+
											'</form>'+
										'</td>'+
									'</tr>'
								);
	    					}	
	    				}
	    				// повідомляємо про що користувач видалений
						showNotification({
							message: "Користувач видалений",
							type: "success", 
							autoClose: true, 
							duration: 3 
						});
	    			}
	    			// обновляємо таблицю, медод для захищення від багу сортування таблиці
		            $('#allUsers').trigger("update"); 
		            var sorting = [[0,0],[0,0]]; 
		            $('#allUsers').trigger("sorton",[sorting]);

				  },
				  error:  function(xhr, str){
						// повідомляємо що сталася помилка
						showNotification({
							message: "Сталася помилка, спробуйте ще раз",
							type: "success", 
							autoClose: true, 
							duration: 3 
						})
					}
				});
			}
		}
		else
		{
			// якщо не вибрано false
			return false;
		}
	});
	
	// Функція виведення магазину 
	function loadingMagazines()
	{
		// Відправляємо ajax запит 
		$.ajax({
			type : 'POST',
			url : 'loading-magazine-list.php',
			dataType: 'json',
			beforeSend: function(data)
			{
				// очистка значень таблиці магазинів	
				$('#shopList tbody').find('tr').remove();
			},
			success: function(data)
			{
				if(data.length == '1')
				{
					$('#shopList tbody').append(
						"<tr><td colspan='4' align='center' width='100%'>Не має магазинів, крім поточного<td></tr>"
					);
				}else
				{
					$('#magazineSelect').val();
						
					// виводимо в таблицю список магазинів
					for(var i = 0; i < data.length; i++)
					{
						if($('#magazineSelect').val() != data[i]['id'])
						{
							$('#shopList tbody').append(
								'<tr>'+
									'<td class="r1"><input class="magazineRadio" type="radio" name="magazineRadio"></input></td>'+
									'<td class="r2">'+data[i]['id']+'</td>'+
									'<td class="r3">'+data[i]['name']+'</td>'+
									'<td class="r4">'+
										'<form class="magazineInfoForm" method="post" action="javascript:void(null);">'+
										    '<input class="deleteMagazine" type="image" title="Trash" src="images/icn_trash.png"></input>'+
										    '<input type="text" class="magazineID" hidden="hidden" value="'+data[i]['id']+'" name="magazineID"></input>'+
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
				// повідомляємо що сталася помилка
				showNotification({
					message: "При завантаженні списку існуючих магазинів сталася помилка, перезавантажте сторінку (F5) або зверніться до адміністратора",
					type: "error", 
					autoClose: true, 
					duration: 5 
				});
			}
		});
	}	
	// завантаження списку магазинів, при загрузці/обновленні сторіки
	$(window).on('load', function(){
		loadingMagazines();
	});

	// завантаження списку магазинів, при зміні магазину[change select]
	$('#magazineSelect').change(function(){
		loadingMagazines();
	});


	

	// Видалення магазину 
	$(document).on('submit', '.magazineInfoForm', function(){

		// перевірка на видиліність радіо кнопки
		var cracked = $(this).parents('tr').find('.magazineRadio:first').prop("checked");
		if(cracked)
		{
			// Підтвердження видання магазину
			if(confirm('Ви спарвді хочете видалити даний магазин?'))
			{
				//отримуємо ід магазину для виденння
				var magazineID = $(this).find('.magazineID').val();
				// отримаємо радок даного магазину в HTML таблиці
				var tableRow = $(this).parents('tr');
			
				// відправляємо ajax запит на видалення магазину
				$.ajax({
					type: 'POST',
					url : 'settings-delete-magazine.php',
					data: {magazineID : magazineID},
					dataType: 'json',
					success: function(data)
					{
						// Видаляэмо рядок з html таблиці
						tableRow.remove();
						// Видаляємо магазин з селекта
						$('#magazineSelect option').each(function(){
							if($(this).val() == magazineID)
								$(this).remove();
						});
						// повідомляємо що магазин успішно видалено
						showNotification({
							message: "Магазин успішно видалений",
							type: "success", 
							autoClose: true, 
							duration: 3 
						});
					},
					error: function(xhr,str)
					{
						// повідомляємо що сталася помилка
						showNotification({
							message: "При видаленні магазину сталася помилка, спробуйте ще раз або зверніться до адміністратора",
							type: "error", 
							autoClose: true, 
							duration: 5 
						});
					}
				});
			}else
			{

			}	
		}else
		{
			return false;	
		}	

	});

	// Добавлення нового магазину
	$('.addMagazine').click(function(event){
		// Заборона браузер івенту на клік
		event = event || window.event;
		if (event.preventDefault) 
		{  
			event.preventDefault(); // якщо метод існує
		}else 
		{ 
			event.returnValue = false; // для < IE 9 
		}
		// Піднімаємо попне вікно добавлення нового магазину
		$('#addNewMagazine').reveal();
		// при кліку закриття модального вікна видаляємо hendler на відправку форми 
		$('#addNewMagazine').on('reveal:close', function () {
			// очистка hendel submit
			$('.addMagazineForm').off('submit');	
		});
		
		cliker('.addMagazineForm input[type=text]');
		// відправка форми івент на submit
		$('.addMagazineForm').submit(function(){
			// перевірка на пусті поля, якщо пусте поле то класс empty
			$(this).find('input[type=text]').each(function(){
				if($(this).val() == '')
				{
					$(this).addClass('empty');
				}else
				{
					$(this).removeClass('empty');
				}		
			});
			// перевірка на існування класу empty
			if($(this).find('input[type=text]').hasClass('empty'))
			{
				// існують пусті поля
				$('.addMagazineForm input[type=text]').each(function(){
					if($(this).val() == "")
					{
						// вказуємо які поля пусті, підсвічуємо їх
						$(this).css({'border-color':'#FF3334'});
						$(this).addClass('emptyField');
						// чекаємо 3 сек і видаляємо підсвітку полів + видаляэмо пустий клас
						setTimeout(function(){
							$('.addMagazineForm').find('.emptyField').removeAttr('style').removeClass('emptyField');
						},4000);
					}	
				});
				// Не заповнені всі поля
				showNotification({
					message: "Не заповнені всі поля для даного магазину, будь-ласка заповніть всі поля",
					type: "error", 
					autoClose: true, 
					duration: 4 
				});	
			}else
			{
				// не існують пусті поля
				// перевірка на к-сть введених символів назви магазину
				if($('.addMagazineForm input[name=newMagazineName]').val().length >= 4)
				{	
					// отримуємо значення назви магазину
					var magazineName = $('.addMagazineForm input[name=newMagazineName]').val();
					// сторюємо масив типи продуктів
					var typesProducts = Array();
					$('#typeProductBox input[type=text]').each(function(){
						typesProducts.push($(this).val());
					});

					// відправляємо ajax запит
					$.ajax({
						type : 'POST',
						url : 'settings-add-new-magazine.php',
						data: {magazineName : magazineName, typesProducts : typesProducts},
						cache: false,
						dataType: 'json',
						beforeSend: function(data)
						{
							// очищаємо таблицю магазинів
							$('#shopList tbody').find('tr').remove();
						},
						success: function(data)
						{
							
							// перевірямо чи існують магазини
							if(data.length == '1')
							{
								$('#shopList tbody').append(
									"<tr><td colspan='4' align='center' width='100%'>Не має магазинів, крім поточного<td></tr>"
								);
							}else
							{

								for(var g = 0; g < data.length; g++)
								{	
									// не виводимо поточного магазину в таблицю
									if($('#magazineSelect').val() != data[g]['id'])
									{

										$('#shopList tbody').append(
											'<tr>'+
												'<td><input class="magazineRadio" type="radio" name="magazineRadio"></input></td>'+
												'<td>'+data[g]['id']+'</td>'+
												'<td>'+data[g]['name']+'</td>'+
												'<td>'+
													'<form class="magazineInfoForm" method="post" action="javascript:void(null);">'+
													    '<input class="deleteMagazine" type="image" title="Trash" src="images/icn_trash.png"></input>'+
													    '<input type="text" class="magazineID" hidden="hidden" value="'+data[g]['id']+'" name="magazineID"></input>'+
													'</form>'+
												'</td>'+
											'</tr>'
										);	
									}
									// вносимо в селект нову назву магазину	
									if(magazineName == data[g]['name'])
									{
										$("#magazineSelect").append( $('<option value='+data[g]['id']+'>'+data[g]['name']+'</option>'));
									}	
								}
								
								// закриваємо модальне вікно
								$('.close-reveal-modal').click();

					            // повідомляємо що сталася помилка, поле надто коротке
								showNotification({
									message: 'Магазин успішно добавлено',
									type: "success", 
									autoClose: true, 
									duration: 3 
								});	

								// обновляємо таблицю, медод для захищення від багу сортування таблиці
					            $('#shopList').trigger("update"); 
					            var sorting = [[1,1],[0,0]]; 
					            $('#shopList').trigger("sorton",[sorting]);

					            // очищаємо поле з назвою магазину
								$('.addMagazineForm input[type="text"]').val("");
					            
							}
							// ощищаємо івент на submit
							$('.addMagazineForm').off('submit');
						},
						error: function(xhr, str)
						{
							// повідомляємо що сталася помилка, поле надто коротке
							showNotification({
								message: 'При добавленні нового магазину, сталася помилка, спробуйте, ще раз або зверніться до адміністратора',
								type: "error", 
								autoClose: true, 
								duration: 5 
							});
						}
					});

				}else
				{
					// повідомляємо що сталася помилка, поле надто коротке
					showNotification({
						message: 'Назва магазину має складатись мінімум з 4 симполів, введіть повторно назву магазину більше або рівне 4 символам',
						type: "error", 
						autoClose: true, 
						duration: 5 
					});
					// Вказуємо яке саме поле 
					$('.addMagazineForm input[name=newMagazineName]').css({'border-color':'#FF3334'});
					$('.addMagazineForm input[name=newMagazineName]').addClass('emptyField');
					// чекаємо 3 сек і видаляємо підсвітку полів + видаляэмо пустий клас
					setTimeout(function(){
						$('.addMagazineForm').find('.emptyField').removeAttr('style').removeClass('emptyField');
					},5000);

				}
			}	
		});
	});
	

});



