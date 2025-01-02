interface CustomerBase {
  email?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
}

export interface AddCustomer extends CustomerBase {
  email: string; // Email is required for adding a customer
  last_name: string; // Last name is required for adding a customer
}

export interface UpdateCustomer extends CustomerBase {
  id: number; // ID is required for updating a customer
}
