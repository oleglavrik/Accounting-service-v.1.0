<!doctype html>
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
    	{* Підключаємо шапку *}
        {include file = "header.tpl"}
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
                                {* Таблиця архів продаж *}
                                {if $smarty.cookies.level == '0'} 
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
                                {/if} 
                                <tbody>
                                    
                                </tbody> 
                            </table>
                            
                        </div>
                        <div class="productsSettingsBoxArchiv">
							<form class="massRemove" method="post" action="{literal}javascript:void(null);{/literal}">
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
</html>