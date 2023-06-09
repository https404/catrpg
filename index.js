function nodeSwitch(skill, node) {
    if (game["active_skill"] == null && game["active_node"] == null) {
        if (game["nodes"][skill][node]["level"] <= save["skills"][skill]["level"]) {
            game["active_skill"] = skill
            game["active_node"] = node
            startNode()    
        } else {
            consoleLog(`You need level ${game["nodes"][skill][node]["level"]}`)
        }
    } else {
        if (game["active_skill"] == skill && game["active_node"] == node) {
            game["active_skill"] = null
            game["active_node"] = null
            stopNode()
        }
    }
    update("skills")
}

function ran(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);


}
function colorpicker(type) {
    let root = document.querySelector(':root');
    console.log(document.getElementById(`cp_${type}`).value) // debug
    save["profile"]["color"] = document.getElementById(`cp_${type}`).value
    root.style.setProperty(`--${type}`, document.getElementById(`cp_${type}`).value);

}

function checkResources(skill, node) {
    let nodeswitch = true
    for (let i = 0; i < Object.getOwnPropertyNames(game["nodes"][skill][node]["items_needed"]).length; i++) {
        let itemName = Object.getOwnPropertyNames(game["nodes"][skill][node]["items_needed"])[i]
        let itemAmmount = game["nodes"][skill][node]["items_needed"][itemName]
        if (save["inventory"][itemName] < itemAmmount) {
            nodeswitch = false
        }
    }
    return nodeswitch
}


function startNode() {
    nodeLoop = setInterval(() => {
        if (game["active_skill"] == "mining" || game["active_skill"] == "woodcutting") { // mining
            save["inventory"][game["nodes"][game["active_skill"]][game["active_node"]]["item"]] += 1 // gets the item from the node and adds it to our inventory
            let xp = ran(game["nodes"][game["active_skill"]][game["active_node"]]["xp_min"], game["nodes"][game["active_skill"]][game["active_node"]]["xp_max"])
            save["skills"][game["active_skill"]]["xp"] += xp
            consoleLog(`+1 ${game["nodes"][game["active_skill"]][game["active_node"]]["item"]}, +${xp} xp`)
        }
        if (game["active_skill"] == "smithing") { // smithing
            if (checkResources(game["active_skill"], game["active_node"]) == true) {
                for (let i = 0; i < Object.getOwnPropertyNames(game["nodes"][game["active_skill"]][game["active_node"]]["items_needed"]).length; i++) {
                    let itemName = Object.getOwnPropertyNames(game["nodes"][game["active_skill"]][game["active_node"]]["items_needed"])[i]
                    let itemAmmount = game["nodes"][game["active_skill"]][game["active_node"]]["items_needed"][itemName]
                    save["inventory"][itemName] -= itemAmmount
                    
                }
                let xp = ran(game["nodes"][game["active_skill"]][game["active_node"]]["xp_min"], game["nodes"][game["active_skill"]][game["active_node"]]["xp_max"])
                save["skills"][game["active_skill"]]["xp"] += xp
    
                consoleLog(`+1 ${game["nodes"][game["active_skill"]][game["active_node"]]["item"]}, +${xp} xp`)
                save["inventory"][game["nodes"][game["active_skill"]][game["active_node"]]["item"]] += 1
                
            } else {
                game["active_skill"] = null
                game["active_node"] = null
                consoleLog("not enough resources")
                stopNode()
            }
        }
        if (game["active_skill"] == "firemaking") { // firemaking
            if (checkResources(game["active_skill"], game["active_node"]) == true) {
                for (let i = 0; i < Object.getOwnPropertyNames(game["nodes"][game["active_skill"]][game["active_node"]]["items_needed"]).length; i++) {
                    let itemName = Object.getOwnPropertyNames(game["nodes"][game["active_skill"]][game["active_node"]]["items_needed"])[i]
                    let itemAmmount = game["nodes"][game["active_skill"]][game["active_node"]]["items_needed"][itemName]
                    save["inventory"][itemName] -= itemAmmount
                }
                let xp = ran(game["nodes"][game["active_skill"]][game["active_node"]]["xp_min"], game["nodes"][game["active_skill"]][game["active_node"]]["xp_max"])
                save["skills"][game["active_skill"]]["xp"] += xp
    
                consoleLog(`+${xp} xp`)
    
            } else {
                game["active_skill"] = null
                game["active_node"] = null
                consoleLog("not enough resources")
                stopNode()
            }

        }
        update("skills")
        update("xp")
        update("inventory")
    }, 1000);
}

