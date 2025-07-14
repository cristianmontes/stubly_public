// util/utils.js

function validarMockInput(req, res, next) {
    const { method, path, response } = req.body;

    // Validar método
    const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];
    if (!allowedMethods.includes(method)) {
    return res.status(400).json({ error: 'Método no válido. Usa GET, POST, PUT o DELETE.' });
    }

    try {
        const responseString = JSON.stringify(response || {});
        const sizeInBytes = Buffer.byteLength(responseString, 'utf8');
        const limite = 10000; // 1 K

        if (sizeInBytes > limite) {
            return res.status(400).json({
            error: 'El campo "response" supera el límite de 10000 caracteres.',
            });
        }

        next();
    } catch (err) {
        return res.status(400).json({ error: 'El campo "response" no es válido.' });
    }
}

module.exports = {
  validarMockInput
};
