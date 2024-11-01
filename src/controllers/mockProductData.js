//Mock de dados sobre produto especifico (inclui infos sobre todas as variantes). Deve receber o baseId e o sku e fazer a consulta, retornando os dados. Se o sku nao for informado, deve pegar o primeiro que aparecer na consulta. 
export async function getProductInfo_Mock(req, res) {
    const data = {
        user: {
            logged: 'true',
            role: 'admin'
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
            breadcrumbs: [
                { name: 'Início', url: '/' },
                { name: 'Masculino', url: '/masculino' },
                { name: 'Camisetas', url: '/masculino/camisetas' },
                { name: 'Camiseta Regular em Meia Malha com Estampa Red Hot Chili Peppers', url: '/masculino/camisetas/camiseta-regular-em-meia-malha-com-estampa-red-hot-chili-peppers' }
            ]
        }
    }
    return data;
}

//Mock de dados para obtencao de dado sobre variante especifica (clique em cor ou tamanho diferente na pagina de produto especifico)
export async function updateProductVariantData_Mock(sku) {
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
        return false
    }
    return variantData;
}

//Mock de dados para listagem de produtos
export async function getProductsForList_Mock(req, res) {
    const data = {
        products: [
            {
                id: '1',
                name: 'Camiseta Regular Red Hot Chili Peppers',
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
                breadcrumbs: [
                    { name: 'Início', url: '/' },
                    { name: 'Masculino', url: '/masculino' },
                    { name: 'Camisetas', url: '/masculino/camisetas' },
                    { name: 'Camiseta Regular em Meia Malha com Estampa Red Hot Chili Peppers', url: '/masculino/camisetas/camiseta-regular-em-meia-malha-com-estampa-red-hot-chili-peppers' }
                ]
            }
<<<<<<< HEAD
        }

        // res.render('product', { data })
        return data;
    }

    //Mock de dados para obtencao de dado sobre variante especifica (clique em cor ou tamanho diferente na pagina de produto especifico)
    static async updateProductVariantDataMock(sku) {
        // const type = req.query.type
        // const baseProduct = '1'

        // if (!type || !sku || !baseProduct) {
        //     return res.status(400).json({ message: 'Missing required parameters.' });
        // }
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
            return false
        }
        return variantData;
    }

    //Mock de dados para listagem de produtos
    static async getProducts(req, res) {
        const data = {
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
                currentPage: 1,
                totalPages: 1,
                itemsPerPage: 10
            },
            page: {
                breadcrumbs: [
                    { name: 'Início', url: '/' },
                    { name: 'Resultado da pesquisa para: Camiseta Masculina', url: '/products/search?searchParams=camiseta-masculina' },
                ],
                title: 'Resultado da busca por: Camisetas Masculinas',
                quantResults: 50,
            }
        }
        return data;

        // res.render('productsList', { data });
    }

    static async getLangingPageData() {
        const data = {
            components: [
                {
                    id: 1,
                    section_name: "Top Banner",
                    section_model: "banner",
                    content_type: "image",
                    section_position: 1,
                    start_date: "2024-01-01T00:00:00Z",
                    end_date: "2024-12-31T23:59:59Z",
                    is_active: true,
                    section_content:
                        [
                            {
                                image_large: "/public/mockImages/P04_241015_HOME_CARROSSEL_OFFICELOOK_DESK_GERAL.webp",
                                image_small: "/public/mockImages/P04_241015_HOME_CARROSSEL_OFFICELOOK_MOB_GERAL.webp",
                                link: "/promo",
                                link_name: "COMPRAR"
                            },
                            {
                                image_large: "/public/mockImages/P05_241015_HOME_CARROSSEL_MAKEGLOW_BELEZA_DESK.webp",
                                image_small: "/public/mockImages/P05_241015_HOME_CARROSSEL_MAKEGLOW_BELEZA_MOB.webp",
                                link: "/promo2",
                                link_name: "COMPRAR"
                            }
                        ],
                },
                {
                    id: 2,
                    section_name: "Destaques",
                    section_model: "highlight",
                    title: "EM DESTAQUE",
                    content_type: "text",
                    section_position: 2,
                    start_date: "2024-01-01T00:00:00Z",
                    end_date: "2024-12-31T23:59:59Z",
                    is_active: true,
                    section_content:
                        [
                            {
                                id: 1,
                                landing_page_component_id: 2,
                                element_order: 1,
                                start_date: "2024-01-01T00:00:00Z",
                                end_date: "2024-12-31T23:59:59Z",
                                is_active: true,
                                product: {
                                    id: '1',
                                    name: 'Camiseta Regular Red Hot Chili Peppers',
                                    price: '99,90',
                                    promoPrice: '79,90',
                                    isOnSale: true,
                                    installments: 4,
                                    installment_value: '19,98',
                                    images: [
                                        '/public/mockImages/redhotCamiseta.webp',
                                        '/public/mockImages/redhotCamiseta2.webp'
                                    ],
                                    url: '/masculino/camisetas/camiseta-regular-red-hot-chili-peppers',
                                    category: 'masculino',
                                    subcategory: 'camisetas'
                                }
                            },
                            {
                                id: 2,
                                landing_page_component_id: 2,
                                element_order: 2,
                                start_date: "2024-01-01T00:00:00Z",
                                end_date: "2024-12-31T23:59:59Z",
                                is_active: true,
                                product: {
                                    id: '1',
                                    name: 'Camiseta Regular Red Hot Chili Peppers',
                                    price: '99,90',
                                    promoPrice: '79,90',
                                    isOnSale: true,
                                    installments: 4,
                                    installment_value: '19,98',
                                    images: [
                                        '/public/mockImages/redhotCamiseta.webp',
                                        '/public/mockImages/redhotCamiseta2.webp'
                                    ],
                                    url: '/masculino/camisetas/camiseta-regular-red-hot-chili-peppers',
                                    category: 'masculino',
                                    subcategory: 'camisetas'
                                }
                            },
                            {
                                id: 3,
                                landing_page_component_id: 2,
                                element_order: 3,
                                start_date: "2024-01-01T00:00:00Z",
                                end_date: "2024-12-31T23:59:59Z",
                                is_active: true,
                                product: {
                                    id: '2',
                                    name: 'Camiseta Básica Branca',
                                    price: '59,90',
                                    promoPrice: null,
                                    isOnSale: false,
                                    installments: 3,
                                    installment_value: '19,97',
                                    images: [
                                        '/public/mockImages/12.webp',
                                        '/public/mockImages/13.webp'
                                    ],
                                    url: '/masculino/camisetas/camiseta-basica-branca',
                                    category: 'masculino',
                                    subcategory: 'camisetas'
                                }
                            },
                            {
                                id: 3,
                                landing_page_component_id: 2,
                                element_order: 3,
                                start_date: "2024-01-01T00:00:00Z",
                                end_date: "2024-12-31T23:59:59Z",
                                is_active: true,
                                product: {
                                    id: '2',
                                    name: 'Camiseta Básica Branca',
                                    price: '59,90',
                                    promoPrice: null,
                                    isOnSale: false,
                                    installments: 3,
                                    installment_value: '19,97',
                                    images: [
                                        '/public/mockImages/12.webp',
                                        '/public/mockImages/13.webp'
                                    ],
                                    url: '/masculino/camisetas/camiseta-basica-branca',
                                    category: 'masculino',
                                    subcategory: 'camisetas'
                                }
                            },
                            {
                                id: 3,
                                landing_page_component_id: 2,
                                element_order: 3,
                                start_date: "2024-01-01T00:00:00Z",
                                end_date: "2024-12-31T23:59:59Z",
                                is_active: true,
                                product: {
                                    id: '2',
                                    name: 'Camiseta Básica Branca',
                                    price: '59,90',
                                    promoPrice: null,
                                    isOnSale: false,
                                    installments: 3,
                                    installment_value: '19,97',
                                    images: [
                                        '/public/mockImages/12.webp',
                                        '/public/mockImages/13.webp'
                                    ],
                                    url: '/masculino/camisetas/camiseta-basica-branca',
                                    category: 'masculino',
                                    subcategory: 'camisetas'
                                }
                            },
                            {
                                id: 3,
                                landing_page_component_id: 2,
                                element_order: 3,
                                start_date: "2024-01-01T00:00:00Z",
                                end_date: "2024-12-31T23:59:59Z",
                                is_active: true,
                                product: {
                                    id: '2',
                                    name: 'Camiseta Básica Branca',
                                    price: '59,90',
                                    promoPrice: null,
                                    isOnSale: false,
                                    installments: 3,
                                    installment_value: '19,97',
                                    images: [
                                        '/public/mockImages/12.webp',
                                        '/public/mockImages/13.webp'
                                    ],
                                    url: '/masculino/camisetas/camiseta-basica-branca',
                                    category: 'masculino',
                                    subcategory: 'camisetas'
                                }
                            },
                            {
                                id: 3,
                                landing_page_component_id: 2,
                                element_order: 3,
                                start_date: "2024-01-01T00:00:00Z",
                                end_date: "2024-12-31T23:59:59Z",
                                is_active: true,
                                product: {
                                    id: '2',
                                    name: 'Camiseta Básica Branca',
                                    price: '59,90',
                                    promoPrice: null,
                                    isOnSale: false,
                                    installments: 3,
                                    installment_value: '19,97',
                                    images: [
                                        '/public/mockImages/12.webp',
                                        '/public/mockImages/13.webp'
                                    ],
                                    url: '/masculino/camisetas/camiseta-basica-branca',
                                    category: 'masculino',
                                    subcategory: 'camisetas'
                                }
                            },
                            {
                                id: 3,
                                landing_page_component_id: 2,
                                element_order: 3,
                                start_date: "2024-01-01T00:00:00Z",
                                end_date: "2024-12-31T23:59:59Z",
                                is_active: true,
                                product: {
                                    id: '2',
                                    name: 'Camiseta Básica Branca',
                                    price: '59,90',
                                    promoPrice: null,
                                    isOnSale: false,
                                    installments: 3,
                                    installment_value: '19,97',
                                    images: [
                                        '/public/mockImages/12.webp',
                                        '/public/mockImages/13.webp'
                                    ],
                                    url: '/masculino/camisetas/camiseta-basica-branca',
                                    category: 'masculino',
                                    subcategory: 'camisetas'
                                }
                            }
                        ],
                },
                {
                    id: 3,
                    section_name: "Recomendados",
                    section_model: "grid",
                    title: "RECOMENDADOS PARA VOCÊ",
                    content_type: "text",
                    section_position: 3,
                    start_date: "2024-01-01T00:00:00Z",
                    end_date: "2024-12-31T23:59:59Z",
                    is_active: true,
                    section_content:
                        [
                            {
                                id: 1,
                                landing_page_component_id: 3,
                                element_order: 3,
                                is_active: true,
                                product: {
                                    id: '2',
                                    name: 'Camiseta Básica Branca',
                                    price: '59,90',
                                    promoPrice: null,
                                    isOnSale: false,
                                    installments: 3,
                                    installment_value: '19,97',
                                    images: [
                                        '/public/mockImages/12.webp',
                                        '/public/mockImages/13.webp'
                                    ],
                                    url: '/masculino/camisetas/camiseta-basica-branca',
                                    category: 'masculino',
                                    subcategory: 'camisetas'
                                }
                            },
                            {
                                id: 2,
                                landing_page_component_id: 3,
                                element_order: 2,
                                is_active: true,
                                product: {
                                    id: '1',
                                    name: 'Camiseta Regular Red Hot Chili Peppers',
                                    price: '99,90',
                                    promoPrice: '79,90',
                                    isOnSale: true,
                                    installments: 4,
                                    installment_value: '19,98',
                                    images: [
                                        '/public/mockImages/redhotCamiseta.webp',
                                        '/public/mockImages/redhotCamiseta2.webp'
                                    ],
                                    url: '/masculino/camisetas/camiseta-regular-red-hot-chili-peppers',
                                    category: 'masculino',
                                    subcategory: 'camisetas'
                                }
                            },
                            {
                                id: 2,
                                landing_page_component_id: 3,
                                element_order: 1,
                                is_active: true,
                                product: {
                                    id: '1',
                                    name: 'Camiseta Regular Red Hot Chili Peppers',
                                    price: '99,90',
                                    promoPrice: '79,90',
                                    isOnSale: true,
                                    installments: 4,
                                    installment_value: '19,98',
                                    images: [
                                        '/public/mockImages/redhotCamiseta.webp',
                                        '/public/mockImages/redhotCamiseta2.webp'
                                    ],
                                    url: '/masculino/camisetas/camiseta-regular-red-hot-chili-peppers',
                                    category: 'masculino',
                                    subcategory: 'camisetas'
                                }
                            },
                            {
                                id: 2,
                                landing_page_component_id: 3,
                                element_order: 2,
                                is_active: true,
                                product: {
                                    id: '1',
                                    name: 'Camiseta Regular Red Hot Chili Peppers',
                                    price: '99,90',
                                    promoPrice: '79,90',
                                    isOnSale: true,
                                    installments: 4,
                                    installment_value: '19,98',
                                    images: [
                                        '/public/mockImages/redhotCamiseta.webp',
                                        '/public/mockImages/redhotCamiseta2.webp'
                                    ],
                                    url: '/masculino/camisetas/camiseta-regular-red-hot-chili-peppers',
                                    category: 'masculino',
                                    subcategory: 'camisetas'
                                }
                            },
                            {
                                id: 2,
                                landing_page_component_id: 3,
                                element_order: 2,
                                is_active: true,
                                product: {
                                    id: '1',
                                    name: 'Camiseta Regular Red Hot Chili Peppers',
                                    price: '99,90',
                                    promoPrice: '79,90',
                                    isOnSale: true,
                                    installments: 4,
                                    installment_value: '19,98',
                                    images: [
                                        '/public/mockImages/redhotCamiseta.webp',
                                        '/public/mockImages/redhotCamiseta2.webp'
                                    ],
                                    url: '/masculino/camisetas/camiseta-regular-red-hot-chili-peppers',
                                    category: 'masculino',
                                    subcategory: 'camisetas'
                                }
                            },
                            {
                                id: 2,
                                landing_page_component_id: 3,
                                element_order: 2,
                                is_active: true,
                                product: {
                                    id: '1',
                                    name: 'Camiseta Regular Red Hot Chili Peppers',
                                    price: '99,90',
                                    promoPrice: '79,90',
                                    isOnSale: true,
                                    installments: 4,
                                    installment_value: '19,98',
                                    images: [
                                        '/public/mockImages/redhotCamiseta.webp',
                                        '/public/mockImages/redhotCamiseta2.webp'
                                    ],
                                    url: '/masculino/camisetas/camiseta-regular-red-hot-chili-peppers',
                                    category: 'masculino',
                                    subcategory: 'camisetas'
                                }
                            },
                            {
                                id: 2,
                                landing_page_component_id: 3,
                                element_order: 2,
                                is_active: true,
                                product: {
                                    id: '1',
                                    name: 'Camiseta Regular Red Hot Chili Peppers',
                                    price: '99,90',
                                    promoPrice: '79,90',
                                    isOnSale: true,
                                    installments: 4,
                                    installment_value: '19,98',
                                    images: [
                                        '/public/mockImages/redhotCamiseta.webp',
                                        '/public/mockImages/redhotCamiseta2.webp'
                                    ],
                                    url: '/masculino/camisetas/camiseta-regular-red-hot-chili-peppers',
                                    category: 'masculino',
                                    subcategory: 'camisetas'
                                }
                            },
                            {
                                id: 2,
                                landing_page_component_id: 3,
                                element_order: 2,
                                is_active: true,
                                product: {
                                    id: '1',
                                    name: 'Camiseta Regular Red Hot Chili Peppers',
                                    price: '99,90',
                                    promoPrice: '79,90',
                                    isOnSale: true,
                                    installments: 4,
                                    installment_value: '19,98',
                                    images: [
                                        '/public/mockImages/redhotCamiseta.webp',
                                        '/public/mockImages/redhotCamiseta2.webp'
                                    ],
                                    url: '/masculino/camisetas/camiseta-regular-red-hot-chili-peppers',
                                    category: 'masculino',
                                    subcategory: 'camisetas'
                                }
                            },
                            {
                                id: 2,
                                landing_page_component_id: 3,
                                element_order: 2,
                                is_active: true,
                                product: {
                                    id: '1',
                                    name: 'Camiseta Regular Red Hot Chili Peppers',
                                    price: '99,90',
                                    promoPrice: '79,90',
                                    isOnSale: true,
                                    installments: 4,
                                    installment_value: '19,98',
                                    images: [
                                        '/public/mockImages/redhotCamiseta.webp',
                                        '/public/mockImages/redhotCamiseta2.webp'
                                    ],
                                    url: '/masculino/camisetas/camiseta-regular-red-hot-chili-peppers',
                                    category: 'masculino',
                                    subcategory: 'camisetas'
                                }
                            },
                            {
                                id: 2,
                                landing_page_component_id: 3,
                                element_order: 2,
                                is_active: true,
                                product: {
                                    id: '1',
                                    name: 'Camiseta Regular Red Hot Chili Peppers',
                                    price: '99,90',
                                    promoPrice: '79,90',
                                    isOnSale: true,
                                    installments: 4,
                                    installment_value: '19,98',
                                    images: [
                                        '/public/mockImages/redhotCamiseta.webp',
                                        '/public/mockImages/redhotCamiseta2.webp'
                                    ],
                                    url: '/masculino/camisetas/camiseta-regular-red-hot-chili-peppers',
                                    category: 'masculino',
                                    subcategory: 'camisetas'
                                }
                            },
                        ],
                },
                {
                    id: 4,
                    section_name: "Recomendados",
                    section_model: "cards",
                    title: "NOVIDADES",
                    content_type: "image",
                    section_position: 3,
                    start_date: "2024-01-01T00:00:00Z",
                    end_date: "2024-12-31T23:59:59Z",
                    is_active: true,
                    section_content:
                        [
                        ],
                }
            ]
        }
        return data;
    }
}