function stopNode() {
    clearInterval(nodeLoop)
}

function nodeSetupInfo(skill) {
    // info box
    let node_holder = document.querySelector(`#${skill}Node_holder`)

    let node_halfBox = document.createElement("div")
    let node_halfBoxTop = document.createElement("div")
    let node_halfBoxBottom = document.createElement("div")
    let node_halfBoxSpan = document.createElement("span")
    let node_halfBoxIcon = document.createElement("img")
    let node_halfBoxText = document.createElement("p")

    node_halfBox.className = "halfBox"

    node_halfBoxTop.className = "halfBox_top"

    node_halfBoxBottom.className = "halfBox_bottom"

    node_halfBoxSpan.innerHTML = "info"
    
    node_halfBoxIcon.src = `assets/info.png`
    node_halfBoxIcon.className = "skillIcon_1"

    node_halfBoxText.className = "skillText_2"
    node_halfBoxText.innerHTML = `xp - ${save["skills"][skill]["xp"]} / ${save["skills"][skill]["level"] * game["xp_offset"]}`
    node_halfBoxTop.appendChild(node_halfBoxIcon)
    node_halfBoxTop.appendChild(node_halfBoxSpan)

    node_halfBoxBottom.appendChild(node_halfBoxText)

    node_halfBox.appendChild(node_halfBoxTop)
    node_halfBox.appendChild(node_halfBoxBottom)
    
    node_holder.appendChild(node_halfBox)
    
    
}

