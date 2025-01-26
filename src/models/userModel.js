export class User {
    constructor({ id, public_id, name, email, password, role, phone_number, birthdate, gender, cpf }) {
        this.id = id;
        this.public_id = public_id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.birthdate = birthdate;
        this.role = role
        this.phone_number = phone_number;
        this.gender = gender;
        this.cpf = cpf;
    }
}

// Método para validar dados do usuário
export function validate(userData) {
    const { public_id, name, email, password, role, phone_number, birthdate, gender, cpf } = userData;
    if (!public_id || !name || !email || !password || !role || !phone_number || !birthdate || !gender || !cpf) {
        return false
    }
    return true
}