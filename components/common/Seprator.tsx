
import { useTheme } from '@/lib/theme';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../themed/ThemedText';
import { ThemedView } from '../themed/ThemedView';

interface SeparatorProps {
 text?: string;
 marginVertical?: number;
 textStyle?: any;
}

const Separator: React.FC<SeparatorProps> = ({ 
  text = "or", 
  marginVertical = 20,
  textStyle 
}) => {
  const theme = useTheme();
  
  return (
    <ThemedView style={[styles.separatorContainer, { marginVertical }]}>
      <View style={[styles.line, { backgroundColor: theme.lightSilver }]} />
      <ThemedText style={[styles.separatorText, textStyle]}>{text}</ThemedText>
      <View style={[styles.line, { backgroundColor: theme.lightSilver }]} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
  },
  separatorText: {
    marginHorizontal: 16,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default Separator;
