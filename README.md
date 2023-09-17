React Native Boilerplate with TailwindCSS

This boilerplate provides a starting point for building React Native apps with TailwindCSS.

Installation:

Create a new React Native project:
npx react-native@latest init AwesomeProject
Install TailwindCSS:
yarn add nativewind
yarn add --dev tailwindcss@3.3.2
Create a new file called local.properties in the android directory and add the following line:
sdk.dir=C:\\Users\\HP\\AppData\\Local\\Android\\Sdk
Create a new file called .eslintrc and add the following code:
module.exports = {
  root: true,
  extends: '@react-native-community',
};
