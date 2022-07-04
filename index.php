<html lang="ru">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, user-scalable=no">
		<link rel="icon" href="/favicon.ico">
		<link rel="stylesheet" href="/dest/css/style.css?<?=date('Hdmy')?>">
		<link rel="canonical" href="https://ugadai-film.ru"/>
		<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
		<title>Угадай фильм по кадру | Бесплатная браузерная игра, тест</title>
		<meta property="og:title" content="Угадай фильм по кадру | Бесплатная браузерная игра"/>
		<meta property="og:type" content="website" />
		<meta property="og:url" content="https://ugadai-film.ru" />
		<meta property="og:description" content="Угадай фильм по кадру, мультфильмы и сериалы. Зарубежные, российские или советские. На время или без, узнавайте интересные факты. Большая база фильмов" />
		<meta name="description" content="Угадай фильм по кадру, мультфильмы и сериалы. Зарубежные, российские или советские. На время или без, узнавайте интересные факты. Большая база фильмов" />
		<meta name="keywords" content="Угадай фильм, кино, бесплатная браузерная игра, тест, играть без регистрации, онлайн, на время, сериалы, российские, советские, зарубежные, мультфильмы" />
		<meta name="yandex-verification" content="22df35eea5fe9acf" />
		<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
		<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" type="image/x-icon">
		<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" type="image/x-icon">
		<link rel="manifest" href="/site.webmanifest">
		<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
		<meta name="msapplication-TileColor" content="#da532c">
		<meta name="theme-color" content="#000000">
		<meta name="google-site-verification" content="eqxuB-7-CX_pyxgAaAI-gu1vK94yKWGrk_Ye_fcSwn0" />

		<!-- Yandex.Metrika counter -->
		<script type="text/javascript" >
		(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
		m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
		(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

		ym(87285918, "init", {
			clickmap:true,
			trackLinks:true,
			accurateTrackBounce:true,
			webvisor:true
		});
		</script>
		<noscript><div><img src="https://mc.yandex.ru/watch/87285918" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
		<!-- /Yandex.Metrika counter -->

		<!-- Yandex.RTB -->
		<script>window.yaContextCb=window.yaContextCb||[]</script>
		<script src="https://yandex.ru/ads/system/context.js" async></script>
	</head>
	<body>
		<!-- <div class="count-films">Фильмов в базе: <span></span>. База регулярно дополняется</div> -->
		<div class="fireworks-container"></div>
		<div style="display: flex; justify-content: space-between; align-items: center; max-width: 1350px; margin: 0 auto; height: 90%; overflow: hidden; padding: 0 20px;">
			<div class="ad-left">
				<!-- Yandex.RTB R-A-1480043-1 -->
				<div id="yandex_rtb_R-A-1480043-1"></div>
			</div>
			<div class="container">
				<?include('start.php');?>
				<?include('about.php');?>
				<?include('options-category.php');?>
				<?include('options-params.php');?>
				<?include('playground.php');?>
				<?include('losing.php');?>
				<?include('winning.php');?>
			</div>
			<div class="ad-right">
				<!-- Yandex.RTB R-A-1480043-2 -->
				<div id="yandex_rtb_R-A-1480043-2"></div>
			</div>
		</div>
		<div class="ad-bottom">
			<!-- Yandex.RTB R-A-1480043-3 -->
			<div id="yandex_rtb_R-A-1480043-3"></div>
		</div>
		<script src="/dest/js/vendors.js?<?=date('Hdmy')?>"></script>
		<script src="/dest/js/script.js?<?=date('Hdmy')?>"></script>

		<script src="https://yastatic.net/share2/share.js"></script>
		<script>
			function renderAds() {
				// left
				window.yaContextCb.push(()=>{
					Ya.Context.AdvManager.render({
						renderTo: 'yandex_rtb_R-A-1480043-1',
						blockId: 'R-A-1480043-1'
					})
				})
				// right
				window.yaContextCb.push(()=>{
					Ya.Context.AdvManager.render({
						renderTo: 'yandex_rtb_R-A-1480043-2',
						blockId: 'R-A-1480043-2'
					})
				})
				// bottom
				window.yaContextCb.push(()=>{
					Ya.Context.AdvManager.render({
						renderTo: 'yandex_rtb_R-A-1480043-3',
						blockId: 'R-A-1480043-3'
					})
				})

				setTimeout(function(){
					renderAds();
				}, 120000);
			}
			renderAds();
		</script>
	</body>
</html>