function nodeSetup(style, skill) {
    if (style == 1) { // normal resources (click to collect not crafting)
        $(`#${skill}Node_holder`).empty()
        nodeSetupInfo(skill)
        for (let i = 0; i < Object.getOwnPropertyNames(game["nodes"][skill]).length; i++) { // goes through all the nodes
            if (save["skills"][skill]["level"] >= game["nodes"][skill][Object.getOwnPropertyNames(game["nodes"][skill])[i]]["level"]) { // if we have enough level to use this node
                let node_holder = document.querySelector(`#${skill}Node_holder`)

                let node_halfBox = document.createElement("div")
                let node_halfBoxTop = document.createElement("div")
                let node_halfBoxBottom = document.createElement("div")
                let node_halfBoxSpan = document.createElement("span")
                let node_halfBoxIcon = document.createElement("img")
                let node_halfBoxButton = document.createElement("button")

                node_halfBox.className = "halfBox"

                node_halfBoxTop.className = "halfBox_top"

                node_halfBoxBottom.className = "halfBox_bottom"

                node_halfBoxSpan.innerHTML = game["nodes"][skill][Object.getOwnPropertyNames(game["nodes"][skill])[i]]["name"]
                
                node_halfBoxIcon.src = `assets/${game["nodes"][skill][Object.getOwnPropertyNames(game["nodes"][skill])[i]]["icon"]}`
                node_halfBoxIcon.className = "skillIcon_1"
                
                node_halfBoxButton.innerHTML = game["nodes"][skill][Object.getOwnPropertyNames(game["nodes"][skill])[i]]["button_text"]
                if (game["active_node"] == Object.getOwnPropertyNames(game["nodes"][skill])[i]) {
                    node_halfBoxButton.className = "skillButton_1 skillButton_1Active"
                } else {
                    node_halfBoxButton.className = "skillButton_1"
                }
                node_halfBoxButton.onclick = game["nodes"][skill][Object.getOwnPropertyNames(game["nodes"][skill])[i]]["button_function"]
                
                node_halfBoxTop.appendChild(node_halfBoxIcon)
                node_halfBoxTop.appendChild(node_halfBoxSpan)

                node_halfBoxBottom.appendChild(node_halfBoxButton)

                node_halfBox.appendChild(node_halfBoxTop)
                node_halfBox.appendChild(node_halfBoxBottom)
                
                node_holder.appendChild(node_halfBox)
            }
        }    
    }
    if (style == 2) { // for crafting skills
        $(`#${skill}Node_holder`).empty()
        nodeSetupInfo(skill)
        for (let i = 0; i < Object.getOwnPropertyNames(game["nodes"][skill]).length; i++) { // goes through all the nodes 
            if (save["skills"][skill]["level"] >= game["nodes"][skill][Object.getOwnPropertyNames(game["nodes"][skill])[i]]["level"]) { // if we have enough level to use this node
                let node_holder = document.querySelector(`#${skill}Node_holder`)

                let node_halfBox = document.createElement("div")
                let node_halfBoxTop = document.createElement("div")
                let node_halfBoxBottom = document.createElement("div")
                let node_halfBoxSpan = document.createElement("span")
                let node_halfBoxIcon = document.createElement("img")
                let node_halfBoxButton = document.createElement("button")
                let node_halfBoxItems = document.createElement("p")

                node_halfBox.className = "halfBox"

                node_halfBoxTop.className = "halfBox_top"

                node_halfBoxBottom.className = "halfBox_bottom"

                node_halfBoxSpan.innerHTML = game["nodes"][skill][Object.getOwnPropertyNames(game["nodes"][skill])[i]]["name"]
                
                node_halfBoxIcon.src = `assets/${game["nodes"][skill][Object.getOwnPropertyNames(game["nodes"][skill])[i]]["icon"]}`
                node_halfBoxIcon.className = "skillIcon_1"
                
                nodeItemsList = []
                for (let x = 0; x < Object.getOwnPropertyNames(game["nodes"][skill][Object.getOwnPropertyNames(game["nodes"][skill])[i]]["items_needed"]).length; x++) {
                    let name = Object.getOwnPropertyNames(game["nodes"][skill][Object.getOwnPropertyNames(game["nodes"][skill])[i]]["items_needed"])[x]
                    nodeItemsList.push(` ${game["items"][name]["name"]} - <span style="color: var(--ac)"> ${game["nodes"][skill][Object.getOwnPropertyNames(game["nodes"][skill])[i]]["items_needed"][name]}</span>`)
                }
                node_halfBoxItems.innerHTML = nodeItemsList.join("\n")
                node_halfBoxItems.className = "skillText_2"
                if (game["active_node"] == Object.getOwnPropertyNames(game["nodes"][skill])[i]) {
                    node_halfBoxButton.className = "skillButton_1 skillButton_1Active"
                } else {
                    node_halfBoxButton.className = "skillButton_1"
                }
                node_halfBoxButton.innerHTML = game["nodes"][skill][Object.getOwnPropertyNames(game["nodes"][skill])[i]]["button_text"]
                
                node_halfBoxButton.onclick = game["nodes"][skill][Object.getOwnPropertyNames(game["nodes"][skill])[i]]["button_function"]
                
                node_halfBoxTop.appendChild(node_halfBoxIcon)
                node_halfBoxTop.appendChild(node_halfBoxSpan)

                node_halfBoxBottom.appendChild(node_halfBoxItems)
                node_halfBoxBottom.appendChild(node_halfBoxButton)

                node_halfBox.appendChild(node_halfBoxTop)
                node_halfBox.appendChild(node_halfBoxBottom)
                
                node_holder.appendChild(node_halfBox)
            }
        }    
        
    }
    if (style == 3) { // for firemaking !ONLY!
        let node_holder = document.querySelector(`#${skill}Node_holder`)
        $(`#${skill}Node_holder`).empty()
        nodeSetupInfo(skill)

        let node_halfBox = document.createElement("div")
        let node_halfBoxTop = document.createElement("div")
        let node_halfBoxBottom = document.createElement("div")
        let node_halfBoxSpan = document.createElement("span")
        let node_halfBoxIcon = document.createElement("img")
        let node_halfBoxDropdown = document.createElement("select")
        let node_halfBoxButton = document.createElement("button")


        node_halfBox.className = "halfBox"

        node_halfBoxTop.className = "halfBox_top"

        node_halfBoxBottom.className = "halfBox_bottom"

        node_halfBoxSpan.innerHTML = "Firemaking"
        
        node_halfBoxIcon.src = `assets/fire.png`
        node_halfBoxIcon.className = "skillIcon_1"

        node_halfBoxDropdown.id = "firemaking_dropDown"
        node_halfBoxDropdown.className = "skillDropdown_1"
        node_halfBoxDropdown.onclick = function() { // this is needed to prevent the selected item from changing when updating this *1/2
            game["skills"]["firemaking"]["selectedNode"] = document.getElementById('firemaking_dropDown').value
        }

        node_halfBoxButton.innerHTML = "Burn"

        if (game["active_skill"] == "firemaking") {
            node_halfBoxButton.className = "skillButton_1 skillButton_1Active"
        } else {
            node_halfBoxButton.className = "skillButton_1"
        }

        node_halfBoxButton.onclick = function() {nodeSwitch('firemaking', document.getElementById('firemaking_dropDown').value)}

        node_halfBoxTop.appendChild(node_halfBoxIcon)
        node_halfBoxTop.appendChild(node_halfBoxSpan)

        node_halfBoxBottom.appendChild(node_halfBoxDropdown)

        node_halfBoxBottom.appendChild(node_halfBoxButton)

        node_halfBox.appendChild(node_halfBoxTop)
        node_halfBox.appendChild(node_halfBoxBottom)
        
        node_holder.appendChild(node_halfBox)

        $("#firemaking_dropDown").empty() // this is for the dropdown nodes
        for (let i = 0; i < Object.getOwnPropertyNames(game["nodes"][skill]).length; i++) { // this is for the dropdown nodes
            if (save["skills"][skill]["level"] >= game["nodes"][skill][Object.getOwnPropertyNames(game["nodes"][skill])[i]]["level"]) { // if we have enough level to use this node
                let firemaking_dropDown =document.querySelector("#firemaking_dropDown") 

                let dropDown_option = document.createElement("option")

                dropDown_option.value = Object.getOwnPropertyNames(game["nodes"][skill])[i]

                dropDown_option.innerHTML = game["nodes"][skill][Object.getOwnPropertyNames(game["nodes"][skill])[i]]["name"]
                firemaking_dropDown.appendChild(dropDown_option)
            }
        }
        document.getElementById('firemaking_dropDown').value = game["skills"]["firemaking"]["selectedNode"] // this is needed to prevent the selected item from changing when updating this *2/2
    }

}

