document.addEventListener('DOMContentLoaded', () => {
	var menuBlock = document.querySelector('.menu');
	var menuShot = document.querySelector('.menu__shot');
	var optionsCategoryBlock = document.querySelector('.options-category');
	var optionsParamsBlock = document.querySelector('.options-params');
	var aboutBlock = document.querySelector('.about');
	var playgroundBlock = document.querySelector('.playground');
	var otherGamesBlock = document.querySelector('.other-games');
	var losingBlock = document.querySelector('.losing');
	var winningBlock = document.querySelector('.winning');
	var correctAnswersCountBlock = document.querySelector('.winning__answers-correct span');
	var incorrectAnswersCountBlock = document.querySelector('.winning__answers-incorrect span');
	var genreCheckboxes = document.querySelectorAll('.options .genre .checkbox__body');
	var optionsCheckboxes = document.querySelectorAll('.options .option .checkbox__body');
	var optionRangeInputFilmsCount = document.querySelector('.options .option #inputTargetCount');
	var optionRangeOutputFilmsCount = document.querySelector('.options .option #outputTargetCount');
	var optionsYears = document.querySelector('#years');
	var modalClose = document.querySelectorAll('.js-close-modal');
	var modalYears = document.querySelector('.modal#modalYears');
	var modalYearsSave = document.querySelector('.js-save-years');
	var yearsGrid = document.querySelector('#modalYears .years-grid');

	var playgroundTimer = document.querySelector('.playground-timer');
	var notice = document.querySelector('.playground-notice');
	var scoreBlock = document.querySelector('.playground-score span');
	var img = document.querySelector('.playground-img');
	var factBlock = document.querySelector('.playground-fact');
	var factText = document.querySelector('.playground-fact__text');
	var questBlock = document.querySelector('.playground-quest');

	var toOptCategoryBtns = document.querySelectorAll('.js-to-opt-category');
	var toOptParamsBtns = document.querySelectorAll('.js-to-opt-params');
	var toStartBtns = document.querySelectorAll('.js-to-start');
	var toAboutBtns = document.querySelectorAll('.js-to-about');
	var toGameBtns = document.querySelectorAll('.js-to-game');
	var toOtherGames = document.querySelectorAll('.js-to-other-games');
	var toAcceptAnswer = document.querySelectorAll('.js-accept-answer');

	var toNextQuestionBtns = document.querySelectorAll('.js-next-question');
	var countCorrectFilms = document.querySelector('.count-films span');

	var answersBlock = document.querySelector('.playground-answers');
	var answerBlock = document.querySelector('.playground-answer');
	var answerInput = document.querySelector('.playground-answer-input');
	var answerInputSend = document.querySelector('.playground-answer-button');
	var answerSuggestions = document.querySelector('.playground-answer-suggestions');

	var movieForeignCount = document.querySelector('#movie-foreign-count');
	var movieRussianCount = document.querySelector('#movie-russian-count');
	var movieSovietCount = document.querySelector('#movie-soviet-count');
	var seriesCount = document.querySelector('#series-count');
	var seriesForeignCount = document.querySelector('#series-foreign-count');
	var seriesRussianCount = document.querySelector('#series-russian-count');
	var cartoonForeignCount = document.querySelector('#cartoon-foreign-count');
	var cartoonSovietCount = document.querySelector('#cartoon-soviet-count');

	var selectedGenres = [];
	var selectedYears = [{value: 'all', label: 'Все'}];
	var selectedYearsTemp = [{value: 'all', label: 'Все'}];
	var passedFilms = [];
	var answerInputId = null;
	var correctAnswer = null; // правильный ответ на вопрос (загаданный фильм)
	var correctAnswersCount = 0; // количество угаданных фильмов
	var incorrectAnswersCount = 0; // количество неугаданных фильмов
	var counterNoError = 0; // счетчик правильных ответов без ошибок
	var countTargetFilms = 0; // количество фильмов, которое хочет угадать игрок
	var films = [];
	var facts = [];
	var options = {
		needTimer: false,
		onelife: false,
		blackwhite: false,
		facts: false,
		directAnswer: false,
		originalName: false
	};
	var startTime = 10;
	var currentTime = 10;
	var countdown = null;
	var timer = null;

	async function getFilms() {
		return await $.getJSON("/dest/json/films.json?" + new Date().getMilliseconds(), res => {
			return res;
		});
	}

	// загружаем факты о фильмах один раз
	$.getJSON("/dest/json/facts.json?" + new Date().getMilliseconds(), res => {
		facts = res;
	});

	getFilms().then(res => {
		films = res;
		initDialogPolyfill();

		countCorrectFilms.innerHTML = films.length;

		// setCountOfGenres();

		// menuShot.style.backgroundImage = 'url("/src/img/film' + randomIntFromInterval(1,3) + '.jpg")';

		[...toOptCategoryBtns].map(btn => {
			btn.addEventListener('click', () => {
				resetTimer();
				showBlock(optionsCategoryBlock);
			})
		});

		[...toOptParamsBtns].map(btn => {
			btn.addEventListener('click', () => {
				if (!selectedGenres.length) {alert('Выберите категорию'); return;}

				// устанавливаем значения в ползунок целевое количество фильмов
				setCountFilms();

				showBlock(optionsParamsBlock);
				setYearsInGrid(sortByYears(selectedGenres));
			})
		});

		[...toAboutBtns].map(btn => {
			btn.addEventListener('click', () => {
				showBlock(aboutBlock);
			})
		});

		[...toStartBtns].map(btn => {
			btn.addEventListener('click', () => {
				showBlock(menuBlock);
			})
		});

		[...toOtherGames].map(btn => {
			btn.addEventListener('click', () => {
				showBlock(otherGamesBlock);
			})
		});

		[...toAcceptAnswer].map(btn => {
			btn.addEventListener('click', () => {
				checkAnswer(answerInputId, btn);
			})
		});

		[...modalClose].map(btn => {
			btn.addEventListener('click', () => {
				modalYears.close();
				selectedYears = selectedYears;
			})
		});

		modalYearsSave.addEventListener('click', () => {
			modalYears.close();
			saveYears();
		});

		optionsYears.addEventListener('click', () => {
			modalYears.showModal();
			setSelectedYearsInModal();
		});

		[...toGameBtns].map(btn => {
			btn.addEventListener('click', () => {
				correctAnswersCount = 0;
				showBlock(playgroundBlock);
				scoreBlock.innerHTML = 0;
				counterNoError = 0;
				passedFilms = [];
				answersBlock.innerHTML = '';
				answerInput.innerHTML = '';
				answerSuggestions.innerHTML = '';
				factText.innerHTML = '';
				questBlock.style.display = 'block';
				factBlock.style.display = 'none';

				img.classList.remove('playground-img__grayscale')
				if (options.blackwhite) img.classList.add('playground-img__grayscale');

				nextQuestion();
			})
		});

		[...toNextQuestionBtns].map(btn => {
			btn.addEventListener('click', () => {
				nextQuestion();
			})
		});

		[...genreCheckboxes].forEach(checkbox => {
			checkbox.addEventListener('click', () => {
				var input = checkbox.querySelector('input');
				var isParent = input.getAttribute('data-is-parent');
				if (isParent) {
					var childCheckboxes = checkbox.parentElement.querySelectorAll('.checkbox__body');
					childCheckboxes.forEach(childCheckbox => {
						setGenre(childCheckbox, checkbox);
					})
					return;
				}

				setGenre(checkbox);
			})
		});

		[...optionsCheckboxes].forEach(checkbox => {
			checkbox.addEventListener('click', () => {
				var input = checkbox.querySelector('input');
				var value = input.value;
				input.checked = !input.checked;
				checkbox.classList[input.checked ? 'add' : 'remove']('checkbox__checked');

				if (value == 'time') {
					options.needTimer = input.checked;
				}
				if (value == 'onelife') {
					options.onelife = input.checked;
				}
				if (value == 'blackwhite') {
					options.blackwhite = input.checked;
				}
				if (value == 'facts') {
					options.facts = input.checked;
				}
				if (value == 'directanswer') {
					options.directAnswer = input.checked;
				}
				if (value == 'originalname') {
					options.originalName = input.checked;
				}
			})
		});
	})

	function setYearsInGrid(years) {
		yearsGrid.innerHTML = '';
		optionsYears.innerHTML = 'Все';
		selectedYears = [{value: 'all', label: 'Все'}];
		setCountFilms();

		let segmentAll = createSegmentYear('Все', 'all', true);
		yearsGrid.appendChild(segmentAll);

		// добавление элементов годов в сетку
		years.forEach((films, year) => {
			let {value, label} = setGroupYears(year);

			if (!yearsGrid.querySelector('.segment-year[data-value="'+value+'"]')) {
				let segmentYear = createSegmentYear(label, value);

				yearsGrid.appendChild(segmentYear);
			}
		})

		handleYears();
	}

	// привязывание событий к выбору и удалению годов
	function handleYears() {
		let segmentYears = yearsGrid.querySelectorAll('.segment-year:not([data-value="all"])');
		let segmentAll = document.querySelector('.segment-year[data-value="all"]');

		[...segmentYears].forEach(segment => {
			segment.addEventListener('click', () => {
				let year = {
					value: segment.getAttribute('data-value'),
					label: segment.getAttribute('data-label')
				};
				removeYear(segmentAll, {value: 'all', label: 'Все'});

				if (!segment.classList.contains('segment-year-selected')) {
					selectYear(segment, year);
				} else {
					removeYear(segment, year);

					if (!selectedYearsTemp.length) {
						selectYear(segmentAll, {value: 'all', label: 'Все'});
					}
				}
			})
		})

		segmentAll.addEventListener('click', () => {
			[...segmentYears].forEach(segment => {
				let year = {
					value: segment.getAttribute('data-value'),
					label: segment.getAttribute('data-label')
				};
				removeYear(segment, year);
			})
			selectYear(segmentAll, {value: 'all', label: 'Все'});
		})

	}

	// выбор года
	function selectYear(segment, year) {
		segment.classList.add('segment-year-selected');
		selectedYearsTemp.push(year);
	}
	// удаление выбора года
	function removeYear(segment, year) {
		segment.classList.remove('segment-year-selected');
		selectedYearsTemp = selectedYearsTemp.filter(x => x.value !== year.value);
	}
	// сохранение выбранного набора годов
	function saveYears() {
		selectedYears = selectedYearsTemp;
		setCountFilms();
		optionsYears.innerHTML = selectedYears.map(years => years.label).join(', ');
	}

	// создание сегмента года
	function createSegmentYear(year, value, checked = false) {
		let segment = document.createElement('div');
		segment.classList.add('segment-year');
		if (checked) segment.classList.add('segment-year-selected');
		segment.setAttribute('data-value', value);
		segment.setAttribute('data-label', year);
		segment.innerHTML = year;

		return segment;
	}

	// установка выбранных годов в модалке
	function setSelectedYearsInModal() {
		selectedYearsTemp = selectedYears;
		// сбрасываем со всех
		[...document.querySelectorAll('.segment-year')].forEach(segment => {
			segment.classList.remove('segment-year-selected');
		})

		// отмечаем только выбранные
		selectedYears.forEach(years => {
			let segment = document.querySelector('.segment-year[data-value="' + years.value + '"]');
			segment.classList.add('segment-year-selected');
		})
	}

	function setGroupYears(year) {
		if (year < 1990) {
			return {
				value: 'before1990',
				label: 'до 1990'
			}
		}
		if (year >= 1990 && year < 2000) {
			return {
				value: '1990-2000',
				label: 'с 1990 до 2000'
			}
		}
		if (year >= 2000 && year < 2010) {
			return {
				value: '2000-2010',
				label: 'с 2000 до 2010'
			}
		}
		if (year >= 2010 && year < 2020) {
			return {
				value: '2010-2020',
				label: 'с 2010 до 2020'
			}
		}
		if (year >= 2020) {
			return {
				value: 'after2020',
				label: 'с 2020'
			}
		}
	}

	function setCountFilms() {
		countTargetFilms = getAvailableFilms().length;
		optionRangeInputFilmsCount.setAttribute('max', countTargetFilms);
		optionRangeInputFilmsCount.value = countTargetFilms;
		optionRangeOutputFilmsCount.value = countTargetFilms;
	}

	function sortByYears(genres) {
		let res = [];
		genres = genres.join('|');
		films.forEach(film => {

			let filmYear = film.year;

			// если это несколько лет (сериал), берем только первый год
			if (filmYear.includes(' - ')) {
				filmYear = filmYear.split(' - ')[0]
			}

			// если нет года, добавляем год
			if (!res[filmYear]) {
				res[filmYear] = [];
			}

			// если год есть и жанр совпадает с выбранным, добавляем фильм
			if (res[filmYear] && genres.includes(film.genres[0]) ) {
				res[filmYear].push(film.name);
			}
			// если год остался пустым, удаляем его из массива
			else if (!res[filmYear].length) {
				delete res[filmYear]
			}
		})

		return res;
	}

	function initHotKeys() {
		window.addEventListener('keyup', function keyUpFunc(e) {
			if (!['1','2','3','4'].includes(e.key)) return;

			let btn = document.querySelector('.playground-answers .button__answer[data-index="' + e.key + '"]');
			checkAnswer(btn.getAttribute('data-value'), btn);
			window.removeEventListener('keyup', keyUpFunc);
		})
	}

	function setTimer() {
		clearInterval(timer);
		clearInterval(countdown);
		currentTime = 10;
		playgroundTimer.style.opacity = '1';
		playgroundTimer.style.display = 'block';
		playgroundTimer.style.animationName = 'none';
		setTimeout(() => {playgroundTimer.style.animationName = ''}, 10);
		playgroundTimer.style.animationDuration = startTime + 's';
		countdown = setInterval(() => {
			currentTime -= 1;
		}, 1000)
		timer = setTimeout(() => {
			clearInterval(timer);
			clearInterval(countdown);
			answersBlock.innerHTML = '';
			passedFilms = [];
			showBlock(losingBlock);
		}, startTime * 1000);
	}

	function resetTimer() {
		playgroundTimer.style.opacity = '0';
		playgroundTimer.style.animationName = 'none';
		clearInterval(timer);
		clearInterval(countdown);
		currentTime = 10;
	}

	function setGenre(checkbox, parentCheckbox) {
		var input = checkbox.querySelector('input');
		var value = input.value;

		input.checked = !input.checked;
		checkbox.classList[input.checked ? 'add' : 'remove']('checkbox__checked');

		if (parentCheckbox) {
			var parentInput = parentCheckbox.querySelector('input');

			input.checked = parentInput.checked;
			checkbox.classList[parentInput.checked ? 'add' : 'remove']('checkbox__checked');
		}

		if (!selectedGenres.includes(value) && input.checked) {
			selectedGenres.push(value);
		} else {
			selectedGenres.forEach((item, i) => {
				if (item === value) {
					selectedGenres.splice(i, 1);
				}
			})
		}
	}

	function showBlock(targetBlock) {
		stopFireworks();
		var blocks = [menuBlock, optionsCategoryBlock, optionsParamsBlock, playgroundBlock, losingBlock, winningBlock, aboutBlock, otherGamesBlock];
		blocks.forEach(block => {
			block.style.display = 'none';
		})
		targetBlock.style.display = 'block';
	}

	function checkAnswer(id, btn) {
		var selectedAnswer = id;
		var correctAnswerBtn = document.querySelector('.button__answer[data-value="' + correctAnswer + '"]')
		var answerBtns = document.querySelectorAll('.button__answer');

		[...answerBtns].forEach(btn => {
			btn.style.pointerEvents = 'none';
		})
		passedFilms.push(correctAnswer);

		if (selectedAnswer == correctAnswer) {
			scoreBlock.classList.add('active');
			setTimeout(() => {
				scoreBlock.classList.remove('active');
			}, 300)

			correctAnswersCount += 1; // +1 угаданный фильм
			counterNoError += 1; // +1 угаданный фильм без ошибок
			if (options.needTimer) {
				if (currentTime > 5) {
					showNotice('Бонус за скорость +<b>' + currentTime + '</b>!');
					correctAnswersCount += currentTime; // + бонус за скорость
				}
				resetTimer();
			}
			scoreBlock.innerHTML = correctAnswersCount;
			btn.classList.add('button__answer-success');

			let film = getFilmByIdIntoFacts(id);

			if (counterNoError % 10 === 0) {
				showNotice(counterNoError + ' ответов без ошибок!');
			}

			setTimeout(() => {
				// если играем с интересными фактами
				if (film.facts && options.facts) {
					factText.innerHTML = film.facts[randomIntFromInterval(0, film.facts.length-1)];
					factBlock.style.display = 'block';
					questBlock.style.display = 'none';
				} else {
					nextQuestion();
				}
			}, 800)
		} else {
			correctAnswerBtn.classList.add('button__answer-success');
			btn.classList.add('button__answer-error');
			incorrectAnswersCount += 1; // +1 неугаданный фильм
			counterNoError = 0;
			resetTimer();

			setTimeout(() => {
				answersBlock.innerHTML = '';
				if (options.onelife) {
					scoreBlock.innerHTML = 0;
					passedFilms = [];
					showBlock(losingBlock);
				} else {
					nextQuestion();
				}
			}, 800)
		}
	}

	function showNotice(msg) {
		notice.innerHTML = msg;
		notice.classList.add('playground-notice-active');
		setTimeout(() => {
			notice.classList.remove('playground-notice-active');
		}, 800)
	}

	function nextQuestion() {
		stopFireworks();
		answersBlock.innerHTML = '';
		factText.innerHTML = '';
		questBlock.style.display = 'block';
		factBlock.style.display = 'none';
		answerInput.value = '';
		answerInputSend.classList.remove('button__answer-success');
		answerInputSend.classList.remove('button__answer-error');

		getQuestion()
			.then(question => {
				img.src = question.photo;

				img.onload = () => {
					if (options.needTimer) setTimer();
					playgroundBlock.classList.remove('playground__loading');
				}

				correctAnswer = question.answer; // правильный ответ на вопрос (загаданный фильм)

				question.answers.forEach((answer, i) => {
					var btn = document.createElement('div');
					btn.classList.add('button');
					btn.innerHTML = answer.name + '&nbsp;<span>(' + answer.year + ')</span>';
					btn.setAttribute('data-value', answer.id);
					btn.setAttribute('data-index', i+1);
					btn.classList.add('button__answer');
					if (answer.name.length + answer.year.length > 25) btn.classList.add('button__small');
					if (answer.name.length + answer.year.length > 35) btn.classList.add('button__xsmall');
					if (answer.name.length + answer.year.length > 45) btn.classList.add('button__xxsmall');
					answersBlock.appendChild(btn);

					btn.addEventListener('mousedown', () => {
						btn.style.transform = 'scale(0.9)';
					})
					btn.addEventListener('mouseout', () => {
						btn.style.transform = 'scale(1)';
					})
					btn.addEventListener('mouseup', e => {
						checkAnswer(btn.getAttribute('data-value'), btn);
					})
				})
				// initHotKeys();
			});
	}

	function getFilmsByGenres(genres) {
		return films.filter(film => {
			return genres.includes(film.genres.join(''));
		})
	}

	function hasGenre(genres, selectedGenres) {
		return genres.map(genre => {
			return selectedGenres.includes(genre);
		}).includes(true);
	}

	// получение фильмов, которые соответствуют опциям (жанрам и годам)
	function getAvailableFilms() {
		let x = films.filter(film => {
			return film.genres.filter(genre => {
				return (selectedGenres).includes(genre);
			}).length !== 0
		}).filter(filterFilmsByYear)

		return x;
	}

	function filterFilmsByYear(film) {
		if (!selectedYears[0].value.includes('all')) {
			for (let i = 0; i < selectedYears.length; i++) {
				let years = selectedYears[i];

				let filmYear = film.year;
				// если это несколько лет (сериал), берем только первый год
				if (filmYear.includes(' - ')) {
					filmYear = filmYear.split(' - ')[0]
				}

				if (years.value.includes('-')) {
					let [from, to] = years.value.split('-');
					if (+filmYear >= +from && +filmYear < +to) {
						return true;
					}
				}
				if (years.value.includes('before')) {
					let year = years.value.replace('before', '');
					if (+filmYear < +year) {
						return true;
					}
				}
				if (years.value.includes('after')) {
					let year = years.value.replace('after', '');
					if (+film.year >= +year) {
						return true;
					}
				}
			}
		} else {
			return true;
		}
	}

	// получение фильма по id в списке фактов
	function getFilmByIdIntoFacts(id) {
		return facts.find(film => {
			if (+id === film.id) {
				return film
			}
		})
	}

	function frameSuffix(value) {
		const words = ['кадр', 'кадра', 'кадров'];
		const cases = [2, 0, 1, 1, 1, 2];

		return `${value} ${words[(value % 100 > 4 && value % 100 < 20)
			? 2
			: cases[(value % 10 < 5)
				? value % 10
				: 5]]}`;
	}

	async function getQuestion() {
		let availableFilms = getAvailableFilms(); // фильмы, которые подходят по опциям (жанрам и годам)
		let conceivedFilm = {};
		let answers = []; // массив для ответов
		answersBlock.classList.add('_hidden');
		answerBlock.classList.add('_hidden');

		// если прошел все фильмы
		if ( passedFilms.length == optionRangeInputFilmsCount.value || passedFilms.length === availableFilms.length) {
			answersBlock.innerHTML = '';
			passedFilms = [];
			correctAnswersCountBlock.innerHTML = correctAnswersCount;
			incorrectAnswersCountBlock.innerHTML = incorrectAnswersCount;
			showBlock(winningBlock);
			startFireworks();

			Ya.share2('achive-share', {
				content: {
					url: 'https://ugadai-film.ru',
					title: 'Я угадал ' + frameSuffix(correctAnswersCount) + '!'
				}
			});

			correctAnswersCount = 0;
			incorrectAnswersCount = 0;

			return
		}

		// если 4 варианта ответа
		if (!options.directAnswer) {
			answersBlock.classList.remove('_hidden');

			// добавляем загаданный фильм в массив ответов
			while (answers.length < 1) {
				conceivedFilm = availableFilms[getRandomInt(availableFilms.length)]; // рандомный выбор фильма из каталога

				let filmGenres = conceivedFilm.genres; // получаем жанры этого фильма

				// добавляем фильм в массив если
				if (
					hasGenre(filmGenres, selectedGenres) && // фильм соответствует жанру
					passedFilms.includes(conceivedFilm.id) === false
				) {
					answers.push(conceivedFilm); // добавляем загаданный фильм в массив ответов
				}
			}

			// собираем 3 фильма помимо загаданного
			while (answers.length < 4) {
				let film = availableFilms[getRandomInt(availableFilms.length)]; // рандомный фильм
				let filmGenres = film.genres; // получаем жанры этого фильма

				// добавляем фильм в массив если
				if (
					!answers.includes(film) && // его еще нет в массиве фильмов
					film !== conceivedFilm && // фильм не является загаданным
					// hasGenre(filmGenres, selectedGenres) // фильм соответствует жанру
					hasGenre(filmGenres, conceivedFilm.genres) // фильм соответствует жанру загаданного фильма
				) {
					answers.push(film);
				}
			}

			answers = answers.map(answer => { // приводим ответы в массиве в нужный вид, удалив все лишнее
				return {
					id: answer.id,
					name: options.originalName ? answer.nameOrig : answer.name,
					year: answer.year
				}
			})
			answers = randomArrayShuffle(answers); // перемешиваем массив чтобы загаданный фильм не был всегда первым вариантом
		}

		// если без вариантов ответа
		if (options.directAnswer) {
			answerBlock.classList.remove('_hidden');
			let filmIsFinded  = false;

			while (!filmIsFinded) {
				conceivedFilm = availableFilms[getRandomInt(availableFilms.length)]; // рандомный выбор фильма из каталога

				if (!passedFilms.includes(conceivedFilm.id)) {
					filmIsFinded = true;
					initInputAnswer();
				}
			}
		}

		playgroundBlock.classList.add('playground__loading');

		return await axios('/php/getFrame.php?id=' + conceivedFilm.id)
			.then(res => {
				let url = res.data;

				return {
					photo: url,
					answer: conceivedFilm.id,
					answers: answers
				}
			})
			.catch(err => {
				console.log(err);
			})
	}

	function initInputAnswer() {
		let suggestions = [];
		let availableFilms = getAvailableFilms(); // массив фильмов по жанру и годам
		answerInputSend.classList.add('button-disabled')

		answerInput.addEventListener('keyup', e => {
			suggestions = [];
			answerSuggestions.innerHTML = '';

			if (e.key === 'Backspace' || e.key === 'Delete') {
				answerInputSend.classList.add('button-disabled')
			}

			let preparedFilms = availableFilms.map(film => { // приводим каждый фильм в нужный формат. нужно для верного типа названия
				return {
					id: film.id,
					name: options.originalName ? film.nameOrig : film.name,
					year: film.year
				}
			})

			if (answerInput.value.length) {
				// сортируем, фильтруем по названию и показываем первые 3 варианта
				suggestions = preparedFilms.sort((a, b) => a.name.localeCompare(b.name)).filter(film => film.name.toLowerCase().includes(answerInput.value.toLowerCase())).slice(0, 3);

				suggestions.forEach(suggestion => {
					let suggestionLine = createSuggestion(suggestion);

					answerSuggestions.appendChild(suggestionLine);
				})
			}
			answerInput.classList[suggestions.length ? 'add' : 'remove']('playground-answer-input-opened');
		})
	}

	function createSuggestion(suggestion) {
		let suggestionLine = document.createElement('div');
		suggestionLine.classList.add('playground-answer-suggestion')
		suggestionLine.setAttribute('data-name', suggestion.name);
		suggestionLine.innerText = suggestion.name + ' (' + suggestion.year + ')';

		suggestionLine.addEventListener('click', () => {
			answerInput.value = suggestionLine.getAttribute('data-name');
			answerInputId = suggestion.id;
			answerSuggestions.innerHTML = '';
			answerInputSend.classList.remove('button-disabled');
			answerInput.classList.remove('playground-answer-input-opened');
		})
		return suggestionLine;
	}

	// запуск победного фейерверка
	function startFireworks() {
		document.querySelector('.fireworks-container').innerHTML = '';
		window.fireworks = new Fireworks(document.querySelector('.fireworks-container'), {
			hue: {
				min: 0,
				max: 345
			},
			delay: {
				min: 30,
				max: 45
			},
			rocketsPoint: 50,
			speed: 1,
			acceleration: 1.2,
			friction: 0.96,
			gravity: 1,
			particles: 300,
			trace: 2,
			explosion: 6,
			autoresize: true,
			brightness: {
				min: 50,
				max: 80,
				decay: {
					min: 0.015,
					max: 0.03
				}
			},
			boundaries: {
				visible: false
			},
		})
		window.fireworks.start();
	}

	function stopFireworks() {
		if (window.fireworks) {window.fireworks.stop(); }
	}

	function getCountFilmsByGenre(genre) {
		return films.filter(film => {
			return film.genres[0] === genre;
		}).length
	}

	function setCountOfGenres() {
		movieForeignCount.innerHTML = getCountFilmsByGenre('movie-foreign');
		movieRussianCount.innerHTML = getCountFilmsByGenre('movie-russian');
		movieSovietCount.innerHTML = getCountFilmsByGenre('movie-soviet');
		seriesRussianCount.innerHTML = getCountFilmsByGenre('series-russian');
		seriesForeignCount.innerHTML = getCountFilmsByGenre('series-foreign');
		cartoonForeignCount.innerHTML = getCountFilmsByGenre('cartoon-foreign');
		cartoonSovietCount.innerHTML = getCountFilmsByGenre('cartoon-soviet');
	}

	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}

	function randomIntFromInterval(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min)
	}

	function randomArrayShuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;
		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}

	function isMobile() {
		return window.innerWidth <= 1000;
	}

	function initDialogPolyfill() {
		const dialogPolyfillURL = "https://esm.run/dialog-polyfill"

		const isBrowserNotSupportDialog = window.HTMLDialogElement === undefined

		/**
		 * Подключаем полифил к каждому dialog на странице,
		 * если в браузере нет поддержки
		**/
		if (isBrowserNotSupportDialog) {
			const dialogs = document.querySelectorAll("dialog")

			dialogs.forEach(async (dialog) => {
				const { default: polyfill } = await import(dialogPolyfillURL)
				polyfill.registerDialog(dialog)
			})
		}
	}

})
