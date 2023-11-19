-- COMMENT: Arquivo de criação das tabelas do banco de dados teste
DROP DATABASE teste;
CREATE DATABASE teste;
\c teste;

-- Definição da Tabela Professor
CREATE TABLE professor (
id SERIAL PRIMARY KEY,
nome VARCHAR(255) NOT NULL,
telefone VARCHAR(20) NOT NULL,
email VARCHAR(320) NOT NULL
);

-- Definição da Tabela Curso
CREATE TABLE curso (
id SERIAL PRIMARY KEY,
nome VARCHAR(255) NOT NULL,
carga_horaria INT NOT NULL,
id_professor INT REFERENCES professor(id),
status VARCHAR(255) NOT NULL
);

-- Definição da Tabela Aluno
CREATE TABLE aluno (
id SERIAL PRIMARY KEY,
nome VARCHAR(255) NOT NULL,
email VARCHAR(320) NOT NULL,
telefone VARCHAR(20) NOT NULL,
status VARCHAR(255) NOT NULL
    );

-- Definição da Tabela Curso_Aluno
CREATE TABLE curso_aluno (
id_curso INT REFERENCES curso(id),
id_aluno INT REFERENCES aluno(id),
nota1 NUMERIC(5, 2) NOT NULL,
nota2 NUMERIC(5, 2) NOT NULL,
nota3 NUMERIC(5, 2) NOT NULL,
media NUMERIC(5, 2) NOT NULL,
situacao VARCHAR(255) NOT NULL,
PRIMARY KEY (id_curso, id_aluno)
);

SELECT * FROM professor;
SELECT * FROM curso;
SELECT * FROM aluno;
SELECT * FROM curso_aluno;