export default MockProductData
=======
        ],
        pagination: {
            currentPage: 1,
            totalPages: 1,
            itemsPerPage: 10
        },
        page: {
            breadcrumbs: [
                { name: 'Início', url: '/' },
                { name: 'Resultado da pesquisa para: Camiseta Masculina', url: '/products/search?searchParams=camiseta-masculina' },
            ],
            title: 'Resultado da busca por: Camisetas Masculinas',
            quantResults: 50,
        }
    }
    return data;
}

export async function getCategories_Mock() {
    const categories = [
        {
            "id": 1,
            "name": "Feminino",
            "subcategories": [
                { "id": 101, "name": "Vestidos" },
                { "id": 102, "name": "Blusas" },
                { "id": 103, "name": "Calças" },
                { "id": 104, "name": "Saia" },
                { "id": 105, "name": "Acessórios" }
            ]
        },
        {
            "id": 2,
            "name": "Masculino",
            "subcategories": [
                { "id": 201, "name": "Camisas" },
                { "id": 202, "name": "Calças" },
                { "id": 203, "name": "Bermudas" },
                { "id": 204, "name": "Jaquetas" },
                { "id": 205, "name": "Acessórios" }
            ]
        },
        {
            "id": 3,
            "name": "Infantil",
            "subcategories": [
                { "id": 301, "name": "Meninas" },
                { "id": 302, "name": "Meninos" },
                { "id": 303, "name": "Bebês" }
            ]
        },
        {
            "id": 4,
            "name": "Calçados",
            "subcategories": [
                { "id": 401, "name": "Femininos" },
                { "id": 402, "name": "Masculinos" },
                { "id": 403, "name": "Infantis" },
                { "id": 404, "name": "Esportivos" }
            ]
        },
        {
            "id": 5,
            "name": "Moda Praia",
            "subcategories": [
                { "id": 501, "name": "Biquínis" },
                { "id": 502, "name": "Sungas" },
                { "id": 503, "name": "Saídas de Praia" }
            ]
        },
        {
            "id": 6,
            "name": "Roupas de Cama",
            "subcategories": [
                { "id": 601, "name": "Lençóis" },
                { "id": 602, "name": "Cobertores" },
                { "id": 603, "name": "Travesseiros" }
            ]
        }
    ];
    return categories;
}

