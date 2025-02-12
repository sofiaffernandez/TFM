TFM - Desarrollo aplicación 

Para el desarrollo de la aplicación se ha utilizado Expo. Expo es una plataforma de desarrollo que permite crear aplicaciones móviles con React Native de manera eficiente, eliminando la necesidad de configuraciones complejas en entornos nativos. Para distribuir y probar una aplicación en dispositivos Android sin necesidad de publicarla en Google Play, Expo proporciona herramientas para la generación de archivos APK. 
Antes de generar el archivo APK, es fundamental contar con un entorno de desarrollo correctamente configurado. Para ello, se deben cumplir los siguientes requisitos, tener instalado Node.js, contar con Expo CLI instalado globalmente en el sistema y disponer de una cuenta en Expo, ya que es necesaria para la autenticación en el servicio de compilación en la nube. 
Para generar el APK de la aplicación, se utiliza el siguiente comando en la terminal dentro del directorio del proyecto:
eas build --platform android --profile preview --local
Este proceso compila la aplicación en un archivo APK, na vez completada la compilación, el archivo generado se trasfiere al dispositivo Android y se instala en el mismo. 
