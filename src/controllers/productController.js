//Mock de dados sobre produto especifico (inclui infos sobre todas as variantes). Deve receber o baseId e o sku e fazer a consulta, retornando os dados. Se o sku nao for informado, deve pegar o primeiro que aparecer na consulta. 
export async function getProductInfo(req, res) {
    const data = {
        user: {
            id: 1,
            name: 'João',
            logged: 'true',
            cart: {
                items: [
                    {
                        sku: '0001',
                        baseProduct: '1',
                        quantity: 1,
                        price: 99.90,
                    },
                    {
                        sku: '0004',
                        baseProduct: '1',
                        quantity: 2,
                        price: 79.90,
                    },
                    {
                        sku: '0008',
                        baseProduct: '1',
                        quantity: 1,
                        price: 89.90,
                    }
                ],
                id: 1,
                totalQuantity: 4,
                totalPrice: 349.60,
                currency: 'BRL',
            },
            wishlist: {
                items: ['1'],
                quantity: 2,
            }
        },
        product: {
            baseProduct: '1',
            sku: '0001',
            color: 'Preto',
            colorCode: '#000000',
            size: 'P',
            name: 'Camiseta Regular em Meia Malha com Estampa Red Hot Chili Peppers Preta',
            price: '99,90',
            description: 'Camiseta regular masculina, confeccionada em meia malha, com gola redonda, mangas curtas e estampa com o logo da banda de rock formada em Los Angeles, Red Hot Chili Peppers.',
            images: [
                { url: '/public/mockImages/redhotCamiseta.webp' },
                { url: '/public/mockImages/redhotCamiseta2.webp' },
                { url: '/public/mockImages/redhotCamiseta3.webp' },
                { url: '/public/mockImages/redhotCamiseta4.webp' },
                { url: '/public/mockImages/redhotCamiseta5.webp' },
                { url: '/public/mockImages/redhotCamiseta5.webp' },
                { url: '/public/mockImages/redhotCamiseta5.webp' },
                { url: '/public/mockImages/redhotCamiseta5.webp' }
            ],
            details: 'Composição: 100% algodão.',
            url: '/masculino/camisetas/camiseta-regular-em-meia-malha-com-estampa-red-hot-chili-peppers',
            variants: [
                // Preto
                { baseProduct: '1', sku: '0001', color: 'Preto', colorCode: '#000000', size: 'P', stock: 1 },
                { baseProduct: '1', sku: '0002', color: 'Preto', colorCode: '#000000', size: 'M', stock: 1 },
                { baseProduct: '1', sku: '0003', color: 'Preto', colorCode: '#000000', size: 'G', stock: 1 },
                // Branco
                { baseProduct: '1', sku: '0004', color: 'Branco', colorCode: '#FFFFFF', size: 'P', stock: 1 },
                { baseProduct: '1', sku: '0005', color: 'Branco', colorCode: '#FFFFFF', size: 'M', stock: 1 },
                { baseProduct: '1', sku: '0006', color: 'Branco', colorCode: '#FFFFFF', size: 'G', stock: 1 },
                // Azul Acinzentado
                { baseProduct: '1', sku: '0007', color: 'Azul Acinzentado', colorCode: '#657A96', size: 'P', stock: 2 },
                { baseProduct: '1', sku: '0008', color: 'Azul Acinzentado', colorCode: '#657A96', size: 'M', stock: 4 },
                { baseProduct: '1', sku: '0009', color: 'Azul Acinzentado', colorCode: '#657A96', size: 'G', stock: 3 }
            ]
        },
        page: {
            breadcrums: [
                { name: 'Início', url: '/' },
                { name: 'Masculino', url: '/masculino' },
                { name: 'Camisetas', url: '/masculino/camisetas' },
                { name: 'Camiseta Regular em Meia Malha com Estampa Red Hot Chili Peppers', url: '/masculino/camisetas/camiseta-regular-em-meia-malha-com-estampa-red-hot-chili-peppers' }
            ]
        }
    }

    res.render('product', { data })
}

