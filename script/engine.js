var Engine = {
		
	/* TODO *** MICHAEL IS A LAZY BASTARD AND DOES NOT WANT TO REFACTOR ***
	 * Here is what he should be doing:
	 *	- All updating values (store numbers, incomes, etc...) should be objects that can register listeners to
	 *	  value-change events. These events should be fired whenever a value (or group of values, I suppose) is updated.
	 *	  That would be so elegant and awesome.
	 */
	SITE_URL: encodeURIComponent("http://vlisivka.github.io/adarkroom/"),
	MAX_STORE: 99999999999999,
	SAVE_DISPLAY: 30 * 1000,
		
	Perks: {
		'боксер': {
			desc: 'удари дошкульніші',
			notify: 'Навчився бити у вразливі місця.'
		},
		'бойовий митець': {
			desc: 'удари ще дошкульніші.',
			notify: 'Навчився битися дуже вміло і без будь якої зброї.'
		},
		'каратист': {
			desc: 'удари вдвічі швидші і з більшою силою',
			notify: 'Навчився нападати швидше без зброї.'
		},
		'варвар': {
			desc: 'холодна зброя смертоносніша',
			notify: 'Навчився махати мечем із силою.'
		},
		'витривалість': {
			desc: 'удвічі економніший у їжі',
			notify: 'Навчився забувати про голод.'
		},
		'пустельник': {
			desc: 'удвічі економніший у питті',
			notify: 'Навчився збирати свою сечу.'
		},
		'ухиляння': {
			desc: 'ухиляєшся від атак',
			notify: "Навчився бути там де їх нема."
		},
		'точність': {
			desc: 'удари частіше влучають у ціль',
			notify: 'Навчився передбачати чужі рухи.'
		},
		'розвідник': {
			desc: 'бачиш далі',
			notify: 'Навчився спостерігати за горизонтом.'
		},
		'вкрадливість': {
			desc: 'краще ховаєшся від очей ворогів',
			notify: 'Навчився як маскуватися.'
		},
		'кухар': {
			desc: 'відновлюєш більше здоровʼя коли їси',
			notify: 'Ми є те, що ми їмо.'
		}
	},
	
	options: {
		state: null,
		debug: false,
		log: false
	},
		
	init: function(options) {
		this.options = $.extend(
			this.options,
			options
		);
		this._debug = this.options.debug;
		this._log = this.options.log;
		
		// Check for HTML5 support
		if(!Engine.browserValid()) {
			window.location = 'browserWarning.html';
		}
		
		// Check for mobile
		if(Engine.isMobile()) {
			window.location = 'mobileWarning.html';
		}
		
		if(this.options.state != null) {
			window.State = this.options.state;
		} else {
			Engine.loadGame();
		}
		
		$('<div>').attr('id', 'locationSlider').appendTo('#main');
		
		$('<span>')
			.addClass('deleteSave')
			.text('Restart.')
			.click(Engine.confirmDelete)
			.appendTo('body');
		
		$('<div>')
			.addClass('share')
			.text('Share.')
			.click(Engine.share)
			.appendTo('body');
		
		// Register keypress handlers
		$('body').off('keydown').keydown(Engine.keyDown);
		$('body').off('keyup').keyup(Engine.keyUp);
		
		Notifications.init();
		Events.init();
		Room.init();
		
		if(Engine.storeAvailable('дерево')) {
			Outside.init();
		}
		if(Engine.getStore('компас') > 0) {
			Path.init();
		}
		if(State.ship) {
			Ship.init();
		}
		
		Engine.travelTo(Room);

	},
	
	browserValid: function() {
		return location.search.indexOf('ignorebrowser=true') >= 0 || (
				typeof Storage != 'undefined' &&
				!oldIE);
	},
	
	isMobile: function() {
		return location.search.indexOf('ignorebrowser=true') < 0 &&
			/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
	},
	
	saveGame: function() {
		if(typeof Storage != 'undefined' && localStorage) {
			if(Engine._saveTimer != null) {
				clearTimeout(Engine._saveTimer);
			}
			if(typeof Engine._lastNotify == 'undefined' || Date.now() - Engine._lastNotify > Engine.SAVE_DISPLAY){
				$('#saveNotify').css('opacity', 1).animate({opacity: 0}, 1000, 'linear');
				Engine._lastNotify = Date.now();
			}
			localStorage.gameState = JSON.stringify(State);
		}
	},
	
	loadGame: function() {
		try {
			var savedState = JSON.parse(localStorage.gameState);
			if(savedState) {
				State = savedState;
				Engine.upgradeState();
				Engine.log("loaded save!");
			}
		} catch(e) {
			State = {
				version: 1.2,
				stores: {},
				perks: {}
			};
			Engine.event('progress', 'new game');
		}
	},
	
	upgradeState: function() {
		/* Use this function to make old 
		 * save games compatible with newer versions */ 
		if(typeof State.version != 'number') {
			Engine.log('upgraded save to v1.0');
			State.version = 1.0;
		}
		if(State.version == 1.0) {
			// v1.1 introduced the Lodge, so get rid of lodgeless hunters
			delete State.outside.workers.hunter;
			delete State.income.hunter;
			Engine.log('upgraded save to v1.1');
			State.version = 1.1;
		}
		if(State.version == 1.1) {
			//v1.2 added the Swamp to the map, so add it to already generated maps
			if(State.world) {
				World.placeLandmark(15, World.RADIUS * 1.5, World.TILE.SWAMP, State.world.map);
			}
			Engine.log('upgraded save to v1.2');
			State.version = 1.2;
		}
	},
	
	event: function(cat, act) {
		if(typeof ga === 'function') {
			ga('send', 'event', cat, act);
		}
	},
	
	confirmDelete: function() {
		Events.startEvent({
			title: 'Перезапуск?',
			scenes: {
				start: {
					text: ['Перезапустити гру?'],
					buttons: {
						'yes': {
							text: 'так',
							nextScene: 'end',
							onChoose: Engine.deleteSave
						},
						'no': {
							text: 'ні',
							nextScene: 'end'
						}
					}
				}
			}
		});
	},
	
	deleteSave: function() {
		if(typeof Storage != 'undefined' && localStorage) {
			localStorage.clear();
		}
		location.reload();
	},
	
	share: function() {
		Events.startEvent({
			title: 'Розказати',
			scenes: {
				start: {
					text: ['Привести друзів.'],
					buttons: {
						'facebook': {
							text: 'facebook',
							nextScene: 'end',
							onChoose: function() {
								window.open('https://www.facebook.com/sharer/sharer.php?u=' + Engine.SITE_URL, 'sharer', 'width=626,height=436,location=no,menubar=no,resizable=no,scrollbars=no,status=no,toolbar=no');
							}
						},
						'google': {
							text:'google+',
							nextScene: 'end',
							onChoose: function() {
								window.open('https://plus.google.com/share?url=' + Engine.SITE_URL, 'sharer', 'width=480,height=436,location=no,menubar=no,resizable=no,scrollbars=no,status=no,toolbar=no');
							}
						},
						'twitter': {
							text: 'twitter',
							onChoose: function() {
								window.open('https://twitter.com/intent/tweet?text=A%20Dark%20Room&url=' + Engine.SITE_URL, 'sharer', 'width=660,height=260,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no');
							},
							nextScene: 'end'
						},
						'reddit': {
							text: 'reddit',
							onChoose: function() {
								window.open('http://www.reddit.com/submit?url=' + Engine.SITE_URL, 'sharer', 'width=960,height=700,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no');
							},
							nextScene: 'end'
						},
						'close': {
							text: 'закрити',
							nextScene: 'end'
						}
					}
				}
			}
		}, {width: '400px'});
	},
	
	// Gets a guid
	getGuid: function() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
	},
	
	activeModule: null,
	
	travelTo: function(module) {
		if(Engine.activeModule != module) {
			var currentIndex = Engine.activeModule ? $('.location').index(Engine.activeModule.panel) : 1;
			Engine.activeModule = module;
			$('div.headerButton').removeClass('selected');
			module.tab.addClass('selected');
			
			var slider = $('#locationSlider');
			var panelIndex = $('.location').index(module.panel);
			var diff = Math.abs(panelIndex - currentIndex);
			slider.animate({left: -(panelIndex * 700) + 'px'}, 300 * diff);
			module.onArrival();
			
			Notifications.printQueue(module);
		}
	},
	
	addPerk: function(name) {
		if(!State.perks) {
			State.perks = {};
		}
		State.perks[name] = true;
		Notifications.notify(null, Engine.Perks[name].notify);
		if(Engine.activeModule == Path) {
			Path.updatePerks();
		}
	},
	
	hasPerk: function(name) {
		return typeof State.perks == 'object' && State.perks[name] == true;
	},
	
	setStore: function(name, number) {
		if(typeof State.stores == 'undefined') {
			State.stores = {};
		}
		if(number > Engine.MAX_STORE) number = Engine.MAX_STORE;
		State.stores[name] = number;
		Room.updateStoresView();
		Room.updateBuildButtons();
		if(State.outside) {
			Outside.updateVillage();
		}
		Engine.saveGame();
	},
	
	setStores: function(list) {
		if(typeof State.stores == 'undefined') {
			State.stores = {};
		}
		for(k in list) {
			State.stores[k] = list[k] > Engine.MAX_STORE ? Engine.MAX_STORE : list[k];
		}
		Room.updateStoresView();
		Room.updateBuildButtons();
		if(State.outside) {
			Outside.updateVillage();
		}
		Engine.saveGame();
	},
	
	addStore: function(name, number) {
		if(typeof State.stores == 'undefined') {
			State.stores = {};
		}
		var num = State.stores[name];
		if(typeof num != 'number' || isNaN(num) || num < 0) num = 0;
		num += number;
		if(num > Engine.MAX_STORE) num = Engine.MAX_STORE;
		State.stores[name] = num;
		Room.updateStoresView();
		Room.updateBuildButtons();
		Outside.updateVillage();
		if(Engine.activeModule == Path) {
			Path.updateOutfitting();
		}
		Engine.saveGame();
	},
	
	addStores: function(list, ignoreCosts) {
		if(typeof State.stores == 'undefined') {
			State.stores = {};
		}
		
		// Make sure any income costs can be paid
		if(!ignoreCosts) {
			for(k in list) {
				var num = State.stores[k];
				if(typeof num != 'number' || isNaN(num) || num < 0) num = 0;
				if(num + list[k] < 0) {
					return false;
				}
			}
		}
		
		// Actually do the update
		for(k in list) {
			var num = State.stores[k];
			if(typeof num != 'number') num = 0;
			num += list[k];
			num = num < 0 ? 0 : num;
			num = num > Engine.MAX_STORE ? Engine.MAX_STORE : num;
			State.stores[k] = num;
		}
		Room.updateStoresView();
		Room.updateBuildButtons();
		Outside.updateVillage();
		if(Engine.activeModule == Path) {
			Path.updateOutfitting();
		}
		Engine.saveGame();
		return true;
	},
	
	storeAvailable: function(name) {
		return typeof State.stores[name] == 'number';
	},
	
	getStore: function(name) {
		if(typeof State.stores == 'undefined' || typeof State.stores[name] == 'undefined' ) {
			return 0;
		}
		return State.stores[name];
	},
	
	setIncome: function(source, options) {
		if(typeof State.income == 'undefined') {
			State.income = {};
		}
		var existing = State.income[source];
		if(typeof existing != 'undefined') {
			options.timeLeft = existing.timeLeft;
		}
		State.income[source] = options;
	},
	
	getIncome: function(source) {
		if(typeof State.income == 'undefined') {
			State.income = {};
		}
		var existing = State.income[source];
		if(typeof existing != 'undefined') {
			return existing;
		}
		return {};
	},
	
	removeIncome: function(source) {
		if(State.income) {
			delete State.income[source];
		}
		Room.updateIncomeView();
	},
	
	collectIncome: function() {
		if(typeof State.income != 'undefined' && Engine.activeModule != Space) {
			var changed = false;
			for(var source in State.income) {
				var income = State.income[source];
				if(typeof income.timeLeft != 'number')
				{
					income.timeLeft = 0;
				}
				income.timeLeft--;
				
				if(income.timeLeft <= 0) {
					Engine.log('collection income from ' + source);
					if(source == 'злодії') {
						Engine.addStolen(income.stores);
					}
					changed = Engine.addStores(income.stores) || changed;
					if(typeof income.delay == 'number') {
						income.timeLeft = income.delay;
					}
				}
			}
			if(changed) {
				Room.updateStoresView();
				Room.updateBuildButtons();
				Engine.saveGame();
				if(Events.activeEvent() != null) {
					Events.updateButtons();
				}
			}
		}
		Engine._incomeTimeout = setTimeout(Engine.collectIncome, 1000);
	},
	
	openPath: function() {
		Path.init();
		Engine.event('progress', 'path');
		Notifications.notify(Room, 'Компас вказує на ' + World.dir);
	},
	
	addStolen: function(stores) {
		if(!State.stolen) State.stolen = {};
		for(var k in stores) {
			if(!State.stolen[k]) State.stolen[k] = 0;
			State.stolen[k] -= stores[k];
		}
	},
	
	startThieves: function() {
		State.thieves = 1;
		Engine.setIncome('злодії', {
			delay: 10,
			stores: {
				'дерево': -10,
				'шкури': -5,
				'мʼясо': -5
			}
		});
		Room.updateIncomeView();
	},
	
	num: function(name, craftable) {
		switch(craftable.type) {
		case 'good':
		case 'tool':
		case 'weapon':
		case 'upgrade':
			return Engine.getStore(name);
		case 'building':
			return Outside.numBuilding(name);
		}
	},
	
	log: function(msg) {
		if(this._log) {
			console.log(msg);
		}
	},
	
	updateSlider: function() {
		var slider = $('#locationSlider');
		slider.width((slider.children().length * 700) + 'px');
	},
	
	updateOuterSlider: function() {
		var slider = $('#outerSlider');
		slider.width((slider.children().length * 700) + 'px');
	},
	
	getIncomeMsg: function(num, delay) {
		return (num > 0 ? "+" : "") + num + " на " + delay + "с";
	},
	
	keyDown: function(e) {
		if(!Engine.keyPressed && !Engine.keyLock) {
			Engine.pressed = true;
			if(Engine.activeModule.keyDown) {
				Engine.activeModule.keyDown(e);
			}
		}
		return false;
	},
	
	keyUp: function(e) {
		Engine.pressed = false;
		if(Engine.activeModule.keyUp) {
			Engine.activeModule.keyUp(e);
		}
		return false;
	}
};

$(function() {
	Engine.init();
});