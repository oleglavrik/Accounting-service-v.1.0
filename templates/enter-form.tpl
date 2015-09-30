{* конфігурація для форми входу *}
{config_load file="enter-form.conf"}
<!DOCTYPE HTML>
<head>
<title>{#title#}</title>
	<meta http-equiv="Content-type" content="text/html; charset=UTF-8" />
	<link rel="stylesheet" type="text/css" href="css/enter-form.css" />
	<script src="js/jquery-1.11.1.min.js"></script>
	<script type="text/javascript" src="js/enter-form.js"></script>
</head>
	<body>
        <section id="main">
			<section class="enterFormBox">
				{* перевірка на існування куки з помилкою авторизації *}
				{if $errorAuth}
					<div class='errorBox'>{$errorAuth}</div>
				{/if}
				<form class="enterForm" method="POST" action="login.php">
					<header>
						{#title#}
					</header>
					<section>
						<div>
							<input id="userLogin" type="text" value="Login" name="login" class="enterText"  />
						</div>
						<div>
							<input id="userPassword" type="password" value="Password" name="password" class="enterText"  />
						</div>
						<div>
							<input type="submit" value="Submit" name="submit" class="enterSub">
						</div>
					</section>
				</form>
			</section>
            <section class="footer_push"></section>
        </section>
	  <footer id="footer">
	  </footer>
	</body>
</html>