//Mock de dados para obtencao de dado sobre variante especifica (clique em cor ou tamanho diferente na pagina de produto especifico)
export async function updateProductVariantData(req, res) {
    const sku = req.params.id
    const type = req.query.type
    const baseProduct = '1'

    if (!type || !sku || !baseProduct) {
        return res.status(400).json({ message: 'Missing required parameters.' });
    }
    const productVariants = [
        // Preto - Tamanho P
        {
            baseProduct: '1',
            sku: '0001',
            color: 'Preto',
            colorCode: '#000000',
            size: 'P',
            name: 'Camiseta Regular em Meia Malha com Estampa Red Hot Chili Peppers Preta - Tamanho P',
            price: '99,90',
            description: 'Camiseta regular masculina, confeccionada em meia malha, com gola redonda, mangas curtas e estampa da banda Red Hot Chili Peppers. Tamanho P.',
            images: [
                { url: '/public/mockImages/redhotCamiseta.webp' },
                { url: '/public/mockImages/redhotCamiseta2.webp' },
                { url: '/public/mockImages/redhotCamiseta3.webp' },
                { url: '/public/mockImages/redhotCamiseta4.webp' },
                { url: '/public/mockImages/redhotCamiseta5.webp' },
                { url: '/public/mockImages/redhotCamiseta5.webp' },
                { url: '/public/mockImages/redhotCamiseta5.webp' },
                { url: '/public/mockImages/redhotCamiseta5.webp' }
            ],
            details: 'Composição: 100% algodão.',
            url: '/masculino/camisetas/camiseta-regular-preta-p'
        },
        // Preto - Tamanho M
        {
            baseProduct: '1',
            sku: '0002',
            color: 'Preto',
            colorCode: '#000000',
            size: 'M',
            name: 'Camiseta Regular em Meia Malha com Estampa Red Hot Chili Peppers Preta - Tamanho M',
            price: '99,90',
            description: 'Camiseta regular masculina, confeccionada em meia malha, com gola redonda, mangas curtas e estampa da banda Red Hot Chili Peppers. Tamanho M.',
            images: [
                { url: '/public/mockImages/redhotCamiseta.webp' },
                { url: '/public/mockImages/redhotCamiseta2.webp' },
                { url: '/public/mockImages/redhotCamiseta3.webp' },
                { url: '/public/mockImages/redhotCamiseta4.webp' },
                { url: '/public/mockImages/redhotCamiseta5.webp' },
                { url: '/public/mockImages/redhotCamiseta5.webp' },
                { url: '/public/mockImages/redhotCamiseta5.webp' },
                { url: '/public/mockImages/redhotCamiseta5.webp' }
            ],
            details: 'Composição: 100% algodão.',
            url: '/masculino/camisetas/camiseta-regular-preta-m'
        },
        // Preto - Tamanho G
        {
            baseProduct: '1',
            sku: '0003',
            color: 'Preto',
            colorCode: '#000000',
            size: 'G',
            name: 'Camiseta Regular em Meia Malha com Estampa Red Hot Chili Peppers Preta - Tamanho G',
            price: '99,90',
            description: 'Camiseta regular masculina, confeccionada em meia malha, com gola redonda, mangas curtas e estampa da banda Red Hot Chili Peppers. Tamanho G.',
            images: [
                { url: '/public/mockImages/redhotCamiseta.webp' },
                { url: '/public/mockImages/redhotCamiseta2.webp' },
                { url: '/public/mockImages/redhotCamiseta3.webp' },
                { url: '/public/mockImages/redhotCamiseta4.webp' },
                { url: '/public/mockImages/redhotCamiseta5.webp' },
                { url: '/public/mockImages/redhotCamiseta5.webp' },
                { url: '/public/mockImages/redhotCamiseta5.webp' },
                { url: '/public/mockImages/redhotCamiseta5.webp' }
            ],
            details: 'Composição: 100% algodão.',
            url: '/masculino/camisetas/camiseta-regular-preta-g'
        },
        // Branco - Tamanho P
        {
            baseProduct: '1',
            sku: '0004',
            color: 'Branco',
            colorCode: '#FFFFFF',
            size: 'P',
            name: 'Camiseta Regular em Meia Malha Branca',
            price: '99,90',
            description: 'Camiseta regular masculina, confeccionada em meia malha, com gola redonda, mangas curtas. Tamanho P.',
            images: [
                { url: '/public/mockImages/12.webp' },
                { url: '/public/mockImages/13.webp' }
            ],
            details: 'Composição: 100% algodão.',
            url: '/masculino/camisetas/camiseta-regular-branca-p'
        },
        // Branco - Tamanho M
        {
            baseProduct: '1',
            sku: '0005',
            color: 'Branco',
            colorCode: '#FFFFFF',
            size: 'M',
            name: 'Camiseta Regular em Meia Malha Branca',
            price: '1100,90',
            description: 'Camiseta regular masculina, confeccionada em meia malha, com gola redonda, mangas curtas. Tamanho M.',
            images: [
                { url: '/public/mockImages/12.webp' },
                { url: '/public/mockImages/13.webp' }
            ],
            details: 'Composição: 100% algodão.',
            url: '/masculino/camisetas/camiseta-regular-branca-m'
        },
        // Branco - Tamanho G
        {
            baseProduct: '1',
            sku: '0006',
            color: 'Branco',
            colorCode: '#FFFFFF',
            size: 'G',
            name: 'Camiseta Regular em Meia Malha Branca',
            price: '99,90',
            description: 'Camiseta regular masculina, confeccionada em meia malha, com gola redonda, mangas curtas. Tamanho G.',
            images: [
                { url: '/public/mockImages/12.webp' },
                { url: '/public/mockImages/13.webp' }
            ],
            details: 'Composição: 100% algodão.',
            url: '/masculino/camisetas/camiseta-regular-branca-g'
        },
        // Azul Acinzentado - Tamanho P
        {
            baseProduct: '1',
            sku: '0007',
            color: 'Azul Acinzentado',
            colorCode: '#657A96',
            size: 'P',
            name: 'Camiseta Regular em Meia Malha Azul Acinzentada',
            price: '99,90',
            description: 'Camiseta regular masculina, confeccionada em meia malha, com gola redonda, mangas curtas. Tamanho P.',
            images: [
                { url: '/public/mockImages/12 (1).webp' },
                { url: '/public/mockImages/13 (1).webp' }
            ],
            details: 'Composição: 100% algodão.',
            url: '/masculino/camisetas/camiseta-regular-azul-p'
        },
        // Azul Acinzentado - Tamanho M
        {
            baseProduct: '1',
            sku: '0008',
            color: 'Azul Acinzentado',
            colorCode: '#657A96',
            size: 'M',
            name: 'Camiseta Regular em Meia Malha Azul Acinzentada',
            price: '99,90',
            description: 'Camiseta regular masculina, confeccionada em meia malha, com gola redonda, mangas curtas. Tamanho M.',
            images: [
                { url: '/public/mockImages/12 (1).webp' },
                { url: '/public/mockImages/13 (1).webp' }
            ],
            details: 'Composição: 100% algodão.',
            url: '/masculino/camisetas/camiseta-regular-azul-m'
        },
        // Azul Acinzentado - Tamanho G
        {
            baseProduct: '1',
            sku: '0009',
            color: 'Azul Acinzentado',
            colorCode: '#657A96',
            size: 'G',
            name: 'Camiseta Regular em Meia Malha Azul Acinzentada',
            price: '99,90',
            description: 'Camiseta regular masculina, confeccionada em meia malha, com gola redonda, mangas curtas. Tamanho G.',
            images: [
                { url: '/public/mockImages/12 (1).webp' },
                { url: '/public/mockImages/13 (1).webp' }
            ],
            details: 'Composição: 100% algodão.',
            url: '/masculino/camisetas/camiseta-regular-azul-g'
        }
    ];
    // Encontra a variante com o SKU fornecido
    const variantData = productVariants.find(variant => variant.sku === sku);

    if (!variantData) {
        return res.status(404).json({ message: 'Invalid SKU or variant not found.' });
    }
    return res.status(200).json(variantData);
}

