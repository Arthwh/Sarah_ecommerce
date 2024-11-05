// function verifyIfProductIsAddedToWishlist(baseProductId) {
//     if (wishlistItems.length > 0) {
//         wishlistItems.forEach(item => {
//             if (item.baseProduct === baseProductId) {
//                 return true;
//             }
//         });
//     }
// }

// function updateWishlistButton(action, baseProductId) {
//     if (action === 'add') {
//         wishlistButton.querySelector('img').src = '/public/images/icons/favorite_icon_fill_black.svg';
//         wishlistButton.dataset.addedtowishlist = true;

//         wishlistButton.onclick = removeItemFromWishlist(baseProductId)
//         wishlistItems.add(baseProductId);
//         setCookie('wishlistItems', wishlistItems, 7);
//     }
//     if (action === 'remove') {
//         wishlistButton.querySelector('img').src = '/public/images/icons/favorite_icon_border_black.svg';
//         wishlistButton.dataset.addedtowishlist = false;
//         wishlistButton.onclick = addItemToWishlist(baseProductId)
//         wishlistItems.remove(baseProductId);
//         setCookie('wishlistItems', wishlistItems, 7);
//     }
// }

function addItemToWishlist(baseProductId) {
    console.log("Item Adicionado Wishlist.")
    // if (verifyIfProductIsAddedToWishlist(baseProductId)) {
    //     return "Produto já adicionado na lista de desejos!";
    // }
    // fetch(`/api/wishlist/add/${baseProductId}?user=${user.id}`)
    //     .then(response => response.json())
    //     .then(data => {
    //         updateWishlistButton('add', baseProductId);
    //     })
    //     .catch(error => console.error('Erro ao adicionar item à wishlist:', error));
}

// function removeItemFromWishlist(baseProductId) {
//     if (!verifyIfProductIsAddedToWishlist(baseProductId)) {
//         return "Produto já removido da lista de desejos!";
//     }
//     fetch(`/api/wishlist/remove/${baseProductId}?user=${user.id}`)
//         .then(response => response.json())
//         .then(data => {
//             updateWishlistButton('remove', baseProductId);
//         })
//         .catch(error => console.error('Erro ao remover item da wishlist:', error));
// }
