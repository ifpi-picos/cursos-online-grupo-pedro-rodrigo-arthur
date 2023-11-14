CREATE TABLE Professor (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE Curso (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    carga_horaria INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    id_professor INT REFERENCES Professor(id)
);

CREATE TABLE Aluno (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefone VARCHAR(255) NOT NULL
);


/* Relacionamento N:N*/
CREATE TABLE Curso_Aluno (
    id_curso INT REFERENCES Curso(id),
    id_aluno INT REFERENCES Aluno(id),
    PRIMARY KEY (id_curso, id_aluno)
);