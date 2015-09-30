/* 
    Author name: oleg.lavrik
	Page:setting.js
    Date: 09/05/2014
    Author Email: oleh.lavrik@gmail.com
 */

// функція динамічного завантаження списку мгазинів

// Виконуємо ajax запит по отриманю списку магазинів
$.ajax({
	type: 'POST',
	url : 'loading-magazines.php',
	dataType: 'json',
	beforeSend: function(data)
	{
		// очистка значень селекта вибору магазину	
		$('#magazineSelect').find('option').remove();
	},
	success: function(data)
	{
		// Вносимо значення в селект вибору магазину
		for(var i = 0; i < data.length; i++)
		{
			$('#magazineSelect').append(
				'<option value='+data[i]['id']+'>'+data[i]['name']+'</option>'
			);
		}	
	},
	error: function(xhr, str)
	{
		// виводимо повідомлення помилку видалення товарів
		showNotification({
			message: "При завантаженні списку магазинів сталася помилка, обновіть сторіку, або зверніться до адміністратора",
			type: "error", 
			autoClose: true, 
			duration: 5 
		});
	}
});

