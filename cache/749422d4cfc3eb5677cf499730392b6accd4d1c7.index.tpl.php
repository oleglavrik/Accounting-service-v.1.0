<?php /*%%SmartyHeaderCode:1067153fb19030de3f1-69893395%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '749422d4cfc3eb5677cf499730392b6accd4d1c7' => 
    array (
      0 => '.\\templates\\index.tpl',
      1 => 1408965450,
      2 => 'file',
    ),
    '10e0737838b4a574ef135d0c601e7b602cfaf37a' => 
    array (
      0 => '.\\templates\\header.tpl',
      1 => 1404836551,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '1067153fb19030de3f1-69893395',
  'cache_lifetime' => 3600,
  'version' => 'Smarty-3.1.16',
  'unifunc' => 'content_53fb48637d8fe1_58017882',
  'has_nocache_code' => false,
),true); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_53fb48637d8fe1_58017882')) {function content_53fb48637d8fe1_58017882($_smarty_tpl) {?>	<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <title>Magazine Dashboard | Store</title>
    <link rel="stylesheet" href="css/index.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="css/jquery_notification.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="css/reveal.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="css/jquery.datepicker.css" type="text/css" media="screen" />
	<link type="text/css" rel="stylesheet" href="css/jquery.qtip.min.css" />
    <!--[if lt IE 9]>
    <link rel="stylesheet" href="css/ie.css" type="text/css" media="screen" />
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="js/hideshow.js" type="text/javascript"></script>
    <script src="js/jquery.tablesorter.js" type="text/javascript"></script>
    <script type="text/javascript" src="js/jquery.equalHeight.js"></script>
	<script type="text/javascript" src="js/jquery_notification_v.1.js"></script>
    <script type="text/javascript" src="js/index.js"></script>
	<script type="text/javascript" src="js/jquery.reveal.js"></script>
	<script type="text/javascript" src="js/jquery.datepicker.js"></script>
	<script type="text/javascript" src="js/jquery.qtip.min.js"></script>

</head>
<body>
    <header id="header">
	<hgroup>
		<form id="magazine" method="post" action="javascript:void(null);">
			<select class="site_title" id='magazineSelect'>
								   <option value='1'>Modena </option> 
								   <option value='2'>Orbita</option> 
							</select>    
		</form>
		<h2 class="section_title"><a href="http://localhost/lazurit/index.php">Magazine Dashboard</a></h2>
	</hgroup>
</header>
<section id="secondary_bar">
	<div class="user">
		<p>
							<span style="color:green" title=" Moderator">	
					 - (M)
				</span>
					</p>
		<a class="logout_user" href="logout.php?logout=true" title="Logout">Logout</a>
	</div>
	<div class="breadcrumbs_container">
				<ul class="mainMenu">
			<li><a href="http://localhost/lazurit/index.php">Склад</a></li>
			<li><a href="http://localhost/lazurit/costs.php">Витрати</a></li>
			<li><a href="http://localhost/lazurit/reports.php">Звіти</a></li>
			<li><a href="http://localhost/lazurit/customers.php">Клієнти</a></li>
		</ul>
			</div>
</section>
    <!-- Begin main box -->
    <section id="main" class="column">
        <article class="module width_full">
            <header>
				<h3>Склад</h3>
				<div class="searchLine"> 

				</div>

				<ul class="tabs">
		   			<li><a href="#tab1">Товари</a></li>
		    		<li><a href="#tab2">Архів товарів</a></li>
				</ul>
				<form class="quick_search" method="GET" action="javascript:void(null);">
					<input value="Quick Search" name="storeSearch" type="text">
				</form>
							</header>
			<div class="tab_container">
				<div id="tab1" class="tab_content">
					<div class="tableContainer">
						
													<table id="storeTable" class="tablesorter scrollTable" width="100%" cellspacing="0" cellpadding="0"> 
								<thead> 
									<tr> 
										<th class="m1">&nbsp;</th> 
										<th class="m2">Найменування товару</th> 
										<th class="m3">Тип товару</th>
										<th class="m4">Штрих код</th> 
										<th class="m5">Проба</th> 
										<th class="m6">Вага</th>
										<th class="m7">Розмір</th>
										<th class="m8">Дата закупки</th>
										<th class="m9">Вихідна ціна</th> 
										<th class="m10">Дія</th>
									</tr> 
								</thead> 
								<tbody>
									
								</tbody> 
							</table>
											</div>
					
					
					
					<div class="productsSettingsBox">
						
						<form class="massRemove" method="post" action="javascript:void(null);">
							<input type="submit" value="Видалити" title="Видалити">
						</form>
					</div>
					
					<div class="archivSettingBox">
						<form class="archive" method="post" action="javascript:void(null);">
							<input type="submit" value="В архів" name='archive' title="В архів">	
						</form>
					</div>
				</div>
				<div id="tab2" class="tab_content">
					
					<div class="tableContainer">
						
													<table id="storeTableArchiv" class="tablesorter" width="100%" cellspacing="0" cellpadding="0"> 
								<thead> 
									<tr> 
										<th class="m1">&nbsp;</th> 
										<th class="m2">Найменування товару</th> 
										<th class="m3">Тип товару</th>
										<th class="m4">Штрих код</th> 
										<th class="m5">Проба</th> 
										<th class="m6">Вага</th>
										<th class="m7">Розмір</th>
										<th class="m8">Дата закупки</th>
										<th class="m9">Вихідна ціна</th> 
										<th class="m10">Дія</th>
									</tr>  
								</thead> 
								<tbody>
									
								</tbody> 
							</table>
											</div>
					
					
					<div class="productsSettingsBoxArchiv">
					
					
						<form class="massRemove" method="post" action="javascript:void(null);">
							<input type="submit" value="Видалити" title="Видалити">
						</form>
					</div>
					
					<div class="unArchivSettingBox">
						<form class="unArchive" method="post" action="javascript:void(null);">
							<input type="submit" value="Розархівувати" name='archive' title="В архів">	
						</form>
					</div>
				</div>
			</div>
			
			<div id="buyDateModal" class="reveal-modal smallDouble">
				<h1>Покупка товару</h1>
				<form class="buyProdutDate" method="post" action="javascript:void(null);">
					<div>
						<label>
							Ціна продажу <span>*</span>
						</label>
						<input type="text" name="startingPrice" value="" />
						<label class="exampleLabel">120.90 [через крапку]</label>
					</div>
					<div>
						<label>
							Номер карти клієнта <span>*</span>
						</label>
						<input type="text" value="" name="buyCardNumber" class="buyCard" title="Для підтвердження картки клієнта нажміть 'OK'" />
						<input type="button" value="OK" class="addCard" name="checkCustomerCard" />
						<label class="exampleLabel">2244</label>
					</div>
					<div>
						<label>
							Дата продажу <span>*</span>
						</label>
						<input type="text" id="datepicker" value="" name="buyDate" />
						<label class="exampleLabel">2014-05-05 [через тире]</label>
					</div>
					<div>
						<div class="perDiscount">
							<label>
								Процент знижки <b></b>
							</label>
						</div>
						<div class="priceWithDiscount">
							<label>
								Ціна продажу зі знижкою <b></b> 
							</label>
						</div>
					</div>
					
					<div>
						<input type="submit" value="Купити" name="" />
					</div>
				</form>
				<a class="close-reveal-modal">&#215;</a>
			</div>
			
						
			<div id="massProductBuy" class="reveal-modal xlarge massBuyWindow">
				<h1>Покупка товарів</h1>
				<article class="module x100">
		            <header>
						<h3>Вибрані товари для продажі:</h3>
						<form class="massCardNumberForm">
							<input type="text" name="massCardNumber" value="Номер карти" title="Формат вводу карти 000000-000000-0"/>
						</form>
					</header>
					<div class="tableContainerModal">
						<table id="storeProductsBuy" class="tablesorter" width="100%" cellspacing="0" cellpadding="0" > 
							<thead> 
								<tr> 
									<th class="b1">Артикуль</th> 
									<th class="b2">Найменування товару</th>
									<th class="b3">Тип товару</th> 
									<th class="b4">Дата продажу</th> 
									<th class="b5">Ціна продажу</th>
								</tr>  
							</thead> 
							<tbody>

							</tbody> 
						</table>
					</div>
					<div class="totalPrice">
						<span>Загальна продажна ціна</span><b></b>
					</div>
					<form class="massProductBuyForm" method="post" action="javascript:void(null);">
						<input type="submit" name="massBuySubmit" value="Купити" />
					</form>
				</article>
				<a class="close-reveal-modal">&#215;</a>
			</div>
				    </article>
    </section>
    <!-- End main box -->
</body>
</html><?php }} ?>
