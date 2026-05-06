import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@donavida:bienvenida_vista';

export function usePrimeraVez() {
  const [esPrimeraVez, setEsPrimeraVez] = useState<boolean | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(KEY).then((valor) => {
      setEsPrimeraVez(valor === null);
    });
  }, []);

  const marcarVista = async () => {
    await AsyncStorage.setItem(KEY, 'true');
    setEsPrimeraVez(false);
  };

  return { esPrimeraVez, marcarVista };
}