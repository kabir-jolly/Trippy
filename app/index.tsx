import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect to the tabs layout instead of onboarding
  return <Redirect href="/(tabs)/" />;
} 