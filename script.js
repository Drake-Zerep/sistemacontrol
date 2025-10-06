document.addEventListener('DOMContentLoaded', function() {
    const keyListSelect = document.getElementById('keyList');
    const keyForm = document.getElementById('keyForm');
    const recordsTableBody = document.querySelector('#recordsTable tbody');
    const generatePdfButton = document.getElementById('generatePdf');
    const generateTodayPdfButton = document.getElementById('generateTodayPdf');
    const reportDateInput = document.getElementById('reportDate');

    // Lista de llaves proporcionada
    const keys = [
        "1 Economato", "2 Restaurante babbo american grill", "3 Cocina babbo american grill", "4 Coco café",
        "5 Copia (52) Neveras", "6 Restaurante las rocas - barra", "7 Sala kentia", "8 Lava bar", "10 Rest. ugo e vandino",
        "11 Oficina director", "12 Oficina director a.b.", "13 Candado neveras ugo&vandino", "14 Oficina del cheff",
        "15 Camara de cocinas 1", "16 Sugar reef", "17 Ex sala de arte", "18 Sunset bar", "19 Barefoot grill", "20 Lenceria",
        "21 Jaula vidrios (guardan envases de bebidas vacios)", "22 Lavanderia", "23 Room-service", "24 Almacen de plateria",
        "25 Oficina chakib y chefi.", "26 Oficinas de recepcion", "27 Oficina alimentacion y bebidas", "28 Candado bombonas economato",
        "29 Ex sala juegos", "30 Puerta madera propietarios", "31 Jaula vidrios(envases vacios (2ª puerta)", "40 Piscina rocas",
        "41 Almacen gimnasio exterior", "42 Piscinas mimosas", "43 Beach club bar (rocas)", "44 Vehiculo las rocas",
        "45 Comedor de personal", "47 Control de cctv - H24 y despacho direccion", "48 El corte ingles",
        "49 Control cctv y copia parking jardineros", "50 Llavero de seguridad", "51 Cuarto vestuario vs", "52 Llave office lounge club",
        "53 Mueble liquido plateria", "54 Puertas cocina trattoria", "55 Cuarto y camaras de pasteleria",
        "56 Camaras nuevas( al lado economato) candado nevera de zumos", "57 Enfermeria", "58 Neveras cocina las rocas",
        "59 Verduras y frutas, carniceria, pescaderia, italiano.", "60 Gimnasio", "61 Guarderia o miniclub",
        "62 Puertas perimetrales mimosa", "64 Caja de llaves interno room service", "65 Llaves jardineria (garden care)",
        "67 Sobre-jardineria (juan luis)", "68 Cuarto de viveres cocina central", "69 Oficina maitre mimosa", "70 Copia de la nº 23",
        "71 Almacen de fruta y verduras", "72 Acceso a cuevas por pasillo cocinas", "73 Copia de nº 78 (despensa en carniceria)",
        "74 Verja de hierro acceso a cocinas el churrasco", "75 Cristalera de las cuevas 1 y 2", "76 Cristalera de restaurante mimosas 3 y 4",
        "77 Spa aura-soma y gym", "79 Cancela cascadillas", "80 Copia de la nº 15", "81 Sobrante llavero n.25", "82 Copia llave n. 46",
        "83 Sala inca nº 1 (avis)", "84 Sala inca nº 2", "85 Sala galeria de arte", "86 Sala ficus", "88 Sala adelfas",
        "89 Lavanderia copia", "90 Copias de la nº 55", "91 Comedor personal (acceso a lavanderia)", "93 Copias de la nº 73",
        "94 Copias de la llave cuarto plateria limpieza", "95 Copia de nº 68", "98 Ascensores otis", "99 Ascensores otis",
        "101 Puerta madera propietarios", "102 Copia de nº 7 (cocina rocas)", "103 Objetos perdidos", "104 Copia de nº 19 (barfoot grill)",
        "105 Copia de nº 45 (comedor personal)", "106 Copia de nº 54 (cocina trattoria)", "107 Copia de nº 55 (cuarto desayuno)",
        "108 Copia de nº 60", "109 Copia de nº 22 (lavanderia)", "110 Jaula vidrios (copia 21)", "112 Traspalet Electrico",
        "116 Cardex cliente recepcion", "117 Maletero botones", "118 Acceso coco café (copia N4)", "119 Candado parking jardineros",
        "121 Copia cuarto pisceno (40)", "901 Caja fuerte", "902 Caja fuerte RECEPCION", "903 Caja fuerte rocas", "904 Caja fuerte pinxcos",
        "905 Caja fuerte trattoria", "906 Caja fuerte barfoot grill", "907 Caja fuerte coco", "908 Caja tides", "909 Caja fuerte",
        "910 Caja fuerte club", "911 Caja fuerte sunset", "912 Caja fuerte sugar reef", "913 Caja fuerte world café",
        "914 Caja fuerte lava", "915 Caja fuerte babbo american grill", "916 Caja fuerte RECEPCION"
    ];

    // Cargar llaves en el select
    keys.forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = key;
        keyListSelect.appendChild(option);
    });
    
    // Cargar registros guardados
    let records = JSON.parse(localStorage.getItem('keyRecords')) || [];

    function renderTable() {
        recordsTableBody.innerHTML = '';
        records.forEach((record, index) => {
            const row = document.createElement('tr');
            
            // Formatear fechas para mejor lectura
            const entrega = new Date(record.entrega).toLocaleString('es-ES');
            const recogida = record.recogida ? new Date(record.recogida).toLocaleString('es-ES') : 'Pendiente';

            row.innerHTML = `
                <td>${record.key}</td>
                <td>${record.user}</td>
                <td>${entrega}</td>
                <td>${recogida}</td>
                <td><button class="delete-btn" data-index="${index}">Borrar</button></td>
            `;
            recordsTableBody.appendChild(row);
        });
    }

    function saveAndRender() {
        localStorage.setItem('keyRecords', JSON.stringify(records));
        renderTable();
    }

    // Añadir un nuevo registro
    keyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const newRecord = {
            key: keyListSelect.value,
            user: document.getElementById('userName').value,
            entrega: document.getElementById('entregaDateTime').value,
            recogida: document.getElementById('recogidaDateTime').value || null
        };
        records.push(newRecord);
        saveAndRender();
        keyForm.reset();
        keyListSelect.value = "";
    });

    // Borrar un registro
    recordsTableBody.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.getAttribute('data-index');
            records.splice(index, 1);
            saveAndRender();
        }
    });
    
    // Generar PDF
    function generatePDF(recordsToPrint, title) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.text(title, 14, 20);
        doc.autoTable({
            head: [['Llave', 'Persona', 'Fecha y Hora de Entrega', 'Fecha y Hora de Recogida']],
            body: recordsToPrint.map(r => [
                r.key,
                r.user,
                new Date(r.entrega).toLocaleString('es-ES'),
                r.recogida ? new Date(r.recogida).toLocaleString('es-ES') : 'Pendiente'
            ]),
            startY: 25,
        });

        doc.save(`${title.replace(/\s/g, '_')}.pdf`);
    }

    generatePdfButton.addEventListener('click', function() {
        const selectedDate = reportDateInput.value;
        if (!selectedDate) {
            alert('Por favor, selecciona una fecha para generar el informe.');
            return;
        }
        
        const filteredRecords = records.filter(r => {
            const entregaDate = r.entrega.split('T')[0];
            return entregaDate === selectedDate;
        });

        if (filteredRecords.length === 0) {
            alert('No hay registros para la fecha seleccionada.');
            return;
        }

        generatePDF(filteredRecords, `Informe de Llaves - ${new Date(selectedDate).toLocaleDateString('es-ES')}`);
    });

    generateTodayPdfButton.addEventListener('click', function() {
        const today = new Date().toISOString().split('T')[0];
        const todayRecords = records.filter(r => r.entrega.startsWith(today));
        
        if (todayRecords.length === 0) {
            alert('No hay registros para el día de hoy.');
            return;
        }
        
        generatePDF(todayRecords, `Informe de Llaves - Hoy (${new Date().toLocaleDateString('es-ES')})`);
    });

    // Carga inicial
    renderTable();
});