import './styles/main.css';

// Librerías
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import $ from 'jquery';
import 'select2';
import 'select2/dist/css/select2.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Exponemos globalmente
window.Swal = Swal;
window.XLSX = XLSX;
window.$ = $;
window.jQuery = $;