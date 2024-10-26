// import 'react-native-url-polyfill/auto';

// import { Env } from '@env';
// import { createClient } from '@supabase/supabase-js';
// import { AppState } from 'react-native';


// const supabaseUrl = Env.SUPABASE_API_URL;
// const supabaseAnonKey = Env.SUPABASE_ANON_KEY;

// // const mmkvSupabaseSupportedStorage = {
// //   setItem: (key, data) => storage.set(key, data),
// //   getItem: (key) => storage.getString(key) ?? null,
// //   removeItem: (key) => storage.delete(key),
// // } satisfies SupportedStorage;


// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// AppState.addEventListener("change", (state) => {
// 	if (state === "active") {
// 		supabase.auth.startAutoRefresh();
// 	} else {
// 		supabase.auth.stopAutoRefresh();
// 	}
// });

// export const loginWithPassword = async (email: string, password: string) => {
//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });
//   if (error) {
//     throw error;
//   }

//   return data
// };

// export const signUpWithPassword = async (email: string, password: string) => {
//   const { data, error } = await supabase.auth.signUp({
//     email,
//     password,
//   });
//   if (error) {
//     throw error;
//   }

//   return data
// };