//Mock de dados para listagem de produtos
export async function getProducts(req, res) {
    const data = {
        user: {
            // id: 1,
            // name: 'João',
            logged: 'false',
            // cart: {
            //     items: [
            //         {
            //             sku: '0001',
            //             baseProduct: '1',
            //             quantity: 1,
            //             price: 99.90,
            //         }],
            //     id: 1,
            //     totalQuantity: 1,
            //     totalPrice: 99.90,
            //     currency: 'BRL',
            // }
        },
        products: [
            {
                id: '1',
                name: 'Camiseta Regular Red Hot Chili Peppers',
                price: '99,90',
                promoPrice: '79,90', // Preço promocional
                isOnSale: true, // Controle de promoção
                images: [
                    '/public/mockImages/redhotCamiseta.webp',
                    '/public/mockImages/redhotCamiseta2.webp'
                ],
                url: '/masculino/camisetas/camiseta-regular-red-hot-chili-peppers',
                category: 'masculino',
                subcategory: 'camisetas'
            },
            {
                id: '2',
                name: 'Camiseta Básica Branca',
                price: '59,90',
                promoPrice: null,
                isOnSale: false,
                images: [
                    '/public/mockImages/12.webp',
                    '/public/mockImages/13.webp'
                ],
                url: '/masculino/camisetas/camiseta-basica-branca',
                category: 'masculino',
                subcategory: 'camisetas'
            },
            {
                id: '2',
                name: 'Camiseta Básica Branca',
                price: '59,90',
                promoPrice: null,
                isOnSale: false,
                images: [
                    '/public/mockImages/12.webp',
                    '/public/mockImages/13.webp'
                ],
                url: '/masculino/camisetas/camiseta-basica-branca',
                category: 'masculino',
                subcategory: 'camisetas'
            },
            {
                id: '2',
                name: 'Camiseta Básica Branca',
                price: '59,90',
                promoPrice: null,
                isOnSale: false,
                images: [
                    '/public/mockImages/12.webp',
                    '/public/mockImages/13.webp'
                ],
                url: '/masculino/camisetas/camiseta-basica-branca',
                category: 'masculino',
                subcategory: 'camisetas'
            },
            {
                id: '2',
                name: 'Camiseta Básica Branca',
                price: '59,90',
                promoPrice: null,
                isOnSale: false,
                images: [
                    '/public/mockImages/12.webp',
                    '/public/mockImages/13.webp'
                ],
                url: '/masculino/camisetas/camiseta-basica-branca',
                category: 'masculino',
                subcategory: 'camisetas'
            }
            // Adicione mais produtos conforme necessário
        ],
        pagination: {
            currentPage: 1, // Página atual
            totalPages: 5, // Total de páginas
            itemsPerPage: 10 // Itens por página
        },
        filters: {
            priceRange: {
                min: 0,
                max: 200
            },
            categories: ['masculino', 'feminino', 'acessórios'], // Filtro por categorias
            onSaleOnly: false // Filtro para apenas itens em promoção
        },
        page: {
            breadcrums: [
                { name: 'Início', url: '/' },
                { name: 'Resultado da pesquisa para: Camiseta Masculina', url: '/products/search?searchParams=camiseta-masculina' },
            ],
            title: 'Resultado da busca por: Camisetas Masculinas',
            quantResults: 50,
        }
    };

    res.render('productsList', { data });
}
