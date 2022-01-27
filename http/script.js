function fetchJson(url) {
    return fetch(url).then((r) => {
        return r.json();
    })
}

function renderTable(employees, roles) {
    let rows = employees.map(employee => {
        let role = roles.find(role => role.id == employee.role_id)
        return `<tr><td>${employee.id}</td><td>${employee.name}</td><td>${role.name}</td></tr>`
    })
    return `<table>${rows.join("")}</table>`
}

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

async function solution4() {
    let empPromise = fetchJson("http://localhost:3000/employees");
    let rolesPromise = fetchJson("http://localhost:3000/roles");
    let [employees, roles] = await Promise.all([empPromise, rolesPromise])
    document.getElementById("app").innerHTML = renderTable(employees, roles);
}

solution4();