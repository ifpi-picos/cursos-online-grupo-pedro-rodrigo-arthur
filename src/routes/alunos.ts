import * as Express from "express";
import { AlunoServices } from "../services/AlunoServices";

const router = Express.Router();
const alunoServices = new AlunoServices();

router.get("/", async (req, res) => {
  const alunos = await alunoServices.buscarTodos();
  res.json(alunos);
});

router.post("/", async (req, res) => {
  try {
    const aluno = req.body;
    const alunoSalvo = await alunoServices.cadastrar(aluno);
    res.json(alunoSalvo);
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

router.get("/email/:email", async (req, res) => {
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

export default router;
