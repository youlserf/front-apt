# Instrucciones para ejecutar el proyecto

1. **Clonar el repositorio**: Ejecuta el siguiente comando para clonar el proyecto en tu máquina local:
   ```bash
   git clone <url-del-repositorio>
   ```

2. **Instalar las dependencias**: Navega al directorio del frontend y ejecuta el siguiente comando para instalar las dependencias:
   ```bash
   npm install
   ```

3. **Modificar la URL del API**: Edita el archivo `config.js` ubicado en:
   ```bash
   C:\me\work\apuesta-total\desafio\frontend\src\services\config.js
   ```
   Ajusta la URL del API si el backend está en un servidor distinto. Por ejemplo:
   ```javascript
   export const API_URL = 'http://<ip-o-dominio>:4000';
   ```

4. **Ejecutar el proyecto**: Inicia el servidor de desarrollo del frontend con el siguiente comando:
   ```bash
   npm run dev
   ```

5. **Archivo CSV de prueba**: Puedes encontrar el archivo CSV de prueba para registrar los archivos de prueba de Pokémones en la siguiente ubicación:
   ```
   proyecto/pokemon.csv
   ```

