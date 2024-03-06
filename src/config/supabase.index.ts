import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASEDB_URI
const supabaseApiKey = process.env.SUPABASEDB_API_KEY

const supabase = createClient(supabaseUrl, supabaseApiKey)

export default supabase;