export async function getLandingPageComponentsAndData_Mock() {
    const data = {
        components: [
            {
                id: 1,
                section_name: "Top Banner",
                section_model: "banner",
                content_type: "image",
                section_position: 1,
                start_date: "2024-01-01T00:00:00Z",
                end_date: "2024-12-31T23:59:59Z",
                is_active: true,
                section_content:
                    [
                        {
                            image_large: "/public/mockImages/P04_241015_HOME_CARROSSEL_OFFICELOOK_DESK_GERAL.webp",
                            image_small: "/public/mockImages/P04_241015_HOME_CARROSSEL_OFFICELOOK_MOB_GERAL.webp",
                            link: "/promo",
                            link_name: "COMPRAR"
                        },
                        {
                            image_large: "/public/mockImages/P05_241015_HOME_CARROSSEL_MAKEGLOW_BELEZA_DESK.webp",
                            image_small: "/public/mockImages/P05_241015_HOME_CARROSSEL_MAKEGLOW_BELEZA_MOB.webp",
                            link: "/promo2",
                            link_name: "COMPRAR"
                        }
                    ],
            },
            {
                id: 2,
                section_name: "Destaques",
                section_model: "highlight",
                title: "EM DESTAQUE",
                content_type: "text",
                section_position: 2,
                start_date: "2024-01-01T00:00:00Z",
                end_date: "2024-12-31T23:59:59Z",
                is_active: true,
                section_content:
                    [
                        {
                            id: 1,
                            landing_page_component_id: 2,
                            element_order: 1,
                            start_date: "2024-01-01T00:00:00Z",
                            end_date: "2024-12-31T23:59:59Z",
                            is_active: true,
                            product: {
                                id: '1',
                                name: 'Camiseta Regular Red Hot Chili Peppers',
                                price: '99,90',
                                promoPrice: '79,90',
                                isOnSale: true,
                                installments: 4,
                                installment_value: '19,98',
                                images: [
                                    '/public/mockImages/redhotCamiseta.webp',
                                    '/public/mockImages/redhotCamiseta2.webp'
                                ],
                                url: '/masculino/camisetas/camiseta-regular-red-hot-chili-peppers',
                                category: 'masculino',
                                subcategory: 'camisetas'
                            }
                        },
                        {
                            id: 2,
                            landing_page_component_id: 2,
                            element_order: 2,
                            start_date: "2024-01-01T00:00:00Z",
                            end_date: "2024-12-31T23:59:59Z",
                            is_active: true,
                            product: {
                                id: '1',
                                name: 'Camiseta Regular Red Hot Chili Peppers',
                                price: '99,90',
                                promoPrice: '79,90',
                                isOnSale: true,
                                installments: 4,
                                installment_value: '19,98',
                                images: [
                                    '/public/mockImages/redhotCamiseta.webp',
                                    '/public/mockImages/redhotCamiseta2.webp'
                                ],
                                url: '/masculino/camisetas/camiseta-regular-red-hot-chili-peppers',
                                category: 'masculino',
                                subcategory: 'camisetas'
                            }
                        },
                        {
                            id: 3,
                            landing_page_component_id: 2,
                            element_order: 3,
                            start_date: "2024-01-01T00:00:00Z",
                            end_date: "2024-12-31T23:59:59Z",
                            is_active: true,
                            product: {
                                id: '2',
                                name: 'Camiseta Básica Branca',
                                price: '59,90',
                                promoPrice: null,
                                isOnSale: false,
                                installments: 3,
                                installment_value: '19,97',
                                images: [
                                    '/public/mockImages/12.webp',
                                    '/public/mockImages/13.webp'
                                ],
                                url: '/masculino/camisetas/camiseta-basica-branca',
                                category: 'masculino',
                                subcategory: 'camisetas'
                            }
                        },
                        {
                            id: 3,
                            landing_page_component_id: 2,
                            element_order: 3,
                            start_date: "2024-01-01T00:00:00Z",
                            end_date: "2024-12-31T23:59:59Z",
                            is_active: true,
                            product: {
                                id: '2',
                                name: 'Camiseta Básica Branca',
                                price: '59,90',
                                promoPrice: null,
                                isOnSale: false,
                                installments: 3,
                                installment_value: '19,97',
                                images: [
                                    '/public/mockImages/12.webp',
                                    '/public/mockImages/13.webp'
                                ],
                                url: '/masculino/camisetas/camiseta-basica-branca',
                                category: 'masculino',
                                subcategory: 'camisetas'
                            }
                        },
                        {
                            id: 3,
                            landing_page_component_id: 2,
                            element_order: 3,
                            start_date: "2024-01-01T00:00:00Z",
                            end_date: "2024-12-31T23:59:59Z",
                            is_active: true,
                            product: {
                                id: '2',
                                name: 'Camiseta Básica Branca',
                                price: '59,90',
                                promoPrice: null,
                                isOnSale: false,
                                installments: 3,
                                installment_value: '19,97',
                                images: [
                                    '/public/mockImages/12.webp',
                                    '/public/mockImages/13.webp'
                                ],
                                url: '/masculino/camisetas/camiseta-basica-branca',
                                category: 'masculino',
                                subcategory: 'camisetas'
                            }
                        },
                        {
                            id: 3,
                            landing_page_component_id: 2,
                            element_order: 3,
                            start_date: "2024-01-01T00:00:00Z",
                            end_date: "2024-12-31T23:59:59Z",
                            is_active: true,
                            product: {
                                id: '2',
                                name: 'Camiseta Básica Branca',
                                price: '59,90',
                                promoPrice: null,
                                isOnSale: false,
                                installments: 3,
                                installment_value: '19,97',
                                images: [
                                    '/public/mockImages/12.webp',
                                    '/public/mockImages/13.webp'
                                ],
                                url: '/masculino/camisetas/camiseta-basica-branca',
                                category: 'masculino',
                                subcategory: 'camisetas'
                            }
                        },
                        {
                            id: 3,
                            landing_page_component_id: 2,
                            element_order: 3,
                            start_date: "2024-01-01T00:00:00Z",
                            end_date: "2024-12-31T23:59:59Z",
                            is_active: true,
                            product: {
                                id: '2',
                                name: 'Camiseta Básica Branca',
                                price: '59,90',
                                promoPrice: null,
                                isOnSale: false,
                                installments: 3,
                                installment_value: '19,97',
                                images: [
                                    '/public/mockImages/12.webp',
                                    '/public/mockImages/13.webp'
                                ],
                                url: '/masculino/camisetas/camiseta-basica-branca',
                                category: 'masculino',
                                subcategory: 'camisetas'
                            }
                        },
                        {
                            id: 3,
                            landing_page_component_id: 2,
                            element_order: 3,
                            start_date: "2024-01-01T00:00:00Z",
                            end_date: "2024-12-31T23:59:59Z",
                            is_active: true,
                            product: {
                                id: '2',
                                name: 'Camiseta Básica Branca',
                                price: '59,90',
                                promoPrice: null,
                                isOnSale: false,
                                installments: 3,
                                installment_value: '19,97',
                                images: [
                                    '/public/mockImages/12.webp',
                                    '/public/mockImages/13.webp'
                                ],
                                url: '/masculino/camisetas/camiseta-basica-branca',
                                category: 'masculino',
                                subcategory: 'camisetas'
                            }
                        }
                    ],
            },
            {
                id: 3,
                section_name: "Recomendados",
                section_model: "grid",
                title: "RECOMENDADOS PARA VOCÊ",
                content_type: "text",
                section_position: 3,
                start_date: "2024-01-01T00:00:00Z",
                end_date: "2024-12-31T23:59:59Z",
                is_active: true,
                section_content:
                    [
                        {
                            id: 1,
                            landing_page_component_id: 3,
                            element_order: 3,
                            is_active: true,
                            product: {
                                id: '2',
                                name: 'Camiseta Básica Branca',
                                price: '59,90',
                                promoPrice: null,
                                isOnSale: false,
                                installments: 3,
                                installment_value: '19,97',
                                images: [
                                    '/public/mockImages/12.webp',
                                    '/public/mockImages/13.webp'
                                ],
                                url: '/masculino/camisetas/camiseta-basica-branca',
                                category: 'masculino',
                                subcategory: 'camisetas'
                            }
                        },
                        {
                            id: 2,
                            landing_page_component_id: 3,
                            element_order: 2,
                            is_active: true,
                            product: {
                                id: '1',
                                name: 'Camiseta Regular Red Hot Chili Peppers',
                                price: '99,90',
                                promoPrice: '79,90',
                                isOnSale: true,
                                installments: 4,
                                installment_value: '19,98',
                                images: [
                                    '/public/mockImages/redhotCamiseta.webp',
                                    '/public/mockImages/redhotCamiseta2.webp'
                                ],
                                url: '/masculino/camisetas/camiseta-regular-red-hot-chili-peppers',
                                category: 'masculino',
                                subcategory: 'camisetas'
                            }
                        },
                        {
                            id: 2,
                            landing_page_component_id: 3,
                            element_order: 1,
                            is_active: true,
                            product: {
                                id: '1',
                                name: 'Camiseta Regular Red Hot Chili Peppers',
                                price: '99,90',
                                promoPrice: '79,90',
                                isOnSale: true,
                                installments: 4,
                                installment_value: '19,98',
                                images: [
                                    '/public/mockImages/redhotCamiseta.webp',
                                    '/public/mockImages/redhotCamiseta2.webp'
                                ],
                                url: '/masculino/camisetas/camiseta-regular-red-hot-chili-peppers',
                                category: 'masculino',
                                subcategory: 'camisetas'
                            }
                        },
                        {
                            id: 2,
                            landing_page_component_id: 3,
                            element_order: 2,
                            is_active: true,
                            product: {
                                id: '1',
                                name: 'Camiseta Regular Red Hot Chili Peppers',
                                price: '99,90',
                                promoPrice: '79,90',
                                isOnSale: true,
                                installments: 4,
                                installment_value: '19,98',
                                images: [
                                    '/public/mockImages/redhotCamiseta.webp',
                                    '/public/mockImages/redhotCamiseta2.webp'
                                ],
                                url: '/masculino/camisetas/camiseta-regular-red-hot-chili-peppers',
                                category: 'masculino',
                                subcategory: 'camisetas'
                            }
                        },
                        {
                            id: 2,
                            landing_page_component_id: 3,
                            element_order: 2,
                            is_active: true,
                            product: {
                                id: '1',
                                name: 'Camiseta Regular Red Hot Chili Peppers',
                                price: '99,90',
                                promoPrice: '79,90',
                                isOnSale: true,
                                installments: 4,
                                installment_value: '19,98',
                                images: [
                                    '/public/mockImages/redhotCamiseta.webp',
                                    '/public/mockImages/redhotCamiseta2.webp'
                                ],
                                url: '/masculino/camisetas/camiseta-regular-red-hot-chili-peppers',
                                category: 'masculino',
                                subcategory: 'camisetas'
                            }
                        },
                        {
                            id: 2,
                            landing_page_component_id: 3,
                            element_order: 2,
                            is_active: true,
                            product: {
                                id: '1',
                                name: 'Camiseta Regular Red Hot Chili Peppers',
                                price: '99,90',
                                promoPrice: '79,90',
                                isOnSale: true,
                                installments: 4,
                                installment_value: '19,98',
                                images: [
                                    '/public/mockImages/redhotCamiseta.webp',
                                    '/public/mockImages/redhotCamiseta2.webp'
                                ],
                                url: '/masculino/camisetas/camiseta-regular-red-hot-chili-peppers',
                                category: 'masculino',
                                subcategory: 'camisetas'
                            }
                        },
                        {
                            id: 2,
                            landing_page_component_id: 3,
                            element_order: 2,
                            is_active: true,
                            product: {
                                id: '1',
                                name: 'Camiseta Regular Red Hot Chili Peppers',
                                price: '99,90',
                                promoPrice: '79,90',
                                isOnSale: true,
                                installments: 4,
                                installment_value: '19,98',
                                images: [
                                    '/public/mockImages/redhotCamiseta.webp',
                                    '/public/mockImages/redhotCamiseta2.webp'
                                ],
                                url: '/masculino/camisetas/camiseta-regular-red-hot-chili-peppers',
                                category: 'masculino',
                                subcategory: 'camisetas'
                            }
                        },
                        {
                            id: 2,
                            landing_page_component_id: 3,
                            element_order: 2,
                            is_active: true,
                            product: {
                                id: '1',
                                name: 'Camiseta Regular Red Hot Chili Peppers',
                                price: '99,90',
                                promoPrice: '79,90',
                                isOnSale: true,
                                installments: 4,
                                installment_value: '19,98',
                                images: [
                                    '/public/mockImages/redhotCamiseta.webp',
                                    '/public/mockImages/redhotCamiseta2.webp'
                                ],
                                url: '/masculino/camisetas/camiseta-regular-red-hot-chili-peppers',
                                category: 'masculino',
                                subcategory: 'camisetas'
                            }
                        },
                        {
                            id: 2,
                            landing_page_component_id: 3,
                            element_order: 2,
                            is_active: true,
                            product: {
                                id: '1',
                                name: 'Camiseta Regular Red Hot Chili Peppers',
                                price: '99,90',
                                promoPrice: '79,90',
                                isOnSale: true,
                                installments: 4,
                                installment_value: '19,98',
                                images: [
                                    '/public/mockImages/redhotCamiseta.webp',
                                    '/public/mockImages/redhotCamiseta2.webp'
                                ],
                                url: '/masculino/camisetas/camiseta-regular-red-hot-chili-peppers',
                                category: 'masculino',
                                subcategory: 'camisetas'
                            }
                        },
                        {
                            id: 2,
                            landing_page_component_id: 3,
                            element_order: 2,
                            is_active: true,
                            product: {
                                id: '1',
                                name: 'Camiseta Regular Red Hot Chili Peppers',
                                price: '99,90',
                                promoPrice: '79,90',
                                isOnSale: true,
                                installments: 4,
                                installment_value: '19,98',
                                images: [
                                    '/public/mockImages/redhotCamiseta.webp',
                                    '/public/mockImages/redhotCamiseta2.webp'
                                ],
                                url: '/masculino/camisetas/camiseta-regular-red-hot-chili-peppers',
                                category: 'masculino',
                                subcategory: 'camisetas'
                            }
                        },
                    ],
            },
            {
                id: 4,
                section_name: "Recomendados",
                section_model: "cards",
                title: "NOVIDADES",
                content_type: "image",
                section_position: 3,
                start_date: "2024-01-01T00:00:00Z",
                end_date: "2024-12-31T23:59:59Z",
                is_active: true,
                section_content:
                    [
                    ],
            }
        ],
    }

    return data;
}
>>>>>>> feature/server.2
