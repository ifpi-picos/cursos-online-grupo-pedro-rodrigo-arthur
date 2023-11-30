import * as Express from "express";
import { CursoAlunoServices } from "../services/CursoAlunoServices";
const router = Express.Router();

const cursoAlunoServices = new CursoAlunoServices();

router.get("/", async (req, res) => {
  const cursosAlunos = await cursoAlunoServices.buscarTodos();
  res.json(cursosAlunos);
});

router.post("/", async (req, res) => {
  try {
    const cursoAluno = req.body;
    const cursoAlunoSalvo = await cursoAlunoServices.cadastro(cursoAluno);
    res.json(cursoAlunoSalvo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req);
    const cursoAlunoDeletado = await cursoAlunoServices.deletar(id);
    res.json(cursoAlunoDeletado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
