<?php /* Smarty version Smarty-3.1.16, created on 2014-08-28 16:41:35
         compiled from "./templates/costs.tpl" */ ?>
<?php /*%%SmartyHeaderCode:68395951053ff5bbfa48858-60231786%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '8281e6649b464f0e46860824472748dc4b0d21be' => 
    array (
      0 => './templates/costs.tpl',
      1 => 1409086418,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '68395951053ff5bbfa48858-60231786',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.16',
  'unifunc' => 'content_53ff5bbfad11a2_25774673',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_53ff5bbfad11a2_25774673')) {function content_53ff5bbfad11a2_25774673($_smarty_tpl) {?><!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <title>Magazine Dashboard | Costs</title>
    <link rel="stylesheet" href="css/costs.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="css/jquery_notification.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="css/reveal.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="css/jquery.datepicker.css" type="text/css" media="screen" />
    <!--[if lt IE 9]>
    <link rel="stylesheet" href="css/ie.css" type="text/css" media="screen" />
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <!--<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script> -->
    <script src="js/jquery-1.11.1.min.js"></script>
    <script src="js/hideshow.js" type="text/javascript"></script>
    <script src="js/jquery.tablesorter.js" type="text/javascript"></script>
    <script type="text/javascript" src="js/jquery.equalHeight.js"></script>
    <script type="text/javascript" src="js/costs.js"></script>
    <script type="text/javascript" src="js/jquery.reveal.js"></script>
	<script type="text/javascript" src="js/jquery_notification_v.1.js"></script>
    <script type="text/javascript" src="js/jquery.datepicker.js"></script>
</head>
    <body>
    	
        <?php echo $_smarty_tpl->getSubTemplate ("header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

        <!-- Begin main box -->
        <section id="main">
    		<article class="module width_full">
                <header>
                    <h3>Витрати</h3>
                    <a href="#" class="addCosts"><img src="images/icn_add.png" alt="Добавити нову витрату" title="Добавити нову витрату" /></a> 
                </header>
                <div class="tab_container">
                    <div class="tab_content">
                        <div class="tableContainer">
                            <table id="costsTable" class="tablesorter scrollTable" width="100%" cellspacing="0" cellpadding="0">
                                
                                <?php if ($_COOKIE['level']=='0') {?> 
                                    <thead> 
                                        <tr> 
                                            <th class="r1">&nbsp;</th> 
                                            <th class="r2">Найменування</th> 
                                            <th class="r3">Дата</th>
                                            <th class="r4">Сумма</th> 
                                            <th class="r5">Дія</th>
                                        </tr> 
                                    </thead>
                                <?php } else { ?>
                                     <thead> 
                                        <tr> 
                                            <th class="m1">&nbsp;</th> 
                                            <th class="m2">Найменування</th> 
                                            <th class="m3">Дата</th>
                                            <th class="m4">Сумма</th> 
                                        </tr> 
                                    </thead>
                                <?php }?> 
                                <tbody>
                                    
                                </tbody> 
                            </table>
                        </div>
                    </div>
                </div>
                
                <div id="newCostsModal" class="reveal-modal smallDouble">
                    <h1>Добавити нову витрату</h1>
                    <form class="newCostsForm" method="post" action="javascript:void(null);">
                        <div>
                            <label>
                                Найменування витрати <span>*</span>
                            </label>
                            <input type="text" name="costsName" value="" />
                            <label class="exampleLabel">Новий віник</label>
                        </div>
                        <div>
                            <label>
                                Дата створення <span>*</span>
                            </label>
                            <input type="text" id="" value="" name="dateOfCosts" />
                            <label class="exampleLabel">2014-05-05 [через через тире]</label>
                        </div>
                        <div>
                            <label>
                                Сумма <span>*</span>
                            </label>
                            <input type="text" id="" value="" name="costsPrice" />
                            <label class="exampleLabel">120.90 [через крапку]</label>
                        </div>
                        <div>
                            <input type="submit" value="Створити" name="" />
                        </div>
                    </form>
                    <a class="close-reveal-modal">&#215;</a>
                </div>
                <?php if ($_COOKIE['level']=='0') {?>
                
                <div id="editCostsModal" class="reveal-modal smallDouble">
                    <h1>Редагувати витрату</h1>
                    <form class="editCostsForm" method="post" action="javascript:void(null);">
                        <div>
                            <input type="text" name="editСostsID" hidden="hidden" value="" />
                        </div>
                        <div>
                            <label>
                                Найменування витрати <span>*</span>
                            </label>
                            <input type="text" name="editСostsName" value="" />
                            <label class="exampleLabel">Новий віник</label>
                        </div>
                        <div>
                            <label>
                                Дата створення <span>*</span>
                            </label>
                            <input type="text" id="" value="" name="editDateOfCosts" />
                            <label class="exampleLabel">2014-05-05 [через через тире]</label>
                        </div>
                        <div>
                            <label>
                                Сумма <span>*</span>
                            </label>
                            <input type="text" id="" value="" name="editCostsPrice" />
                            <label class="exampleLabel">120.90 [через крапку]</label>
                        </div>
                        <div>
                            <input type="submit" value="Редагувати" name="" />
                        </div>
                    </form>
                    <a class="close-reveal-modal">&#215;</a>
                </div>
                <?php }?>
            </article>  
    		<div class="clear"></div>
        </section>
        <!-- End main box -->
    </body>
</html><?php }} ?>
