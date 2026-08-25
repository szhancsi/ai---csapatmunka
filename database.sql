CREATE DATABASE IF NOT EXISTS task_manager
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_hungarian_ci;

USE task_manager;

CREATE TABLE IF NOT EXISTS tasks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(2000),
    status VARCHAR(30) NOT NULL DEFAULT 'TODO',
    deadline DATE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Opcionális mintaadatok:
INSERT INTO tasks (title, description, status, deadline)
SELECT 'Jira backlog elkészítése', 'Epic-ek, Story-k és Sub-taskok felvétele.', 'TODO', CURDATE() + INTERVAL 5 DAY
WHERE NOT EXISTS (SELECT 1 FROM tasks);
