CREATE TABLE professor (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,  -- Ajustado para um possível formato de telefone
    email VARCHAR(320) NOT NULL  -- Ajustado para o tamanho máximo de um endereço de e-mail
);

CREATE TABLE curso (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    carga_horaria INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    id_professor INT REFERENCES professor(id)
);

CREATE TABLE aluno (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(320) NOT NULL,  -- Ajustado para o tamanho máximo de um endereço de e-mail
    telefone VARCHAR(20) NOT NULL,  -- Ajustado para um possível formato de telefone
    status VARCHAR(255) NOT NULL
);

CREATE TABLE curso_aluno (
    id_curso INT REFERENCES curso(id),
    id_aluno INT REFERENCES aluno(id),
    notas1 INT NOT NULL,
    notas2 INT NOT NULL,
    notas3 INT NOT NULL,
    PRIMARY KEY (id_curso, id_aluno)
);
