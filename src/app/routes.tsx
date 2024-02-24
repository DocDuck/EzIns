import * as React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ERouteName, NavStackParamList } from "shared";
import { AuthScreen } from "pages/auth";
import { LoadScreen } from 'pages/load';
import { ProcessListScreen } from "pages/process/list";
/* import { ProcessStartScreen } from "pages/process/start";
import { ProcessAcquisitionScreen } from "pages/process/acquisition";
import { ProcessStepScreen } from "pages/process/step";
import { ProcessConclusionScreen } from "pages/process/conclusion";
import { ReportScreen } from "pages/report-list"; */

const NavStack = createNativeStackNavigator<NavStackParamList>();

export const Routing = () => {
  return (
    <NavigationContainer>
      <NavStack.Navigator initialRouteName={ERouteName.LoadScreen}>
      <NavStack.Screen
          name={ERouteName.LoadScreen}
          component={LoadScreen}
          options={{
            headerShown: false,
          }}
        />
        <NavStack.Screen
          name={ERouteName.AuthScreen}
          component={AuthScreen}
          options={{
            headerShown: false,
          }}
        />
				<NavStack.Screen
					name={ERouteName.ProcessListScreen}
					component={ProcessListScreen}
				/>
				{/**<NavStack.Screen
          name="ProcessStartScreen"
          component={ProcessStartScreen}
        />
				<NavStack.Screen
          name="ProcessAcquisitionScreen"
          component={ProcessAcquisitionScreen}
        />
				<NavStack.Screen
          name="ProcessConclusionScreen"
          component={ProcessConclusionScreen}
        />
				<NavStack.Screen
          name="ReportScreen"
          component={ReportScreen}
        />
        <NavStack.Group
          screenOptions={{
            presentation: "transparentModal",
            headerShown: false,
          }}
        >
        	<NavStack.Screen
						name="ProcessStepScreen"
						component={ProcessStepScreen}
					/>
        </NavStack.Group>*/}
      </NavStack.Navigator>
    </NavigationContainer>
  );
};