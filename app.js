const API_URL = "http://localhost:8080/api/tasks";

const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const message = document.getElementById("message");
const statusFilter = document.getElementById("statusFilter");

const taskModal = document.getElementById("taskModal");
const taskForm = document.getElementById("taskForm");
const taskIdInput = document.getElementById("taskId");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const statusInput = document.getElementById("status");
const deadlineInput = document.getElementById("deadline");
const titleError = document.getElementById("titleError");
const modalTitle = document.getElementById("modalTitle");

const detailsModal = document.getElementById("detailsModal");
const taskDetails = document.getElementById("taskDetails");

const deleteModal = document.getElementById("deleteModal");
let taskToDelete = null;
let allTasks = [];

const statusLabels = {
    TODO: "Teendő",
    IN_PROGRESS: "Folyamatban",
    DONE: "Kész"
};

function escapeHtml(value = "") {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function formatDate(date) {
    if (!date) return "Nincs megadva";
    return new Intl.DateTimeFormat("hu-HU").format(new Date(`${date}T00:00:00`));
}

function showMessage(text) {
    message.textContent = text;
    message.classList.remove("hidden");
}

function hideMessage() {
    message.classList.add("hidden");
}

async function apiRequest(url, options = {}) {
    const response = await fetch(url, {
        headers: { "Content-Type": "application/json", ...(options.headers || {}) },
        ...options
    });

    if (response.status === 204) return null;

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        const error = new Error(data.message || "Hiba történt a kérés feldolgozásakor.");
        error.data = data;
        throw error;
    }
    return data;
}

async function loadTasks() {
    hideMessage();
    const selectedStatus = statusFilter.value;
    const url = selectedStatus ? `${API_URL}?status=${selectedStatus}` : API_URL;

    try {
        const tasks = await apiRequest(url);
        renderTasks(tasks);
        await loadCounts();
    } catch (error) {
        renderTasks([]);
        showMessage("Nem sikerült kapcsolódni a backendhez. Ellenőrizd, hogy a Spring Boot alkalmazás fut-e a 8080-as porton.");
    }
}

async function loadCounts() {
    try {
        allTasks = await apiRequest(API_URL);
        document.getElementById("allCount").textContent = allTasks.length;
        document.getElementById("todoCount").textContent = allTasks.filter(t => t.status === "TODO").length;
        document.getElementById("progressCount").textContent = allTasks.filter(t => t.status === "IN_PROGRESS").length;
        document.getElementById("doneCount").textContent = allTasks.filter(t => t.status === "DONE").length;
    } catch (_) {
        // A fő hibaüzenetet a loadTasks kezeli.
    }
}

function renderTasks(tasks) {
    taskList.innerHTML = "";
    emptyState.classList.toggle("hidden", tasks.length !== 0);

    tasks.forEach(task => {
        const item = document.createElement("article");
        item.className = "task-item";
        item.innerHTML = `
            <div class="task-card-top">
                <span class="task-number">TASK #${String(task.id).padStart(3, "0")}</span>
                <span class="status-badge status-${task.status}">${statusLabels[task.status] || task.status}</span>
            </div>
            <h3 class="task-title">${escapeHtml(task.title)}</h3>
            <p class="task-description">${escapeHtml(task.description || "Nincs leírás.")}</p>
            <div class="task-card-footer">
                <span class="task-meta">◷ ${formatDate(task.deadline)}</span>
                <div class="task-actions" aria-label="Feladat műveletek">
                    <button class="action-btn" data-action="details" data-id="${task.id}" title="Részletek" aria-label="Részletek">i</button>
                    <button class="action-btn" data-action="edit" data-id="${task.id}" title="Szerkesztés" aria-label="Szerkesztés">✎</button>
                    <button class="action-btn delete" data-action="delete" data-id="${task.id}" title="Törlés" aria-label="Törlés">×</button>
                </div>
            </div>
        `;
        taskList.appendChild(item);
    });
}

function openCreateModal() {
    taskForm.reset();
    taskIdInput.value = "";
    titleError.textContent = "";
    modalTitle.textContent = "Új feladat";
    statusInput.value = "TODO";
    taskModal.classList.remove("hidden");
    taskModal.setAttribute("aria-hidden", "false");
    titleInput.focus();
}

