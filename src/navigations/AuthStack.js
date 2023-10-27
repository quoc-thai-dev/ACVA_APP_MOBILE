import {Start, Login, Register} from '../index';
import React from 'react';

function AuthStack(Stack) {
  return (
    <>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerTransparent: true,
          headerTitle: '',
        }}
        
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Start"
        component={Start}
        options={{
          headerTransparent: true,
          headerTitle: '',
        }}
      />
    </>
  );
}

export default AuthStack;
