const jwt = require('jsonwebtoken');

// Importa a conexão Redis
const redisClient = require('./redisClient');


const generateToken = (id)=>{
    return jwt.sign({id}, process.env.SECRET_JWT, {expiresIn:'1h'});
}

const verifyToken = async (token)=>{

    try{
        console.log('Verificando token:', token);
        // Verifica se o token está na blacklist do Redis
        const isBlascklisted = await redisClient.get(`blacklist:${token}`);

        console.log('Token está na blacklist?', isBlascklisted);

        if(isBlascklisted){
            throw new Error('Token Inválido');
        }

        // Se o token não estiver na blacklist, verifica e retorna o token
        //return jwt.verify(token, process.env.SECRET_JWT);
        const decodedToken = jwt.verify(token, process.env.SECRET_JWT);
        console.log('Token verificado com sucesso:', decodedToken);

        return decodedToken;
    }catch(error){
        console.error('Erro na verificação do token:', error);
        throw new Error(`Erro na verificação do token: ${error.message}`);
    }
};

const blacklistToken = async (token)=>{
    const decoded = jwt.decode(token);

    if (!decoded) {
        console.error('Token inválido ao tentar adicionar à blacklist');
        return; // Retorna sem fazer mais nada
    }

    const expiresIn = decoded.exp * 1000 - Date.now(); //tempo de expiração em ms

    // Verificar se expiresIn é um número válido e positivo
    if (isNaN(expiresIn) || expiresIn <= 0) {
        console.warn('O token já expirou ou é inválido:', expiresIn);
        return; // Não adiciona à blacklist, apenas sai da função
    }

    try {
        // Armazena o token no Redis com um tempo de expiração em segundos
        // Arredondando expiresIn para garantir que seja um número inteiro
        await redisClient.setEx(`blacklist:${token}`,Math.floor(expiresIn / 1000), 'true');

    } catch (error) {
        console.error(`Erro ao adicionar token à blacklist: ${error.message}`);
    }
}



module.exports = {
    generateToken,
    verifyToken,
    blacklistToken
}