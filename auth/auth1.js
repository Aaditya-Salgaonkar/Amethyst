import { createClient } from '@supabase/supabase-js';
import dotenv from "dotenv";

dotenv.config(); // to load environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)

export async function signIn(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        return data;
    } catch (error) {
        throw error;
    }
}

export async function signUp(email, password) {
    try {
        const { data, error } = await supabase.auth.signUp({ email, password });
        return data;
    } catch (error) {
        throw error;
    }
}
