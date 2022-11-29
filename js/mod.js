let modInfo = {
	name: "The Boxing Tree",
	id: "boxes",
	author: "nobody important's partner",
	pointsName: "written works",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (1), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1",
	name: "barely anything",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.1</h3><br>
		- Added things.<br>
		- Added stuff.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.

// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}



// Calculate points/sec!
	function getPointGen() {
		if (!canGenPoints())
			return new Decimal(0)

		let gain = new Decimal(0)

		if (hasUpgrade('p', 11)) gain = new Decimal(1)

		if (hasUpgrade('p', 11)) gain = gain.times(upgradeEffect("p", 11))

		if (player.q.points.gte(tmp.q.effect.blanks)) gain =gain.times(tmp.q.effect.blankcap2)

		if (player.points.gte(tmp.q.effect.blankcap2)) gain =gain.times(player.points*tmp.q.effect.blankcap)

		gain = gain.div(tmp.c.effect.salvage)

		gain = gain.add(tmp.c.effect.salvage.pow(2))

		gain = gain.times(tmp.c.effect.salvage)

		return gain
	
	}

	

// Add formatting to the effect
// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	


}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}