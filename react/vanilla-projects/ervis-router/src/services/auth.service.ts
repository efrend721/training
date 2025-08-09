import type { UserInfo } from '../models';
import { logger } from '../utilities/logger.utility';

const baseUrl = 'https://rickandmortyapi.com/api';
const characterUrl = baseUrl + '/character/';

interface RickAndMortyCharacter {
  id: number;
  name: string;
  email?: string;
  // Agregar más propiedades según la API
}

export const getMorty = async (): Promise<UserInfo> => {
  try {
    logger.info('Iniciando autenticación con API Rick and Morty');
    
    const response = await fetch(`${characterUrl}2`);
    
    if (!response.ok) {
      const errorMessage = `Error HTTP: ${response.status} - ${response.statusText}`;
      logger.apiError(characterUrl + '2', new Error(errorMessage), response);
      throw new Error(`Error al obtener datos del usuario: ${errorMessage}`);
    }
    
    const data: RickAndMortyCharacter = await response.json();
    
    // Transformar datos de la API al formato UserInfo
    const userInfo: UserInfo = {
      id: data.id,
      name: data.name,
      email: data.email || `${data.name.toLowerCase().replace(/\s+/g, '.')}@rickandmorty.com`,
      rol: 'user' // Rol por defecto
    };
    
    logger.info('Autenticación exitosa', { userId: userInfo.id, userName: userInfo.name });
    return userInfo;
    
  } catch (error) {
    logger.authError('Error en getMorty', error instanceof Error ? error : new Error(String(error)));
    
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error('Error desconocido durante la autenticación');
  }
};