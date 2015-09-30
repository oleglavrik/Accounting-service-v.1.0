<?php /* Smarty version Smarty-3.1.16, created on 2014-08-28 16:40:07
         compiled from "./templates/enter-form.tpl" */ ?>
<?php /*%%SmartyHeaderCode:139212546953ff5b672f2436-97133476%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '5d93cb59c24daaa07a16fe7236a135fa8934768b' => 
    array (
      0 => './templates/enter-form.tpl',
      1 => 1409086478,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '139212546953ff5b672f2436-97133476',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'errorAuth' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.16',
  'unifunc' => 'content_53ff5b6733d372_41694928',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_53ff5b6733d372_41694928')) {function content_53ff5b6733d372_41694928($_smarty_tpl) {?>
<?php  $_config = new Smarty_Internal_Config("enter-form.conf", $_smarty_tpl->smarty, $_smarty_tpl);$_config->loadConfigVars(null, 'local'); ?>
<!DOCTYPE HTML>
<head>
<title><?php echo $_smarty_tpl->getConfigVariable('title');?>
</title>
	<meta http-equiv="Content-type" content="text/html; charset=UTF-8" />
	<link rel="stylesheet" type="text/css" href="css/enter-form.css" />
	<script src="js/jquery-1.11.1.min.js"></script>
	<script type="text/javascript" src="js/enter-form.js"></script>
</head>
	<body>
        <section id="main">
			<section class="enterFormBox">
				
				<?php if ($_smarty_tpl->tpl_vars['errorAuth']->value) {?>
					<div class='errorBox'><?php echo $_smarty_tpl->tpl_vars['errorAuth']->value;?>
</div>
				<?php }?>
				<form class="enterForm" method="POST" action="login.php">
					<header>
						<?php echo $_smarty_tpl->getConfigVariable('title');?>

					</header>
					<section>
						<div>
							<input id="userLogin" type="text" value="Login" name="login" class="enterText"  />
						</div>
						<div>
							<input id="userPassword" type="password" value="Password" name="password" class="enterText"  />
						</div>
						<div>
							<input type="submit" value="Submit" name="submit" class="enterSub">
						</div>
					</section>
				</form>
			</section>
            <section class="footer_push"></section>
        </section>
	  <footer id="footer">
	  </footer>
	</body>
</html><?php }} ?>
