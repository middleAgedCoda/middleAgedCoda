import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { api } from '@/lib/api';

export default function Send() {
  const [amount, setAmount] = useState('1000');
  const [currency, setCurrency] = useState<'USD' | 'ZWL'>('USD');
  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function getQuote() {
    setLoading(true);
    try {
      const res = await api.post('/quotes', {
        sendAmountZar: Number(amount),
        payoutCurrency: currency,
      });
      setQuote(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 24, gap: 16 }}>
      <Text style={{ color: '#EAEAEA', fontSize: 22, fontWeight: '700' }}>Send</Text>
      <View style={{ backgroundColor: '#121A2B', borderRadius: 12, padding: 16, gap: 12 }}>
        <Text style={{ color: '#9AA4B2' }}>Amount (ZAR)</Text>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="0.00"
          placeholderTextColor="#4B5565"
          style={{ color: '#EAEAEA', fontSize: 20, paddingVertical: 8 }}
        />
        <View style={{ flexDirection: 'row', gap: 12 }}>
          {(['USD', 'ZWL'] as const).map((c) => (
            <Pressable key={c} onPress={() => setCurrency(c)}
              style={{
                flex: 1,
                backgroundColor: currency === c ? '#0BC77D' : '#0B1220',
                borderWidth: 1,
                borderColor: '#1F2937',
                padding: 12,
                borderRadius: 10,
              }}>
              <Text style={{ color: currency === c ? '#0B1220' : '#EAEAEA', textAlign: 'center', fontWeight: '700' }}>{c}</Text>
            </Pressable>
          ))}
        </View>
        <Pressable onPress={getQuote} disabled={loading}
          style={{ backgroundColor: '#0BC77D', padding: 14, borderRadius: 12 }}>
          <Text style={{ color: '#0B1220', textAlign: 'center', fontSize: 16, fontWeight: '700' }}>{loading ? 'Getting quote…' : 'Get Quote'}</Text>
        </Pressable>
      </View>

      {quote && (
        <View style={{ backgroundColor: '#121A2B', borderRadius: 12, padding: 16, gap: 8 }}>
          <Text style={{ color: '#EAEAEA', fontSize: 18, fontWeight: '700' }}>Quote</Text>
          <Text style={{ color: '#9AA4B2' }}>Mid-market rate: {quote.midMarketRate}</Text>
          <Text style={{ color: '#9AA4B2' }}>Premium rate: {quote.premiumRate}</Text>
          <Text style={{ color: '#9AA4B2' }}>Fees: ZAR {quote.totalFeesZar.toFixed(2)}</Text>
          <Text style={{ color: '#EAEAEA' }}>Recipient receives: {quote.payoutAmount.toFixed(2)} {currency}</Text>
        </View>
      )}
    </View>
  );
}
