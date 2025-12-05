const customer = {
  customer: {
    id: "cus_01J8Z3M7K5A9G82W4XPK3X9V2B",
    email: "john@example.com",
    first_name: "John",
    last_name: "Doe",
    phone: "+1234567890",

    has_account: true,

    created_at: "2023-12-01T12:44:12.000Z",
    updated_at: "2024-03-02T15:20:10.000Z",
    deleted_at: null,

    shipping_addresses: [
      {
        id: "addr_01J8Z3X7Q9PV3C2KT67W9MZ4A1",
        customer_id: "cus_01J8Z3M7K5A9G82W4XPK3X9V2B",
        first_name: "John",
        last_name: "Doe",
        company: null,
        address_1: "321 5th Ave",
        address_2: null,
        city: "New York",
        country_code: "us",
        postal_code: "94016",
        province: "NY",
        phone: "+1234567890",
        created_at: "2023-12-02T11:10:10.000Z",
        updated_at: "2024-01-10T10:30:00.000Z",
      },
    ],

    billing_address_id: null,
    billing_address: null,

    metadata: {},
  },
};

export async function retrieveCustomer() {
  return customer;
}
