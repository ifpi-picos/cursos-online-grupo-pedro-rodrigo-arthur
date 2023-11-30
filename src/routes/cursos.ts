import * as express from "express";
import { CursoServices } from "../services/CursoSevices";

const router = express.Router();
const cursoServices = new CursoServices();

router.get("/", async (req, res) => {
  const cursos = await cursoServices.buscarTodos();
  res.json(cursos);
});

router.post("/", async (req, res) => {
  try {
    const curso = req.body;
    const cursoSalvo = await cursoServices.cadastrar(curso);
    res.json(cursoSalvo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const cursoDeletado = await cursoServices.deletar(id);
    res.json(cursoDeletado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const curso = req.body;
    const cursoAtualizado = await cursoServices.atualizar(id, curso);
    res.json(cursoAtualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/professor/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const cursos = await cursoServices.buscarCursosIdProfessor(id);
    res.json(cursos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const curso = await cursoServices.buscarPorId(id);
    res.json(curso);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
