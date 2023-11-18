-- COMMENT: Arquivo de criação das tabelas do banco de dados teste
DROP DATABASE teste;
-- Criação do banco de dados teste
CREATE DATABASE teste;
\c teste;

-- Definição da Tabela Professor
CREATE TABLE professor (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(320) NOT NULL
);

-- Adicionando restrição UNIQUE à coluna "nome" na tabela Professor
ALTER TABLE professor
ADD CONSTRAINT nome_email_unique UNIQUE (nome, email);

-- Definição da Tabela Curso
CREATE TABLE curso (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    carga_horaria INT NOT NULL,
    status VARCHAR(255) NOT NULL
);

-- Adicionando restrição UNIQUE à coluna "nome" na tabela Curso
ALTER TABLE curso
ADD CONSTRAINT nome_carga_unique UNIQUE (nome, carga_horaria);

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
    nota1 INT NOT NULL,
    nota2 INT NOT NULL,
    nota3 INT NOT NULL,
    media INT NOT NULL,
    situacao VARCHAR(255) NOT NULL,
    PRIMARY KEY (id_curso, id_aluno)
);

-- Adicionando restrições FOREIGN KEY à tabela Curso_Aluno
ALTER TABLE curso_aluno
ADD CONSTRAINT fk_curso FOREIGN KEY (id_curso) REFERENCES curso(id),
ADD CONSTRAINT fk_aluno FOREIGN KEY (id_aluno) REFERENCES aluno(id);

-- Definição da Tabela Curso_Professor
CREATE TABLE curso_professor (
    id_curso INT NOT NULL REFERENCES curso(id),
    id_professor INT NOT NULL REFERENCES professor(id),
    PRIMARY KEY (id_curso, id_professor)
);

-- Adicionando restrições FOREIGN KEY à tabela Curso_Professor
ALTER TABLE curso_professor
ADD CONSTRAINT fk_curso_prof FOREIGN KEY (id_curso) REFERENCES curso(id),
ADD CONSTRAINT fk_professor_prof FOREIGN KEY (id_professor) REFERENCES professor(id);

-- Adicionando colunas "nome_curso" e "nome_professor" à tabela Curso_Professor
ALTER TABLE curso_professor
ADD COLUMN nome_curso varchar(255) NOT NULL,
ADD COLUMN nome_professor varchar(255) NOT NULL;

-- Adicionando restrição UNIQUE às colunas "nome_curso" e "nome_professor" na tabela Curso_Professor
ALTER TABLE curso_professor
ADD CONSTRAINT nome_curso_unique UNIQUE (nome_curso, nome_professor);
