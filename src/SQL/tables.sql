-- Definição da Tabela Professor
CREATE TABLE professor (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(320) NOT NULL
);
ALTER TABLE professor
ADD CONSTRAINT email_unique UNIQUE (email);

-- Definição da Tabela Curso
CREATE TABLE curso (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    carga_horaria INT NOT NULL,
    status VARCHAR(255) NOT NULL
);

-- Adicionando restrição UNIQUE à coluna "nome" na tabela Curso
ALTER TABLE curso
ADD CONSTRAINT nome_unique UNIQUE (nome);

-- Definição da Tabela Aluno
CREATE TABLE aluno (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(320) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    status VARCHAR(255) NOT NULL
);

-- Adicionando restrição UNIQUE à coluna "email" na tabela Aluno
ALTER TABLE aluno
ADD CONSTRAINT email_unique UNIQUE (email);


-- Definição da Tabela Curso_Aluno
CREATE TABLE curso_aluno (
    id_curso INT REFERENCES curso(id),
    id_aluno INT REFERENCES aluno(id),
    nota1 INT NOT NULL,
    nota2 INT NOT NULL,
    nota3 INT NOT NULL,
    media INT NOT NULL,
    PRIMARY KEY (id_curso, id_aluno)
);

-- Adicionando restrições FOREIGN KEY à tabela Curso_Aluno
ALTER TABLE curso_aluno
ADD CONSTRAINT fk_curso FOREIGN KEY (id_curso) REFERENCES curso(id),
ADD CONSTRAINT fk_aluno FOREIGN KEY (id_aluno) REFERENCES aluno(id);

-- Definição da Tabela Curso_Professor
CREATE TABLE curso_professor (
    id_curso INT REFERENCES curso(id),
    id_professor INT REFERENCES professor(id),
    PRIMARY KEY (id_curso, id_professor)
);

-- Adicionando restrições FOREIGN KEY à tabela Curso_Professor
ALTER TABLE curso_professor
ADD CONSTRAINT fk_curso FOREIGN KEY (id_curso) REFERENCES curso(id),
ADD CONSTRAINT fk_professor FOREIGN KEY (id_professor) REFERENCES professor(id);