import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://odqezxrubuyxxrgmecrv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kcWV6eHJ1YnV5eHhyZ21lY3J2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ4MjA3NjksImV4cCI6MjAyMDM5Njc2OX0.xAZ4seChzY-jnqgiiHscjzV7hbsRxqrXDE2fslTLivs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
