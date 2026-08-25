# Jira backlog javaslat

> A neveket és Assignee-kat a tényleges csapattagokhoz igazítsátok. Sprintbe csak olyan ticket kerüljön, amelynek van gazdája.

## EPIC 1 – Backend API és adatbázis

### STORY 1.1 – Feladatok tárolása – 3 SP
**User Story:** Felhasználóként szeretném, hogy a feladataim tartósan el legyenek mentve, hogy később is elérjem őket.

Sub-taskok:
- MySQL `task_manager` adatbázis létrehozása
- `tasks` tábla megtervezése
- Spring Boot adatbázis-kapcsolat konfigurálása
- `Task` entity létrehozása
- `TaskRepository` létrehozása

### STORY 1.2 – Feladat létrehozása – 3 SP
**User Story:** Felhasználóként szeretnék új feladatot létrehozni, hogy nyilván tudjam tartani a teendőimet.

Sub-taskok:
- POST `/api/tasks`
- Service create metódus
- Üres cím backend validáció
- Hibaválasz tesztelése

### STORY 1.3 – Feladatok lekérése – 3 SP
**User Story:** Felhasználóként szeretném látni a feladataimat és egy feladat részleteit.

Sub-taskok:
- GET `/api/tasks`
- GET `/api/tasks/{id}`
- Nem létező ID kezelése

### STORY 1.4 – Feladat módosítása – 3 SP
**User Story:** Felhasználóként szeretném módosítani egy feladat címét, leírását, státuszát és határidejét.

Sub-taskok:
- PUT `/api/tasks/{id}`
- Service update logika
- Validáció ellenőrzése

### STORY 1.5 – Feladat törlése – 2 SP
**User Story:** Felhasználóként szeretném törölni a már nem szükséges feladatokat.

Sub-taskok:
- DELETE `/api/tasks/{id}`
- Nem létező feladat kezelése

---

## EPIC 2 – Frontend felület

### STORY 2.1 – Feladatlista – 3 SP
**User Story:** Felhasználóként szeretném áttekinthető listában látni a feladataimat.

Sub-taskok:
- HTML főoldal
- Feladatkártyák CSS-e
- GET API bekötése JavaScripttel
- Üres állapot megjelenítése

### STORY 2.2 – Új feladat űrlap – 3 SP
**User Story:** Felhasználóként egy űrlapon szeretnék új feladatot létrehozni.

Sub-taskok:
- Modal elkészítése
- Form mezők
- Frontend cím validáció
- POST kérés
- Backend hibaüzenet megjelenítése

### STORY 2.3 – Szerkesztés és részletek – 5 SP
**User Story:** Felhasználóként szeretném megnyitni és módosítani a feladataimat.

Sub-taskok:
- Részletek modal
- Szerkesztés modal
- GET by ID
- PUT kérés

### STORY 2.4 – Törlés megerősítéssel – 2 SP
**User Story:** Felhasználóként csak külön megerősítés után szeretnék feladatot törölni, hogy elkerüljem a véletlen törlést.

Sub-taskok:
- Megerősítő modal
- DELETE kérés
- Lista frissítése

---

## EPIC 3 – Szűrés, minőség és dokumentáció

### STORY 3.1 – Státusz szerinti szűrés – 2 SP
**User Story:** Felhasználóként szeretném státusz alapján szűrni a feladataimat, hogy csak a számomra fontosakat lássam.

Sub-taskok:
- Státusz dropdown
- Backend `status` query paraméter
- Repository szűrés
- Frontend szűrés bekötése

### STORY 3.2 – Reszponzív és használható UI – 2 SP
**User Story:** Felhasználóként kisebb képernyőn is kényelmesen szeretném használni az alkalmazást.

Sub-taskok:
- Mobil CSS
- Űrlap és kártyák ellenőrzése
- Hiba/üres állapotok ellenőrzése

### STORY 3.3 – Projekt dokumentáció – 3 SP
**User Story:** Csapattagként szeretném dokumentálni a projektet, hogy bemutatható és követhető legyen a fejlesztési folyamat.

Sub-taskok:
- README kitöltése
- Csapatszerepek rögzítése
- AI-NAPLO folyamatos vezetése
- Sprint végén Story Point vs. Log Work összehasonlítás

## Sprint javaslat

### Sprint 1 – működő alap
- Story 1.1
- Story 1.2
- Story 1.3
- Story 2.1
- Story 2.2

### Sprint 2 – teljes minimum scope
- Story 1.4
- Story 1.5
- Story 2.3
- Story 2.4
- Story 3.1
- Story 3.2
- Story 3.3

A Jira ticketeket a munka közben mozgassátok `To Do → In Progress → Done` állapotok között, és a tényleges időt menet közben logoljátok.
