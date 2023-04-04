save = { // all these variables get saved

    "money": 0,

    "inventory": { // *
        "coal": 1,
        "copper_ore": 2,
        "iron_ore": 1,
        "gold_ore": 1,
        "steel_ore": 1,

        "copper_bar": 1,
        "iron_bar": 1,
        "gold_bar": 1,
        "steel_bar": 1,

    },

    "skills": { // *
        "mining": {
            "level": 1,
            "xp": 1
        },
        "smithing": {
            "level": 1,
            "xp": 1
        }
    },

}

game = { // all variables that are not saved
    "version": "build 1",
    "active_inventory": null,
    "active_skill": null,
    "active_node": null,

    "bottom_tabs": {
        "console": true,
        "settings": false
    },
    "side_tabs": {
        "home": true,
        "inventory": false,
        "mining": false,
        "smithing": false
    },
    "side_icons": {
        "home": "home.png",
        "inventory": "backpack.png",
        "mining": "mining.png",
        "smithing": "bar.png"
    },

    "skills": {
        "mining": {
            
        },
        "smithing": {

        }
    },

    "nodes": {
        "mining": {
            "coal_mine": {
                "item": "coal",
                "xp_min": 3,
                "xp_max": 5,
                "name": "Coal mine",
                "icon": "rock.png",
                "button_text": "mine",
                "level": 1,
                "button_function": function() {nodeSwitch('mining', 'coal_mine')}
            },
            "copper_vein": {
                "item": "copper_ore",
                "xp_min": 3,
                "xp_max": 5,
                "name": "Copper vein",
                "icon": "rock.png",
                "button_text": "mine",
                "level": 1,
                "button_function": function() {nodeSwitch('mining', 'copper_vein')}
            },
            "iron_quarry": {
                "item": "iron_ore",
                "xp_min": 10,
                "xp_max": 15,
                "name": "Iron quarry",
                "icon": "rock.png",
                "button_text": "mine",
                "level": 5,
                "button_function": function() {nodeSwitch('mining', 'iron_quarry')}
            },
            "gold_lake": {
                "item": "gold_ore",
                "xp_min": 3,
                "xp_max": 5,
                "name": "Gold lake",
                "icon": "rock.png",
                "button_text": "mine",
                "level": 15,
                "button_function": function() {nodeSwitch('mining', 'gold_lake')}
            },
            "steel_cave": {
                "item": "steel_ore",
                "xp_min": 15,
                "xp_max": 17,
                "name": "Steel cave",
                "icon": "rock.png",
                "button_text": "mine",
                "level": 15,
                "button_function": function() {nodeSwitch('mining', 'steel_cave')}
            },

        },
        "smithing": {
            "copper_bar": {
                "item": "copper_bar",
                "items_needed": { // only crafting nodes need this
                    "copper_ore": 1,
                    "coal": 1
                },
                "xp_min": 3,
                "xp_max": 5,
                "level": 1,
                "name": "Copper bar",
                "icon": "bar.png",
                "button_text": "smith",
                "button_function": function() {nodeSwitch('smithing', 'copper_bar')}
            },
            "iron_bar": {
                "item": "iron_bar",
                "items_needed": { // only crafting nodes need this
                    "iron_ore": 1,
                    "coal": 1
                },
                "xp_min": 10,
                "xp_max": 15,
                "level": 5,
                "name": "Iron bar",
                "icon": "bar.png",
                "button_text": "smith",
                "button_function": function() {nodeSwitch('smithing', 'iron_bar')}
            },
            "gold_bar": {
                "item": "gold_bar",
                "items_needed": { // only crafting nodes need this
                    "gold_ore": 1,
                    "coal": 2
                },
                "xp_min": 3,
                "xp_max": 5,
                "level": 5,
                "name": "Gold bar",
                "icon": "bar.png",
                "button_text": "smith",
                "button_function": function() {nodeSwitch('smithing', 'gold_bar')}
            },
            "steel_bar": {
                "item": "steel_bar",
                "items_needed": { // only crafting nodes need this
                    "steel_ore": 1,
                    "coal": 1
                },
                "xp_min": 10,
                "xp_max": 15,
                "level": 5,
                "name": "Steel bar",
                "icon": "bar.png",
                "button_text": "smith",
                "button_function": function() {nodeSwitch('smithing', 'steel_bar')}
            },

        }
    },

    "items": {
        // mining
        "coal": {
            "value": 5,
            "name": "Coal"
        },
        "copper_ore": {
            "value": 10,
            "name": "Copper ore"
        },
        "iron_ore": {
            "value": 15,
            "name": "Iron ore"
        },
        "gold_ore": {
            "value": 30,
            "name": "Gold ore"
        },
        "steel_ore": {
            "value": 20,
            "name": "Steel ore"
        },
        // smithing
        "copper_bar": {
            "value": 20,
            "name": "Copper bar"
        },
        "iron_bar": {
            "value": 25,
            "name": "Iron bar"
        },
        "gold_bar": {
            "value": 60,
            "name": "Gold bar"
        },
        "steel_bar": {
            "value": 35,
            "name": "Steel bar"
        },



    },

    "motd": [
        "guess who's back in town",
        "click, wait, repeat",
        "two trucks moment",
        "undefeined",
        "you should play fiish",
        "NEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEERD",
        "meow mix, now available at all local stores",
        "play today at catrpg.xyz",
        "check out the discord catrpg.xyz/discord"
    ]
}