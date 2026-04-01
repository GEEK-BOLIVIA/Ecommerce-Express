// resources/js/modules/sidebar.js

const STORAGE_KEY = 'sidebar_collapsed';
const WIDTH_EXPANDED = 280;
const WIDTH_COLLAPSED = 68;

function getSidebar() { return document.getElementById('sidebar'); }
function getToggleBtn() { return document.getElementById('sidebar-toggle'); }
function getToggleIcon() { return document.getElementById('sidebar-toggle-icon'); }

function applyState(collapsed) {
    const el = getSidebar();
    const btn = getToggleBtn();
    const icon = getToggleIcon();
    if (!el || !btn || !icon) return;

    if (collapsed) {
        // Encoger aside
        el.style.width = `${WIDTH_COLLAPSED}px`;
        el.style.minWidth = `${WIDTH_COLLAPSED}px`;

        // Mover botón toggle
        btn.style.left = `${WIDTH_COLLAPSED - 12}px`;

        // Cambiar ícono
        icon.textContent = 'chevron_right';

        // Ocultar textos, labels de sección y flechas con style directo
        el.querySelectorAll('.sidebar-show').forEach(n => {
            n.style.display = 'none';
        });

        // Mostrar favicon colapsado
        el.querySelectorAll('.sidebar-only').forEach(n => {
            n.style.display = 'block';
        });

        // Cerrar todos los acordeones
        el.querySelectorAll('details').forEach(d => d.removeAttribute('open'));

    } else {
        // Expandir aside
        el.style.width = `${WIDTH_EXPANDED}px`;
        el.style.minWidth = `${WIDTH_EXPANDED}px`;

        // Mover botón toggle
        btn.style.left = `${WIDTH_EXPANDED - 12}px`;

        // Cambiar ícono
        icon.textContent = 'chevron_left';

        // Restaurar visibilidad — style vacío deja que Tailwind tome control
        el.querySelectorAll('.sidebar-show').forEach(n => {
            n.style.display = '';
        });

        // Ocultar favicon colapsado
        el.querySelectorAll('.sidebar-only').forEach(n => {
            n.style.display = 'none';
        });
    }
}

function toggle() {
    const collapsed = localStorage.getItem(STORAGE_KEY) === 'true';
    const next = !collapsed;
    localStorage.setItem(STORAGE_KEY, String(next));
    applyState(next);
}

function init() {
    const collapsed = localStorage.getItem(STORAGE_KEY) === 'true';
    applyState(collapsed);

    const btn = getToggleBtn();
    if (btn && !btn.dataset.sidebarBound) {
        btn.addEventListener('click', toggle);
        btn.dataset.sidebarBound = 'true';
    }
}

document.addEventListener('DOMContentLoaded', init);
document.addEventListener('livewire:navigated', init);
