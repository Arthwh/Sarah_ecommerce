import pool from '../db.js';

class LogsRepository {
    static async createNewLog(action, details, userId, relatedId, device, ip) {
        try {
            await pool.query(`
                    INSERT INTO activity_logs (user_id, action, related_id, details, ip_address, device)
                    VALUES ($1, $2, $3, $4, $5, $6)
                `, [userId, action, relatedId, details, ip, device]);
        } catch (error) {
            console.error('Error inserting logs: ', error);
            throw Error('Error inserting logs: ', error);
        }
    }
}

export default LogsRepository;