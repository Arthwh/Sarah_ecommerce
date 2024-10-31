import ProductService from '../services/productService.js';

class ProductController {
    static async getLandingPage(req, res) {
        try {
            const components = await ProductService.getLandingPageData();
            res.render('client/landingPage', { data: { components } });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao carregar a página inicial' });
        }

        res.status(200).json({ message: "Sucesso" });
    }

    static async getCategories(req, res) {
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

        res.status(200).json(categories);
    }

    static async getAdminPage(req, res) {
        res.render('admin/adminControlPage', {})
    }

    static async getLangingPage(req, res) {
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
        res.render('client/landingPage', { data });
    }

    static async listProducts(req, res) {
        try {
            const data = await ProductService.listProducts();
            res.render('productsList', { data });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar produtos' });
        }
    }

    static async getProduct(req, res) {
        try {
            const data = await ProductService.getProduct();
            res.render('product', { data });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar produto' });
        }
    }

    static async updateProductVariantData(req, res) {
        try {
            const sku = req.params.id;
            const data = await ProductService.updateProductVariantData(sku);
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({ error: 'Produto não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar dados da variante do produto' });
        }
    }

    static async createProduct(req, res) {
        try {
            const newProduct = await ProductService.createProduct(req.body);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar produto' });
        }
    }

    static async updateProduct(req, res) {
        try {
            const updatedProduct = await ProductService.updateProduct(req.params.id, req.body);
            if (!updatedProduct) return res.status(404).json({ error: 'Produto não encontrado' });
            res.json(updatedProduct);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar produto' });
        }
    }

    static async deleteProduct(req, res) {
        try {
            const deletedProduct = await ProductService.deleteProduct(req.params.id);
            if (!deletedProduct) return res.status(404).json({ error: 'Produto não encontrado' });
            res.json({ message: 'Produto deletado com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar produto' });
        }
    }
}

export default ProductController;