# 📱 Tela de Cadastro - App de Navegação React Native

## 📌 Sobre o Projeto

Este é um projeto acadêmico desenvolvido em **React Native** utilizando a plataforma **Expo Snack**. O aplicativo implementa uma estrutura de navegação entre telas, com foco em uma interface de **Login** e **Cadastro de usuários**. Ele serve como base para estudos de navegação em pilha (Stack Navigation) e criação de telas autenticáveis.

## 🧱 Estrutura do Projeto

O aplicativo é composto pelas seguintes telas (screens):

| Tela | Componente | Descrição |
|------|------------|-----------|
| **Login** | `Login.js` | Tela inicial para autenticação do usuário. |
| **Cadastro** | `Cadastro.js` | Tela para registro de novos usuários. |
| **Busca** | `Busca.js` | Tela de pesquisa (funcionalidade a ser implementada). |
| **ListaCompleta** | `ListaCompleta.js` | Tela para exibir uma lista de itens/usuários. |

## 🧭 Navegação

A navegação entre as telas é gerenciada pelo **React Navigation** na versão nativa (stack). O código no arquivo `App.js` define o seguinte roteamento:

- **Rota inicial**: `Login` (header oculto)
- Transições possíveis:
  - `Login` → `Cadastro`
  - `Login` → `Busca` (após autenticação)
  - `Cadastro` → `ListaCompleta` (após cadastro bem-sucedido)

```javascript
// App.js (resumo)
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import Cadastro from './Cadastro';
import Busca from './Busca';
import ListaCompleta from './ListaCompleta';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Busca" component={Busca} />
        <Stack.Screen name="ListaCompleta" component={ListaCompleta} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
