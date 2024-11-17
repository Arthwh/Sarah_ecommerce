export async function getLandingPageComponentsAndData_Mock() {
    const components =
        [
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
                section_model: "carousel",
                title: "EM OFERTA",
                content_type: "text",
                section_position: 2,
                product_type: 'offers',
                product_limit: 15,
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
                title: "PRODUTOS MAIS VENDIDOS",
                content_type: "text",
                section_position: 3,
                product_type: 'bestSelling',
                product_limit: 15,
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
        ];

    return components;
}
