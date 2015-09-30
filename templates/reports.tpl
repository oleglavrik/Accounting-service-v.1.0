<!doctype html>
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
    {include file = "header.tpl"}
    <!-- Begin main box -->
    <section id="main" class="column">
        <form class="reportDate" method="POST" action="{literal}javascript:void(null);{/literal}">
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
                {* Вивід таблиці взалежності від рівня доступу *}
                {if $smarty.cookies.level == '0'}
                    {* Таблиця для адміна *}            
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
                {else}
                    {* Таблиця для модератора *}
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
                {/if}
            </div>
            {* Різні підсумки для різних рівнів доступу *}
            {if $smarty.cookies.level == '0'}
                {* Підсумки для адміна *}
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
                {* Підсумки товарів які не продані по поточному магазину*}
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
                {* Підсумки товарів які не продані по всіх магазинах *}
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
            {else}
                {* Підсумки для модератора *}
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
            {/if}
        </article>

        

        
        <div class="clear"></div>
        <div class="spacer"></div>
    </section>
    <!-- End main box -->
</body>
</html>