import Conexao from "./DAO/Conexao";
import { CursoDAO } from "./DAO/CursoDAO";
import { IProfessor } from "./DAO/IDAO";
import { ProfessorDAO } from "./DAO/ProfessorDAO";
import { StatusCurso } from "./ENUM/StatusCurso";
import { Curso } from "./Entidades/Curso";
import { Professor } from "./Entidades/Professor";

async function cadastrarProfessor() {
  try {
    const conexao = new Conexao();
    const cursoDAO = new CursoDAO(conexao);
    const professorDAO = new ProfessorDAO(conexao);

    // Criar professor
    const professor = new Professor(
      "Faiska Massacre",
      "44444",
      "faika@gmail.com"
    );

    // Cadastrar professor no banco de dados
    const professorCadastrado = (await professorDAO.cadastrar(
      professor
    )) as unknown as IProfessor;
    // console.log(professorCadastrado.id);

    if (!professorCadastrado) {
      console.log("Erro ao cadastrar o professor.");
      return;
    }
    // const id_professor = professorCadastrado.getId();
    // console.log(professorCadastrado);

    // Criar curso associado ao professor cadastrado
    const curso = new Curso(
      "Curso Como pegar mulher casada",
      100,
      StatusCurso.ATIVO,
      professorCadastrado.id
    );

    // Cadastrar curso no banco de dados
    await cursoDAO.cadastrar(curso);

    // Exibir cursos e professores
    const mostrarCurso = await cursoDAO.buscarTodos();
    const mostrarProfessor = await professorDAO.buscarTodos();

    console.log(mostrarCurso);
    console.log(mostrarProfessor);

    console.log(curso.getIdProfessor());
  } catch (err) {
    console.log(err);
  }
}

cadastrarProfessor();