function update(updaie) {
    if (updaie == "all" || updaie == "tabs") {
        $("#bottomBar_tabs").empty()
        $("#sideBar_tabs").empty()
        $("#sideBar_Skilltabs").empty()
        for (let i = 0; i < Object.getOwnPropertyNames(game["bottom_tabs"]).length; i++) {
            let bottomBar_tabs = document.querySelector("#bottomBar_tabs")

            let bottomBar_button = document.createElement("button")
            if (game["bottom_tabs"][Object.getOwnPropertyNames(game["bottom_tabs"])[i]] == false) {
                document.getElementById(`bottomBar_page_${Object.getOwnPropertyNames(game["bottom_tabs"])[i]}`).style.display = "none"
                bottomBar_button.className = "bottomBar_button"
            } else {
                document.getElementById(`bottomBar_page_${Object.getOwnPropertyNames(game["bottom_tabs"])[i]}`).style.display = ""
                bottomBar_button.className = "bottomBar_button bottomBar_buttonSelected"
            }

            bottomBar_button.innerHTML = Object.getOwnPropertyNames(game["bottom_tabs"])[i]
            bottomBar_button.onclick = function() {tabSwitch('bottom_tabs', Object.getOwnPropertyNames(game["bottom_tabs"])[i])}
            bottomBar_tabs.appendChild(bottomBar_button)
        }

        for (let i = 0; i < Object.getOwnPropertyNames(game["side_tabs"]).length; i++) {
            let sideBar_tabs = document.querySelector("#sideBar_tabs")
            let sideBar_Skilltabs = document.querySelector("#sideBar_Skilltabs")

            let sideBar_button = document.createElement("button")

            let sideBar_text = document.createElement("span")

            let sideBar_image = document.createElement("img")
            
            sideBar_image.src = `assets/${game["side_icons"][Object.getOwnPropertyNames(game["side_tabs"])[i]]}`

            sideBar_image.className = "sideBar_icon"


            sideBar_button.onclick = function() {tabSwitch('side_tabs', Object.getOwnPropertyNames(game["side_tabs"])[i])}

            if (game["side_tabs"][Object.getOwnPropertyNames(game["side_tabs"])[i]] == false) {
                document.getElementById(`page_${Object.getOwnPropertyNames(game["side_tabs"])[i]}`).style.display = "none"
                sideBar_button.className = "sideBar_button"
            } else {
                document.getElementById(`page_${Object.getOwnPropertyNames(game["side_tabs"])[i]}`).style.display = ""
                sideBar_button.className = "sideBar_button sideBar_buttonSelected"
            }
            sideBar_button.appendChild(sideBar_image)
            sideBar_button.appendChild(sideBar_text)

            if (Object.getOwnPropertyNames(game["skills"]).includes(Object.getOwnPropertyNames(game["side_tabs"])[i])) { // checks if the tab name is a skill
                sideBar_text.innerHTML = Object.getOwnPropertyNames(game["side_tabs"])[i] + " " + save["skills"][Object.getOwnPropertyNames(game["side_tabs"])[i]]["level"] + "/20"
                sideBar_Skilltabs.appendChild(sideBar_button)
            } else {
                sideBar_text.innerHTML = Object.getOwnPropertyNames(game["side_tabs"])[i]
                sideBar_tabs.appendChild(sideBar_button)

            }



        }
    }
    if (updaie == "all" || updaie == "skills") {
        for (let i = 0; i < Object.getOwnPropertyNames(game["skills"]).length; i++) {
            if (Object.getOwnPropertyNames(game["skills"])[i] == "mining") {
                nodeSetup(1, "mining")
            }
            if (Object.getOwnPropertyNames(game["skills"])[i] == "smithing") {
                nodeSetup(2, "smithing")
            }
            if (Object.getOwnPropertyNames(game["skills"])[i] == "woodcutting") {
                nodeSetup(1, "woodcutting")
            }
            if (Object.getOwnPropertyNames(game["skills"])[i] == "firemaking") {
                nodeSetup(3, "firemaking")
            }

        }
    }
    if (updaie == "all" || updaie == "xp") {
        for (let i = 0; i < Object.getOwnPropertyNames(game["skills"]).length; i++) {
            let skillName = Object.getOwnPropertyNames(game["skills"])[i]
            if (save["skills"][skillName]["xp"] >= save["skills"][skillName]["level"] * game["xp_offset"]) {
                if (save["skills"][skillName]["level"] < 20) { // checks our max level
                    save["skills"][skillName]["xp"] -= save["skills"][skillName]["level"] * game["xp_offset"]
                    save["skills"][skillName]["level"] += 1
                    console.log(`A level has been added to ${skillName} `) // debug 
                    update("tabs")
                    update("xp")    
                }
            }
        }
    }
    if (updaie == "all" || updaie == "inventory") {
        document.getElementById("moneyHolder").innerHTML = save["money"]
        $("#inventoryHolder").empty()
        console.log(document.getElementById("inventorySearch").value) // debug
            for (let i = 0; i < Object.getOwnPropertyNames(save["inventory"]).length; i++) {
                let invName = Object.getOwnPropertyNames(save["inventory"])[i]
                let invOwned = save["inventory"][invName]
                let displayName = game["items"][invName]["name"]
                if (invOwned > 0) {
                    let invHolder = document.querySelector("#inventoryHolder")
    
                    let invItem = document.createElement("div")
                    if (game["active_inventory"] == invName) {
                        invItem.style = "border-left: 1px solid white;"
                    }
                    invItem.innerHTML = `${displayName}: ${invOwned}`
                    invItem.id = `invItem_${invName}`
                    invItem.onclick = function() {invClick(invName)}
                    invItem.className = "inventoryItem"
                    if (document.getElementById("inventorySearch").value == "") { // checks if we've searched anything
                        invHolder.appendChild(invItem)

                    } else if (displayName.toLowerCase().includes(document.getElementById("inventorySearch").value.toLowerCase())) { // checks all items if the search is contained in it
                        invHolder.appendChild(invItem)

                    }
                }
            }

        
    }
    if (updaie == "all" || updaie == "motd") {
        let motd = ran(0, game["motd"].length - 1)
        console.log(game["motd"][motd]) // debug
        document.getElementById("motd").innerHTML = game["motd"][motd]
        let root = document.querySelector(':root');
        root.style.setProperty(`--ac`, save["profile"]["color"]);


    }
}


