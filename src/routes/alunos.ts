import * as Express from "express";
import { AlunoServices } from "../services/AlunoServices";
import { AlunoRepository } from "../repositories/AlunoRepository";

const router = Express.Router();
const alunoServices = new AlunoServices(new AlunoRepository());

router.get("/", async (req, res) => {
  const alunos = await alunoServices.buscarTodos();
  res.json(alunos);
});

router.post("/", async (req, res) => {
  try {
    const { nome, email, senha, telefone, status } = req.body;

    const aluno = await alunoServices.cadastrar({
      nome,
      email,
      senha,
      telefone,
      status,
    });
    res.json(aluno);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const alunoDeletado = await alunoServices.deletar(id);
    res.json(alunoDeletado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const aluno = req.body;
    const alunoAtualizado = await alunoServices.atualizar(id, aluno);
    res.json(alunoAtualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const aluno = await alunoServices.buscarPorEmail(email);
    res.json(aluno);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const aluno = await alunoServices.buscarPorId(id);
    res.json(aluno);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;
    const aluno = await alunoServices.autenticar(email, senha);

    if (senha === aluno.senha && email === aluno.email) {
      delete aluno.senha;
      res.json({
        success: true,
        message: "Login realizado com sucesso",
        usuario: aluno,
      });
    }
  } catch (error) {
    res.status(401).json({ sucess: false, message: "Credenciais inválidas" });
  }
});

export default router;
