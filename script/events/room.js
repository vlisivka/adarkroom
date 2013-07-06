/**
 * Events that can occur when the Room module is active
 **/
Events.Room = [
	{ /* The Nomad	--	Merchant */
		title: 'The Nomad',
		isAvailable: function() {
			return Engine.activeModule == Room && Engine.getStore('шкури') > 0;
		},
		scenes: {
			'start': {
				text: [
					'Жебрак приволікся, тягнучи за собою возик з клунками обмотаними старою мотузкою.',
					'Не каже звідки він прийшов, але зрозуміло що тут він не надовго.'
				],
				notification: 'Жебрак прибув, хоче торгувати.',
				buttons: {
					'buyScales': {
						text: 'купити луску',
						cost: { 'шкури': 100 },
						reward: { 'луска': 1 }
					},
					'buyTeeth': {
						text: 'купити ікла',
						cost: { 'шкури': 200 },
						reward: { 'ікла': 1 }
					},
					'buyBait': {
						text: 'купити приманку',
						cost: { 'шкури': 5 },
						reward: { 'приманка': 1 },
						notification: 'Пастки ефективніші з приманкою.'
					},
					'buyCompass': {
						available: function() {
							return Engine.getStore('компас') < 1;
						},
						text: 'купити компас',
						cost: { 'шкури': 300, 'луска': 15, 'ікла': 5 },
						reward: { 'компас': 1 },
						notification: 'Старий компас помʼятий і запорошений, але все ще працює.',
						onChoose: Engine.openPath
					}, 
					'goodbye': {
						text: 'попрощатися',
						nextScene: 'end'
					}
				}
			}
		}
	}, { /* Noises Outside	--	gain wood/fur */
		title: 'Шурхіт',
		isAvailable: function() {
			return Engine.activeModule == Room && Engine.storeAvailable('дерево');
		},
		scenes: {
			'start': {
				text: [
					'Чути дивний шурхіт і шаркання за стіною.',
					"Важко зрозуміти що там відбувається."
				],
				notification: 'Дивні звуки чути за стінами',
				buttons: {
					'investigate': {
						text: 'подивитися',
						nextScene: { 0.3: 'stuff', 1: 'nothing' }
					},
					'ignore': {
						text: 'не зважати',
						nextScene: 'end'
					}
				}
			},
			'nothing': {
				text: [
					'Неясні тіні рухаються, їх ледве видно.',
					'Звуки стихли.'
				],
				buttons: {
					'backinside': {
						text: 'повернутися',
						nextScene: 'end'
					}
				}
			},
			'stuff': {
				reward: { 'дерево': 100, 'шкури': 10 },
				text: [
					'Вʼязанка дров лежить просто біля порогу, загорнута у шкури.',
					'Спокійна ніч.'
				],
				buttons: {
					'backinside': {
						text: 'повернутися',
						nextScene: 'end'
					}
				}
			}
		}
	},
	{ /* Noises Inside	--	trade wood for better good */
		title: 'Шурхіт',
		isAvailable: function() {
			return Engine.activeModule == Room && Engine.storeAvailable('дерево');
		},
		scenes: {
			start: {
				text: [
				   'Шкрябання чути у коморі.',
				   'Щось там є.'
				],
				notification: 'Щось у коморі',
				buttons: {
					'investigate': {
						text: 'заглянути',
						nextScene: { 0.5: 'scales', 0.8: 'teeth', 1: 'cloth' }
					},
					'ignore': {
						text: 'не зважати',
						nextScene: 'end'
					}
				}
			},
			scales: {
				text: [
				   'Частина деревини зникла.',
				   'Ґрунт всипано лускою.'
				],
				onLoad: function() {
					var numWood = Engine.getStore('дерево');
					numWood = Math.floor(numWood * 0.1);
					if(numWood == 0) numWood = 1;
					var numScales = Math.floor(numWood / 5);
					if(numScales == 0) numScales = 1;
					Engine.addStores({'дерево': -numWood, 'луска': numScales});
				},
				buttons: {
					'leave': {
						text: 'гаразд',
						nextScene: 'end'
					}
				}
			},
			teeth: {
				text: [
				   'Частина деревини зникла.',
				   'На землі валяються ікла.'
				],
				onLoad: function() {
					var numWood = Engine.getStore('дерево');
					numWood = Math.floor(numWood * 0.1);
					if(numWood == 0) numWood = 1;
					var numTeeth = Math.floor(numWood / 5);
					if(numTeeth == 0) numTeeth = 1;
					Engine.addStores({'дерево': -numWood, 'ікла': numTeeth});
				},
				buttons: {
					'leave': {
						text: 'гаразд',
						nextScene: 'end'
					}
				}
			},
			cloth: {
				text: [
				   'Частина деревини зникла.',
				   'На землі валяється чиєсь шмаття.'
				],
				onLoad: function() {
					var numWood = Engine.getStore('дерево');
					numWood = Math.floor(numWood * 0.1);
					if(numWood == 0) numWood = 1;
					var numCloth = Math.floor(numWood / 5);
					if(numCloth == 0) numCloth = 1;
					Engine.addStores({'дерево': -numWood, 'шмаття': numCloth});
				},
				buttons: {
					'leave': {
						text: 'гаразд',
						nextScene: 'end'
					}
				}
			}
		}
	},
	{ /* The Beggar	 --	 trade fur for better good */
		title: 'Жебрак',
		isAvailable: function() {
			return Engine.activeModule == Room && Engine.storeAvailable('шкури');
		},
		scenes: {
			start: {
				text: [
				   'Жебрак прийшов.',
				   'Просить дати йому зайві шкури, щоб йому було тепло вночі.'
				],
				notification: 'Жебрак прибув.',
				buttons: {
					'50furs': {
						text: 'дати 50',
						cost: { 'шкури': 50 },
						nextScene: { 0.5: 'scales', 0.8: 'teeth', 1: 'cloth' }
					},
					'100furs': {
						text: 'дати 100',
						cost: { 'шкури': 100 },
						nextScene: { 0.5: 'scales', 0.8: 'teeth', 1: 'cloth' }
					},
					'deny': {
						text: 'відмовити',
						nextScene: 'end'
					}
				}
			},
			scales: {
				reward: { 'луска': 20 },
				text: [
				   'Жебрак дякує вам.',
				   'Залишає невелику купку луски за собою.'
				],
				buttons: {
					'leave': {
						text: 'попрощатися',
						nextScene: 'end'
					}
				}
			},
			teeth: {
				reward: { 'ікла': 20 },
				text: [
				   'Жебрак дякує вам.',
				   'Залишає невелику купку кликів за собою.'
				],
				buttons: {
					'leave': {
						text: 'попрощатися',
						nextScene: 'end'
					}
				}
			},
			cloth: {
				reward: { 'шмаття': 20 },
				text: [
				   'Жебрак дякує вам.',
				   'Залишає деякі непотрібні лахміття.'
				],
				buttons: {
					'leave': {
						text: 'попрощатися',
						nextScene: 'end'
					}
				}
			}
		}
	},
	
	{ /* Mysterious Wanderer  --  wood gambling */
		title: 'Чудернацький мандрівник',
		isAvailable: function() {
			return Engine.activeModule == Room && Engine.storeAvailable('дерево');
		},
		scenes: {
			start: {
				text: [
				   'Якийсь мандрівник прийшов з порожнім возиком. Каже що якщо дати йому деревини, то він потім привезе ще більше.',
				   "Будівельниця не впевнена чи йому можна довіряти."
				],
				notification: 'Чудернацький мандрівник прибув.',
				buttons: {
					'100wood': {
						text: 'дати 100',
						cost: { 'дерево': 100 },
						nextScene: { 1: '100wood'}
					},
					'500wood': {
						text: 'дати 500',
						cost: { 'дерево': 500 },
						nextScene: { 1: '500wood' }
					},
					'deny': {
						text: 'відмовити',
						nextScene: 'end'
					}
				}
			},
			'100wood': {
				text: [
				   'мандрівник навантажив возик деревиною і пішов.',
				],
				onLoad: function() {
					if(Math.random() < 0.5) {
						setTimeout(function() {
							Engine.addStore('дерево', 300);
							Notifications.notify(Room, 'Чудернацький мандрівник повернувся, возик завантажений доверху деревиною.');
						}, 60 * 1000);
					}
				},
				buttons: {
					'leave': {
						text: 'попрощатися',
						nextScene: 'end'
					}
				}
			},
			'500wood': {
				text: [
					   'мандрівник навантажив возик деревиною і пішов.',
				],
				onLoad: function() {
					if(Math.random() < 0.3) {
						setTimeout(function() {
							Engine.addStore('дерево', 1500);
							Notifications.notify(Room, 'Чудернацький мандрівник повернувся, возик завантажений доверху деревиною.');
						}, 60 * 1000);
					}
				},
				buttons: {
					'leave': {
						text: 'попрощатися',
						nextScene: 'end'
					}
				}
			}
		}
	},
	
	{ /* Mysterious Wanderer  --  fur gambling */
		title: 'Чудернацький мандрівник',
		isAvailable: function() {
			return Engine.activeModule == Room && Engine.storeAvailable('шкури');
		},
		scenes: {
			start: {
				text: [
				   'Якийсь мандрівник прийшов з порожнім возиком. Каже що якщо дати йому шкур, то він потім привезе ще більше.',
				   'Будівельниця не впевнена чи йому можна вірити.'
				],
				notification: 'Чудернацький мандрівник прибув.',
				buttons: {
					'100fur': {
						text: 'дати 100',
						cost: { 'шкури': 100 },
						nextScene: { 1: '100fur'}
					},
					'500fur': {
						text: 'дати 500',
						cost: { 'шкури': 500 },
						nextScene: { 1: '500fur' }
					},
					'deny': {
						text: 'відмовити',
						nextScene: 'end'
					}
				}
			},
			'100fur': {
				text: [
				   'мандрівник пішов, навантавживши возик шкурами.',
				],
				onLoad: function() {
					if(Math.random() < 0.5) {
						setTimeout(function() {
							Engine.addStore('шкури', 300);
							Notifications.notify(Room, 'Чудернацький мандрівник повернувся, возик набитий шкурами.');
						}, 60 * 1000);
					}
				},
				buttons: {
					'leave': {
						text: 'попрощатися',
						nextScene: 'end'
					}
				}
			},
			'500fur': {
				text: [
					'мандрівник пішов, навантавживши возик шкурами.',
				],
				onLoad: function() {
					if(Math.random() < 0.3) {
						setTimeout(function() {
							Engine.addStore('шкури', 1500);
							Notifications.notify(Room, 'Чудернацький мандрівник повернувся, возик набитий шкурами.');
						}, 60 * 1000);
					}
				},
				buttons: {
					'leave': {
						text: 'попрощатися',
						nextScene: 'end'
					}
				}
			}
		}
	},
	
	{ /* The розвідник	--	Map Merchant */
		title: 'Дослідник',
		isAvailable: function() {
			return Engine.activeModule == Room && typeof State.world == 'object';
		},
		scenes: {
			'start': {
				text: [
					"Дослідник каже що він був усюди.",
					"Може розказати трохи за винагороду."
				],
				notification: 'Дослідник зупинився на ніч.',
				buttons: {
					'buyMap': {
						text: 'купити мапу',
						cost: { 'шкури': 200, 'луска': 10 },
						notification: 'Мапа показує частину світу.',
						onChoose: World.applyMap
					},
					'learn': {
						text: 'вивчити виживання',
						cost: { 'шкури': 1000, 'луска': 50, 'ікла': 20 },
						available: function() {
							return !Engine.hasPerk('розвідник');
						},
						onChoose: function() {
							Engine.addPerk('розвідник');
						}
					},
					'leave': {
						text: 'попрощатися',
						nextScene: 'end'
					}
				}
			}
		}
	},
	
	{ /* The Wandering Master */
		title: 'Майстер',
		isAvailable: function() {
			return Engine.activeModule == Room && typeof State.world == 'object';
		},
		scenes: {
			'start': {
				text: [
					'Старий майстер прибув.',
					'Він щиро посміхається і питає про кімнату на ніч.'
				],
				notification: 'Старий майстер прибув.',
				buttons: {
					'agree': {
						text: 'прийняти',
						cost: {
							'копченина': 100,
							'шкури': 100,
							'смолоскип': 1
						},
						nextScene: {1: 'agree'}
					},
					'deny': {
						text: 'відмовити',
						nextScene: 'end'
					}
				}
			},
			'agree': {
				text: [
				   'В знак подяки, майстер поділився своєю мудрістю.'
				],
				buttons: {
					'evasion': {
						text: 'гнучкість',
						available: function() {
							return !Engine.hasPerk('ухиляння');
						},
						onChoose: function() {
							Engine.addPerk('ухиляння');
						},
						nextScene: 'end'
					},
					'precision': {
						text: 'зібраність',
						available: function() {
							return !Engine.hasPerk('точність');
						},
						onChoose: function() {
							Engine.addPerk('точність');
						},
						nextScene: 'end'
					},
					'force': {
						text: 'потужність',
						available: function() {
							return !Engine.hasPerk('варвар');
						},
						onChoose: function() {
							Engine.addPerk('варвар');
						},
						nextScene: 'end'
					},
					'nothing': {
						text: 'нічого',
						nextScene: 'end'
					}
				}
			}
		}
	}
]