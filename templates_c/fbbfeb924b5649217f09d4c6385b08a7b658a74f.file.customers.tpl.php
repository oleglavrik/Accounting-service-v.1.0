<?php /* Smarty version Smarty-3.1.16, created on 2014-08-28 16:41:42
         compiled from "./templates/customers.tpl" */ ?>
<?php /*%%SmartyHeaderCode:42113490953ff5bc6194bd7-01383941%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'fbbfeb924b5649217f09d4c6385b08a7b658a74f' => 
    array (
      0 => './templates/customers.tpl',
      1 => 1409107184,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '42113490953ff5bc6194bd7-01383941',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.16',
  'unifunc' => 'content_53ff5bc61fdd69_19691142',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_53ff5bc61fdd69_19691142')) {function content_53ff5bc61fdd69_19691142($_smarty_tpl) {?><!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <title>Magazine Dashboard | Сustomers</title>
    <link rel="stylesheet" href="css/costomers.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="css/jquery_notification.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="css/reveal.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="css/jquery.datepicker.css" type="text/css" media="screen" />
    <!--[if lt IE 9]>
    <link rel="stylesheet" href="css/ie.css" type="text/css" media="screen" />
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <!--<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>-->
    <script src="js/jquery-1.11.1.min.js"></script>
    <script src="js/hideshow.js" type="text/javascript"></script>
    <script src="js/jquery.tablesorter.js" type="text/javascript"></script>
    <script type="text/javascript" src="js/jquery.equalHeight.js"></script>
    <script type="text/javascript" src="js/costomers.js"></script>
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
                    <h3>Клієнти</h3>
                    <a href="#" class="addCostumers"><img src="images/icn_add.png" alt="Добавити нового клієнта" title="Добавити нового клієнта" /></a> 
                </header>
                <div class="tab_container">
                    <div class="tab_content">
                        <div class="tableContainer">
                            <table id="costomersTable" class="tablesorter scrollTable" width="100%" cellspacing="0" cellpadding="0">
                                
                                <?php if ($_COOKIE['level']=='0') {?> 
                                    <thead> 
                                        <tr> 
                                            <th class="r1">&nbsp;</th> 
                                            <th class="r2">Номер карти</th> 
                                            <th class="r3">ПІП</th>
                                            <th class="r4">Cума покупок</th>
                                            <th class="r5">Номер телефону</th>
                                            <th class="r6">Знижка %</th>  
                                            <th class="r7">Дія</th>
                                        </tr> 
                                    </thead>
                                <?php } else { ?>
                                     <thead> 
                                        <tr> 
                                            <th class="m1">&nbsp;</th> 
                                            <th class="m2">Номер карти</th> 
                                            <th class="m3">ПІП</th>
                                            <th class="m4">Cума покупок</th>
                                            <th class="m5">Номер телефону</th>
                                            <th class="m6">Знижка %</th>  
                                        </tr> 
                                    </thead>
                                <?php }?> 
                                <tbody>
                                    
                                </tbody> 
                            </table>
                        </div>
                    </div>
                </div>
                
                <div id="newCostomersModal" class="reveal-modal smallDouble">
                    <h1>Добавити нового клієнта</h1>
                    <form class="newCostomersForm" method="post" action="javascript:void(null);">
                        <div>
                            <label>
                                ПІП клієнта <span>*</span>
                            </label>
                            <input type="text" name="costumerName" value="" />
                            <label class="exampleLabel">Іванов Іван Іванович</label>
                        </div>
                        <div>
                            <label>
                                Номер карти <span>*</span>
                            </label>
                            <input type="text" id="" value="" name="costomerNumberCard" />
                            <label class="exampleLabel">0000</label>
                        </div>
                        <div>
                            <label>
                                Номер телефону <span>*</span>
                            </label>
                            <input type="text" id="" value="" name="costomerNumberOfTelephone" />
                            <label class="exampleLabel">098-00-00-000</label>
                        </div>
                        <div>
                            <label>
                                Процент знижки <span>*</span>
                            </label>
                            <select id="discount">
                                <option value="5">Звичайний клієнт (5%)</option>
                                <option value="20">VIP клієнт (20%)</option>
                            </select>
                            <label class="exampleLabel">Процент знижки</label>
                        </div>
                        <div>
                            <input type="submit" value="Добавити" name="" />
                        </div>
                    </form>
                    <a class="close-reveal-modal">&#215;</a>
                </div>
                <?php if ($_COOKIE['level']=='0') {?>
                
                <div id="editCustomerModal" class="reveal-modal smallDouble">
                    <h1>Редагувати інформацію про клієнта</h1>
                    <form class="editCostomersForm" method="post" action="javascript:void(null);">
                        <div>
                            <input type="text" name="editСustomerID" hidden="hidden" value="" />
                        </div>
                        <div>
                            <label>
                                ПІП клієнта <span>*</span>
                            </label>
                            <input type="text" name="editСustomerName" value="" />
                            <label class="exampleLabel">Іванов Іван Іванович</label>
                        </div>
                        <div>
                            <label>
                                 Номар Карти <span>*</span>
                            </label>
                            <input type="text" id="" value="" name="editCustomerCardNumber" />
                            <label class="exampleLabel">0000</label>
                        </div>
                        <div>
                            <label>
                                Номер телефону <span>*</span>
                            </label>
                            <input type="text" id="" value="" name="editNumberOfTelephone" />
                            <label class="exampleLabel">098-00-00-000</label>
                        </div>
                        <div class="numberCheck">
                            <div>
                                <label>
                                     Cума покупок <span>*</span>
                                </label>
                                <input type="text" id="" value="" name="editTotalSum" />
                                <label class="exampleLabel">2100</label>
                            </div>
                            <div>
                                <label>
                                    Знижка % <span>*</span>
                                </label>
                                <input type="text" id="" value="" name="editDiscount" />
                                <label class="exampleLabel">5</label>
                            </div>
                            <div>
                                <label>
                                    Ціна першої покупки <span>*</span>
                                </label>
                                <input type="text" id="" value="" name="firstPrice" />
                                <label class="exampleLabel">1000</label>
                            </div>
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
