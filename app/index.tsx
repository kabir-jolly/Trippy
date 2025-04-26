import { Redirect } from 'expo-router';

export default function Index() {
  // Always redirect to onboarding for the demo
  return <Redirect href="/onboarding" />;
} 