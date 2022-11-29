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
         return .1},
    upgrades: {
        11: {
            title: "trade your written names for a new signature",
            description: "unlock point gain.",
            cost: new Decimal(1000),
            unlocked() {return hasMilestone('p', 0)},
            effect() {
                return 1
            }
            }}
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
            requirementDescription: "100 thousand signatures ",
            effectDescription: "maybe a few too many",
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
                return ((player.p.points*(1+tmp.q.effect.blankcap2)-player.points)/(1+player.points))+.05
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
            return (.1*(player[this.layer].points.pow(0.5)))
        if (hasMilestone('p', 10))
            return (player.p.points-100000)/-100}
        
})
//fyi includes works from another project, this is not stolen or reskin, nor will it be


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
        return {blanks,
        blankcap: tmp.q.effect.blanks/(player.q.points+1)*(player.e.points+1),
        blankcap2: tmp.q.effect.blanks/(((player.e.points-buyableEffect('e', 11))*2+1))*(player.q.points+1)
        }
    },

    milestones: {
        0: {
            requirementDescription: "Greatings card",
            effectDescription: "knowing more can get you farther",
            done() { return player.q.points.gte(1) }
        },
        1: {
            requirementDescription: "50 wavers",
            effectDescription: "they now speak for you",
            done() { return player.q.points.gte(50) }
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
            cost: new Decimal(50),
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
    exponent: .3, // Prestige currency exponent
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
    
    passiveGeneration() {
        if (hasUpgrade('q', 12))
         return .1},
    buyables: {
        11: {
            cost(x) {return new Decimal(1).mul(Decimal.pow(1, x))},
            display() { return "Extend patch" +"<br>cost: " + format(tmp[this.layer].buyables[this.id].cost) + "<br>level: " +getBuyableAmount(this.layer, this.id) + "<br>effect:" + format(buyableEffect(this.layer, this.id)) },
            canAfford() { return player.q.points.gte(this.cost()) },
            buy() {
                player.q.points = player.q.points.sub(this.cost()),           
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                this.buymax
            },
            buymax() {
                if (player.q.points.gte(this.cost())) {
                    if ((player.e.points-5-player.e.points/100)>getBuyableAmount(this.layer, this.id)) {
                        if (hasUpgrade('f', 11)) {
                            player.q.points = player.q.points.sub(this.cost()),           
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                        }
                    }
                } 
                
            },
            purchaseLimit() {return player.e.points-5-player.e.points/100},
            effect(x) {

                let patch = x
                return patch
            },
        }
    }
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
        
    },
    effectDescription() { // Optional text to describe the effects
        eff = this.effect();
        return "You've met "+format(eff.box)
    },
    milestones: {
        0: {
            requirementDescription: "a 'friend'",
            effectDescription: "some trust built over time",
            done() { return player.c.points.gte(1) }
        },
        1: {
            requirementDescription: "10 friends",
            effectDescription: "now people really trust you... for some reason",
            done() { return player.c.points.gte(10) }
        },
        10: {
            requirementDescription: "100 companions",
            effectDescription: "did you just start a cult?",
            done() { return player.c.points.gte(100) }
        }
    },
    buyables: {
        11: {
            cost(x) {return new Decimal(1).mul(Decimal.pow(1, x))},
            display() { return "Scavengers" + "<br>cost: " + format(tmp[this.layer].buyables[this.id].cost) + "<br>level: " +getBuyableAmount(this.layer, this.id) + "<br>effect:" + format(buyableEffect(this.layer, this.id)) },
            canAfford() { return player.c.points.gte(this.cost()) },
            buy() {     
                tmp.canSellAll(c,12)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(0))
            },
            purchaseLimit() {return player.c.points},
            effect(x) {

                let patch = x
                
                return patch
            }
            
        },
        12: {
            cost(x) {return new Decimal(1).mul(Decimal.pow(1, x))},
            display() { return "Scavengers" + "<br>cost: " + format(tmp[this.layer].buyables[this.id].cost) + "<br>level: " +getBuyableAmount(this.layer, this.id) + "<br>effect:" + format(buyableEffect(this.layer, this.id)) },
            canAfford() { return player.c.points.gte(this.cost()) },
            buy() {           
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            sellAll() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(-1))
            },
            canSellAll() {return false},
            purchaseLimit() {return player.c.points},
            effect(x) {

                let patch = x
                
                return patch
            }
            
        }
    },
    effect() {
        salvage = new Decimal(1)
        salvage = salvage.add(.1*buyableEffect('c', 12))
        if (buyableEffect('c', 12)>=1) salvage = salvage.pow(buyableEffect('c', 12))
        return {salvage
        }
    }
})