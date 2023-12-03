const form = document.getElementById("contact-us-form");

form.addEventListener("submit", formSubmit);

function formSubmit(e) {
    e.preventDefault()
    console.log("é maee é mae")

    const nome = document.getElementById("nomeAluno").value;
    const email = document.getElementById("emailAluno").value;
    const senha = document.getElementById("senhaAluno").value;
    const telefone = document.getElementById("telefoneAluno").value;
    const status = document.getElementById("statusAluno").value;

    const aluno = {
        nome: nome,
        email: email,
        senha: senha,
        telefone: telefone,
        status: status,
    }

    console.log("aluno", aluno)


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