async function openEditModal(id) {
    try {
        const task = await apiRequest(`${API_URL}/${id}`);
        taskIdInput.value = task.id;
        titleInput.value = task.title;
        descriptionInput.value = task.description || "";
        statusInput.value = task.status;
        deadlineInput.value = task.deadline || "";
        titleError.textContent = "";
        modalTitle.textContent = "Feladat szerkesztése";
        taskModal.classList.remove("hidden");
        taskModal.setAttribute("aria-hidden", "false");
    } catch (error) {
        showMessage(error.message);
    }
}

function closeTaskModal() {
    taskModal.classList.add("hidden");
    taskModal.setAttribute("aria-hidden", "true");
}

async function saveTask(event) {
    event.preventDefault();
    titleError.textContent = "";

    if (!titleInput.value.trim()) {
        titleError.textContent = "A cím megadása kötelező.";
        titleInput.focus();
        return;
    }

    const task = {
        title: titleInput.value.trim(),
        description: descriptionInput.value.trim(),
        status: statusInput.value,
        deadline: deadlineInput.value || null
    };

    const id = taskIdInput.value;
    const method = id ? "PUT" : "POST";
    const url = id ? `${API_URL}/${id}` : API_URL;

    try {
        await apiRequest(url, { method, body: JSON.stringify(task) });
        closeTaskModal();
        await loadTasks();
    } catch (error) {
        if (error.data?.errors?.title) {
            titleError.textContent = error.data.errors.title;
        } else {
            showMessage(error.message);
        }
    }
}

async function showDetails(id) {
    try {
        const task = await apiRequest(`${API_URL}/${id}`);
        taskDetails.innerHTML = `
            <div class="details-grid">
                <div class="detail-block"><span>Cím</span><strong>${escapeHtml(task.title)}</strong></div>
                <div class="detail-block"><span>Leírás</span><p>${escapeHtml(task.description || "Nincs leírás.")}</p></div>
                <div class="detail-block"><span>Státusz</span><strong>${statusLabels[task.status] || task.status}</strong></div>
                <div class="detail-block"><span>Határidő</span><strong>${formatDate(task.deadline)}</strong></div>
            </div>
        `;
        detailsModal.classList.remove("hidden");
        detailsModal.setAttribute("aria-hidden", "false");
    } catch (error) {
        showMessage(error.message);
    }
}

function askDelete(id) {
    taskToDelete = id;
    deleteModal.classList.remove("hidden");
    deleteModal.setAttribute("aria-hidden", "false");
}

async function confirmDelete() {
    if (!taskToDelete) return;
    try {
        await apiRequest(`${API_URL}/${taskToDelete}`, { method: "DELETE" });
        taskToDelete = null;
        deleteModal.classList.add("hidden");
        await loadTasks();
    } catch (error) {
        showMessage(error.message);
    }
}

document.getElementById("newTaskBtn").addEventListener("click", openCreateModal);
document.getElementById("closeModalBtn").addEventListener("click", closeTaskModal);
document.getElementById("cancelBtn").addEventListener("click", closeTaskModal);
taskForm.addEventListener("submit", saveTask);
statusFilter.addEventListener("change", loadTasks);

document.getElementById("closeDetailsBtn").addEventListener("click", () => detailsModal.classList.add("hidden"));
document.getElementById("cancelDeleteBtn").addEventListener("click", () => {
    taskToDelete = null;
    deleteModal.classList.add("hidden");
});
document.getElementById("confirmDeleteBtn").addEventListener("click", confirmDelete);

taskList.addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const id = button.dataset.id;
    if (button.dataset.action === "details") showDetails(id);
    if (button.dataset.action === "edit") openEditModal(id);
    if (button.dataset.action === "delete") askDelete(id);
});

[taskModal, detailsModal, deleteModal].forEach(modal => {
    modal.addEventListener("click", event => {
        if (event.target === modal) modal.classList.add("hidden");
    });
});


const sidebarFilters = document.querySelectorAll(".nav-item[data-filter]");

function syncSidebarFilter() {
    sidebarFilters.forEach(button => {
        button.classList.toggle("active", button.dataset.filter === statusFilter.value);
    });
}

sidebarFilters.forEach(button => {
    button.addEventListener("click", () => {
        statusFilter.value = button.dataset.filter;
        syncSidebarFilter();
        loadTasks();
    });
});

statusFilter.addEventListener("change", syncSidebarFilter);
syncSidebarFilter();

loadTasks();
