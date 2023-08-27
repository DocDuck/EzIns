import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

export enum ERouteName {
	'AuthScreen' = 'AuthScreen',
	'ProcessListScreen' = 'ProcessConclusionScreen',
	'ProcessStartScreen' = 'ProcessStartScreen',
	'ProcessAcquisitionScreen' = 'ProcessAcquisitionScreen',
	'ProcessStepScreen' = 'ProcessConclusionScreen',
	'ProcessConclusionScreen' = 'ProcessConclusionScreen',
	'ReportScreen' = 'ReportScreen',
}

export type NavStackParamList = {
  [ERouteName.AuthScreen]: undefined;
  [ERouteName.ProcessListScreen]: undefined;
  [ERouteName.ProcessStartScreen]: undefined;
  [ERouteName.ProcessAcquisitionScreen]: undefined;
  [ERouteName.ProcessStepScreen]: undefined;
  [ERouteName.ProcessConclusionScreen]: undefined;
	[ERouteName.ReportScreen]: undefined;
};

export type ScreenProps<Screen extends keyof NavStackParamList> =
  NativeStackScreenProps<NavStackParamList, Screen>;

export type NavProp<Screen extends keyof NavStackParamList> =
  NativeStackNavigationProp<NavStackParamList, Screen>;