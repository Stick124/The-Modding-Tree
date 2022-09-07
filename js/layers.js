addLayer("f", {
    name: "familiarity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0), // Starting amount
        canReset() {false},
        resetsNothing:true,
    }},
    color: "#FBCCFF",
    requires: new Decimal(100
        ), // Can be a function that takes requirement increases into account
    resource: "fimularities", // Name of prestige currency
    baseResource: "writtings", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: .33, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "q", description: "q:", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player[this.layer].unlocked && hasUpgrade("q", 12)},
    
    canReset() {false},

    onPrestige(gain) {player.f.points(-1)},

    passiveGeneration() {
        if (hasUpgrade('q', 12))
         return .1}
})
addLayer("p", {
    name: "Trade for signature", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0), // Starting amount
    }},
    color: "#4BDC13",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "Signatures", // Name of prestige currency
    baseResource: "writing", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('p', 12)) mult = mult.times(2)
        if (player.p.points.gte(tmp.p.effect.box)) mult =mult.times(tmp.p.effect.boxcap)
        if (player.q.points.gte(tmp.q.effect.blanks)) mult =mult.times(tmp.q.effect.blankcap)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Lose you pellets to grow red pikmin", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    effect() {
        box = new Decimal(300)
        if (hasUpgrade('q', 11)) box = box.times(2)
        return {box,
        boxcap: tmp.p.effect.box/player.p.points,
        boxcap2: tmp.p.effect.box/player.q.points
        }
    },
    effectDescription() { // Optional text to describe the effects
        eff = this.effect();
        return "You've met "+format(eff.box)
    },
    milestones: {
        0: {
            requirementDescription: "your own name",
            effectDescription: "anything can be useful, when everything else was destroyed",
            done() { return player.p.points.gte(1) }
        },
        1: {
            requirementDescription: "100 Signatures",
            effectDescription: "Some extra word of mouth",
            done() { return player.p.points.gte(100) }
        },
        10: {
            requirementDescription: "123 waffles",
            effectDescription: "blah",
            done() { return player.p.points.gte(100000) }
        }
    },
    upgrades: {
        11: {
            title: "trade your written names for a new signature",
            description: "unlock point gain.",
            cost: new Decimal(0),
            unlocked() {return hasMilestone('p', 0)},
            effect() {
                return ((player.p.points-player.points)/(1+player.points))+.05
            }
        },
        12: {
            title: "scribbling",
            description: "aka faster writing. <br> doubles Signature gain",
            cost: new Decimal(20),
            unlocked() {return hasMilestone('p', 1)}
        },
        13: {
            title: "plans to escape the wreckage.",
            description: "unlock a new layer.",
            cost: new Decimal(250),
            unlocked() {return hasMilestone('p', 1)}
        },
        14: {
            title: "Send your red pikmin to the fire zone.",
            description: "This is different, but still boosts your pellet gain.",
            cost: new Decimal(9),
            unlocked() {return hasMilestone('p', 10)},
            effect() {
                return player[this.layer].points.add(4).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }
        },
        15: {
            title: "Send your red pikmin to the pellets actual location.",
            description: "This will triple your pellet gain... and maybe your IQ.",
            cost: new Decimal(19),
            unlocked() {return hasMilestone('p', 10)}
        },
        16: {
            title: "Send yourself to the fire zone.",
            description: "This is worth trying, but it's slightly more worrisome.",
            cost: new Decimal(200),
            unlocked() {return hasMilestone('p', 10)},
            effect() {
                return player[this.layer].points.add(4).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x*2" }
        }
    },
    passiveGeneration() {
        if (hasUpgrade('p', 11))
         return .1}
})
//fyi works from another project, this is not stolen or reskin, nor will it be


addLayer("q", {
    name: "Wavers", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0), // Starting amount
    }},
    color: "#4BDCFF",
    requires: new Decimal(400
        ), // Can be a function that takes requirement increases into account
    resource: "Wavers", // Name of prestige currency
    baseResource: "signiture", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (player.q.points.gte(tmp.p.effect.box)) mult =mult.times(tmp.p.effect.boxcap2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "q", description: "q:", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player[this.layer].unlocked && hasUpgrade("p", 13)},
    
    effect() {
        blanks = new Decimal(1)
        if (hasUpgrade('q', 11)) blanks = blanks.times(1)
        return {box,
        blankcap: tmp.q.effect.blanks/player.q.points*player.e.points,
        blankcap2: tmp.q.effect.blanks/(player.e.points*2)*player.q.points
        }
    },

    milestones: {
        0: {
            requirementDescription: "Greatings card",
            effectDescription: "anything can be useful, when everything else was destroyed",
            done() { return player.q.points.gte(1) }
        },
        1: {
            requirementDescription: "500 wavers",
            effectDescription: "Some extra word of mouth",
            done() { return player.q.points.gte(500) }
        }
    },
    upgrades: {
        11: {
            title: "Leading questions",
            description: "know twice as many people.",
            cost: new Decimal(1),
            unlocked() {return hasMilestone('q', 0)}
        },
        12: {
            title: "proper Leading",
            description: "a leader has a few new responsibilities.",
            cost: new Decimal(500),
            unlocked() {return hasMilestone('q', 1)}
        }
    }
})

addLayer("e", {
    name: "errors", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0), // Starting amount
    }},
    color: "#4BDCAF",
    requires: new Decimal(4000
        ), // Can be a function that takes requirement increases into account
    resource: "errors", // Name of prestige currency
    baseResource: "", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (player.q.points.gte(tmp.p.effect.box)) mult =mult.div(tmp.p.effect.boxcap2)
        if (player.q.points.gte(tmp.p.effect.box)) mult =mult.div(tmp.p.effect.boxcap)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "q", description: "q:", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player[this.layer].unlocked && hasUpgrade("q", 12)},
    
    passiveGeneration() {
        if (hasUpgrade('q', 12))
         return .1}
})

addLayer("c", {
    name: "companion", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0), // Starting amount
    }},
    color: "#4BDC13",
    requires: new Decimal(25), // Can be a function that takes requirement increases into account
    resource: "companions", // Name of prestige currency
    baseResource: "fimularities", // Name of resource prestige is based on
    baseAmount() {return player.f.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('p', 12)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Lose you pellets to grow red pikmin", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    effect() {
        box = new Decimal(300)
        if (hasUpgrade('q', 11)) box = box.times(2)
        return {box,
        boxcap: tmp.p.effect.box/player.p.points,
        boxcap2: tmp.p.effect.box/player.q.points
        }
    },
    effectDescription() { // Optional text to describe the effects
        eff = this.effect();
        return "You've met "+format(eff.box)
    },
    milestones: {
        0: {
            requirementDescription: "your own name",
            effectDescription: "anything can be useful, when everything else was destroyed",
            done() { return player.c.points.gte(1) }
        },
        1: {
            requirementDescription: "100 Signatures",
            effectDescription: "Some extra word of mouth",
            done() { return player.c.points.gte(10) }
        },
        10: {
            requirementDescription: "123 waffles",
            effectDescription: "blah",
            done() { return player.c.points.gte(100) }
        }
    },
    upgrades: {
        11: {
            title: "trade your written names for a new signature",
            description: "unlock point gain.",
            cost: new Decimal(1),
            unlocked() {return hasMilestone('p', 0)}
        }
    }
})