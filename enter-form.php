<?php
	# �������� � ��
	require_once("config.php");
	# ����������� SMARTY'
	require_once("setup.php");
	# ������� �� ��������� ���� � ��������
	if(isset($_COOKIE['errorAuth']))
		$errorAuth = $_COOKIE['errorAuth'];
	else
		$errorAuth = false;
	# ����������� �������
	$smarty->assign("errorAuth",$errorAuth);
	# ���������� �����[� ���� �������]
	$smarty->display('enter-form.tpl');	

?>