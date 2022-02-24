<div class="options options-params">
	<div class="header">
		<div class="header__container">
			<div class="button js-to-opt-category">Назад</div>
		</div>
	</div>

	<div class="options__title _mb20">Опции:</div>

	<div class="checkbox option">
		<div class="checkbox__body">
			На&nbsp;время
			<input type="checkbox" value="time">
		</div>
	</div>

	<div class="checkbox option">
		<div class="checkbox__body">
			Без права на&nbsp;ошибку
			<input type="checkbox" value="onelife">
		</div>
	</div>

	<div class="checkbox option">
		<div class="checkbox__body">
			Интересные факты
			<input type="checkbox" value="facts">
		</div>
	</div>

	<div class="range option">
		Сколько фильмов загадать?<br>
		<div class="_dflex _justify-content-beetwen _mb20">
			<input type="range" name="targetCount" id="inputTargetCount" value="50" min="1" max="100" oninput="outputTargetCount.value = inputTargetCount.value">
			<input type="number" inputmode="number" id="outputTargetCount" oninput="inputTargetCount.value = outputTargetCount.value">
		</div>
	</div>

	<div class="button button-w100 js-to-game">Далее</div>
</div>
