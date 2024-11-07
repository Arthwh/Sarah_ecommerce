import { Product } from "../models/productModel.js";

export class ProductVariant extends Product {
    constructor({ id, product_id, public_id, color, unit_price, installments, is_on_sale, size, stock_quantity }) {
        this.id = id;
        this.product_id = product_id;
        this.public_id = public_id;
        this.color = color;
        this.unit_price = unit_price;
        this.installments = installments;
        this.is_on_sale = is_on_sale;
        this.size = size;
        this.stock_quantity = stock_quantity || 0;
    }

}

// Método para validar dados do produto
export function validate(productVariantData) {
    const { product_id, public_id, color, unit_price, installments, is_on_sale, size, stock_quantity } = productVariantData;
    if (!product_id || !public_id || !color || !unit_price || !installments || !is_on_sale || !size || !stock_quantity) {
        return false
    }
    return true
}