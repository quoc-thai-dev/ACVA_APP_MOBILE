
import React from 'react';
import BottomTabNavigation from './BottomTabNavigation';
function MainStack(Stack){
    return (
        <>
            <Stack.Screen
                name= 'BottomTabNavigation'
                component={BottomTabNavigation}
                options={{
                    headerTransparent: true,
                    headerTitle: ""
                }}  
            />

        </>
    )
}

export default MainStack;