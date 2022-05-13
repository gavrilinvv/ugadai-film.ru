document.addEventListener('DOMContentLoaded', () => {
	var menuBlock = document.querySelector('.menu');
	var menuShot = document.querySelector('.menu__shot');
	var optionsCategoryBlock = document.querySelector('.options-category');
	var optionsParamsBlock = document.querySelector('.options-params');
	var aboutBlock = document.querySelector('.about');
	var playgroundBlock = document.querySelector('.playground');
	var losingBlock = document.querySelector('.losing');
	var winningBlock = document.querySelector('.winning');
	var correctAnswersCountBlock = document.querySelector('.winning__answers-correct span');
	var incorrectAnswersCountBlock = document.querySelector('.winning__answers-incorrect span');
	var genreCheckboxes = document.querySelectorAll('.options .genre .checkbox__body');
	var optionsCheckboxes = document.querySelectorAll('.options .option .checkbox__body');
	var optionRangeInputFilmsCount = document.querySelector('.options .option #inputTargetCount');
	var optionRangeOutputFilmsCount = document.querySelector('.options .option #outputTargetCount');

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

	var toNextQuestionBtns = document.querySelectorAll('.js-next-question');
	var countCorrectFilms = document.querySelector('.count-films span');

	var answersBlock = document.querySelector('.playground-answers');

	var movieForeignCount = document.querySelector('#movie-foreign-count');
	var movieRussianCount = document.querySelector('#movie-russian-count');
	var movieSovietCount = document.querySelector('#movie-soviet-count');
	var seriesCount = document.querySelector('#series-count');
	var seriesForeignCount = document.querySelector('#series-foreign-count');
	var seriesRussianCount = document.querySelector('#series-russian-count');
	var cartoonForeignCount = document.querySelector('#cartoon-foreign-count');
	var cartoonSovietCount = document.querySelector('#cartoon-soviet-count');

	// var cl = new cloudinary.Cloudinary({
	// 	cloud_name: "ddu8qv5kp",
	// 	secure: true,
	// });

	var selectedGenres = [];
	var passedFilms = [];
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
		facts: false
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

		countCorrectFilms.innerHTML = films.length;

		setCountOfGenres();

		menuShot.style.backgroundImage = 'url("/src/img/film' + randomIntFromInterval(1,3) + '.jpg")';

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
				countTargetFilms = getAvailableFilms().length;
				optionRangeInputFilmsCount.setAttribute('max', countTargetFilms);
				optionRangeInputFilmsCount.value = countTargetFilms;
				optionRangeOutputFilmsCount.value = countTargetFilms;

				showBlock(optionsParamsBlock);
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

		[...toGameBtns].map(btn => {
			btn.addEventListener('click', () => {
				correctAnswersCount = 0;
				showBlock(playgroundBlock);
				scoreBlock.innerHTML = 0;
				counterNoError = 0;
				answersBlock.innerHTML = '';
				factText.innerHTML = '';
				questBlock.style.display = 'block';
				factBlock.style.display = 'none';
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
				if (value == 'facts') {
					options.facts = input.checked;
				}
			})
		});
	})

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
		var blocks = [menuBlock, optionsCategoryBlock, optionsParamsBlock, playgroundBlock, losingBlock, winningBlock, aboutBlock];
		blocks.forEach(block => {
			block.style.display = 'none';
		})
		targetBlock.style.display = 'block';
	}

	function checkAnswer(id, btn) {
		var selectedAnswer = id;
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

		getQuestion()
			.then(question => {
				img.src = question.photo;

				img.onload = () => {
					if (options.needTimer) setTimer();
					playgroundBlock.classList.remove('playground__loading');
				}

				correctAnswer = question.answer; // правильный ответ на вопрос (загаданный фильм)

				question.answers.forEach(answer => {
					var btn = document.createElement('div');
					btn.classList.add('button');
					btn.innerHTML = answer.name + ' <span>(' + answer.year + ')</span>';
					btn.setAttribute('data-value', answer.id);
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
					btn.addEventListener('mouseup', () => {
						checkAnswer(btn.getAttribute('data-value'), btn);
					})
				})
			});
	}

	function hasGenre(genres, selectedGenres) {
		return genres.map(genre => {
			return selectedGenres.includes(genre);
		}).includes(true);
	}

	// получение фильмов, которые соответствуют опциям (жанрам)
	function getAvailableFilms() {
		return films.filter(film => {
			return film.genres.filter(genre => {
				return (selectedGenres).includes(genre);
			}).length !== 0
		})
	}

	// получение фильма по id в списке фактов
	function getFilmByIdIntoFacts(id) {
		return facts.find(film => {
			if (+id === film.id) {
				return film
			}
		})
	}

	async function getQuestion() {
		let availableFilms = getAvailableFilms(); // фильмы, которые подходят по опциям (жанрам)
		let conceivedFilm = {};
		let answers = []; // массив для ответов

		// если прошел все фильмы
		if ( passedFilms.length == optionRangeInputFilmsCount.value || passedFilms.length === availableFilms.length) {
			answersBlock.innerHTML = '';
			passedFilms = [];
			correctAnswersCountBlock.innerHTML = correctAnswersCount;
			incorrectAnswersCountBlock.innerHTML = incorrectAnswersCount;
			showBlock(winningBlock);
			startFireworks();
			correctAnswersCount = 0;
			incorrectAnswersCount = 0;
			return
		}

		// добавляем загаданный фильм в массив ответов
		while (answers.length < 1) {
			conceivedFilm = films[getRandomInt(films.length)]; // рандомный выбор фильма из каталога
			// let filmGenres = conceivedFilm.genres.split(', '); // получаем жанры этого фильма
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
			let film = films[getRandomInt(films.length)]; // рандомный фильм
			// let filmGenres = film.genres.split(', '); // получаем жанры этого фильма
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
			return {id: answer.id, name: answer.name, year: answer.year}
		})
		answers = randomArrayShuffle(answers); // перемешиваем массив чтобы загаданный фильм не был всегда первым вариантом

		// img.classList.add('_noopacity');
		playgroundBlock.classList.add('playground__loading');

		return await axios('/php/getFrame.php?id=' + conceivedFilm.id)
			.then(res => {
				let url = res.data;

				return {
					photo: url,
					answer: conceivedFilm.id,
					answers: answers
				}
				// return fetch(url).then(res => res.blob()).then((blob) => {
				// 	return {
				// 		photo: URL.createObjectURL(blob),
				// 		answer: conceivedFilm.id,
				// 		answers: answers
				// 	}
				// });
			})
			.catch(err => {
				console.log(err);
			})

		// return fetch(
		// 	'https://res.cloudinary.com/ddu8qv5kp/image/upload/v1634839395/' + conceivedFilm.id + '.jpg').then(res => res.blob()).then((blob) => {
		// 	return {
		// 		photo: URL.createObjectURL(blob),
		// 		answer: conceivedFilm.id,
		// 		answers: answers
		// 	}
		// });
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

})
