import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_API_URL

const supabaseAnonKey = import.meta.env.VITE_API_KEY


const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase
