let saveButton = document.getElementById("input-btn")
const inputField = document.getElementById("input-el")
const list = document.getElementById("list")
const errorEl = document.getElementById("error-el")
const myLeads = []

function addLead() {
    let value = inputField.value.trim()

    if (value === "") {
        errorEl.textContent = "Please enter a value before saving."
        return
    }

    errorEl.textContent = ""
    myLeads.push(value)
    console.log(myLeads)

    inputField.value = ""
    inputField.focus()

    renderList()
}

function renderList() {
    list.innerHTML = ""
    myLeads.forEach(function (lead, index) {
        let li = document.createElement("li")

        let textSpan = document.createElement("span")
        textSpan.textContent = lead

        let deleteBtn = document.createElement("button")
        deleteBtn.textContent = "✕"
        deleteBtn.className = "delete-btn"
        deleteBtn.addEventListener("click", function () {
            myLeads.splice(index, 1)
            renderList()
        })

        li.appendChild(textSpan)
        li.appendChild(deleteBtn)
        list.appendChild(li)
    })
}

saveButton.addEventListener("click", addLead)

inputField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addLead()
    }
})