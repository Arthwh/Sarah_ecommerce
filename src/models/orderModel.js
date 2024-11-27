export class Order {
    constructor(id, user_id, address_id, payment_id, total_price, status, created_at, updated_at, is_active) {
        this.id = id;
        this.user_id = user_id;
        this.address_id = address_id;
        this.payment_id = payment_id;
        this.total_price = total_price;
        this.status = status;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.is_active = is_active;
    }

    static mapFromRow(row) {
        return new Order(
            row.id,
            row.user_id,
            row.address_id,
            row.payment_id,
            row.total_price,
            row.status,
            row.created_at,
            row.updated_at,
            row.is_active
        );
    }
}

class OrderItem {
    constructor(id, order_id, product_id, quantity, unit_price, created_at, updated_at) {
        this.id = id;
        this.order_id = order_id;
        this.product_id = product_id;
        this.quantity = quantity;
        this.unit_price = unit_price;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    static mapFromRow(row) {
        return new OrderItem(
            row.id,
            row.order_id,
            row.product_id,
            row.quantity,
            row.unit_price,
            row.created_at,
            row.updated_at
        );
    }
}

class Payment {
    constructor(id, payment_method, amount, status, transaction_id, created_at, updated_at) {
        this.id = id;
        this.payment_method = payment_method;
        this.amount = amount;
        this.status = status;
        this.transaction_id = transaction_id;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    static mapFromRow(row) {
        return new Payment(
            row.id,
            row.payment_method,
            row.amount,
            row.status,
            row.transaction_id,
            row.created_at,
            row.updated_at
        );
    }
}
