<!DOCTYPE html>
<html lang='en'>
<head>
	<meta charset='utf-8'>
<?php
	$ie = strpos($_SERVER['HTTP_USER_AGENT'], 'compatible; MSIE') !== false ? true : false;
	if($ie === true) {
		 echo '	<meta http-equiv="X-UA-Compatible" content="chrome=1,ie=edge">'."\n";
	}
?>
	<title>YAOC, the must have tool for Alliances at War</title>
	<meta name='description' content="Yet Another Orkfia Calculator - The must have tool for Alliances at War">
	<link rel='stylesheet' href="/default_css/1.3.css">
	<link rel='stylesheet' href="./o2/style/style.css">
	<link rel="shortcut icon" href="./o2/images/favicon.ico">
<?php
	if($ie === true) {
		echo <<<STR
	<!--[if lt IE 9]>
	<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
STR;
	}
?>
	<script>
		var _gaq = _gaq || [];
		_gaq.push(['_require', 'inpage_linkid', '//www.google-analytics.com/plugins/ga/inpage_linkid.js']);
		_gaq.push(['_setAccount', 'UA-117969-1']);
		_gaq.push(['_trackPageview']);
		(function() {
			var ga = document.createElement('script');
			ga.type = 'text/javascript';
			ga.async = true;
			ga.src = 'http://www.google-analytics.com/ga.js';
			document.getElementsByTagName('head')[0].appendChild(ga);
		})();
	</script>
</head>
<body>
	<iframe seamless id='orkfia' data-src="http://aatw-<?php echo (isset($_GET['devork'])) ? 'dev' :'live';?>.rob-franken.nl"></iframe>
	<nav>
		<ul class="widgets">
			<li>
				<a id='construction_toggle' data-action='toggle' data-target='construction' title="Construction helper">
					<img src="./o2/images/bank.png" width='16' height='16' alt='construction' >
				</a>
			</li>
			<li>
				<a id='attack_toggle' data-action='toggle' data-target='attack' title="Attack calculator">
					<img src="./o2/images/balance.png" width='16' height='16' alt='attack' >
				</a>
			</li>
			<li>
				<a id='mibbit_toggle' data-action='toggle' data-target='mibbit' title="Mibbit IRC chat">
					<img src="./o2/images/balloon-white.png" width='16' height='16' alt='mibbit' >
				</a>
			</li>
			<li class='separator'>
				&nbsp;
			</li>
			<li>
				<a id='feature_request_toggle' data-action='toggle' data-target='feature_request' title="Feature requests">
					<img src="./o2/images/star.png" width='16' height='16' alt='' >
				</a>
			</li>
			<li>
				<a id='settings_toggle' data-action='toggle' data-target='settings' title="Settings">
					<img src="./o2/images/wrench.png" width='16' height='16' alt='settings' >
				</a>
			</li>
			<li class='separator'>
				&nbsp;
			</li>
			<li>
				<a id='login' title='Login' id='login'>
					Login
				</a>
			</li>
		</ul>
	</nav>
<?php require __DIR__ . '/o2/widgets/construction.php'; ?>

<?php require __DIR__ . '/o2/widgets/attack.php'; ?>

<?php require __DIR__ . '/o2/widgets/mibbit.php'; ?>

<?php require __DIR__ . '/o2/widgets/settings.php'; ?>

<?php require __DIR__ . '/o2/widgets/feature_request.php'; ?>

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js"></script>
	<script src="./o2/script/jquery-ui-1.9.1.custom.min.js"></script>
	<script src="./o2/script/base.js"></script>
	<script src="./o2/script/extra.js"></script>
	<script src="./o2/script/construction.js"></script>
	<script src="./o2/script/attack.js"></script>
</body>
</html>