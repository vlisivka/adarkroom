/**
 * Events that only occur at specific times. Launched manually.
 **/
Events.Setpieces = {
	"outpost": { /* Friendly Outpost */
		title: 'Стоянка',
		scenes: {
			'start': {
				text: [
					'Безпечне місце для відпочинку.'
				],
				notification: 'Безпечне місце для відпочинку.',
				loot: {
					'копченина': {
						min: 5,
						max: 10,
						chance: 1
					}
				},
				onLoad: function() {
					World.useOutpost();
				},
				buttons: {
					'leave': {
						text: 'полишити',
						nextScene: 'end'
					}
				}
			}
		}
	},
	"swamp": { /* Swamp */
		title: 'Темне болото',
		scenes: {
			'start': {
				text: [
					'Почорнілі комиші пробиваються з потемнілої води.',
					'Самотня жаба сидить на купі грязюки.'
				],
				notification: 'Від болота смердить гниллю, вітру немає.',
				buttons: {
					'enter': {
						text: 'увійти',
						nextScene: {1: 'cabin'}
					},
					'leave': {
						text: 'полишити',
						nextScene: 'end'
					}
				}
			},
			'cabin': {
				text: [
					'Глибоко у болоті стоїть вкрита мохом кабіна.',
					'Старий космонавт сидить усередині.'
				],
				buttons: {
					'talk': {
						cost: {'буси': 1},
						text: 'побалакати',
						nextScene: {1: 'talk'}
					},
					'leave': {
						text: 'полишити',
						nextScene: 'end'
					}
				}
			},
			'talk': {
				text: [
					'Космонавт взяв буси і почав нудно і повільно розповідати.',
					'Він розказує як колись водив великі флотилії до нових світів.',
					'Безмежні руйнування щоб вдовольнити жагу до палива.',
					'Його місце тут, тепер це його кара.'
				],
				onLoad: function() {
					Engine.addPerk('кухар');
					World.markVisited(World.curPos[0], World.curPos[1]);
				},
				buttons: {
					'leave': {
						text: 'полишити',
						nextScene: 'end'
					}
				}
			}
		}
	},
	"cave": { /* Cave */
		title: 'Волога печера',
		scenes: {
			'start': {
				text: [
					'Вхід у печеру широкий і темний.',
					"Не можу побачити що у середині."
				],
				notification: 'Земля тут розколота, ніби від давньої рани.',
				buttons: {
					'enter': {
						text: 'зайти',
						cost: { 'смолоскип': 1 },
						nextScene: {0.3: 'a1', 0.6: 'a2', 1: 'a3'}
					},
					'leave': {
						text: 'полишити',
						nextScene: 'end'
					}
				}
			},
			
			'a1': {
				combat: true,
				enemy: 'тварюка',
				char: 'B',
				damage: 1,
				hit: 0.8,
				attackDelay: 1,
				health: 5,
				notification: 'Злякана тварюка захищає свій дім.',
				loot: {
					'шкури': {
						min: 1,
						max: 10,
						chance: 1
					},
					'ікла': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				buttons: {
					'continue': {
						text: 'продовжити',
						nextScene: {0.5: 'b1', 1: 'b2'}
					},
					'leave': {
						text: 'вибратися',
						nextScene: 'end'
					}
				}
			},
			'a2': {
				text: [
					'Печера звузилася до пари метрів.',
					"Стіни вологі і вкриті пліснявою."
				],
				buttons: {
					'continue': {
						text: 'протиснутися',
						nextScene: {0.5: 'b2', 1: 'b3'}
					},
					'leave': {
						text: 'вибратися',
						nextScene: 'end'
					}
				}
			},
			'a3': {
				text: [
				   'Залишки чиєїсь старої стоянки знаходяться просто посеред печери.',
				   'Спальники, підгнивші та почорніли, лежать під тонким шаром пилу.'
				],
				loot: {
					'копченина': {
						min: 1,
						max: 5,
						chance: 1
					},
					'смолоскип': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'шкіра': {
						min: 1,
						max: 5,
						chance: 0.3
					}
				},
				buttons: {
					'continue': {
						text: 'продовжити',
						nextScene: {0.5: 'b3', 1: 'b4'}
					},
					'leave': {
						text: 'вибратися',
						nextScene: 'end'
					}
				}
			},
			'b1': {
				text: [
				   'Тіло якогось блукальця лежить у маленькій печері.',
				   "Деякі частини тіла відсутні і час вже зробив своє.",
				   "Неможливо сказати чому він тут лежить."
				],
				loot: {
					'меч': {
						min: 1,
						max: 1,
						chance: 1
					},
					'копченина': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'смолоскип': {
						min: 1,
						max: 3,
						chance: 0.5
					}
				},
				buttons: {
					'continue': {
						text: 'продовжити',
						nextScene: { 1: 'c1' }
					},
					'leave': {
						text: 'вибратися',
						nextScene: 'end'
					}
				}
			},
			'b2': {
				text: [
				   'Смолоскип зашипів і згас у вологому повітрі.',
				   'Темнота стала непроглядна.'
				],
				notification: 'Смолоскип згас.',
				buttons: {
					'continue': {
						text: 'продовжити',
						cost: {'смолоскип': 1},
						nextScene: { 1: 'c1' }
					},
					'leave': {
						text: 'вибратися',
						nextScene: 'end'
					}
				}
			},
			'b3': {
				combat: true,
				enemy: 'тварюка',
				char: 'B',
				damage: 1,
				hit: 0.8,
				attackDelay: 1,
				health: 5,
				notification: 'Налаякана тварюка захищає свою нору.',
				loot: {
					'шкури': {
						min: 1,
						max: 3,
						chance: 1
					},
					'ікла': {
						min: 1,
						max: 2,
						chance: 0.8
					}
				},
				buttons: {
					'continue': {
						text: 'продовжити',
						nextScene: {1: 'c2'}
					},
					'leave': {
						text: 'вибратися',
						nextScene: 'end'
					}
				}
			},
			'b4': {
				combat: true,
				enemy: 'ящірка',
				char: 'L',
				damage: 3,
				hit: 0.8,
				attackDelay: 2,
				health: 6,
				notification: 'Печерна ящірка атакує.',
				loot: {
					'луска': {
						min: 1,
						max: 3,
						chance: 1
					},
					'ікла': {
						min: 1,
						max: 2,
						chance: 0.8
					}
				},
				buttons: {
					'continue': {
						text: 'продовжити',
						nextScene: {1: 'c2'}
					},
					'leave': {
						text: 'вибратися',
						nextScene: 'end'
					}
				}
			},
			'c1': {
				combat: true,
				enemy: 'тварюка',
				char: 'B',
				damage: 3,
				hit: 0.8,
				attackDelay: 2,
				health: 10,
				notification: 'Велика тварюка насувається з темноти.',
				loot: {
					'шкури': {
						min: 1,
						max: 3,
						chance: 1
					},
					'ікла': {
						min: 1,
						max: 3,
						chance: 1
					}
				},
				buttons: {
					'continue': {
						text: 'продовжити',
						nextScene: {0.5: 'end1', 1: 'end2'}
					},
					'leave': {
						text: 'вибратися',
						nextScene: 'end'
					}
				}
			},
			'c2': {
				combat: true,
				enemy: 'варан',
				char: 'L',
				damage: 4,
				hit: 0.8,
				attackDelay: 2,
				health: 10,
				notification: 'Великий варан кидається вперед.',
				loot: {
					'луска': {
						min: 1,
						max: 3,
						chance: 1
					},
					'ікла': {
						min: 1,
						max: 3,
						chance: 1
					}
				},
				buttons: {
					'continue': {
						text: 'продовжити',
						nextScene: {0.7: 'end2', 1: 'end3'}
					},
					'leave': {
						text: 'вибратися',
						nextScene: 'end'
					}
				}
			},
			'end1': {
				text: [
				   'Гніздо великої тварюки знаходиться біля задньої стіни печери.'
				],
				onLoad: function() {
					World.clearDungeon();
				},
				loot: {
					'мʼясо': {
						min: 5,
						max: 10,
						chance: 1
					},
					'шкури': {
						min: 5,
						max: 10,
						chance: 1
					},
					'луска': {
						min: 5,
						max: 10,
						chance: 1
					},
					'ікла': {
						min: 5,
						max: 10,
						chance: 1
					},
					'шмаття': {
						min: 5,
						max: 10,
						chance: 0.5
					}
				},
				buttons: {
					'leave': {
						text: 'вибратися',
						nextScene: 'end'
					}
				}
			},
			'end2': {
				text: [
				   'Чиїсь припаси приховані у виямці у стіні печери.'
				],
				loot: {
					'шмаття': {
						min: 5,
						max: 10,
						chance: 1
					},
					'шкіра': {
						min: 5,
						max: 10,
						chance: 1
					},
					'залізо': {
						min: 5,
						max: 10,
						chance: 1
					},
					'копченина': {
						min: 5,
						max: 10,
						chance: 1
					},
					'сталь': {
						min: 5,
						max: 10,
						chance: 0.5
					},
					'болас': {
						min: 1,
						max: 3,
						chance: 0.3
					}
				},
				onLoad: function() {
					World.clearDungeon();
				},
				buttons: {
					'leave': {
						text: 'вибратися',
						nextScene: 'end'
					}
				}
			},
			'end3': {
				text: [
				   'Старий ящик накритий каменем і припорошений дустом.'
				],
				loot: {
					'шабля': {
						min: 1,
						max: 1,
						chance: 1
					},
					'болас': {
						min: 1,
						max: 3,
						chance: 0.5
					}
				},
				onLoad: function() {
					World.clearDungeon();
				},
				buttons: {
					'leave': {
						text: 'вибратися',
						nextScene: 'end'
					}
				}
			}
		}
	},
	"town": { /* Town */
		title: 'Пустельне містечко',
		scenes: {
			'start': {
				text: [
					'Невисоке передмістя лежиит попереду, пусті будинки дивляться порожніми віконницями.',
					"Розбиті ліхтарі ржавіють вздовж вулиць. Ніщо не освітлює ці місця."
				],
				notification: "Містечко лежить покинуте, його жителі давно вже мертві.",
				buttons: {
					'enter': {
						text: 'розвідати',
						nextScene: {0.5: 'a1', 1: 'a2'}
					},
					'leave': {
						text: 'полишити',
						nextScene: 'end'
					}
				}
			},
			
			'a1': {
				text: [
					"Вцілілі вікна школи покриті кіптявою.",
					'Вхідні двері вічно риплять від поштовхів вітру.'
				],
				buttons: {
					'enter': {
						text: 'увійти',
						nextScene: {0.5: 'b1', 1: 'b2'},
						cost: {'смолоскип': 1}
					},
					'leave': {
						text: 'піти з містечка',
						nextScene: 'end'
					}
				}
			},
			'a2': {
				combat: true,
				enemy: 'головоріз',
				char: 'T',
				damage: 4,
				hit: 0.8,
				attackDelay: 2,
				health: 30,
				loot: {
					'шмаття': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'шкіра': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'копченина': {
						min: 1,
						max: 5,
						chance: 0.5
					}
				},
				notification: 'Пастка на вулиці.',
				buttons: {
					'continue': {
						text: 'продовжити',
						nextScene: {0.5: 'b3', 1: 'b4'}
					},
					'leave': {
						text: 'піти з містечка',
						nextScene: 'end'
					}
				}
			},
			'b1': {
				text: [
				   'Невеличкі припаси заховані у поіржавілій шафці.'
				],
				loot: {
					'копченина': {
						min: 1,
						max: 5,
						chance: 1
					},
					'смолоскип': {
						min: 1,
						max: 3,
						chance: 0.8
					},
					'набої': {
						min: 1,
						max: 5,
						chance: 0.3
					}
				},
				buttons: {
					'continue': {
						text: 'продовжити',
						nextScene: {0.5: 'c1', 1: 'c2'}
					},
					'leave': {
						text: 'піти з містечка',
						nextScene: 'end'
					}
				}
			},
			'b2': {
				combat: true,
				enemy: 'сміттяр',
				char: 'S',
				damage: 4,
				hit: 0.8,
				attackDelay: 2,
				health: 30,
				loot: {
					'шмаття': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'шкіра': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'копченина': {
						min: 1,
						max: 5,
						chance: 0.5
					}
				},
				notification: 'Сміттяр чекав просто за дверима.',
				buttons: {
					'continue': {
						text: 'продовжити',
						nextScene: {0.5: 'c2', 1: 'c3'}
					},
					'leave': {
						text: 'піти з містечка',
						nextScene: 'end'
					}
				}
			},
			'b3': {
				combat: true,
				enemy: 'тварюка',
				char: 'B',
				damage: 3,
				hit: 0.8,
				attackDelay: 1,
				health: 25,
				loot: {
					'ікла': {
						min: 1,
						max: 5,
						chance: 1
					},
					'шкури': {
						min: 5,
						max: 10,
						chance: 1
					}
				},
				notification: 'Якась тварюка стоїть самотня у здичавілому парку.',
				buttons: {
					'continue': {
						text: 'продовжити',
						nextScene: {0.5: 'c4', 1: 'c5'}
					},
					'leave': {
						text: 'піти з містечка',
						nextScene: 'end'
					}
				}
			},
			'b4': {
				text: [
				   'Залишки розгромленого каравану розкидані вздовж вулиці.',
				   "Більшість припасів розграбована сміттярями, але трохи ще лишилося."
				],
				loot: {
					'копченина': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'смолоскип': {
						min: 1,
						max: 3,
						chance: 0.5
					},
					'набої': {
						min: 1,
						max: 5,
						chance: 0.3
					}
				},
				buttons: {
					'continue': {	
						text: 'продовжити',
						nextScene: {0.5: 'c5', 1: 'c6' }
					},
					'leave': {
						text: 'піти з містечка',
						nextScene: 'end'
					}
				}
			},
			'c1': {
				combat: true,
				enemy: 'головоріз',
				char: 'T',
				damage: 4,
				hit: 0.8,
				attackDelay: 2,
				health: 30,
				loot: {
					'шмаття': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'шкіра': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'копченина': {
						min: 1,
						max: 5,
						chance: 0.5
					}
				},
				notification: 'Розмальований головоріз вийшов з тіні.',
				buttons: {
					'continue': {
						text: 'продовжити',
						nextScene: {1: 'd1'}
					},
					'leave': {
						text: 'піти з містечка',
						nextScene: 'end'
					}
				}
			},
			'c2': {
				combat: true,
				enemy: 'тварюка',
				char: 'B',
				damage: 3,
				hit: 0.8,
				attackDelay: 1,
				health: 25,
				loot: {
					'ікла': {
						min: 1,
						max: 5,
						chance: 1
					},
					'шкури': {
						min: 5,
						max: 10,
						chance: 1
					}
				},
				notification: 'Якась тварюка виплигнула з розгромленої школи.',
				buttons: {
					'continue': {
						text: 'продовжити',
						nextScene: {1: 'd1'}
					},
					'leave': {
						text: 'піти з містечка',
						nextScene: 'end'
					}
				}
			},
			'c3': {
				text: [
				   'Чиїсь кроки чути через великі двері школи.',
				   'Смолоскип згасає посеред вестибулю.',
				   'Кроки зупиняються.'
				],
				buttons: {
					'continue': {
						text: 'увійти',
						nextScene: {1: 'd1'}
					},
					'leave': {
						text: 'піти з містечка',
						nextScene: 'end'
					}
				}
			},
			'c4': {
				combat: true,
				enemy: 'тварюка',
				char: 'B',
				damage: 4,
				hit: 0.8,
				attackDelay: 1,
				health: 25,
				loot: {
					'ікла': {
						min: 1,
						max: 5,
						chance: 1
					},
					'шкури': {
						min: 5,
						max: 10,
						chance: 1
					}
				},
				notification: 'another тварюка, draw by the noise, leaps out of a copse of trees.',
				buttons: {
					'continue': {
						text: 'продовжити',
						nextScene: {1: 'd2'}
					},
					'leave': {
						text: 'піти з містечка',
						nextScene: 'end'
					}
				}
			},
			'c5': {
				text: [
				   "something's causing a commotion a ways down the road.",
				   "a fight, maybe."
				],
				buttons: {
					'continue': {
						text: 'продовжити',
						nextScene: {1: 'd2'}
					},
					'leave': {
						text: 'піти з містечка',
						nextScene: 'end'
					}
				}
			},
			'c6': {
				text: [
				   'a small basket of food is hidden under a park bench, with a note attached.',
				   "can't read the words."
				],
				loot: {
					'копченина': {
						min: 1,
						max: 5,
						chance: 1
					}
				},
				buttons: {
					'continue': {
						text: 'продовжити',
						nextScene: {1: 'd2'}
					},
					'leave': {
						text: 'піти з містечка',
						nextScene: 'end'
					}
				}
			},
			'd1': {
				combat: true,
				enemy: 'сміттяр',
				char: 'S',
				damage: 5,
				hit: 0.8,
				attackDelay: 2,
				health: 30,
				loot: {
					'копченина': {
						min: 1,
						max: 5,
						chance: 1
					},
					'шкіра': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'шабля': {
						min: 1,
						max: 1,
						chance: 0.5
					}
				},
				notification: 'Зляканий сміттяр з криком вилітає з дверей.',
				buttons: {
					'continue': {
						text: 'продовжити',
						nextScene: {0.5: 'end1', 1: 'end2'}
					},
					'leave': {
						text: 'піти з містечка',
						nextScene: 'end'
					}
				}
			},
			'd2': {
				combat: true,
				enemy: 'часовий',
				char: 'V',
				damage: 6,
				hit: 0.8,
				attackDelay: 2,
				health: 30,
				loot: {
					'копченина': {
						min: 1,
						max: 5,
						chance: 1
					},
					'шкіра': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'шабля': {
						min: 1,
						max: 1,
						chance: 0.5
					}
				},
				notification: "a man stands over a dead wanderer. notices he's not alone.",
				buttons: {
					'continue': {
						text: 'продовжити',
						nextScene: {0.5: 'end3', 1: 'end4'}
					},
					'leave': {
						text: 'піти з містечка',
						nextScene: 'end'
					}
				}
			},
			'end1': {
				text: [
				   'сміттяр had a small camp in the school.',
				   'collected scraps spread across the floor like they fell from heaven.'
				],
				onLoad: function() {
					World.clearDungeon();
				},
				loot: {
					'шабля': {
						min: 1,
						max: 1,
						chance: 1
					},
					'сталь': {
						min: 5,
						max: 10,
						chance: 1
					},
					'копченина': {
						min: 5,
						max: 10,
						chance: 1
					},
					'болас': {
						min: 1,
						max: 5,
						chance: 0.5
					}
				},
				buttons: {
					'leave': {
						text: 'піти з містечка',
						nextScene: 'end'
					}
				}
			},
			'end2': {
				text: [
				   "сміттяр'd been looking for supplies in here, it seems.",
				   "a shame to let what he'd found go to waste."
				],
				onLoad: function() {
					World.clearDungeon();
				},
				loot: {
					'вугілля': {
						min: 5,
						max: 10,
						chance: 1
					},
					'копченина': {
						min: 5,
						max: 10,
						chance: 1
					},
					'шкіра': {
						min: 5,
						max: 10,
						chance: 1
					}
				},
				buttons: {
					'leave': {
						text: 'піти з містечка',
						nextScene: 'end'
					}
				}
			},
			'end3': {
				text: [
				   "beneath the wanderer's rags, clutched in one of its many hands, a glint of steel.",
				   "worth killing for, it seems."
				],
				onLoad: function() {
					World.clearDungeon();
				},
				loot: {
					'рушниця': {
						min: 1,
						max: 1,
						chance: 1
					},
					'набої': {
						min: 1,
						max: 5,
						chance: 1
					}
				},
				buttons: {
					'leave': {
						text: 'піти з містечка',
						nextScene: 'end'
					}
				}
			},
			'end4': {
				text: [
				   "eye for an eye seems fair.",
				   "always worked before, at least.",
				   "picking the bones finds some useful trinkets."
				],
				onLoad: function() {
					World.clearDungeon();
				},
				loot: {
					'копченина': {
						min: 5,
						max: 10,
						chance: 1
					},
					'залізо': {
						min: 5,
						max: 10,
						chance: 1
					},
					'смолоскип': {
						min: 1,
						max: 5,
						chance: 1
					},
					'болас': {
						min: 1,
						max: 5,
						chance: 0.5
					}
				},
				buttons: {
					'leave': {
						text: 'піти з містечка',
						nextScene: 'end'
					}
				}
			}
		}
	},
	"city": { /* City */
		title: 'Зруйноване місто',
		scenes: {
			'start': {
				text: [
					'a battered highway sign stands guard at the entrance to this once-great city.',
					"the towers that haven't crumbled jut from the landscape like the ribcage of some ancient тварюка.",
					'might be things worth having still inside.'
				],
				notification: "the towers of a decaying city dominate the skyline",
				buttons: {
					'enter': {
						text: 'розвідати',
						nextScene: {0.4: 'a1', 0.8: 'a2', 1: 'a3'}
					},
					'leave': {
						text: 'полишити',
						nextScene: 'end'
					}
				}
			},
			'a1': {
				text:[
					'the streets are empty.',
					'the air is filled with dust, driven relentlessly by the hard winds.'
				],
				buttons: {
					'continue': {
						text: 'продовжити',
						nextScene: {0.5: 'b1', 1: 'b2'}
					},
					'leave': {
						text: 'піти з міста',
						nextScene: 'end'
					}
				}
			},
			'a2': {
				text:[
					'orange traffic cones are set across the street, faded and cracked.',
					'lights flash through the alleys between buildings.'
				],
				buttons: {
					'continue': {
						text: 'продовжити',
						nextScene: {0.5: 'b3', 1: 'b4'}
					},
					'leave': {
						text: 'піти з міста',
						nextScene: 'end'
					}
				}
			},
			'a3': {
				text: [
				   'a large shanty town sprawls across the streets.',
				   'faces, darkened by soot and blood, stare out from crooked huts.',
				],
				buttons: {
					'continue': {	
						text: 'продовжити',
						nextScene: {0.5: 'b5', 1: 'b6'}
					},
					'leave': {
						text: 'піти з міста',
						nextScene: 'end'
					}
				}
			},
			'b1': {
				text: [
				   'the old tower seems mostly intact.',
				   'the shell of a burned out car blocks the entrance.',
				   'most of the windows at ground level are busted anyway.'
				],
				buttons: {
					'enter': {	
						text: 'увійти',
						nextScene: {0.5: 'c1', 1: 'c2'}
					},
					'leave': {
						text: 'піти з міста',
						nextScene: 'end'
					}
				}
			},
			'b2': {
				combat: true,
				notification: 'a huge lizard scrambles up out of the darkness of an old metro station.',
				enemy: 'варан',
				char: 'L',
				damage: 5,
				hit: 0.8,
				attackDelay: 2,
				health: 20,
				loot: {
					'луска': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'ікла': {
						min: 5,
						max: 10,
						chance: 0.5
					},
					'мʼясо': {
						min: 5,
						max: 10,
						chance: 0.8
					}
				},
				buttons: {
					'descend': {	
						text: 'спуститися',
						nextScene: {0.5: 'c2', 1: 'c3'}
					},
					'leave': {
						text: 'піти з міста',
						nextScene: 'end'
					}
				}
			},
			'b3': {
				notification: 'the shot echoes in the empty street.',
				combat: true,
				enemy: 'снайпер',
				char: 'S',
				damage: 15,
				hit: 0.8,
				attackDelay: 4,
				health: 30,
				ranged: true,
				loot: {
					'копченина': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'набої': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'рушниця': {
						min: 1,
						max: 1,
						chance: 0.2
					}
				},
				buttons: {
					'continue': {	
						text: 'продовжити',
						nextScene: {0.5: 'c4', 1: 'c5'}
					},
					'leave': {
						text: 'піти з міста',
						nextScene: 'end'
					}
				}
			},
			'b4': {
				notification: 'the солдат steps out from between the buildings, rifle raised.',
				combat: true,
				enemy: 'солдат',
				ranged: true,
				char: 'D',
				damage: 8,
				hit: 0.8,
				attackDelay: 2,
				health: 50,
				loot: {
					'копченина': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'набої': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'рушниця': {
						min: 1,
						max: 1,
						chance: 0.2
					}
				},
				buttons: {
					'continue': {	
						text: 'продовжити',
						nextScene: {0.5: 'c5', 1: 'c6'}
					},
					'leave': {
						text: 'піти з міста',
						nextScene: 'end'
					}
				}
			},
			'b5': {
				notification: 'a frail man stands defiantly, blocking the path.',
				combat: true,
				enemy: 'хворий',
				char: 'M',
				damage: 1,
				hit: 0.8,
				attackDelay: 2,
				health: 10,
				loot: {
					'копченина': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'шмаття': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'шкіра': {
						min: 1,
						max: 1,
						chance: 0.2
					}
				},
				buttons: {
					'continue': {
						text: 'продовжити',
						nextScene: {0.5: 'c7', 1: 'c8'}
					},
					'leave': {
						text: 'піти з міста',
						nextScene: 'end'
					}
				}
			},
			'b6': {
				text: [
				   'nothing but downcast eyes.',
				   'the people here were broken a long time ago.'
				],
				buttons: {
					'continue': {
						text: 'продовжити',
						nextScene: {0.5: 'c8', 1: 'c9'}
					},
					'leave': {
						text: 'піти з міста',
						nextScene: 'end'
					}
				}
			},
			'c1': {
				notification: 'a головоріз is waiting on the other side of the wall.',
				combat: true,
				enemy: 'головоріз',
				char: 'T',
				damage: 3,
				hit: 0.8,
				attackDelay: 2,
				health: 30,
				loot: {
					'шабля': {
						min: 1,
						max: 1,
						chance: 0.5
					},
					'копченина': {
						min: 1,
						max: 3,
						chance: 0.5
					},
					'шмаття': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				buttons: {
					'continue': {	
						text: 'продовжити',
						nextScene: {0.5: 'd1', 1: 'd2'}
					},
					'leave': {
						text: 'піти з міста',
						nextScene: 'end'
					}
				}
			},
			
			'c2': {
				notification: 'a snarling тварюка jumps out from behind a car.',
				combat: true,
				enemy: 'тварюка',
				char: 'B',
				damage: 2,
				hit: 0.8,
				attackDelay: 1,
				health: 30,
				loot: {
					'мʼясо': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'шкури': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'ікла': {
						min: 1,
						max: 5,
						chance: 0.5
					}
				},
				buttons: {
					'continue': {
						text: 'продовжити',
						nextScene: {1: 'd2'}
					},
					'leave': {
						text: 'піти з міста',
						nextScene: 'end'
					}
				}
			},
			
			'c3': {
				text: [
				   'street above the subway platform is blown away.',
				   'lets some light down into the dusty haze.',
				   'a sound comes from the tunnel, just ahead.'
				],
				buttons: {
					'enter': {
						text: 'дослідити',
						cost: { 'смолоскип': 1 },
						nextScene: {0.5: 'd2', 1: 'd3'}
					},
					'leave': {
						text: 'піти з міста',
						nextScene: 'end'
					}
				}
			},
			
			'c4': {
				text: [
				   'looks like a camp of sorts up ahead.',
				   'rusted chainlink is pulled across an alleyway.',
				   'fires burn in the courtyard beyond.'
				],
				buttons: {
					'enter': {
						text: 'продовжити',
						nextScene: {0.5: 'd4', 1: 'd5'}
					},
					'leave': {
						text: 'піти з міста',
						nextScene: 'end'
					}
				}
			},
			
			'c5': {
				text: [
				   'more voices can be heard ahead.',
				   'they must be here for a reason.'
				],
				buttons: {
					'enter': {
						text: 'продовжити',
						nextScene: {1: 'd5'}
					},
					'leave': {
						text: 'піти з міста',
						nextScene: 'end'
					}
				}
			},
			
			'c6': {
				text: [
				   'the sound of gunfire carries on the wind.',
				   'the street ahead glows with firelight.'
				],
				buttons: {
					'enter': {
						text: 'продовжити',
						nextScene: {0.5: 'd5', 1: 'd6'}
					},
					'leave': {
						text: 'піти з міста',
						nextScene: 'end'
					}
				}
			},
			
			'c7': {
				text: [
				   'more squatters are crowding around now.',
				   'someone throws a stone.'
				],
				buttons: {
					'enter': {
						text: 'продовжити',
						nextScene: {0.5: 'd7', 1: 'd8'}
					},
					'leave': {
						text: 'піти з міста',
						nextScene: 'end'
					}
				}
			},
			
			'c8': {
				text: [
					'an improvised shop is set up on the sidewalk.',
					'the owner stands by, stoic.'
				],
				loot: {
					'шабля': {
						min: 1,
						max: 1,
						chance: 0.8
					},
					'рушниця': {
						min: 1,
						max: 1,
						chance: 0.5
					},
					'набої': {
						min: 1,
						max: 8,
						chance: 0.25
					},
					'космічний сплав': {
						min: 1,
						max: 1,
						chance: 0.01
					}
				},
				buttons: {
					'enter': {
						text: 'продовжити',
						nextScene: {1: 'd8'}
					},
					'leave': {
						text: 'піти з міста',
						nextScene: 'end'
					}
				}
			},
			
			'c9': {
				text: [
				   'strips of meat hang drying by the side of the street.',
				   'the people back away, avoiding eye contact.'
				],
				loot: {
					'копченина': {
						min: 5,
						max: 10,
						chance: 1
					}
				},
				buttons: {
					'enter': {
						text: 'продовжити',
						nextScene: {0.5: 'd8', 1: 'd9'}
					},
					'leave': {
						text: 'піти з міста',
						nextScene: 'end'
					}
				}
			},
			
			'd1': {
				notification: 'a large bird nests at the top of the stairs.',
				combat: true,
				enemy: 'птах',
				char: 'B',
				damage: 5,
				hit: 0.7,
				attackDelay: 1,
				health: 45,
				loot: {
					'мʼясо': {
						min: 5,
						max: 10,
						chance: 0.8
					}
				},
				buttons: {
					'continue': {
						text: 'продовжити',
						nextScene: {0.5: 'end1', 1: 'end2'}
					},
					'leave': {
						text: 'піти з міста',
						nextScene: 'end'
					}
				}
			},
			
			'd2': {
				text: [
				   "the debris is denser here.",
				   "maybe some useful stuff in the rubble."
				],
				loot: {
					'набої': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'сталь': {
						min: 1,
						max: 10,
						chance: 0.8
					},
					'космічний сплав': {
						min: 1,
						max: 1,
						chance: 0.01
					},
					'шмаття': {
						min: 1,
						max: 10,
						chance: 1
					}
				},
				buttons: {
					'continue': {	
						text: 'продовжити',
						nextScene: {1: 'end2'}
					},
					'leave': {
						text: 'піти з міста',
						nextScene: 'end'
					}
				}
			},
			
			'd3': {
				notification: 'Зграя пацюків біжить по тунелю.',
				combat: true,
				enemy: 'щурі',
				plural: true,
				char: 'RRR',
				damage: 1,
				hit: 0.8,
				attackDelay: 0.25,
				health: 60,
				loot: {
					'шкури': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'ікла': {
						min: 5,
						max: 10,
						chance: 0.5
					}
				},
				buttons: {
					'continue': {	
						text: 'продовжити',
						nextScene: {0.5: 'end2', 1: 'end3'}
					},
					'leave': {
						text: 'піти з міста',
						nextScene: 'end'
					}
				}
			},
			
			'd4': {
				notification: 'Плечистий солдат атакує, вимахуючи штиком.',
				combat: true,
				enemy: 'ветеран',
				char: 'V',
				damage: 3,
				hit: 0.8,
				attackDelay: 2,
				health: 45,
				loot: {
					'штик': {
						min: 1,
						max: 1,
						chance: 0.5
					},
					'копченина': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				buttons: {
					'continue': {
						text: 'продовжити',
						nextScene: {0.5: 'end4', 1: 'end5'}
					},
					'leave': {
						text: 'піти з міста',
						nextScene: 'end'
					}
				}
			},
			
			'd5': {
				notification: 'Інший солдат відкриває вогонь.',
				combat: true,
				enemy: 'солдат',
				ranged: true,
				char: 'D',
				damage: 8,
				hit: 0.8,
				attackDelay: 2,
				health: 50,
				loot: {
					'копченина': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'набої': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'рушниця': {
						min: 1,
						max: 1,
						chance: 0.2
					}
				},
				buttons: {
				'continue': {	
						text: 'продовжити',
						nextScene: {1: 'end5'}
					},
					'leave': {
						text: 'піти з міста',
						nextScene: 'end'
					}
				}
			},
			
			'd6': {
				notification: 'Cолдат у маскхалаті завертає за кут, зброя напоготові.',
				combat: true,
				enemy: 'спецназ',
				char: 'C',
				ranged: true,
				damage: 3,
				hit: 0.9,
				attackDelay: 2,
				health: 55,
				loot: {
					'рушниця': {
						min: 1,
						max: 1,
						chance: 0.5
					},
					'набої': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'копченина': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				buttons: {
					'continue': {
						text: 'продовжити',
						nextScene: {0.5: 'end5', 1: 'end6'}
					},
					'leave': {
						text: 'піти з міста',
						nextScene: 'end'
					}
				}
			},
			
			'd7': {
				notification: 'Натовп гнівно насувається.',
				combat: true,
				enemy: 'жебраки',
				plural: true,
				char: 'SSS',
				damage: 2,
				hit: 0.7,
				attackDelay: 0.5,
				health: 40,
				loot: {
					'шмаття': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'ікла': {
						min: 1,
						max: 5,
						chance: 0.5
					}
				},
				buttons: {
					'continue': {
						text: 'продовжити',
						nextScene: {0.5: 'end7', 1: 'end8'}
					},
					'leave': {
						text: 'піти з міста',
						nextScene: 'end'
					}
				}
			},
			
			'd8': {
				notification: 'a підліток lashes out with a tree branch.',
				combat: true,
				enemy: 'підліток',
				char: 'Y',
				damage: 2,
				hit: 0.7,
				attackDelay: 1,
				health: 45,
				loot: {
					'шмаття': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'ікла': {
						min: 1,
						max: 5,
						chance: 0.5
					}
				},
				buttons: {
					'continue': {
						text: 'продовжити',
						nextScene: {1: 'end8'}
					},
					'leave': {
						text: 'піти з міста',
						nextScene: 'end'
					}
				}
			},
			
			'd9': {
				notification: 'Жебрак стоїть впевнено у дверях маленької хатинки.',
				combat: true,
				enemy: 'жебрак',
				char: 'S',
				damage: 3,
				hit: 0.8,
				attackDelay: 2,
				health: 20,
				loot: {
					'шмаття': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'ікла': {
						min: 1,
						max: 5,
						chance: 0.5
					}
				},
				buttons: {
					'continue': {
						text: 'продовжити',
						nextScene: {0.5: 'end8', 1: 'end9'}
					},
					'leave': {
						text: 'піти з міста',
						nextScene: 'end'
					}
				}
			},
		
			'end1': {
				text: [
				   'bird must have liked shiney things.',
				   'some good stuff woven into its nest.'
				],
				onLoad: function() {
					World.clearDungeon();
					State.cityCleared = true;
				},
				loot: {
					'набої': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'болас': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'космічний сплав': {
						min: 1,
						max: 1,
						chance: 0.5
					}
				},
				buttons: {
					'leave': {
						text: 'піти з міста',
						nextScene: 'end'
					}
				}
			},
			
			'end2': {
				text: [
				   'not much here.',
				   'сміттярі much have gotten to this place already.'
				],
				onLoad: function() {
					World.clearDungeon();
					State.cityCleared = true;
				},
				loot: {
					'смолоскип': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'копченина': {
						min: 1,
						max: 5,
						chance: 0.5
					}
				},
				buttons: {
					'leave': {
						text: 'піти з міста',
						nextScene: 'end'
					}
				}
			},
			
			'end3': {
				text: [
				   'the tunnel opens up at another platform.',
				   'the walls are scorched from an old battle.',
				   'bodies and supplies from both sides litter the ground.'
				],
				onLoad: function() {
					World.clearDungeon();
					State.cityCleared = true;
				},
				loot: {
					'рушниця': {
						min: 1,
						max: 1,
						chance: 0.8
					},
					'набої': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'лазерна гвинтівка': {
						min: 1,
						max: 1,
						chance: 0.3
					},
					'батарейки': {
						min: 1,
						max: 5,
						chance: 0.3
					},
					'космічний сплав': {
						min: 1,
						max: 1,
						chance: 0.3
					}
				},
				buttons: {
					'leave': {
						text: 'піти з міста',
						nextScene: 'end'
					}
				}
			},
			
			
			'end4': {
				text: [
				   'the small military outpost is well supplied.',
				   'arms and munitions, relics from the war, are neatly arranged on the store-room floor.',
				   'just as deadly now as they were then.'
				],
				onLoad: function() {
					World.clearDungeon();
					State.cityCleared = true;
				},
				loot: {
					'рушниця': {
						min: 1,
						max: 1,
						chance: 1
					},
					'набої': {
						min: 1,
						max: 10,
						chance: 1
					},
					'граната': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				buttons: {
					'leave': {
						text: 'піти з міста',
						nextScene: 'end'
					}
				}
			},
			
			'end5': {
				text: [
				   'searching the bodies yields a few supplies.',
				   'more солдатs will be on their way.',
				   'time to move on.'
				],
				onLoad: function() {
					World.clearDungeon();
					State.cityCleared = true;
				},
				loot: {
					'рушниця': {
						min: 1,
						max: 1,
						chance: 1
					},
					'набої': {
						min: 1,
						max: 10,
						chance: 1
					},
					'копченина': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				buttons: {
					'leave': {
						text: 'піти з міста',
						nextScene: 'end'
					}
				}
			},
			
			'end6': {
				text: [
				   'the small settlement has clearly been burning a while.',
				   'the bodies of the wanderers that lived here are still visible in the flames.',
				   "still time to rescue a few supplies."
				],
				onLoad: function() {
					World.clearDungeon();
					State.cityCleared = true;
				},
				loot: {
					'лазерна гвинтівка': {
						min: 1,
						max: 1,
						chance: 0.5
					},
					'батарейки': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'копченина': {
						min: 1,
						max: 10,
						chance: 1
					}
				},
				buttons: {
					'leave': {
						text: 'піти з міста',
						nextScene: 'end'
					}
				}
			},
			
			
			'end7': {
				text: [
				   'the remaining settlers flee from the violence, their belongings forgotten.',
				   "there's not much, but some useful things can still be found."
				],
				onLoad: function() {
					World.clearDungeon();
					State.cityCleared = true;
				},
				loot: {
					'шабля': {
						min: 1,
						max: 1,
						chance: 0.8
					},
					'батарейки': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'копченина': {
						min: 1,
						max: 10,
						chance: 1
					}
				},
				buttons: {
					'leave': {
						text: 'піти з міста',
						nextScene: 'end'
					}
				}
			},
			
			'end8': {
				text: [
				   'the young settler was carrying a canvas sack.',
				   "it contains travelling gear, and a few trinkets.",
				   "there's nothing else here."
				],
				onLoad: function() {
					World.clearDungeon();
					State.cityCleared = true;
				},
				loot: {
					'шабля': {
						min: 1,
						max: 1,
						chance: 0.8
					},
					'болас': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'копченина': {
						min: 1,
						max: 10,
						chance: 1
					}
				},
				buttons: {
					'leave': {
						text: 'піти з міста',
						nextScene: 'end'
					}
				}
			},
			
			'end9': {
				text: [
				   'inside the hut, a child cries.',
				   "a few belongings rest against the walls.",
				   "there's nothing else here."
				],
				onLoad: function() {
					World.clearDungeon();
					State.cityCleared = true;
				},
				loot: {
					'рушниця': {
						min: 1,
						max: 1,
						chance: 0.8
					},
					'набої': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'болас': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'космічний сплав': {
						min: 1,
						max: 1,
						chance: 0.2
					}
				},
				buttons: {
					'leave': {
						text: 'піти з міста',
						nextScene: 'end'
					}
				}
			}
		}	
	},
	"house": { /* Abandoned House */
		title: 'Покинутий будинок',
		scenes: {
			'start': {
				text: [
					'an old house remains here, once white siding yellowed and peeling.',
					'the door hangs open.'
				],
				notification: 'the remains of an old house stand as a monument to simpler times',
				buttons: {
					'enter': {
						text: 'зайти',
						nextScene: { 0.5: 'supplies', 1: 'occupied' }
					},
					'leave': {
						text: 'полишити',
						nextScene: 'end'
					}
				},
			},
			'supplies': {
				text: [
					'Будинок покинутий але не знищений повністю.',
					'Ще є трошки води у старому колодязі.'
				],
				onLoad: function() {
					World.markVisited(World.curPos[0], World.curPos[1]);
					World.setWater(World.getMaxWater());
					Notifications.notify(null, 'Набрали води.');
				},
				loot: {
					'копченина': {
						min: 1,
						max: 10,
						chance: 0.8
					},
					'шкіра': {
						min: 1,
						max: 10,
						chance: 0.2
					},
					'шмаття': {
						min: 1,
						max: 10,
						chance: 0.5
					}
				},
				buttons: {
					'leave': {
						text: 'полишити',
						nextScene: 'end'
					}
				}
			},
			'occupied': {
				combat: true,
				enemy: 'жебрак',
				char: 'S',
				damage: 3,
				hit: 0.8,
				attackDelay: 2,
				health: 10,
				notification: 'Жебрак спускається по сходах з заіржавілим мечем у руках.',
				onLoad: function() {
					World.markVisited(World.curPos[0], World.curPos[1]);
				},
				loot: {
					'копченина': {
						min: 1,
						max: 10,
						chance: 0.8
					},
					'шкіра': {
						min: 1,
						max: 10,
						chance: 0.2
					},
					'шмаття': {
						min: 1,
						max: 10,
						chance: 0.5
					}
				},
				buttons: {
					'leave': {
						text: 'полишити',
						nextScene: 'end'
					}
				}
			}
		}
	},
	"battlefield": { /* Discovering an old battlefield */
		title: 'Забуте поле бою',
		scenes: {
			'start': {
				text: [
				   'Битва кипіла в цьому місці колись давно.',
				   'Залишки військового обладнання з обох боків валяються навколо.'
				],
				onLoad: function() {
					World.markVisited(World.curPos[0], World.curPos[1]);
				},
				loot: {
					'рушниця': {
						min: 1,
						max: 3,
						chance: 0.5
					},
					'набої': {
						min: 5,
						max: 20,
						chance: 0.8
					},
					'лазерна гвинтівка': {
						min: 1,
						max: 3,
						chance: 0.3
					},
					'батарейки': {
						min: 5,
						max: 10,
						chance: 0.5
					},
					'гранати': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'космічний сплав': {
						min: 1,
						max: 1,
						chance: 0.3
					}
				},
				buttons: {
					'leave': {
						text: 'полишити',
						nextScene: 'end'
					}
				}
			}
		}
	},
	"borehole": { /* Admiring a huge borehole */
		title: 'Величезна воронка',
		scenes: {
			'start': {
				text: [
				   'Велика воронка залишилася після падіння чогось важкого.',
				   'Майже все зруйнувалося або сплавилося у грудки.',
				   'Шматки якогось тугоплавкого сплаву валяються в кількох місцях.'
				],
				onLoad: function() {
					World.markVisited(World.curPos[0], World.curPos[1]);
				},
				loot: {
					'космічний сплав': {
						min: 1,
						max: 3,
						chance: 1
					}
				},
				buttons: {
					'leave': {
						text: 'полишити',
						nextScene: 'end'
					}
				}
			}
		}
	},
	"ship": { /* Finding a way off this rock */
		title: 'Підбитий зореліт',
		scenes: {
			'start': {
				onLoad: function() {
					World.markVisited(World.curPos[0], World.curPos[1]);
					World.drawRoad();
					World.state.ship = true;
				},
				text: [
				   'the familiar curves of a wanderer vessel rise up out of the dust and ash. ',
				   "lucky that the natives can't work the mechanisms.",
				   'with a little effort, it might fly again.'
				],
				buttons: {
					'leavel': {
						text: 'врятувати',
						nextScene: 'end'
					}
				}
			}
		}
	},
	"sulphurmine": { /* Clearing the Sulphur Mine */
		title: 'Родовище сірки',
		scenes: {
			'start': {
				text: [
					"Армія поставила огородження навколо родовища.",
					'Солдати патрулюють периметр, рушниці висять за плечима.'
				],
				notification: 'Армія огородила родовище.',
				buttons: {
					'attack': {
						text: 'атакувати',
						nextScene: {1: 'a1'}
					},
					'leave': {
						text: 'полишити',
						nextScene: 'end'
					}
				}
			},
			'a1': {
				combat: true,
				enemy: 'солдат',
				ranged: true,
				char: 'D',
				damage: 8,
				hit: 0.8,
				attackDelay: 2,
				health: 50,
				loot: {
					'копченина': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'набої': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'рушниця': {
						min: 1,
						max: 1,
						chance: 0.2
					}
				},
				notification: 'Солдат, помітивши, відкрив стрільбу.',
				buttons: {
					'continue': {
						text: 'продовжити',
						nextScene: { 1: 'a2' }
					},
					'run': {
						text: 'втекти',
						nextScene: 'end'
					}
				}
			},
			'a2': {
				combat: true,
				enemy: 'солдат',
				ranged: true,
				char: 'D',
				damage: 8,
				hit: 0.8,
				attackDelay: 2,
				health: 50,
				loot: {
					'копченина': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'набої': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'рушниця': {
						min: 1,
						max: 1,
						chance: 0.2
					}
				},
				notification: 'Другий солдад приєднався до бою.',
				buttons: {
					'continue': {
						text: 'продовжити',
						nextScene: { 1: 'a3' }
					},
					'run': {
						text: 'втекти',
						nextScene: 'end'
					}
				}
			},
			'a3': {
				combat: true,
				enemy: 'ветеран',
				char: 'V',
				damage: 10,
				hit: 0.8,
				attackDelay: 2,
				health: 65,
				loot: {
					'штик': {
						min: 1,
						max: 1,
						chance: 0.5
					},
					'копченина': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				notification: 'Сивий солдат атакує, розмахуючи штиком.',
				buttons: {
					'continue': {
						text: 'продовжити',
						nextScene: { 1: 'cleared' }
					}
				}
			},
			'cleared': {
				text: [
					'Це місце було очищене від солдат.',
					'Родовище тепер безпечна для робітників.'
				],
				notification: 'Родовище сірки тепер безпечне.',
				onLoad: function() {
					World.drawRoad();
					World.state.sulphurmine = true;
					World.markVisited(World.curPos[0], World.curPos[1]);
				},
				buttons: {
					'leave': {
						text: 'полишити',
						nextScene: 'end'
					}
				}
			}
		}
	},
	"coalmine": { /* Clearing the Coal Mine */
		title: 'Вугільна копальня',
		scenes: {
			'start': {
				text: [
					'Вогонь палає на стоянці біля копальні.',
					'Чоловʼяга чатує на вході, зброя напоготові.'
				],
				notification: 'Ця копальня не покинута.',
				buttons: {
					'attack': {
						text: 'атакувати',
						nextScene: {1: 'a1'}
					},
					'leave': {
						text: 'полишити',
						nextScene: 'end'
					}
				}
			},
			'a1': {
				combat: true,
				enemy: 'чоловʼяга',
				char: 'M',
				damage: 3,
				hit: 0.8,
				attackDelay: 2,
				health: 10,
				loot: {
					'копченина': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'шмаття': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				notification: 'Якийсь чоловʼяга приєднався до бійки',
				buttons: {
					'continue': {
						text: 'продовжити',
						nextScene: { 1: 'a2' }
					},
					'run': {
						text: 'втекти',
						nextScene: 'end'
					}
				}
			},
			'a2': {
				combat: true,
				enemy: 'чоловʼяга',
				char: 'M',
				damage: 3,
				hit: 0.8,
				attackDelay: 2,
				health: 10,
				loot: {
					'копченина': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'шмаття': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				notification: 'Якийсь чоловʼяга приєднався до бійки.',
				buttons: {
					'continue': {
						text: 'продовжити',
						nextScene: { 1: 'a3' }
					},
					'run': {
						text: 'втекти',
						nextScene: 'end'
					}
				}
			},
			'a3': {
				combat: true,
				enemy: 'вождь',
				char: 'C',
				damage: 5,
				hit: 0.8,
				attackDelay: 2,
				health: 20,
				loot: {
					'копченина': {
						min: 5,
						max: 10,
						chance: 1
					},
					'шмаття': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'залізо': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				notification: 'Лише вождь залишився.',
				buttons: {
					'continue': {
						text: 'продовжити',
						nextScene: { 1: 'cleared' }
					}
				}
			},
			'cleared': {
				text: [
					'Стоянка стала тихим місцем, де можна спокійно розвести багаття.',
					'Копальня тепер безпечна для робітників.'
				],
				notification: 'Копальня очищена від небезпек.',
				onLoad: function() {
					World.drawRoad();
					World.state.coalmine = true;
					World.markVisited(World.curPos[0], World.curPos[1]);
				},
				buttons: {
					'leave': {
						text: 'полишити',
						nextScene: 'end'
					}
				}
			}
		}
	},
	"ironmine": { /* Clearing the Iron Mine */
		title: 'Залізнорудна шахта',
		scenes: {
			'start': {
				text: [
					'Шахта покинута, інструменти іржавіють по кутках.',
					'Чиїсь кістки біліють біля входу. Багато з них кимось погризені.',
					'Дике виття почулося із темряви.'
				],
				notification: 'Шлях веде у покинуту шахту.',
				buttons: {
					'enter': {
						text: 'зайти',
						nextScene: { 1: 'enter' },
						cost: { 'смолоскип': 1 }
					},
					'leave': {
						text: 'полишити',
						nextScene: 'end'
					}
				}
			},
			'enter': {
				combat: true,
				enemy: 'горила',
				char: 'M',
				damage: 4,
				hit: 0.8,
				attackDelay: 2,
				health: 10,
				loot: {
					'ікла': {
						min: 5,
						max: 10,
						chance: 1
					},
					'луска': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'шмаття': {
						min: 5,
						max: 10,
						chance: 0.5
					}
				},
				notification: 'Велика горила крутиться на місці, її мускули виграють під шкірою у світлі ліхтаря.',
				buttons: {
					'leave': {
						text: 'полишити',
						nextScene: { 1: 'cleared' }
					}
				}
			},
			'cleared': {
				text: [
					'Тварюка здохла.',
					'Шахта тепер безпечна для робітників.'
				],
				notification: 'Залізнорудна шахта очищена від небезпек.',
				onLoad: function() {
					World.drawRoad();
					World.state.ironmine = true;
					World.markVisited(World.curPos[0], World.curPos[1]);
				},
				buttons: {
					'leave': {
						text: 'полишити',
						nextScene: 'end'
					}
				}
			}
		}
	}
};