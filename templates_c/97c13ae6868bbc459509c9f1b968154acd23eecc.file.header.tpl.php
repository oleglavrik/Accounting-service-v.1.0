<?php /* Smarty version Smarty-3.1.16, created on 2014-10-23 13:24:01
         compiled from "./templates/header.tpl" */ ?>
<?php /*%%SmartyHeaderCode:116325278553ff5b70740cf9-61046367%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '97c13ae6868bbc459509c9f1b968154acd23eecc' => 
    array (
      0 => './templates/header.tpl',
      1 => 1414070635,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '116325278553ff5b70740cf9-61046367',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.16',
  'unifunc' => 'content_53ff5b707ac0e6_79228207',
  'variables' => 
  array (
    'magazineList' => 0,
    'item' => 0,
    'current_url' => 0,
    'userData' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_53ff5b707ac0e6_79228207')) {function content_53ff5b707ac0e6_79228207($_smarty_tpl) {?><header id="header">
	<hgroup>
		<form id="magazine" method="post" action="javascript:void(null);">
			<select class="site_title" id='magazineSelect'>
				<?php  $_smarty_tpl->tpl_vars['item'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['item']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['magazineList']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['item']->key => $_smarty_tpl->tpl_vars['item']->value) {
$_smarty_tpl->tpl_vars['item']->_loop = true;
?>
				   <option value='<?php echo $_smarty_tpl->tpl_vars['item']->value['id'];?>
'><?php echo $_smarty_tpl->tpl_vars['item']->value['name'];?>
</option> 
				<?php } ?>
			</select>    
		</form>
		<h2 class="section_title"><a href="<?php echo $_smarty_tpl->tpl_vars['current_url']->value;?>
index.php">Magazine Dashboard</a></h2>
	</hgroup>
</header>
<section id="secondary_bar">
	<div class="user">
		<p>
			<?php if ($_COOKIE['level']=='0') {?>
				<span style="color:#FF3334" title="<?php echo $_smarty_tpl->tpl_vars['userData']->value['userLogin'];?>
 Administrator">
					<?php echo $_COOKIE['login'];?>
 - (A)
				</span>
			<?php } else { ?>
				<span style="color:green" title="<?php echo $_smarty_tpl->tpl_vars['userData']->value['userLogin'];?>
 Moderator">	
					<?php echo $_COOKIE['login'];?>
 - (M)
				</span>
			<?php }?>
		</p>
		<a class="logout_user" href="logout.php?logout=true" title="Logout">Logout</a>
	</div>
	<div class="breadcrumbs_container">
		<?php if ($_COOKIE['level']=='0') {?>
		<ul class="mainMenu">
			<li><a href="<?php echo $_smarty_tpl->tpl_vars['current_url']->value;?>
index.php">Склад</a></li>
			<li><a href="<?php echo $_smarty_tpl->tpl_vars['current_url']->value;?>
costs.php">Витрати</a></li>
			<li><a href="<?php echo $_smarty_tpl->tpl_vars['current_url']->value;?>
reports.php">Звіти</a></li>
			<li><a href="<?php echo $_smarty_tpl->tpl_vars['current_url']->value;?>
customers.php">Клієнти</a></li>
			<li><a href="<?php echo $_smarty_tpl->tpl_vars['current_url']->value;?>
archive-sale.php">Архів продаж</a></li>
			<li><a href="<?php echo $_smarty_tpl->tpl_vars['current_url']->value;?>
settings.php">Налаштування</a></li>
		</ul>
		<?php } else { ?>
		<ul class="mainMenu">
			<li><a href="<?php echo $_smarty_tpl->tpl_vars['current_url']->value;?>
index.php">Склад</a></li>
			<li><a href="<?php echo $_smarty_tpl->tpl_vars['current_url']->value;?>
costs.php">Витрати</a></li>
			<li><a href="<?php echo $_smarty_tpl->tpl_vars['current_url']->value;?>
reports.php">Звіти</a></li>
			<li><a href="<?php echo $_smarty_tpl->tpl_vars['current_url']->value;?>
customers.php">Клієнти</a></li>
		</ul>
		<?php }?>
	</div>
</section><?php }} ?>
