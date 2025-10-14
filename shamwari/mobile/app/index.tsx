import { Link } from 'expo-router';
import { View, Text, Pressable } from 'react-native';

export default function Home() {
  return (
    <View style={{ flex: 1, padding: 24, gap: 24 }}>
      <Text style={{ color: '#EAEAEA', fontSize: 28, fontWeight: '700' }}>SHAMWARI</Text>
      <Text style={{ color: '#9AA4B2' }}>Send money home, simply and transparently.</Text>
      <Link href="/send" asChild>
        <Pressable style={{ backgroundColor: '#0BC77D', padding: 16, borderRadius: 12 }}>
          <Text style={{ color: '#0B1220', textAlign: 'center', fontSize: 18, fontWeight: '700' }}>Send Money</Text>
        </Pressable>
      </Link>
    </View>
  );
}
