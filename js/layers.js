addLayer("p", {
    name: "Trade for signature", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0), // Starting amount
    }},
    color: "#4BDC13",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "Red Pikmin", // Name of prestige currency
    baseResource: "pellets", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        
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
    softcap() {
        let softcap2 = new Decimal(800000)

        
        return softcap2
    },
    softcapPower() {
        let softcappower2 = new Decimal(0)


        return softcappower2
    },
    milestones: {
        0: {
            requirementDescription: "123 waffles",
            effectDescription: "blah",
            done() { return player.p.points.gte(1) }
        }
    },
    upgrades: {
        11: {
            title: "Send your red pikmin to collect pellets",
            description: "Double your pellet gain.",
            cost: new Decimal(0),
            unlocked() {return hasMilestone(p, 0)}
        },
        12: {
            title: "Pikmin overworking",
            description: "Double your pellet gain again.",
            cost: new Decimal(2)
        },
        13: {
            title: "Send your pikmin to dangerous places.",
            description: "Guess what, double your pellet gain.",
            cost: new Decimal(4)
        },
        14: {
            title: "Send your red pikmin to the fire zone.",
            description: "This is different, but still boosts your pellet gain.",
            cost: new Decimal(9),
            effect() {
                return player[this.layer].points.add(4).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }
        },
        15: {
            title: "Send your red pikmin to the pellets actual location.",
            description: "This will triple your pellet gain... and maybe your IQ.",
            cost: new Decimal(19)
        },
        16: {
            title: "Send yourself to the fire zone.",
            description: "This is worth trying, but it's slightly more worrisome.",
            cost: new Decimal(200),
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
/*
addLayer("q", {
    name: "grow Red Onions", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "0", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0), // Starting amount
    }},
    color: "#4BDCFF",
    requires: new Decimal(400), // Can be a function that takes requirement increases into account
    resource: "Red Onion", // Name of prestige currency
    baseResource: "red pikmin", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    canBuyMax: true,
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "o", description: "P: Lose everyone to find new onions", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "first tribute",
            description: "Double your pellet gain.",
            cost: new Decimal(1)
        },
        12: {
            title: "Systematic overworking",
            description: "Double your pellet gain.",
            cost: new Decimal(2)
        },
        13: {
            title: "Conquer dangerous places.",
            description: "Guess what, double your pellet gain.",
            cost: new Decimal(4)
        },
        14: {
            title: "Examine fruit.",
            description: "This is different, but still boosts your pellet gain.",
            cost: new Decimal(9),
            effect() {
                return player[this.layer].points.add(2 * tmp.w.effect.cat).pow(0.25)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }
        },
        15: {
            title: "Avoid the water.",
            description: "This will triple your pellet gain.",
            cost: new Decimal(50)
        },
        16: {
            title: "Supremacy.",
            description: "Simply worth trying.",
            cost: new Decimal(200),
            effect() {
                return player[this.layer].points.add(1).pow(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x*2" }
        }
    }
})

addLayer("x", {
    name: "grow Buds", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0), // Starting amount
    }},
    color: "#FFDCFF",
    requires: new Decimal(315), // Can be a function that takes requirement increases into account
    resource: "Red Buds", // Name of prestige currency
    baseResource: "red pikmin", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (player.w.unlocked) mult = mult.times(tmp.w.effect.cat)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(.5)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "o", description: "P: Lose you pellets to grow red pikmin", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    effect() {
        return {  cat: player[this.layer].points.add(1).pow(0.33)
    }},
    effectDescription() { // Optional text to describe the effects
        eff = this.effect();
        return "which are boosting red pikmin by "+format(eff.cat)
    },
    upgrades: {
        11: {
            title: "budding pikmin",
            description: "",
            cost: new Decimal(1)
        },
        12: {
            title: "proper pollination",
            description: "",
            cost: new Decimal(2)
        },
        13: {
            title: "budding religion.",
            description: "Opens blind hope.",
            cost: new Decimal(4)
        },
        14: {
            title: "Exploration.",
            description: ".",
            cost: new Decimal(12),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }
        },
        15: {
            title: "worship 101",
            description: "This will triple your pellet gain... and maybe your IQ.",
            cost: new Decimal(100)
        },
        16: {
            title: "Advanced scacrifice",
            description: "",
            cost: new Decimal(200),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x*2" }
        }
    }
})

    addLayer("w", {
        name: "worship", // This is optional, only used in a few places, If absent it just uses the layer id.
        symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
        position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
        startData() { return {
            unlocked: true,
            points: new Decimal(0), // Starting amount
        }},
        color: "#FFDCFF",
        requires: new Decimal(315), // Can be a function that takes requirement increases into account
        resource: "New hope", // Name of prestige currency
        baseResource: "red pellets", // Name of resource prestige is based on
        baseAmount() {return player.p.points}, // Get the current amount of baseResource
        type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        exponent: 1.25, // Prestige currency exponent
        gainMult() { // Calculate the multiplier for main currency from bonuses
            mult = new Decimal(1)
            if (hasUpgrade('x', 13)) mult = mult.times(3)
            if (player.x.unlocked) mult = mult.times(tmp.x.effect.cat)
            if (player.w.unlocked) mult = mult.times(tmp.w.effect.mat)
            return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
            return new Decimal(.5)
        },
        row: 0, // Row the layer is in on the tree (0 is the first row)
        hotkeys: [
            {key: "o", description: "P: Lose you pellets to grow red pikmin", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
        ],
        layerShown(){return player[this.layer].unlocked && hasUpgrade("x", 13)},
        passiveGeneration() {
            if (hasUpgrade('x', 13))
             return .1},
        effect() {
            if(layerShown)
            return {cat: player[this.layer].points.add(1).pow(0.04*2),
                mat: player[this.layer].points.add(1).pow(0.04*25)
        }},
        effectDescription() { // Optional text to describe the effects
            eff = this.effect();
            return "which is boosting buds by "+format(eff.cat) + "<br> which are boosting self by "+format(eff.mat)
        },
        upgrades: {
            11: {
                title: "Sun lord",
                description: "",
                cost: new Decimal(1000000)
            }
        }
        
    
})

addLayer("l", {
    name: "Land", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0), // Starting amount
    }},
    color: "#4BDC13",
    requires: new Decimal(15), // Can be a function that takes requirement increases into account
    resource: "Land", // Name of prestige currency
    baseResource: "red onion", // Name of resource prestige is based on
    baseAmount() {return player.q.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Lose you pellets to grow red pikmin", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player[this.layer].unlocked && hasUpgrade("w", 11)},
    effect() {
        return {  bat: player[this.layer].points.add(1).pow(2)
    }},
    effectDescription() { // Optional text to describe the effects
        eff = this.effect();
        return "which are boosting red pikmin by "+format(eff.bat)
    },
})
*/