document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('orderForm');
    const orderSummaryDiv = document.getElementById('orderSummary');
    const summaryText = document.getElementById('summaryText');
    const sendEmailBtn = document.getElementById('sendEmailBtn');
    const sendWhatsappBtn = document.getElementById('sendWhatsappBtn');
    const copyTextBtn = document.getElementById('copyTextBtn');

    orderForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe de forma tradicional

        const customerName = document.getElementById('nombre').value.trim();
        const customerPhone = document.getElementById('telefono').value.trim();
        const customerAddress = document.getElementById('direccion').value.trim();

        if (!customerName || !customerPhone) {
            alert('Por favor, ingresa tu nombre y teléfono para confirmar el pedido.');
            return;
        }

        let orderDetails = [];
        const aromaInputs = orderForm.querySelectorAll('.aroma-item input[type="number"]');

        aromaInputs.forEach(input => {
            const quantity = parseInt(input.value);
            if (quantity > 0) {
                const aromaName = input.name;
                orderDetails.push(`${aromaName}: ${quantity} unidades`);
            }
        });

        if (orderDetails.length === 0) {
            alert('Por favor, selecciona al menos un aroma para tu pedido.');
            return;
        }

        let fullOrderText = `--- Nuevo Pedido de Aromas ---\n\n`;
        fullOrderText += `Cliente: ${customerName}\n`;
        fullOrderText += `Teléfono: ${customerPhone}\n`;
        if (customerAddress) {
            fullOrderText += `Dirección: ${customerAddress}\n`;
        }
        fullOrderText += `\nDetalle del Pedido:\n`;
        fullOrderText += orderDetails.join('\n');
        fullOrderText += `\n\n-----------------------------`;

        summaryText.textContent = fullOrderText;
        orderSummaryDiv.classList.remove('hidden'); // Muestra el resumen

        // Configura los botones de envío
        const encodedOrderText = encodeURIComponent(fullOrderText); // Para URL

        // Enviar por Correo
        sendEmailBtn.onclick = () => {
            const subject = encodeURIComponent('Nuevo Pedido de Aromas');
            const body = encodedOrderText;
            window.location.href = `mailto:laquimicarosario@gmail.com?subject=${subject}&body=${body}`;
        };

        // Enviar por WhatsApp
        sendWhatsappBtn.onclick = () => {
            // Reemplaza 'CODIGO_PAIS_NUMERO' con tu número de WhatsApp completo (ej. '5491112345678')
            const whatsappNumber = '5493415194775'; // ¡IMPORTANTE! Reemplaza esto
            window.open(`https://wa.me/${whatsappNumber}?text=${encodedOrderText}`, '_blank');
        };

        // Copiar Pedido
        copyTextBtn.onclick = () => {
            navigator.clipboard.writeText(fullOrderText)
                .then(() => {
                    alert('Pedido copiado al portapapeles. ¡Ahora puedes pegarlo donde quieras!');
                })
                .catch(err => {
                    console.error('Error al copiar el texto: ', err);
                    alert('Hubo un error al copiar el pedido. Por favor, cópialo manualmente del resumen.');
                });
        };
    });
});