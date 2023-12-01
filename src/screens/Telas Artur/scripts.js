const formCadAluno = document.getElementById("cadastro-aluno");

formCadAluno.addEventListener("submit", formCadAluno);

function formCadAluno(e) {
    e.preventDefault()

    const nome = document.getElementById("firstname").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;
    const telefone = document.getElementById("Number").value;
    const status = document.getElementById("status").value;

    const aluno = {
        nome: nome,
        email: email,
        senha: senha,
        telefone: telefone,
        status: status,
    }

  fetch("http://localhost:3000/alunos/cadastro", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(aluno)
    }).then(res => res.json()).then(res => {
        alert("Aluno cadastrado com sucesso!");
        window.location.href = "login.html";
    }).catch(err => {
        alert("Erro ao cadastrar aluno!");
    })

}