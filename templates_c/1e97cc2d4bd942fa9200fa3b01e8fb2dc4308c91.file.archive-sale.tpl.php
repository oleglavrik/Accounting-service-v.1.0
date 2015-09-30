<?php /* Smarty version Smarty-3.1.16, created on 2014-10-23 13:14:58
         compiled from "./templates/archive-sale.tpl" */ ?>
<?php /*%%SmartyHeaderCode:2941291125448ff52e35974-50412783%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '1e97cc2d4bd942fa9200fa3b01e8fb2dc4308c91' => 
    array (
      0 => './templates/archive-sale.tpl',
      1 => 1414070091,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '2941291125448ff52e35974-50412783',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.16',
  'unifunc' => 'content_5448ff52e7e1f4_45008326',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5448ff52e7e1f4_45008326')) {function content_5448ff52e7e1f4_45008326($_smarty_tpl) {?><!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <title>Magazine Dashboard | Архів продаж</title>
    <link rel="stylesheet" href="css/archive-sale.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="css/jquery_notification.css" type="text/css" media="screen" />
    <!--<link rel="stylesheet" href="css/reveal.css" type="text/css" media="screen" />-->
    <!--link rel="stylesheet" href="css/jquery.datepicker.css" type="text/css" media="screen" />-->
    <!--[if lt IE 9]>
    <link rel="stylesheet" href="css/ie.css" type="text/css" media="screen" />
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <!--<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script> -->
    <script src="js/jquery-1.11.1.min.js"></script>
    <script src="js/hideshow.js" type="text/javascript"></script>
    <script src="js/jquery.tablesorter.js" type="text/javascript"></script>
    <script type="text/javascript" src="js/jquery.equalHeight.js"></script>
    <script type="text/javascript" src="js/archive-sale.js"></script>
    <!--<script type="text/javascript" src="js/jquery.reveal.js"></script>-->
	<script type="text/javascript" src="js/jquery_notification_v.1.js"></script>
   <script type="text/javascript" src="js/jquery.datepicker.js"></script>
</head>
    <body>
    	
        <?php echo $_smarty_tpl->getSubTemplate ("header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

        <!-- Begin main box -->
        <section id="main">
    		<article class="module width_full">
                <header>
                    <h3>Архів продаж</h3>
                </header>
                <div class="tab_container">
                    <div class="tab_content">
                        <div class="tableContainer">
                            <table id="archiveSaleTable" class="tablesorter scrollTable" width="100%" cellspacing="0" cellpadding="0">
                                
                                <?php if ($_COOKIE['level']=='0') {?> 
                                    <thead> 
                                        <tr> 
                                            <th class="r1"><input type="checkbox" id="selectAllProducts"/></th> 
                                            <th class="r2">Найменування</th>
                                            <th class="r3">Штрих код</th> 
                                            <th class="r4">Дата продажу</th>
                                            <th class="r5">Сумма продажу</th> 
                                            <th class="r6">Дія</th>
                                        </tr> 
                                    </thead>
                                <?php }?> 
                                <tbody>
                                    
                                </tbody> 
                            </table>
                            
                        </div>
                        <div class="productsSettingsBoxArchiv">
							<form class="massRemove" method="post" action="javascript:void(null);">
								<input type="submit" value="Видалити" title="Видалити">
							</form>
						</div>
                    </div>
                </div>
                
            </article>
              
    		<div class="clear"></div>
        </section>
        <!-- End main box -->
    </body>
</html><?php }} ?>
