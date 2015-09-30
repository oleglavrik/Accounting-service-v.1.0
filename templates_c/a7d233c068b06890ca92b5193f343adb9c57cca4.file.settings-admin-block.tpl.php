<?php /* Smarty version Smarty-3.1.16, created on 2014-08-28 16:41:39
         compiled from "./templates/settings-admin-block.tpl" */ ?>
<?php /*%%SmartyHeaderCode:212243304053ff5bc3aebe07-46775712%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'a7d233c068b06890ca92b5193f343adb9c57cca4' => 
    array (
      0 => './templates/settings-admin-block.tpl',
      1 => 1403138620,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '212243304053ff5bc3aebe07-46775712',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.16',
  'unifunc' => 'content_53ff5bc3afa666_18353263',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_53ff5bc3afa666_18353263')) {function content_53ff5bc3afa666_18353263($_smarty_tpl) {?>

<article class="module width_3_quarter">
	<header>
		<h3 class="tabs_involved">Всі користувачі</h3>
		<a href="#" class="addUser"><img src="images/icn_add.png" alt="Добавити нового користувача" title="Добавити нового користувача" /></a>
	</header>
	<table class="tablesorter" id="allUsers" cellspacing="0" style="margin:-5pxpx 0 0 0;"> 
		<thead > 
			<tr> 
				<th>&nbsp;</th> 
				<th>Логін користувача</th> 
				<th>Рівень доступу</th> 
				<th>Дія</th> 
			</tr> 
		</thead>
		<tbody>
			
		</tbody> 
	</table>
</article>
<article class="module width_3_quarter">
	<header>
		<h3 class="tabs_involved">Магазини</h3>
		<a href="#" class="addMagazine"><img src="images/icn_add.png" alt="Добавити новий магазин" title="Добавити новий магазин" /></a>
	</header>
	<table class="tablesorter" id="shopList" cellspacing="0" style="margin:-5px 0 0 0;"> 
		<thead> 
			<tr> 
				<th class="r1">&nbsp;</th> 
				<th class="r2">ID магазину</th> 
				<th class="r3">Назва магазину</th> 
				<th class="r4">Дія</th> 
			</tr> 
		</thead>
		<tbody>
			
		</tbody> 
	</table>
	
	<section id="addNewMagazine" class='reveal-modal smallDouble'>
		<h2>Добавити магазин</h2>
		<form class="addMagazineForm" method="post" action="javascript:void(null);">
			<div>
				<label>Назва магазину <span>*</span></label>
				<input type="text" name="newMagazineName" value="" />
				<label class="exampleLabel">Modena</label>
			</div>
			<div id="typeProductBox" class="typeProductBox">
				<h2>Добавити типи продуктів</h2>
				<a href="#" id="addNewType"><img src="images/icn_add.png"/ title="Добавти новий тип товару" alt="Добавти новий тип товару"></a>
			</div>
			<div>
				<input type="submit" name="addMagazine" value="Добавити" />
			</div>

		</form>
		<a class="close-reveal-modal">&#215;</a>
	</section>
	
	<section id="addUser" class='reveal-modal smallDouble'>
		<h2>Добавити користувача</h2>
		<form id="addNewUser" class="rf" name="addUser" action="javascript:void(null);"  method="post">
			<div>
				<label>Логін <span style="color:#FF3334">*</span></label>
				<input type="text" name="userLogin" class="addNewUserText rfield" value="" />
				<label class="exampleLabel">Іvanov_I</label>
			</div>
			<div>
				<label>Пароль <span style="color:#FF3334">*</span></label>
				<input type="password" name="userPassword" class="addNewUserText rfield password" value="" />
				<label class="exampleLabel">Мінімум 4 символи</label>
			</div>
			<div>
				<label>Повторно пароль <span style="color:#FF3334">*</span></label>
				<input type="password" name="userPasswordAgain" class="addNewUserText rfield passwordAgain" value="" />
				<label class="exampleLabel">Мінімум 4 символи</label>
			</div>
			<div>
				<label>Рівень доступу <span style="color:#FF3334">*</span></label>
				<select class="userLevel" name="userLevel">
					<option value="1">
						Moderator
					</option>
					<option value="0">
						Admin
					</option>
				<select>
				<label class="exampleLabel">Admin or Moderator</label>
			</div>
			<div>
				<input type="submit" value="Добавити" name="addUserSubmit" class="addUserSub btn_submit disabled" />
			</div>
		</form>
		<a class="close-reveal-modal">&#215;</a>
	</section>
</article><?php }} ?>
