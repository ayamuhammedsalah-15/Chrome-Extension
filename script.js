let saveButton = document.getElementById("input-btn")
const inputField = document.getElementById("input-el")
const list = document.getElementById("list")
const errorEl = document.getElementById("error-el")
let myLeads = []

// Detect whether we're running as a Chrome extension or a normal webpage
const isExtension = typeof chrome !== "undefined" && chrome.storage && chrome.storage.local




function saveToStorage() {
    if (isExtension) {
        chrome.storage.local.set({ myLeads: myLeads })
    } else {
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
    }
}

function loadFromStorage(callback) {
    if (isExtension) {
        chrome.storage.local.get(["myLeads"], function (result) {
            myLeads = result.myLeads || []
            callback()
        })
    } else {
        const stored = localStorage.getItem("myLeads")
        myLeads = stored ? JSON.parse(stored) : []
        callback()
    }
}

function addLead() {
    let value = inputField.value.trim()

    if (value === "") {
        errorEl.textContent = "Please enter a value before saving."
        return
    }

    errorEl.textContent = ""
    myLeads.push(value)

    inputField.value = ""
    inputField.focus()

    saveToStorage()
    renderList()
}

function renderList() {
    list.innerHTML = ""
    myLeads.forEach(function (lead, index) {
        let li = document.createElement("li")

        let link = document.createElement("a")
        link.textContent = lead
        link.href = lead
        link.target = "_blank"
        link.rel = "noopener noreferrer"

        let deleteBtn = document.createElement("button")
        deleteBtn.textContent = "✕"
        deleteBtn.className = "delete-btn"
        deleteBtn.addEventListener("click", function () {
            myLeads.splice(index, 1)
            saveToStorage()
            renderList()
        })

        li.appendChild(link)
        li.appendChild(deleteBtn)
        list.appendChild(li)
    })
}

// Load saved leads on startup, then render
loadFromStorage(renderList)

saveButton.addEventListener("click", addLead)

inputField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addLead()
    }
})
