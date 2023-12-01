const form = document.getElementById("contact-us-form");

form.addEventListener("submit", formSubmit);

function formSubmit(e) {
    e.preventDefault()

    const nome = document.getElementById("firstname").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;
    const telefone = document.getElementById("Number").value;

    const professor = {
        nome: nome,
        email: email,
        senha: senha,
        telefone: telefone,
    }

  fetch("http://localhost:3000/professores/cadastro", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(professor)
    }).then(res => res.json()).then(res => {
        alert("Professor cadastrado com sucesso!");
        window.location.href = "login.html";
    }).catch(err => {
        alert("Erro ao cadastrar professor!");
    })

}