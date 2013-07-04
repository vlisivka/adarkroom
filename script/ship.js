/**
 * Module that registers the starship!
 */
var Ship = {
	LIFTOFF_COOLDOWN: 120,
	ALLOY_PER_HULL: 1,
	ALLOY_PER_THRUSTER: 1,
	BASE_HULL: 0,
	BASE_THRUSTERS: 1,
	
	name: "Ship",
	init: function(options) {
		this.options = $.extend(
			this.options,
			options
		);
		
		if(!State.ship) {
			State.ship = {
				hull: Ship.BASE_HULL,
				thrusters: Ship.BASE_THRUSTERS
			}
		}
		
		// Create the Ship tab
		this.tab = Header.addLocation("Старий зореліт", "ship", Ship);
		
		// Create the Ship panel
		this.panel = $('<div>').attr('id', "shipPanel")
			.addClass('location')
			.appendTo('div#locationSlider');
		
		Engine.updateSlider();
		
		// Draw the hull label
		var hullRow = $('<div>').attr('id', 'hullRow').appendTo('div#shipPanel');
		$('<div>').addClass('row_key').text('корпус:').appendTo(hullRow);
		$('<div>').addClass('row_val').text(State.ship.hull).appendTo(hullRow);
		$('<div>').addClass('clear').appendTo(hullRow);
		
		// Draw the thrusters label
		var engineRow = $('<div>').attr('id', 'engineRow').appendTo('div#shipPanel');
		$('<div>').addClass('row_key').text('двигун:').appendTo(engineRow);
		$('<div>').addClass('row_val').text(State.ship.thrusters).appendTo(engineRow);
		$('<div>').addClass('clear').appendTo(engineRow);
		
		// Draw the reinforce button
		new Button.Button({
			id: 'reinforceButton',
			text: 'посилити корпус',
			click: Ship.reinforceHull,
			width: '100px',
			cost: {'космічний сплав': Ship.ALLOY_PER_HULL}
		}).appendTo('div#shipPanel');
		
		// Draw the engine button
		new Button.Button({
			id: 'engineButton',
			text: 'посилити двигун',
			click: Ship.upgradeEngine,
			width: '100px',
			cost: {'космічний сплав': Ship.ALLOY_PER_THRUSTER}
		}).appendTo('div#shipPanel');
		
		// Draw the lift off button
		var b = new Button.Button({
			id: 'liftoffButton',
			text: 'взліт',
			click: Ship.checkLiftOff,
			width: '100px',
			cooldown: Ship.LIFTOFF_COOLDOWN
		}).appendTo('div#shipPanel');
		
		if(State.ship.hull <= 0) {
			Button.setDisabled(b, true);
		}
		
		// Init Space
		Space.init();
	},
	
	options: {}, // Nothing for now
	
	onArrival: function() {
		Ship.setTitle();
		if(!State.seenShip) {
			Notifications.notify(Ship, 'Під шарми бруду, флот зорелітів стоїть. Він на цій планеті вже занадто довго.');
			State.seenShip = true;
			Engine.saveGame();
		}
	},
	
	setTitle: function() {
		if(Engine.activeModule == this) {
			document.title = "An Old Starship";
		}
	},
	
	reinforceHull: function() {
		if(Engine.getStore('космічний сплав') < Ship.ALLOY_PER_HULL) {
			Notifications.notify(Ship, "Не достатньо космічного сплаву.");
			return false;
		}
		Engine.addStore('космічний сплав', -Ship.ALLOY_PER_HULL);
		State.ship.hull++;
		if(State.ship.hull > 0) {
			Button.setDisabled($('#liftoffButton', Ship.panel), false);
		}
		$('#hullRow .row_val', Ship.panel).text(State.ship.hull);
	},
	
	upgradeEngine: function() {
		if(Engine.getStore('космічний сплав') < Ship.ALLOY_PER_THRUSTER) {
			Notifications.notify(Ship, "Не достатньо космічного сплаву.");
			return false;
		}
		Engine.addStore('космічний сплав', -Ship.ALLOY_PER_THRUSTER);
		State.ship.thrusters++;
		$('#engineRow .row_val', Ship.panel).text(State.ship.thrusters);
	},
	
	getMaxHull: function() {
		return State.ship.hull;
	},
	
	checkLiftOff: function() {
		if(!State.ship.seenWarning) {
			Events.startEvent({
				title: 'Готовий вирушати?',
				scenes: {
					'start': {
						text: [
							"Час залишити це місце. Ми вже не повернемося сюди."
						],
						buttons: {
							'fly': {
								text: 'взліт',
								onChoose: function() {
									State.ship.seenWarning = true;
									Ship.liftOff();
								},
								nextScene: 'end'
							},
							'wait': {
								text: 'зачекати',
								onChoose: function() {
									Button.clearCooldown($('#liftoffButton'));
								},
								nextScene: 'end'
							}
						}
					}
				}
			});
		} else {
			Ship.liftOff();
		}
	},
	
	liftOff: function () {
		$('#outerSlider').animate({top: '700px'}, 300);
		Space.onArrival();
		Engine.activeModule = Space;
	}
};