# React Native Boilerplate with TailwindCSS

This boilerplate provides a solid starting point for building React Native apps with the power of TailwindCSS for styling.

## Installation

### Step 1: Create a New React Native Project

```bash
npx react-native@latest init AwesomeProject
``` 
Step 2: Install TailwindCSS
```
yarn add nativewind
yarn add --dev tailwindcss@3.3.2
```

Step 3: Configure Android SDK Path
Create a new file called local.properties in the android directory of your React Native project and add the following line:
properties
```
sdk.dir=C:\\Users\\HP\\AppData\\Local\\Android\\Sdk
```

Step 4: Configure ESLint
Create a new file called .eslintrc in the root directory of your React Native project and add the following code:
```
module.exports = {
  root: true,
  extends: '@react-native-community',
};
```
