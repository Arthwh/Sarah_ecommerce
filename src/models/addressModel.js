export class Address {
    constructor(id, city_id, road, complement, zip_code, created_at, updated_at, is_active) {
        this.id = id;
        this.city_id = city_id;
        this.road = road;
        this.complement = complement;
        this.zip_code = zip_code;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.is_active = is_active;
    }

    static mapFromRow(row) {
        return new Address(
            row.id,
            row.city_id,
            row.road,
            row.complement,
            row.zip_code,
            row.created_at,
            row.updated_at,
            row.is_active
        );
    }
}
