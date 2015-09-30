<?php /* Smarty version Smarty-3.1.16, created on 2014-08-28 16:40:16
         compiled from "./templates/index.tpl" */ ?>
<?php /*%%SmartyHeaderCode:38958382853ff5b706bb079-31029933%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'c0360d049dff10f364dfc53ba2cc3958abf6ee6d' => 
    array (
      0 => './templates/index.tpl',
      1 => 1409195634,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '38958382853ff5b706bb079-31029933',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.16',
  'unifunc' => 'content_53ff5b7073ce92_98064604',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_53ff5b7073ce92_98064604')) {function content_53ff5b7073ce92_98064604($_smarty_tpl) {?>	<!doctype html>
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
    <!--<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script> -->
    <script src="js/jquery-1.11.1.min.js"></script>
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
    <?php echo $_smarty_tpl->getSubTemplate ("header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

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
				<?php if ($_COOKIE['level']=='0') {?>
					<a href="#" class="addProduct"><img src="images/icn_add.png" alt="Добавити новий товар" title="Добавити новий товар" /></a>
				<?php }?>
			</header>
			<div class="tab_container">
				<div id="tab1" class="tab_content">
					<div class="tableContainer">
						
						<?php if ($_COOKIE['level']=='0') {?>
							<table id="storeTable" class="tablesorter scrollTable" width="100%" cellspacing="0" cellpadding="0"> 
								<thead> 
									<tr> 
										<th class="r1">&nbsp;</th> 
										<th class="r2">Найменування товару</th> 
										<th class="r3">Тип товару</th>
										<th class="r4">Штрих код</th>
										<th class="r5">Проба</th>
										<th class="r6">Вага</th>
										<th class="r7">Розмір</th> 
										<th class="r8">Дата закупки</th> 
										<th class="r9">Вхідна ціна</th>
										<th class="r10">Вихідна ціна</th>
										<th class="r11">Дія</th>
									</tr> 
								</thead> 
								<tbody>
									
								</tbody> 
							</table>
						<?php } else { ?>
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
						<?php }?>
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
						
						<?php if ($_COOKIE['level']=='0') {?>
							<table id="storeTableArchiv" class="tablesorter" width="100%" cellspacing="0" cellpadding="0"> 
								<thead> 
									<tr> 
										<th class="r1">&nbsp;</th> 
										<th class="r2">Найменування товару</th> 
										<th class="r3">Тип товару</th>
										<th class="r4">Штрих код</th>
										<th class="r5">Проба</th>
										<th class="r6">Вага</th>
										<th class="r7">Розмір</th> 
										<th class="r8">Дата закупки</th> 
										<th class="r9">Вхідна ціна</th>
										<th class="r10">Вихідна ціна</th>
										<th class="r11">Дія</th>
									</tr>  
								</thead> 
								<tbody>
									
								</tbody> 
							</table>
						<?php } else { ?>
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
						<?php }?>
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
			
			<?php if ($_COOKIE['level']=='0') {?>
				<div id="editProduct" class="reveal-modal medium reveal-modal-on-top-window">
					<h1>Редагувати товар</h1>
					
					<form class="editProducts" method="post" action="javascript:void(null);">
						<input type="text" name="idShop" value="" hidden="hidden" />
						<input type="text" name="idProduct" value="" hidden="hidden" />
						<div>
							<label class="basicLabel">Найменування товару <span>*</span></label>
							<input type="text" name="editProductName" value="" />
							<label class="exampleLabel">Каблучка з сапфіром</label>
						</div>
						<div>
							<label class="basicLabel">Тип товару <span>*</span></label>
							<select class='productsTypes' name="editProductTypes"></select>
							<label class="exampleLabel">Каблучки</label>
						</div>
						<div>
							<label class="basicLabel">Дата Закупки <span>*</span></label>
							<input type="text" name="editDateOfPurchase" value="" />
							<label class="exampleLabel">2014-05-05 [через тире]</label>
						</div>
						<div class="pricingWrap">
							<div>
								<label class="basicLabel">Проба <span>*</span></label>
								<input type="text" name="editProductSimple" value="" />
								<label class="exampleLabel">925</label>
							</div>
							<div>
								<label class="basicLabel">Вага <span>*</span></label>
								<input type="text" name="editWeight" value="" />
								<label class="exampleLabel">5.02[через крапку]</label>
							</div>
							<div>
								<label class="basicLabel">Розмір <span>*</span></label>
								<input type="text" name="editSize" value="" />
								<label class="exampleLabel">0</label>
							</div>
							<div>
								<label class="basicLabel">Вхідна ціна <span>*</span></label>
								<input type="text" name="editInputPrice" value="" />
								<label class="exampleLabel">120.90 [через крапку]</label>
							</div>
							<div>
								<label class="basicLabel">Вихідна ціна <span>*</span></label>
								<input type="text" name="editStartingPrice" value="" />
								<label class="exampleLabel">90.90 [через крапку]</label>
							</div>
							<div>
								<label class="basicLabel">Штрих код <span>*</span></label>
								<input type="text" name="editBarCode" value="" />
								<label class="exampleLabel">4851762343</label>
							</div>
						</div>
						<div>
							<input type="submit" name="editProductSubmit" style="float:right" value="Редагувати" />
						</div>
					</form>
					<a class="close-reveal-modal">&#215;</a>
				</div>
				<?php }?>
			
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
			<?php if ($_COOKIE['level']=='0') {?>
				<div id="addNewProducModal" class="reveal-modal medium reveal-modal-on-top-window">
					<h1>Додати новий товар</h1>
					<form class="addProductForm" method="post" action="javascript:void(null);">
						<div>
							<label>Назва товару <span>*</span></label>
							<input type="text" name="productName" value="" />
							<label class="exampleLabel">Каблучка з сапфіром</label>
						</div>
						<div>
							<label>Тип товару <span>*</span></label>
							<select class='productType' name="productType">
							</select>
							<label class="exampleLabel">Каблучки</label>
						</div>
						<div>
							<label>Дата Закупки <span>*</span></label>
							<input type="text" name="productDateOfPurchase" value="" />
							<label class="exampleLabel">21.06.2014 [через крапку]</label>
						</div>
						<div class="priceWraping">
							<div>
								<label>Проба <span>*</span></label>
								<input type="text" name="productSimple" value="" />
								<label class="exampleLabel">925</label>
							</div>
							<div>
								<label>Вага <span>*</span></label>
								<input type="text" name="productWeight" value="" />
								<label class="exampleLabel">5.02</label>
							</div>
							<div>
								<label>Розмір <span>*</span></label>
								<input type="text" name="productSize" value="0" />
								<label class="exampleLabel">По замовчуванні 0</label>
							</div>
							<div>
								<label>Вхідна ціна <span>*</span></label>
								<input type="text" name="productInputPrice" value="" />
								<label class="exampleLabel">100.90 [через крапку]</label>
							</div>
							<div>
								<label>Вихідна ціна <span>*</span></label>
								<input type="text" name="productStartingPrice" value="" />
								<label class="exampleLabel">120.90 [через крапку]</label>
							</div>
							<div>
								<label>Штрих код <span>*</span></label>
								<input type="text" name="productBarCode" value="" />
								<label class="exampleLabel">4851762343</label>
							</div>
						</div>
						<div>
							<input type="submit" name="addProductSub" value="Додати" />
						</div>
					</form>
					<a class="close-reveal-modal">&#215;</a>
				</div>
			<?php }?>
	    </article>
    </section>
    <!-- End main box -->
</body>
</html><?php }} ?>
