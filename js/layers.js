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
    resource: "Signature", // Name of prestige currency
    baseResource: "writing", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('p', 12)) mult = mult.times(2)
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
        //let softcap2 = new Decimal(800000)
        let softcap2 = new Decimal(300)
        
        return softcap2
    },
    softcapPower() {
        let softcappower2 = new Decimal(0)


        return softcappower2
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
            description: "It was hard to notice how fast you're adapting. <br> doubles Signature gain",
            cost: new Decimal(20),
            unlocked() {return hasMilestone('p', 1)}
        },
        13: {
            title: "escape dangerous places.",
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
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0), // Starting amount
    }},
    color: "#4BDCFF",
    requires: new Decimal(400), // Can be a function that takes requirement increases into account
    resource: "Wavers", // Name of prestige currency
    baseResource: "signiture", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    canBuyMax: true,
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "q", description: "", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player[this.layer].unlocked && hasUpgrade("x", 13)},
    softcap() {
        //let softcap2 = new Decimal(800000)
        let softcap2 = new Decimal(300)
        
        return softcap2
    },
    softcapPower() {
        let softcappower2 = new Decimal(0)


        return softcappower2
    },
    milestones: {
        0: {
            requirementDescription: "Greatings card",
            effectDescription: "anything can be useful, when everything else was destroyed",
            done() { return player.p.points.gte(1) }
        },
        1: {
            requirementDescription: "100 wavers",
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
            title: "Leading questions",
            description: "know twice as many people.",
            cost: new Decimal(1)
        }
    }
})

