import { createClient } from '@supabase/supabase-js'
  import {onMount} from 'svelte'
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMzQxNzIwMiwiZXhwIjoxOTM4OTkzMjAyfQ.Lo86msAQIX432Z_-WZ6FwWenuntY6R4INjqVlePMM1s'

  const SUPABASE_URL = "https://qhlvntmxjwhevzfkqjfs.supabase.co"

  export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)