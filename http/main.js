import {listEmployees, listRoles} from './http.js';

let employees = []
let roles = []
let selectedItem;

const listEl = document.querySelector("ul");
const formEl = document.querySelector("form");
const bcreate = document.getElementById("bsubmit");
const bcancel = document.getElementById("bcancel");
const bdelete = document.getElementById("bdelete");

function clearSelection() {
    selectedItem = undefined;
    const li = listEl.querySelector(".selected");
    if (li) {
        li.classList.remove("selected");
    }
    formEl.name.value = "";
    formEl.salary.value = "";
    formEl.role_id.value = "";
    bdelete.style.display = "none";
    bcancel.style.display = "none";
}

function selectItem(employee, li) {
    clearSelection();
    selectedItem = employee;
    li.classList.add("selected");
    formEl.name.value = employee.name;
    formEl.salary.valueAsNumber = employee.salary;
    formEl.role_id.value = employee.role_id;
    bdelete.style.display = "inline";
    bcancel.style.display = "inline";
}

function renderRoles() {
    for (const role of roles) {
        const option = document.createElement("option");
        option.textContent = role.name;
        option.value = role.id;
        formEl.role_id.appendChild(option)
    }
}

function renderData() {
    for (const employee of employees) {
        let role = roles.find(role => role.id == employee.role_id);
        const li = document.createElement("li");
        const divName = document.createElement("div");
        const divRole = document.createElement("div");
        divName.textContent = employee.name;
        divRole.textContent = role.name;
        li.appendChild(divName);
        li.appendChild(divRole);
        listEl.appendChild(li);

        li.addEventListener("click", (e) => {
            selectItem(employee, e.currentTarget);
        });
    }
}

function showError() {
    document.getElementById("error").textContent = "Erro ao carregar dados";
}

async function init() {
    try {
        [employees, roles] = await Promise.all([listEmployees(), listRoles()])
        renderRoles();
        renderData();
        clearSelection();
        bcancel.addEventListener("click", () => clearSelection());
    }
    catch (error) {
        showError();
    }
}

/*
// indicado para promises sequenciais ou seja quando a segunda depende da primeira
function solution1() {
    fetchJson("http://localhost:3000/employees").then((employees => {
        fetchJson("http://localhost:3000/roles").then((roles) => {
            document.getElementById("app").innerHTML = renderTable(employees, roles);
        })
    }))
}

// indicado para promises não sequenciais

function solution2() {
    let empPromise = fetchJson("http://localhost:3000/employees");
    let rolesPromise = fetchJson("http://localhost:3000/roles");
    Promise.all([empPromise, rolesPromise])
    .then(([employees, roles]) => {
        document.getElementById("app").innerHTML = renderTable(employees, roles);
    })
}


//solution2();

// ao usar funções assincronas o await ja retorna o resultado da promise
// async/await faz com que uma chamada assincrona vire (por baixo dos panos), síncrona
async function solution3() {
    let employees = await fetchJson("http://localhost:3000/employees");
    let roles = await fetchJson("http://localhost:3000/roles");
    document.getElementById("app").innerHTML = renderTable(employees, roles);
}

async function teste() {
    return "valor";
}

//solution3();
*/

/*
async function solution4() {
    [employees, roles] = await Promise.all([listEmployees(), listRoles()])
    document.getElementById("app").innerHTML = renderTable();
}
*/
init();
