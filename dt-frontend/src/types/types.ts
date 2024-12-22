export interface Item {
  id: number;
  product_id: string;
  type: string;
  air_temperature: number;
  process_temperature: number;
  rotational_speed: number;
  torque: number;
  tool_wear: number;
  machine_failure: boolean;
  twf: boolean;
  hdf: boolean;
  pwf: boolean;
  osf: boolean;
  rnf: boolean;
}
