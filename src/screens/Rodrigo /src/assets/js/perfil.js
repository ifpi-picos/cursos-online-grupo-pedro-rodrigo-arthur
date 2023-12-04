const usuario = JSON.parse(localStorage.getItem("usuario"));

document.getElementById("idUsuario").innerHTML = `ID: ${usuario.id}`;
document.getElementById("nomeUsuario").innerHTML = `Nome: ${usuario.nome}`;
document.getElementById("emailUsuario").innerHTML = `Email: ${usuario.email}`;
document.getElementById("telefoneUsuario").innerHTML = `Telefone: ${usuario.telefone}`;
document.getElementById("statusUsuario").innerHTML = `Status: ${usuario.status === 1 ? 'Inativo' : 'Ativo'}`;
