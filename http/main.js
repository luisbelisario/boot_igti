import {listEmployees, listRoles} from './http.js';

let employees = []
let roles = []

const listEl = document.querySelector("ul");
const formEl = document.querySelector("form");

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
    }
}

function showError() {
    document.getElementById("error").textContent = "Erro ao carregar dados";
}

async function init() {
    try {
        [employees, roles] = await Promise.all([listEmployees(), listRoles()])
        renderData();
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
