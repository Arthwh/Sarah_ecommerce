async function getItemToAddRemoveFromCart() {
    const sizeSelected = document.querySelector('.sizeSelected').parentElement;
    const sizeSku = sizeSelected.dataset.productsku;
    const quantitySelected = 1;

    await addToCart(sizeSku, quantitySelected);
    location.reload();
}

async function addOneQuantity(sku, quantity) {
    const variantCard = document.querySelector(`[data-variant-public-id="${sku}"`);
    if (!variantCard) {
        showToast('Erro ao obter sku do produto', 'error');
        return;
    }
    await addToCart(sku, quantity || 1);
    location.reload();
}

async function removeOneQuantity(sku, quantity) {
    const variantCard = document.querySelector(`[data-variant-public-id="${sku}"`);
    if (!variantCard) {
        showToast('Erro ao obter sku do produto', 'error');
        return;
    }
    await removeFromCart(sku, quantity || 1);
    location.reload();
}

async function removeEntireProduct(sku) {
    const variantCard = document.querySelector(`[data-variant-public-id="${sku}"`);
    const selectedQuantity = variantCard.dataset.selectedQuantity

    if (confirm('Deseja remover o produto do carrinho?')) {
        await removeFromCart(sku, selectedQuantity);
        location.reload();
    }
}

async function addToCart(sku, quantity) {
    try {
        const user = await checkUserLogged();
        if (!user) {
            return;
        }

        const stockQuantity = await checkProductVariantStock(sku);
        if (quantity > stockQuantity) {
            throw new Error('O produto selecionado não possui estoque suficiente.');
        }
        await persistProductIntoCart(sku, quantity);
        await updateCartCountIcon(quantity);
        showToast('Produto adicionado ao carrinho!', 'success');
    } catch (error) {
        console.error(error.message);
        showToast("Erro ao adicionar produto ao carrinho: " + error.message, 'error');
    }
}

async function removeFromCart(sku, quantity) {
    try {
        const user = await checkUserLogged();
        if (!user) {
            return;
        }

        await removeProductFromCart(sku, quantity);
        await updateCartCountIcon(quantity);
        showToast('Produto removido do carrinho!', 'success');
    } catch (error) {
        console.error(error.message);
        showToast("Erro ao remover produto do carrinho: " + error.message, 'error');
    }
}

async function checkProductVariantStock(productSku) {
    try {
        const response = await fetch(`/api/products/variant/${productSku}/stock`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            });
        const variantStock = response.stock_quantity;
        return variantStock;
    } catch (error) {
        console.error('Error checking stock:', error);
        throw Error(error.error)
    }
}

async function persistProductIntoCart(productSku, quantity) {
    try {
        const response = await fetch('/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product_sku: productSku,
                quantity: quantity
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
        return response;
    } catch (error) {
        console.error('Error persisting product into cart:', error);
        throw Error(error.error)
    }
}

async function removeProductFromCart(productSku, quantity) {
    try {
        const response = await fetch('/cart', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product_sku: productSku,
                quantity: quantity
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
        return response;
    } catch (error) {
        console.error('Error removing product from cart:', error);
        throw Error(error.error)
    }
}

async function updateCartCountIcon(quantity) {
    const cartNumberElement = document.getElementById('cartNumber');
    if (!cartNumberElement) {
        return;
    }
    const cartNumber = cartNumberElement.innerText;
    const newCartNumber = parseInt(cartNumber) + quantity;
    if (newCartNumber <= 0) {
        cartNumberElement.innerText = '';
        if (!cartNumberElement.classList.contains('hidden')) {
            cartNumberElement.classList.add('hidden');
        }
    }
    else {
        cartNumberElement.innerText = newCartNumber.toString();
        if (cartNumberElement.classList.contains('hidden')) {
            cartNumberElement.classList.remove('hidden');
        }
    }
}

async function updateProductCardInfo(sku, newQuantity) {
    const variantCard = document.querySelector(`[data-variant-public-id="${sku}"`);

}