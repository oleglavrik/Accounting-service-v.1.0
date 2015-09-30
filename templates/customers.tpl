<!doctype html>
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
    	{* Підключаємо шапку *}
        {include file = "header.tpl"}
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
                                {* Різні шапки таблиці для різних типів користувачів *}
                                {if $smarty.cookies.level == '0'} 
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
                                {else}
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
                                {/if} 
                                <tbody>
                                    
                                </tbody> 
                            </table>
                        </div>
                    </div>
                </div>
                {* Модальне вікно добавлення нового клієнта *}
                <div id="newCostomersModal" class="reveal-modal smallDouble">
                    <h1>Добавити нового клієнта</h1>
                    <form class="newCostomersForm" method="post" action="{literal}javascript:void(null);{/literal}">
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
                {if $smarty.cookies.level == '0'}
                {* Модальне вікно редагування інформації про клієнта *}
                <div id="editCustomerModal" class="reveal-modal smallDouble">
                    <h1>Редагувати інформацію про клієнта</h1>
                    <form class="editCostomersForm" method="post" action="{literal}javascript:void(null);{/literal}">
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
                {/if}
            </article>  
    		<div class="clear"></div>
        </section>
        <!-- End main box -->
    </body>
</html>