function consoleLog(message) {
    let console_holder = document.querySelector("#console_holder")

    let console_child = document.createElement("p")

    console_child.innerHTML = message
    console_child.style = "margin : 0;"

    console_holder.appendChild(console_child)

}

function download(filename, text) { // stack overflow winning!!!!
}
  
function exportGame() {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(JSON.parse(localStorage.getItem("cookiedata")))));
    element.setAttribute('download', "save.txt");
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

function tabSwitch(bar, tabName) {
    for (let i = 0; i < Object.getOwnPropertyNames(game[bar]).length; i++) {
        game[bar][Object.getOwnPropertyNames(game[bar])[i]] = false;
    }
    game[bar][tabName] = true;
    update("tabs")
}

function saveGame() {
    localStorage.setItem("cookiedata", JSON.stringify(save));
    consoleLog("game has been saved")
}
function resetGame() {
    localStorage.setItem("cookiedata", JSON.stringify({}));
    consoleLog("Please reload for the reset to take affect") // debug 
}
function loadGame() {
    let cookiedata = JSON.parse(localStorage.getItem("cookiedata"));
        //if (typeof gamedata.currentWeather !== "undefined") gameTDM.currentweather = gamedata.currentWeather;    
    if (localStorage.getItem("cookiedata") != null) {
        console.log(cookiedata) // debug
        if (typeof cookiedata["inventory"] == "undefined") { cookiedata["inventory"] = save["inventory"]; console.log("Data missing default setting") } // debug 
        if (typeof cookiedata["profile"] == "undefined") { cookiedata["profile"] = save["profile"]; console.log("Data missing default setting") } // debug 
        if (typeof cookiedata["skills"] == "undefined") {cookiedata["skills"] = save["skills"]; console.log("Data missing default setting") } // debug 
        if (typeof cookiedata["money"] == "undefined") {cookiedata["money"] = save["money"]; console.log("Data missing default setting") } // debug 

            
        if (typeof cookiedata["inventory"] != "undefined") {
            for (let i = 0; i < Object.getOwnPropertyNames(save["inventory"]).length; i++) {
                if (cookiedata["inventory"][Object.getOwnPropertyNames(save["inventory"])[i]] == undefined) {
                    console.log("Data missing default setting") // debug
                    cookiedata["inventory"][Object.getOwnPropertyNames(save["inventory"])[i]] = save["inventory"][Object.getOwnPropertyNames(save["inventory"])[i]]
                }
            }
        }

        if (typeof cookiedata["profile"] != "undefined") {
            for (let i = 0; i < Object.getOwnPropertyNames(save["profile"]).length; i++) {
                if (cookiedata["profile"][Object.getOwnPropertyNames(save["profile"])[i]] == undefined) {
                    console.log("Data missing default setting") // debug
                    cookiedata["profile"][Object.getOwnPropertyNames(save["profile"])[i]] = save["profile"][Object.getOwnPropertyNames(save["profile"])[i]]
                }
            }
        }

        if (typeof cookiedata["skills"] != "undefined") {
            for (let i = 0; i < Object.getOwnPropertyNames(save["skills"]).length; i++) {
                if (cookiedata["skills"][Object.getOwnPropertyNames(save["skills"])[i]] == undefined) {
                    console.log("Data missing default setting") // debug
                    cookiedata["skills"][Object.getOwnPropertyNames(save["skills"])[i]] = save["skills"][Object.getOwnPropertyNames(save["skills"])[i]]
                }
            }
        }

        if (typeof cookiedata["skills"] != "undefined") {
            for (let i = 0; i < Object.getOwnPropertyNames(save["skills"]).length; i++) {
                for (let x = 0; x < Object.getOwnPropertyNames(save["skills"][Object.getOwnPropertyNames(save["skills"])[i]]).length; x++) {
                    if (cookiedata["skills"][Object.getOwnPropertyNames(save["skills"])[i]][Object.getOwnPropertyNames(save["skills"][Object.getOwnPropertyNames(save["skills"])[i]])[x]] == undefined) {
                        console.log("Data missing default setting") // debug
                        cookiedata["skills"][Object.getOwnPropertyNames(save["skills"])[i]][Object.getOwnPropertyNames(save["skills"][Object.getOwnPropertyNames(save["skills"])[i]])[x]] = save["skills"][Object.getOwnPropertyNames(save["skills"])[i]][Object.getOwnPropertyNames(save["skills"][Object.getOwnPropertyNames(save["skills"])[i]])[x]]
                    }
                }
            }
        }
        document.getElementById("versionText").innerHTML = game["version"]
        save = cookiedata
    }
    setTimeout(() => { // sometimes visual glitches happen just to be safe have it for an extra second!
        document.getElementById("loadingScreen").style.display = "none"; // hides the loading screen
    }, 1000);

}

document.addEventListener("keydown", function(e) {
    if (e.ctrlKey && e.which == 83) {
        e.preventDefault();
        saveGame()
    }
}, false);


function sellButton() {
    if (game["active_inventory"] != null && save["inventory"][game["active_inventory"]] >= 1) {
        console.log(save["inventory"][game["active_inventory"]])
        save["money"] += save["inventory"][game["active_inventory"]] * game["items"][game["active_inventory"]]["value"]
        consoleLog(`Sold $${save["inventory"][game["active_inventory"]] * game["items"][game["active_inventory"]]["value"]}`)
        save["inventory"][game["active_inventory"]] = 0

        update('inventory')
    }
}

function invClick(name) {
    if (game["active_inventory"] != name) {
        game["active_inventory"] = name
        update('inventory')
    } else {
        game["active_inventory"] = null
        update('inventory')

    }
}

window.setInterval(function() { // stack overflow gaming
    var elem = document.getElementById('console_holder');
    elem.scrollTop = elem.scrollHeight;
}, 1);
loadGame()
update("all")
consoleLog("welcome to catrpg")
