import LogsRepository from '../repositories/logsRepository.js';
import { UAParser } from 'ua-parser-js';

export async function getUserAgent(req) {
    const parser = new UAParser();
    const deviceInfo = req.headers['user-agent'];
    const result = parser.setUA(deviceInfo).getResult();
    return result;
};

export async function getUserIP(req) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    return ip;
}

export async function logAction(userIP, userAgent, action, details = null, userId = null, relatedId = null) {
    try {
        await LogsRepository.createNewLog(action, details, userId, relatedId, userAgent, userIP);
    } catch (error) {
        console.error('Error creating log: ', error);
        throw Error('Error creating log: ', error)
    }
};

// Exemplo de uso
// logAction(
//     'update_product',
//     { before: { name: 'Camiseta' }, after: { name: 'Camiseta Azul' } },
//     1,
//     1
// );
