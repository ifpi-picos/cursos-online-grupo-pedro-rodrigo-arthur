DROP DATABASE typeorm;
CREATE DATABASE typeorm;
\c typeorm 

CREATE TABLE aluno (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL,
    status text NOT NULL,
    senha text NOT NULL
);

CREATE TABLE professor (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL,
    senha text NOT NULL
);

CREATE TABLE curso (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    carga_horaria INT NOT NULL,
    status TEXT NOT NULL,
    id_professor INT REFERENCES professor(id)
);

CREATE TABLE curso_aluno (
    id_curso INT REFERENCES curso(id),
    id_aluno INT REFERENCES aluno(id),
    nota1 NUMERIC(5,2) NOT NULL,
    nota2 NUMERIC(5,2) NOT NULL,
    nota3 NUMERIC(5,2) NOT NULL,
    media NUMERIC(5,2) NOT NULL,
    situacao TEXT NOT NULL,
    statusmatricula TEXT NOT NULL,
    PRIMARY KEY (id_curso, id_aluno)
);

SELECT * FROM aluno;
SELECT * FROM professor;
SELECT * FROM curso;
SELECT * FROM curso_aluno;