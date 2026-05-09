// services/supabase.ts
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gcbulpeilvgqsiiblyam.supabase.co';
const supabaseAnonKey = 'sb_publishable_AE57hKFIgJ51wPGRsTLTMg_jGn5PhmR';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { storage: AsyncStorage, autoRefreshToken: true, persistSession: true }
});

const getNearbyHospitals = async (lat: number, lng: number, radiusKm = 5) => {
  // Fórmula de Haversine en SQL
  const { data, error } = await supabase.rpc('nearby_hospitals', {
    lat_user: lat,
    lng_user: lng,
    radius_km: radiusKm,
  });
  if (error) throw error;
  return data;
};