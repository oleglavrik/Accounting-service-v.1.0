<header id="header">
	<hgroup>
		<form id="magazine" method="post" action="{literal}javascript:void(null);{/literal}">
			<select class="site_title" id='magazineSelect'>
				{foreach from=$magazineList item=item}
				   <option value='{$item.id}'>{$item.name}</option> 
				{/foreach}
			</select>    
		</form>
		<h2 class="section_title"><a href="{$current_url}index.php">Magazine Dashboard</a></h2>
	</hgroup>
</header>
<section id="secondary_bar">
	<div class="user">
		<p>
			{if $smarty.cookies.level == '0'}
				<span style="color:#FF3334" title="{$userData.userLogin} Administrator">
					{$smarty.cookies.login} - (A)
				</span>
			{else}
				<span style="color:green" title="{$userData.userLogin} Moderator">	
					{$smarty.cookies.login} - (M)
				</span>
			{/if}
		</p>
		<a class="logout_user" href="logout.php?logout=true" title="Logout">Logout</a>
	</div>
	<div class="breadcrumbs_container">
		{if $smarty.cookies.level == '0'}
		<ul class="mainMenu">
			<li><a href="{$current_url}index.php">Склад</a></li>
			<li><a href="{$current_url}costs.php">Витрати</a></li>
			<li><a href="{$current_url}reports.php">Звіти</a></li>
			<li><a href="{$current_url}customers.php">Клієнти</a></li>
			<li><a href="{$current_url}archive-sale.php">Архів продаж</a></li>
			<li><a href="{$current_url}settings.php">Налаштування</a></li>
		</ul>
		{else}
		<ul class="mainMenu">
			<li><a href="{$current_url}index.php">Склад</a></li>
			<li><a href="{$current_url}costs.php">Витрати</a></li>
			<li><a href="{$current_url}reports.php">Звіти</a></li>
			<li><a href="{$current_url}customers.php">Клієнти</a></li>
		</ul>
		{/if}
	</div>
</section>