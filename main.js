const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");


// düzenleme seçenekleri
let editElement;
let editFlag = false
let editID = "";


form.addEventListener("submit", addItem);

clearBtn.addEventListener("click", clearItems);

window.addEventListener("DOMContentLoaded", setupItems);

//! Functions

// 1) Listeye Ürün Ekleme
function addItem(e) {
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();

    if (value !== "" && !editFlag) {
        const element = document.createElement("article");
        let attr = document.createAttribute("data-id");
        attr.value = id;
        element.classList.add("grocery-item");
        element.setAttributeNode(attr);
        // console.log(element);

        element.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
            <button class="edit-btn" type="button"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="delete-btn" type="button"><i class="fa-solid fa-trash"></i></button>

        </div>`;

        const deleteBtn = element.querySelector(".delete-btn")
        deleteBtn.addEventListener("click", deleteItem);

        const editBtn = element.querySelector(".edit-btn");
        editBtn.addEventListener("click", editItem)

        list.appendChild(element);
        displayAlert("Item successfully added", "success");

        container.classList.add("show-container");

        addToLocalStorage(id, value);

        setBackToDefault();

    } else if (value !== "" && editFlag) {
        editElement.innerHTML = value;
        displayAlert("Value Changed", "success");
        editLocalStorage(editID, value);
        setBackToDefault();
    } else {
        displayAlert("Please Enter an Item", "danger");
    }


}


// 2) Alert Fonksiyonu
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    console.log(alert);

    setTimeout(function () {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 2000);
}

// temizleme

function setBackToDefault() {
    grocery.value = "";
    editFlag = false;
    editID = "";
    submitBtn.textContent = "submit";
}

// silme
function deleteItem(e) {

    const element = e.currentTarget.parentElement.parentElement;

    const id = element.dataset.id;

    list.removeChild(element);

    if (list.children.length == 0) {
        container.classList.remove("show-container");

    }
    displayAlert("Item Successfully Removed", "danger");
    removeFromLocaleStorage(id);
}

function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;

    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = "edit";
}

function clearItems() {
    const items = document.querySelectorAll(".grocery-item");

    if (items.length > 0) {
        items.forEach(function (item) {
            list.removeChild(item);

        });

    }
    container.classList.remove("show-container");
    displayAlert("List cleared", "danger")
    setBackToDefault();

}




function addToLocalStorage(id, value) {
    const grocery = { id, value }
    let items = getLocalStorage();
    items.push(grocery);
    localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
    return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];
}

function removeFromLocaleStorage(id) {
    let items = getLocalStorage();

    items = items.filter(function (item) {
        if (item.id !== id);
        return item;
    });
}

function editLocalStorage(id, value) {

}

function setupItems() {
    let items = getLocalStorage
}