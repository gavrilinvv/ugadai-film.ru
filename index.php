<html>
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<!-- <base href="http://localhost"> -->
		<link rel="icon" href="/favicon.ico">
		<link rel="stylesheet" href="/dest/css/style.css?<?=date('Hdmy')?>">
		<title>I know film</title>
		<meta property="og:title" content="I know film | Бесплатная браузерная игра"/>
		<meta property="og:type" content="website" />
		<meta property="og:url" content="https://iknowfilm.ru" />
		<meta property="og:description" content="Угадывайте по одному кадру фильмы, мультфильмы и сериалы" />
		<meta name="keywords" content="Угадай фильм, бесплатная браузерная игра, играть без регистрации, онлайн, на время" />
		<meta name="yandex-verification" content="22df35eea5fe9acf" />
		<!-- Yandex.Metrika counter -->
		<script type="text/javascript" >
		(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
		m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
		(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

		ym(86702201, "init", {
				clickmap:true,
				trackLinks:true,
				accurateTrackBounce:true,
				webvisor:true
		});
		</script>
		<noscript><div><img src="https://mc.yandex.ru/watch/86702201" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
		<!-- /Yandex.Metrika counter -->
	</head>
	<body>
		<div class="count-films">Фильмов в базе: <span></span>. База регулярно дополняется</div>
		<div style="display: flex; justify-content: space-between; align-items: center; max-width: 1350px; margin: 0 auto; height: 90%; overflow: hidden">
			<div class="ad-left"></div>
			<div class="container">
				<?include('start.php');?>
				<?include('options.php');?>
				<?include('playground.php');?>
				<?include('losing.php');?>
				<?include('winning.php');?>
			</div>
			<div class="ad-right"></div>
		</div>
		<div class="ad-bottom"></div>
		<script src="/dest/js/vendors.js?<?=date('Hdmy')?>"></script>
		<script src="/dest/js/script.js?<?=date('Hdmy')?>"></script>
	</body>
</html>
