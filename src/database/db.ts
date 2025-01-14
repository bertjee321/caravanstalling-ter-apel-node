import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { Database } from "./database.types";

dotenv.config();

const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export default supabase;
