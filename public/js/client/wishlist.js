async function addRemoveProductFromWishlist(product_public_id) {
    try {
        const userLogged = await checkUserLogged();
        if (!userLogged) {
            return;
        }

        let inWishlist = await verifyIfProductIsAddedToWishlist(product_public_id);

        if (!inWishlist) {
            await addItemToWishlist(product_public_id);
        } else {
            await removeItemFromWishlist(product_public_id);
        }

        inWishlist = !inWishlist;

        await updateDataInWishlistProperty(inWishlist, product_public_id);
        showToast(`Produto ${inWishlist ? 'adicionado aos' : 'removido dos'} favoritos com sucesso!`, 'success');
    } catch (error) {
        console.error(error.message, 'error');
        showToast(error.message, 'error');
    }
}

async function getWishlistItems(userId) {
    try {
        const userLogged = await checkUserLogged();
        if (!userLogged) {
            throw Error('Usuário precisa estar logado para realizar essa ação!')
        }
        const response = await fetch(`/api/wishlist/${userId}`).then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });

        return response;
    } catch (error) {
        console.error("Erro ao obter items da wishlist: ", error);
        throw Error("Erro ao obter items da wishlist: ", error.message);
    }
}

async function verifyIfProductIsAddedToWishlist(product_public_id) {
    try {
        const userLogged = await checkUserLogged();
        if (!userLogged) {
            throw Error('Usuário precisa estar logado para realizar essa ação!')
        }
        const response = await fetch(`/api/wishlist/product/${userLogged.id}/${product_public_id}`).then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });

        return response.inWishlist
    } catch (error) {
        console.error("Erro ao verificar se produto está na wishlist: ", error);
        throw Error("Erro ao verificar se produto está na wishlist: ", error);
    }
}

async function updateDataInWishlistProperty(inWishlist, product_public_id) {
    const elements = document.querySelectorAll(`[data-product-public-id="${product_public_id}"]`);
    if (elements.length === 0) {
        console.warn(`Elemento com data-product-public-id="${product_public_id}" não encontrado.`);
        throw new Error(`Elemento com data-product-public-id="${product_public_id}" não encontrado.`);
    }

    for (const element of elements) {
        element.dataset.inWishlist = inWishlist;
    }
}

async function addItemToWishlist(product_public_id) {
    try {
        const userLogged = await checkUserLogged();
        if (!userLogged) {
            throw new Error('Usuário precisa estar logado para realizar essa ação!');
        }

        const response = await fetch(`/api/wishlist/add/${userLogged.id}/${product_public_id}`);
        if (!response.ok) {
            const errorDetails = await response.json().catch(() => ({}));
            throw new Error(`${response.status} - ${response.statusText || 'Detalhes não disponíveis'} - ${JSON.stringify(errorDetails)}`);
        }
    } catch (error) {
        console.error("Erro ao adicionar item à wishlist: ", error);
        throw Error("Erro ao adicionar item à wishlist: ", error.message);
    }
}

async function removeItemFromWishlist(product_public_id) {
    try {
        const userLogged = await checkUserLogged();
        if (!userLogged) {
            throw new Error('Usuário precisa estar logado para realizar essa ação!');
        }

        const response = await fetch(`/api/wishlist/remove/${userLogged.id}/${product_public_id}`);
        if (!response.ok) {
            const errorDetails = await response.json().catch(() => ({}));
            throw new Error(`${response.status} - ${response.statusText || 'Detalhes não disponíveis'} - ${JSON.stringify(errorDetails)}`);
        }
    } catch (error) {
        console.error("Erro ao remover item da wishlist: ", error);
        throw Error("Erro ao remover item da wishlist: ", error.message);
    }
}
