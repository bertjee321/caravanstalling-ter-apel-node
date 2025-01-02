interface VehicleBase {
  customer_id?: number;
  type?: string;
  garage?: string;
  license_plate?: string;
}

export interface AddVehicle extends VehicleBase {
  customer_id: number; // Customer ID is required for adding a vehicle
  type: string; // Type is required for adding a vehicle
  garage: string; // Garage is required for adding a vehicle
  license_plate: string; // License plate is required for adding a vehicle
}

export interface UpdateVehicle extends VehicleBase {
  id: number; // ID is required for updating a vehicle
}
