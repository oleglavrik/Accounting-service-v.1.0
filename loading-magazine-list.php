<?php
	# Скрипт завантаження списку магазинів в налаштування для адміна 
	# скрипт security
	require_once("security.php");
	$magazinesQuery = "SELECT * FROM shops ORDER BY NAME DESC";
	$magazinesQuery = mysql_query($magazinesQuery);
	while($data = mysql_fetch_array($magazinesQuery)) {
	 	$magazinesList[] = $data;
	}
	echo json_encode($magazinesList);
?>