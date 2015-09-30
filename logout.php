<?php 
	// скрипт виходу з системи
	# Провірка чи існує параметр виходу
	if($_GET['logout'])
	{
		setcookie("id", "", time() - 3600);
		setcookie("hash", "", time() - 3600);
		setcookie("level", "", time() - 3600);
		setcookie("timeLeftCurrent", "", time() - 3600);
		setcookie("errorAuth","Ви вийшли з системи");
		header("Location: enter-form.php");
	}
?>