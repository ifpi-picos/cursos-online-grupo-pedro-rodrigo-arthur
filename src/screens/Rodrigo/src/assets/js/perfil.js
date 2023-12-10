const usuario = JSON.parse(localStorage.getItem("usuario"));

document.getElementById("nomeUsuario").value = usuario.nome
document.getElementById("emailUsuario").value = usuario.email
document.getElementById("telefoneUsuario").value = usuario.telefone

document
    .getElementById("professor_form")
    .addEventListener("submit", atualizarProfessor);

function atualizarProfessor(event) {
    event.preventDefault();
    const professor = {
        nome: document.getElementById("nomeUsuario").value,
        email: document.getElementById("emailUsuario").value,
        senha: document.getElementById("senhaUsuario").value,
        telefone: document.getElementById("telefoneUsuario").value,
    };

    fetch(`http://localhost:3000/professores/${usuario.id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(professor),
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.error) {
                alert(res.error);
            } else {
                alert("Professor atualizado com sucesso!");
            }
        })
        .catch((err) => {
            alert("Erro ao cadastrar Professor!");
        });
}
