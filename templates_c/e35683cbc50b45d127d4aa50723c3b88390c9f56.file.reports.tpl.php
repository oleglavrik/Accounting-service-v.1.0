<?php /* Smarty version Smarty-3.1.16, created on 2014-08-28 16:40:22
         compiled from "./templates/reports.tpl" */ ?>
<?php /*%%SmartyHeaderCode:67276368553ff5b7684c855-31126025%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'e35683cbc50b45d127d4aa50723c3b88390c9f56' => 
    array (
      0 => './templates/reports.tpl',
      1 => 1409086504,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '67276368553ff5b7684c855-31126025',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.16',
  'unifunc' => 'content_53ff5b768ba237_04107938',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_53ff5b768ba237_04107938')) {function content_53ff5b768ba237_04107938($_smarty_tpl) {?><!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <title>Magazine Dashboard | Reports</title>
    <link rel="stylesheet" href="css/reports.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="css/jquery.datepicker.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="css/jquery_notification.css" type="text/css" media="screen" />
    <link type="text/css" rel="stylesheet" href="css/jquery.qtip.min.css" />
    <!--[if lt IE 9]>
    <link rel="stylesheet" href="css/ie.css" type="text/css" media="screen" />
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <!--<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>-->
    <script src="js/jquery-1.11.1.min.js"></script>
    <script src="js/hideshow.js" type="text/javascript"></script>
    <script src="js/jquery.tablesorter.js" type="text/javascript"></script>
    <script type="text/javascript" src="js/jquery.equalHeight.js"></script>
    <script type="text/javascript" src="js/reports.js"></script>
    <script type="text/javascript" src="js/jquery.datepicker.js"></script>
    <script type="text/javascript" src="js/jquery_notification_v.1.js"></script>
    <script type="text/javascript" src="js/jquery.qtip.min.js"></script>

</head>
<body>
    <?php echo $_smarty_tpl->getSubTemplate ("header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

    <!-- Begin main box -->
    <section id="main" class="column">
        <form class="reportDate" method="POST" action="javascript:void(null);">
            <h2>Cформувати звіт</h2>
            <div style="float:left">
                <label>Від:</label>
                <input type="text" name="raportDateStart" value="" class="raportDateStart"/>
            </div>
            <div style="float:right">
                <label>До:</label>
                <input type="text" name="raportDateEnd" value="" class="raportDateEnd" />
            </div>
            <input type="submit" value="Cформувати" style="clear:both; display:block; " />
        </form>
        <article class="module width_full">
            <header>
                <h3>Звіти</h3>
            </header>
            <div class="tableContainer">
                
                <?php if ($_COOKIE['level']=='0') {?>
                                
                    <table id="raportTable" class="tablesorter scrollTable" width="100%" cellspacing="0" cellpadding="0"> 
                        <thead> 
                            <tr> 
                                <th class="r1">Найменування товару</th> 
                                <th class="r2">Тип товару</th>
                                <th class="r3">Дата закупки</th> 
                                <th class="r4">Дата продажу</th> 
                                <th class="r5">Вхідна ціна</th>
                                <th class="r6">Вихідна ціна</th>
                                <th class="r7">Ціна продажу</th>
                            </tr> 
                        </thead> 
                        <tbody>
                            
                        </tbody> 
                    </table>
                <?php } else { ?>
                    
                    <table id="raportTable" class="tablesorter scrollTable" width="100%" cellspacing="0" cellpadding="0"> 
                        <thead> 
                            <tr> 
                                <th class="m1">Найменування товару</th> 
                                <th class="m2">Тип товару</th>
                                <th class="m3">Дата закупки</th> 
                                <th class="m4">Дата продажу</th> 
                                <th class="m5">Ціна продажу</th>
                            </tr> 
                        </thead> 
                        <tbody>
                            
                        </tbody> 
                    </table>
                <?php }?>
            </div>
            
            <?php if ($_COOKIE['level']=='0') {?>
                
                <div class="totalWraping">
                    <h3>Підсумки проданих товарів та витрати</h3>
                    <ul class="totalReports">
                        <li class="totalQuantityProducts">
                            <span title="Кількість проданого товару за даний період часу">Кількість проданих товарів :</span>
                            <b></b>
                        </li>
                        <li class="totalInputPrice">
                            <span title="Вхідна сума за товар">Загальна вхідна сума :</span> 
                            <b></b>
                        </li>
                        <li class="totalSalePrice">
                            <span title="Вся сума продаж за даний період часу">Загальна продажна сума :</span>
                            <b></b>
                        </li>
                        <li class="totalCostsPrice">
                            <span title="Вся сума витрат за даний період часу">Загальна сума витрат :</span>
                            <b></b>
                        </li>
                        <li class="totalDifferencePrices">
                            <span title="Різниця сум = (загальна продажна сума) мінус (загальна сума витрат)">Різниця сум : </span>
                            <b></b>
                        </li>
                        <li class="basicDifferencePrices">
                            <span title="Загальна різниця сум = (загальна продажна сумма) мінус (загальна вхідна сумма) мінус (загальна сумма витрат)">Загальна різниця сум :</span>
                            <b></b>
                        </li>
                        
                    </ul>
                </div>
                
                <div class="totalWraping">
                    <h3>Загальні підсумки не проданих товарів для поточного магазину</h3>
                    <ul class="totalNotSoldThisMagazine">
                        <li class="notSoldThisQuantity">
                            <span title="Кількість не проданих товарів на складі для поточного магазину">Кількість не проданих товарів на складі :</span>
                            <b></b>
                        </li>
                        <li class="notSoldThisInputPrice">
                            <span title="Загальна вхідна сума товарів на сладі які не продані для поточного магазину">Загальна вхідна сума :</span>
                            <b></b>
                        </li>
                        <li class="notSoldThisOutputPrice">
                            <span title="Загальна вихідна сума товарів на сладі які не продані для поточного магазину">Загальна вихідна сума :</span>
                            <b></b>
                        </li>
                        <li class="notSoldThisDifferencePrices">
                            <span title="Різниця сум = (Загальна вихідна сума) мінус (Загальна вхідна сума) для поточного магазину">Різниця сум :</span>
                            <b></b>
                        </li>
                    </ul>
                </div>
                
                <div class="totalWraping" style="border-right:none !important;">
                    <h3>Загальні підсумки не проданих товарів по всіх магазинах</h3>
                    <ul class="totalNotSoldAllMagazines">
                        <li class="notSoldAllQuantity">
                            <span title="Кількість не проданих товарів на складі зі всіх магазинів">Кількість не проданих товарів на складі :</span>
                            <b></b>
                        </li>
                        <li class="notSoldAllInputPrice">
                            <span title="Загальна вхідна сума товарів на сладі які не продані зі всіх магазинів">Загальна вхідна сума :</span>
                            <b></b>
                        </li>
                        <li class="notSoldAllOutputPrice">
                            <span title="Загальна вихідна сума товарів на сладі які не продані зі всіх магазинів">Загальна вихідна сума :</span>
                            <b></b>
                        </li>
                        <li class="notSoldAllDifferencePrices">
                            <span title="Різниця сум = (Загальна вихідна сума) мінус (Загальна вхідна сума) зі всіх магазинів">Різниця сум :</span>
                            <b></b>
                        </li>
                    </ul>
                </div>
            <?php } else { ?>
                
                <div class="totalWraping">
                    <h3>Підсумки проданих товарів та витрати</h3>
                    <ul class="totalReports">
                        <li class="totalQuantityProducts">
                            <span title="Кількість проданого товару за даний період часу">Кількість проданих товарів :</span> 
                            <b></b>
                        </li>
                        <li class="totalPrice">
                            <span title="Вся сума продаж за даний період часу">Загальна сума :</span>
                            <b></b>
                        </li>
                        <li class="totalCostsPrice">
                            <span title="Вся сума витрат за даний період часу">Загальна сума витрат:</span> 
                            <b></b>
                        </li>
                        <li class="totalDifferencePrices">
                            <span title="Різниця сум = (загальна продажна сума) мінус (загальна сума витрат)">Різниця сум :</span>
                            <b></b>
                        </li>
                        
                    </ul>
                </div>
            <?php }?>
        </article>

        

        
        <div class="clear"></div>
        <div class="spacer"></div>
    </section>
    <!-- End main box -->
</body>
</html><?php }} ?>
