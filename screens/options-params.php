<div class="options options-params">
	<div class="header">
		<div class="header__container">
			<div class="button js-to-opt-category">Назад</div>
		</div>
	</div>

	<div class="options__title _mb20">Опции:</div>

	<div class="_mb20">
		<div class="options__subtitle">Годы:</div>
		<span id="years" class="inner-link">Все</span>
	</div>

	<dialog class="modal" id="modalYears">
		<div class="options__title _mb20">Выберите годы выхода:</div>
		<div class="modal__close js-close-modal">✖</div>
		<div class="years-grid"></div>
		<div class="modal__btns">
			<div class="button js-save-years">Сохранить</div>
			<div class="button js-close-modal">Отмена</div>
		</div>
	</dialog>

	<div class="checkbox option">
		<div class="checkbox__body">
			На&nbsp;время
			<input type="checkbox" value="time">
		</div>
		<div class="tooltip">?
			<div class="tooltip-text">У вас будет 10 секунд на каждый кадр. Чем быстрее вы угадаете кадр, тем больше очков вы получите</div>
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
			Черно-белые кадры
			<input type="checkbox" value="blackwhite">
		</div>
	</div>

	<div class="checkbox option">
		<div class="checkbox__body">
			Интересные факты
			<input type="checkbox" value="facts">
		</div>
		<div class="tooltip">?
			<div class="tooltip-text">После каждого угаданного кадра вы будете получать один случайный факт об этом фильме</div>
		</div>
	</div>

	<div class="checkbox option">
		<div class="checkbox__body">
			Без вариантов ответа
			<input type="checkbox" value="directanswer">
		</div>
		<div class="tooltip">?
			<div class="tooltip-text">Вам не будут предложены варианты ответа. Ответ надо будет вводить в текстовом поле</div>
		</div>
	</div>

	<div class="checkbox option">
		<div class="checkbox__body">
			Оригинальные названия
			<input type="checkbox" value="originalname">
		</div>
		<div class="tooltip">?
			<div class="tooltip-text">Имейте в виду, что в базе есть итальянские и даже японские фильмы</div>
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
