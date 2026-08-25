# NOVA Tasks – Task Manager

Scrum keretrendszerben készített Task Manager alkalmazás, HTML/CSS/JavaScript frontenddel, Java Spring Boot backenddel és MySQL adatbázissal.

## Csapat

- Csapatnév: **[írjátok be]**
- Csapattag 1 – szerep: **[írjátok be]**
- Csapattag 2 – szerep: **[írjátok be]**
- Csapattag 3 – szerep: **[ha van]**

A szerepek induló felelősségeket jelölnek; Scrum csapatként mindenki részt vehet több területen is.

## Technológiai stack

- Frontend: HTML5, CSS3, vanilla JavaScript
- Backend: Java 17, Spring Boot 4.1.0
- API: REST/JSON
- Adatbázis: MySQL
- ORM/adatelérés: Spring Data JPA / Hibernate
- Build tool: Maven
- Verziókezelés: Git + GitHub
- Projektmenedzsment: Jira Scrum

### Miért ezt választottuk?

A HTML/CSS/JavaScript frontend könnyen átlátható és nem igényel külön frontend frameworköt. A Java Spring Boot gyorsan felépíthető REST API-t, validációt és adatbázis-integrációt ad. A MySQL relációs adatbázis jól illik a strukturált Task adatokhoz, és a csapat számára könnyen kezelhető.

## Funkciók

- [x] Create – új feladat létrehozása
- [x] Read – feladatok listázása
- [x] Read – egy feladat részleteinek megtekintése
- [x] Update – cím, leírás, státusz és határidő módosítása
- [x] Delete – törlés külön megerősítéssel
- [x] MySQL adatbázis
- [x] Üres cím validálása frontenden és backenden
- [x] Státusz szerinti szűrés
- [x] Reszponzív felület

## Projektstruktúra

```text
task-manager-scrum/
├── frontend/
│   ├── index.html
│   ├── css/style.css
│   └── js/app.js
├── backend/
│   ├── pom.xml
│   └── src/main/...
├── database/database.sql
├── JIRA-BACKLOG.md
├── AI-NAPLO.md
└── README.md
```

## Backend architektúra

```text
TaskController
      ↓
TaskService
      ↓
TaskRepository
      ↓
    MySQL
```

- **Controller:** HTTP kéréseket fogad és választ ad.
- **Service:** az alkalmazás üzleti logikája.
- **Repository:** az adatbázis műveleteit végzi a Spring Data JPA segítségével.
- **Model/Entity:** megadja, hogyan néz ki egy Task objektum és az adatbázisrekord.

## API végpontok

| Metódus | URL | Funkció |
|---|---|---|
| GET | `/api/tasks` | Összes feladat |
| GET | `/api/tasks?status=TODO` | Szűrés státuszra |
| GET | `/api/tasks/{id}` | Egy feladat részletei |
| POST | `/api/tasks` | Új feladat |
| PUT | `/api/tasks/{id}` | Feladat módosítása |
| DELETE | `/api/tasks/{id}` | Feladat törlése |

### Példa JSON

```json
{
  "title": "Frontend elkészítése",
  "description": "A főoldal és a feladatkártyák megvalósítása.",
  "status": "IN_PROGRESS",
  "deadline": "2026-08-25"
}
```

Érvényes státuszok: `TODO`, `IN_PROGRESS`, `DONE`.

## Indítás

### 1. MySQL

Indítsátok el a MySQL-t MAMP-ban/XAMPP-ban vagy külön MySQL Serverként.

Alapértelmezett beállítás:

```properties
host: localhost
port: 3306
database: task_manager
username: root
password: üres
```

Ha ettől eltér a beállításotok, módosítsátok a `backend/src/main/resources/application.properties` fájlt, vagy adjatok meg `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` környezeti változókat.

A `database/database.sql` manuálisan is lefuttatható. A Spring Boot `createDatabaseIfNotExist=true` és `ddl-auto=update` beállításai miatt fejlesztés közben a tábla automatikusan is létrejöhet.

### 2. Backend

A `backend` mappában:

```bash
mvn spring-boot:run
```

A backend címe:

```text
http://localhost:8080
```

### 3. Frontend

A `frontend` mappát ne csak `file://` módban nyissátok, hanem indítsatok egy egyszerű helyi webszervert. VS Code-ban például Live Serverrel.

Ezután nyissátok meg a Live Server által adott címet, például:

```text
http://127.0.0.1:5500/frontend/index.html
```

A backend CORS beállítása elfogadja a localhost/127.0.0.1 fejlesztői portokat.

## Bemutatón fontos

Minden csapattag tudja elmagyarázni legalább ezeket:

1. Mi történik, amikor a frontend `fetch()` kérést küld?
2. Mi a Controller, Service és Repository feladata?
3. Hogyan lesz a Java Task objektumból MySQL rekord?
4. Hol történik a cím validációja?
5. Hogyan működik a státusz szerinti szűrés?
6. Miért kell megerősítés törlés előtt?
