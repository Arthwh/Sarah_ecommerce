function toggleEditField(fieldName) {
    const profileItem = document.querySelector(`[data-profile-item="${fieldName}"]`);
    const input = profileItem.querySelector('.profile-input');
    const value = profileItem.querySelector('.profile-value');

    if (input.disabled) {
        input.disabled = false;
        if (!value.classList.contains('disabled')) {
            value.classList.add('disabled');
        }
        input.focus();
    } else {
        input.disabled = true;
        const inputValue = input.value;
        value.innerText = inputValue;
        if (value.classList.contains('disabled')) {
            value.classList.remove('disabled');
        }
    }
}

async function updateUserProfileData() {
    try {
        const newName = document.querySelector(`[data-profile-item="user_name"]`)?.querySelector('input')?.value;
        const newPhoneNumber = document.querySelector(`[data-profile-item="user_phone_number"]`)?.querySelector('input')?.value;
        const newGender = document.querySelector(`[data-profile-item="user_gender"]`)?.querySelector('select')?.value;
        const newEmail = document.querySelector(`[data-profile-item="user_email"]`)?.querySelector('input')?.value;

        const ok = await validateNewUserProfileData(newName, newPhoneNumber, newGender, newEmail);
        if (!ok) {
            showToast('Preencha os campos corretamente', 'error');
            return;
        }

        await sendNewUserProfileData(newName, newPhoneNumber, newGender, newEmail);
        showToast('Perfil atualizado com sucesso', 'success');
        loadUserProfileComponent();
    } catch (error) {
        console.error(error);
        showToast(error.message, 'error');
    }
}

async function validateNewUserProfileData(name, phone, gender, email) {
    let ok = true;
    if (!name || !phone || !gender || !email) {
        ok = false;
    }
    else if (name.length <= 3) {
        ok = false;
    }
    else if (gender !== 'male' && gender !== 'female' && gender !== 'other') {
        ok = false;
    }
    else if (!validateEmail(email)) {
        ok = false;
    }
    else if (!validatePhone(phone)) {
        ok = false;
    }

    return ok;
}

function validateEmail(email) {
    if (email.length == 0) return false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validatePhone(phone) {
    if (phone.length < 11) return false;
    return true;
}

async function sendNewUserProfileData(name, phone, gender, email) {
    try {
        const response = await fetch(`/api/users`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_name: name,
                user_phone_number: phone,
                user_gender: gender,
                user_email: email,
            })
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

    } catch (error) {
        console.error('Erro ao atualizar os dados do usuário: ' + error);
        throw Error('Erro ao atualizar os dados do usuário: ' + error.message);
    }
}
