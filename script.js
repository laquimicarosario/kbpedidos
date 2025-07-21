document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('orderForm');
    const orderSummaryDiv = document.getElementById('orderSummary');
    const summaryText = document.getElementById('summaryText');
    const sendEmailBtn = document.getElementById('sendEmailBtn');
    const sendWhatsappBtn = document.getElementById('sendWhatsappBtn');
    const copyTextBtn = document.getElementById('copyTextBtn');

    // Función auxiliar para mostrar mensajes (reemplaza alert() para mejor experiencia)
    function displayMessage(message) {
        // Por ahora, usamos alert() para depurar. En un entorno de producción,
        // esto debería ser un modal personalizado o un mensaje en la UI.
        alert(message);
    }

    // Escucha el evento de envío del formulario
    if (orderForm) { // Asegurarse de que el formulario existe
        orderForm.addEventListener('submit', function(event) {
            console.log('Evento de submit del formulario detectado.'); // Mensaje de depuración
            event.preventDefault(); // Evita que el formulario se envíe de forma tradicional y recargue la página

            // Obtiene los datos de contacto del cliente
            const customerName = document.getElementById('nombre').value.trim();
            const customerPhone = document.getElementById('telefono').value.trim();
            const customerAddress = document.getElementById('direccion').value.trim();

            // Validación básica de datos de contacto
            if (!customerName || !customerPhone) {
                displayMessage('Por favor, ingresa tu nombre y teléfono para confirmar el pedido.');
                return; // Detiene la ejecución si faltan datos
            }

            let orderDetails = []; // Array para almacenar los detalles de los aromas pedidos
            // Selecciona todos los inputs de tipo número dentro de los items de aroma
            const aromaInputs = orderForm.querySelectorAll('.aroma-item input[type="number"]');

            // Itera sobre cada input de aroma para obtener la cantidad
            aromaInputs.forEach(input => {
                const quantity = parseInt(input.value); // Convierte el valor a número entero
                if (quantity > 0) { // Si la cantidad es mayor que 0, se incluye en el pedido
                    const aromaName = input.name; // El nombre del aroma se toma del atributo 'name' del input
                    orderDetails.push(`- ${aromaName}: ${quantity} unidad(es)`);
                }
            });

            // Validación si no se seleccionó ningún aroma
            if (orderDetails.length === 0) {
                displayMessage('Por favor, selecciona al menos un aroma para tu pedido.');
                return; // Detiene la ejecución si no hay aromas seleccionados
            }

            // Construye el texto completo del pedido
            let fullOrderText = `--- Nuevo Pedido de Aromas ---\n\n`;
            fullOrderText += `Cliente: ${customerName}\n`;
            fullOrderText += `Teléfono: ${customerPhone}\n`;
            if (customerAddress) { // Agrega la dirección solo si se proporcionó
                fullOrderText += `Dirección: ${customerAddress}\n`;
            }
            fullOrderText += `\nDetalle del Pedido:\n`;
            fullOrderText += orderDetails.join('\n'); // Une los detalles de los aromas con saltos de línea
            fullOrderText += `\n\n-----------------------------`;

            // Muestra el resumen del pedido en la interfaz
            summaryText.textContent = fullOrderText;
            orderSummaryDiv.classList.remove('hidden'); // Hace visible la sección de resumen
            console.log('Resumen del pedido generado y mostrado.'); // Mensaje de depuración

            // Configura los botones de envío (Correo, WhatsApp, Copiar)
            const encodedOrderText = encodeURIComponent(fullOrderText); // Codifica el texto para URL

            // Botón "Enviar por Correo"
            sendEmailBtn.onclick = () => {
                console.log('Botón Enviar por Correo clicado.'); // Mensaje de depuración
                const subject = encodeURIComponent('Nuevo Pedido de Aromas');
                const body = encodedOrderText;
                // ¡IMPORTANTE! Reemplaza 'tu_email@example.com' con tu dirección de correo electrónico
                const emailAddress = 'laquimicarosario@gmail.com'; 
                if (emailAddress === 'tu_email@example.com' || emailAddress === '') {
                    displayMessage('Por favor, configura tu dirección de correo electrónico en el código JavaScript para usar esta función.');
                    return;
                }
                window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
            };

            // Botón "Enviar por WhatsApp"
            sendWhatsappBtn.onclick = () => {
                console.log('Botón Enviar por WhatsApp clicado.'); // Mensaje de depuración
                // ¡IMPORTANTE! Reemplaza 'TU_NUMERO_WHATSAPP_AQUI' con tu número de WhatsApp completo (ej. '5491112345678')
                const whatsappNumber = '5493415194775'; 
                if (whatsappNumber === 'TU_NUMERO_WHATSAPP_AQUI' || whatsappNumber === '') {
                    displayMessage('Por favor, configura tu número de WhatsApp en el código JavaScript para usar esta función.');
                    return;
                }
                window.open(`https://wa.me/${whatsappNumber}?text=${encodedOrderText}`, '_blank');
            };

            // Botón "Copiar Pedido"
            copyTextBtn.onclick = () => {
                console.log('Botón Copiar Pedido clicado.'); // Mensaje de depuración
                navigator.clipboard.writeText(fullOrderText)
                    .then(() => {
                        displayMessage('Pedido copiado al portapapeles. ¡Ahora puedes pegarlo donde quieras!');
                    })
                    .catch(err => {
                        console.error('Error al copiar el texto: ', err);
                        displayMessage('Hubo un error al copiar el pedido. Por favor, cópialo manualmente del resumen.');
                    });
            };
        });
    } else {
        console.error('Elemento orderForm no encontrado. Asegúrate de que el ID sea correcto en index.html.');
    }
});
