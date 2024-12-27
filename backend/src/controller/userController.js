const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//puxando bcrypt para criptografar senhas e enviar tokens
const bcrypt = require('bcrypt');
const jwtConfig = require('../config/jwtConfig');





//TOKEN
const authenticateToken = async (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Usamos essa quebra pq normalmente usamos “Baerer XXX”
    
    //verificando se token esta vazio
    if (token == null) return res.sendStatus(401); // Token ausente

    try {
        // Verificando o token
        const user = await jwtConfig.verifyToken(token);
        req.user = user;
        next(); // Passa para a próxima função (rota) se o token for válido
    } catch (error) {
        // Caso o token esteja na blacklist ou qualquer outro erro, apenas retorna 403
        console.error('Erro ao autenticar token:', error);  // Log do erro para ajudar no diagnóstico
        return res.status(403).json({message: "Você não tem permissão para acessar este recurso."}); // Token inválido ou expirado
    }
}

const ranking = async (req, res) => {

    const ranking = await prisma.user.findMany({
        select: {
            userName: true,
            points: true
        },
        orderBy: {
            points: 'desc'
        }
    })

    res.status(200).json({ ranking });
}


const signUp = async (req, res) => {
    const { email, userName, dateBirth, password } = req.body;

    try {
        // Verifica se o email ou nome de usuário já existe
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { userName }
                ]
            }
        });

        if (existingUser) {
            return res.status(400).json({ error: 'Email ou nome de usuário já existe' });
        }

        //criptografar senha
        const encryptedPassword = await bcrypt.hash(password,10);

        //cria o novo usuário
        const newUser = await prisma.user.create({
            data: {
                email,
                userName,
                dateBirth: new Date(dateBirth),
                password:encryptedPassword,
            },
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error); // Exibe o erro no console para depuração
        res.status(400).json({ error: 'Failed to create user' });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verifica se o usuário existe
        const user = await prisma.user.findUnique({
            where: { email }
        });

        // Verifica se a senha está correta
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Email ou Senha incorretos!' });
        }

        //gerando token
        const token = jwtConfig.generateToken(user.id);
       
        res.status(200).json({ token, userId: user.id, userName:user.userName, lastChapterAccessedId:user.lastChapterAccessedId});
    } catch (error) {
        res.status(500).json({
            message: "Ocorreu um erro no servidor.",
            error: error.message, });
    }
}

const logout = async (req, res) => {
    
    try {
        // Pega o token do cabeçalho Authorization, esperado como "Bearer <token>"
        const token = req.headers['authorization'].split(' ')[1]; // Usamos essa quebra pq normalmente usamos “Baerer XXX”

        if (!token) {
            return res.status(400).json({ message: 'Token não fornecido' });
        }
        
        // Chama a função blacklistToken para invalidar o token, o armazenando na blacklist
        jwtConfig.blacklistToken(token); 
 
        res.status(200).json({ message: 'Logout realizado com sucesso'});


    } catch (error) {
        console.error(error); // Para depuração
        res.status(500).json({ error: 'Erro ao realizar logout.' });
    }
}

const updateUserPoints = async (req, res) => {
    const { userId, points } = req.body;

    try {
        await prisma.user.update({
            where: { id: userId },
            data: { points:{
                increment:points, // Incrementa o valor atual dos pontos
            } }
        });
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Erro ao atualizar pontuação do usuário:', error);
        res.status(500).json({ error: 'Falha ao atualizar pontuação do usuário' });
    }
}

const getUserPoints = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId, 10) },
            select: { points: true }, // Seleciona apenas os pontos
        });

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.status(200).json({ points: user.points });
    } catch (error) {
        console.error('Erro ao buscar pontos do usuário:', error);
        res.status(500).json({ error: 'Erro interno ao buscar pontos do usuário' });
    }
}

const saveLastChapterAccessed= async(req, res)=>{
    const {userId, id} = req.body;

    if (isNaN(userId || id)) {
        return res.status(400).json({ error: 'dados invalidos' });
    }

    try {
        await prisma.user.update({
            where:{id: parseInt(userId, 10)},
            data:{lastChapterAccessedId: parseInt(id, 10)}
        })

        res.status(200).json({ message: 'Ultimo capitulo acessado atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar a trilha' });
    }
}


//exportando routes
module.exports ={
    authenticateToken,
    ranking,
    signUp,
    login,
    logout,
    updateUserPoints,
    getUserPoints,
    saveLastChapterAccessed,
}