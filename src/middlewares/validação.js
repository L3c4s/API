function validação(req, res, next) {
    const { email, password, name, confirmPassword } = req.body;

    if (!email) {
        return res.status(400).json({
            error: true,
            message: 'E-mail é obrigatório.',
        });
    }

    if (!name) {
        return res.status(400).json({
            error: true,
            message: 'Nome do usuário é obrigatório.',
        });
    }

    if (!password) {
        return res.status(400).json({
            error: true,
            message: 'Senha é obrigatória.',
        });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({
            error: true,
            message: 'A senha e a confirmação de senha não coincidem.',
        });
    }


    next();
}

module.exports = validação