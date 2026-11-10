-- Script de criação e população do banco de dados PostgreSQL
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    cargo VARCHAR(20) NOT NULL DEFAULT 'ATENDENTE'
);

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    cpf VARCHAR(255) UNIQUE NOT NULL -- Criptografado (LGPD)
);

CREATE TABLE barbeiros (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    especialidade VARCHAR(50) NOT NULL
);

CREATE TABLE servicos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DOUBLE PRECISION NOT NULL,
    barbeiro_id INT NOT NULL REFERENCES barbeiros(id) ON DELETE CASCADE
);

CREATE TABLE agendamentos (
    id SERIAL PRIMARY KEY,
    data_horario TIMESTAMP NOT NULL,
    cliente_id INT NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
    servico_id INT NOT NULL REFERENCES servicos(id) ON DELETE CASCADE
);

-- População Inicial (Mínimo de 3 registros por tabela)
-- Hash de senha padrão de exemplo ('123456')
INSERT INTO usuarios (nome, email, senha, cargo) VALUES
('Gerente Carlos', 'admin@barbearia.com', '$2a$10$wE/x3D2vFv5C6z7A8B9C0e1F2G3H4I5J6K7L8M9N0O1P2Q3R4S5T6', 'ADMIN'),
('Atendente Lucas', 'lucas@barbearia.com', '$2a$10$wE/x3D2vFv5C6z7A8B9C0e1F2G3H4I5J6K7L8M9N0O1P2Q3R4S5T6', 'ATENDENTE'),
('Recepção Maria', 'maria@barbearia.com', '$2a$10$wE/x3D2vFv5C6z7A8B9C0e1F2G3H4I5J6K7L8M9N0O1P2Q3R4S5T6', 'ATENDENTE');

-- CPFs simulados criptografados
INSERT INTO clientes (nome, telefone, cpf) VALUES
('João Silva', '(48) 99999-1111', '$2a$10$cpf_hash_simulado_joao_111'),
('Pedro Santos', '(48) 98888-2222', '$2a$10$cpf_hash_simulado_pedro_222'),
('Marcos Oliveira', '(48) 97777-3333', '$2a$10$cpf_hash_simulado_marcos_333');

INSERT INTO barbeiros (nome, especialidade) VALUES
('Barbeiro Mestre André', 'Corte Clássico e Barba'),
('Barbeiro Bruno', 'Degradê e Freestyles'),
('Barbeiro Caio', 'Barboterapia e Visagismo');

INSERT INTO servicos (nome, preco, barbeiro_id) VALUES
('Corte Masculino Premium', 50.00, 1),
('Barba Completa com Toalha Quente', 40.00, 2),
('Combo Corte + Barba', 80.00, 3);

INSERT INTO agendamentos (data_horario, cliente_id, servico_id) VALUES
('2026-11-10 14:00:00', 1, 1),
('2026-11-10 15:00:00', 2, 2),
('2026-11-11 10:30:00', 3, 3);
