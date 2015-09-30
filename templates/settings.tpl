<!doctype html>
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
	{* Підключаємо шапку *}
    {include file = "header.tpl"}
    <!-- Begin main box -->
    <section id="main" class="column">
		<section id="settingsModule">
			{*Доступ до користувачів в налаштуваннях тільки адмінам*}
			{if $smarty.cookies.level == '0'}
				{include file = "settings-admin-block.tpl"}
			{/if}	
		</section>
		<div class="clear"></div>
        <div class="spacer"></div>
    </section>
    <!-- End main box -->
</body>
	
</html>