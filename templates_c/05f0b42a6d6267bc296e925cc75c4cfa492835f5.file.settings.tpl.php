<?php /* Smarty version Smarty-3.1.16, created on 2014-08-28 16:41:39
         compiled from "./templates/settings.tpl" */ ?>
<?php /*%%SmartyHeaderCode:95174904153ff5bc3a8eb29-23906727%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '05f0b42a6d6267bc296e925cc75c4cfa492835f5' => 
    array (
      0 => './templates/settings.tpl',
      1 => 1409086514,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '95174904153ff5bc3a8eb29-23906727',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.16',
  'unifunc' => 'content_53ff5bc3ae70a1_68338371',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_53ff5bc3ae70a1_68338371')) {function content_53ff5bc3ae70a1_68338371($_smarty_tpl) {?><!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <title>Magazine Dashboard | Settings</title>
    <link rel="stylesheet" href="css/settings.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="css/jquery_notification.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="css/reveal.css" type="text/css" media="screen" />
    <!--[if lt IE 9]>
    <link rel="stylesheet" href="css/ie.css" type="text/css" media="screen" />
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <!--<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>-->
    <script src="js/jquery-1.11.1.min.js"></script>
    <script src="js/hideshow.js" type="text/javascript"></script>
    <script src="js/jquery.tablesorter.js" type="text/javascript"></script>
    <script type="text/javascript" src="js/jquery.equalHeight.js"></script>
    <script type="text/javascript" src="js/settings.js"></script>
    <script type="text/javascript" src="js/jquery.reveal.js"></script>
	<script type="text/javascript" src="js/jquery_notification_v.1.js"></script>
	<script type="text/javascript" src="js/form-validator.js"></script>
</head>
<body>
	
    <?php echo $_smarty_tpl->getSubTemplate ("header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

    <!-- Begin main box -->
    <section id="main" class="column">
		<section id="settingsModule">
			
			<?php if ($_COOKIE['level']=='0') {?>
				<?php echo $_smarty_tpl->getSubTemplate ("settings-admin-block.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

			<?php }?>	
		</section>
		<div class="clear"></div>
        <div class="spacer"></div>
    </section>
    <!-- End main box -->
</body>
	
</html><?php }} ?>
