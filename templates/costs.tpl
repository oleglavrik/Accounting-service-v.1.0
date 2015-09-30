<!doctype html>
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
    	{* Підключаємо шапку *}
        {include file = "header.tpl"}
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
                                {* Різні шапки таблиці для різних типів користувачів *}
                                {if $smarty.cookies.level == '0'} 
                                    <thead> 
                                        <tr> 
                                            <th class="r1">&nbsp;</th> 
                                            <th class="r2">Найменування</th> 
                                            <th class="r3">Дата</th>
                                            <th class="r4">Сумма</th> 
                                            <th class="r5">Дія</th>
                                        </tr> 
                                    </thead>
                                {else}
                                     <thead> 
                                        <tr> 
                                            <th class="m1">&nbsp;</th> 
                                            <th class="m2">Найменування</th> 
                                            <th class="m3">Дата</th>
                                            <th class="m4">Сумма</th> 
                                        </tr> 
                                    </thead>
                                {/if} 
                                <tbody>
                                    
                                </tbody> 
                            </table>
                        </div>
                    </div>
                </div>
                {* Модальне вікно добавлення нової витрати *}
                <div id="newCostsModal" class="reveal-modal smallDouble">
                    <h1>Добавити нову витрату</h1>
                    <form class="newCostsForm" method="post" action="{literal}javascript:void(null);{/literal}">
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
                {if $smarty.cookies.level == '0'}
                {* Модальне вікно редагування нової витрати  тільки для адміна *}
                <div id="editCostsModal" class="reveal-modal smallDouble">
                    <h1>Редагувати витрату</h1>
                    <form class="editCostsForm" method="post" action="{literal}javascript:void(null);{/literal}">
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
                {/if}
            </article>  
    		<div class="clear"></div>
        </section>
        <!-- End main box -->
    </body>
</html>