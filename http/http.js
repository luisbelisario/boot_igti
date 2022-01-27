function fetchJson(url) {
    return fetch(url).then((r) => {
        return r.json();
    })
}

function listEmployees() {
    return fetchJson("http://localhost:3000/employees");
}

function listRoles() {
    return fetchJson("http://localhost:3000/roles");
}

/*
// Criar
fetch(`http://localhost:3000/employees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
});

//Atualizar
fetch(`http://localhost:3000/employees/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
});

//Excluir
fetch(`http://localhost:3000/employees/${id}`, {
    method: "DELETE",
});
*/

export {listEmployees, listRoles};