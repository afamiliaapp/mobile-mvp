'use client';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import BackButtonTwo from './BackButtonTwo';
import AppContainer from './AppContainer';
import ExpensesBar from './ExpensesBar';
import ThemedText from './ThemedText';

const ExpenseDetails = ({ expense, onBack, onEdit, onDelete }: any) => {
  return (
    <AppContainer>
      <View style={styles.container}>
        <ExpensesBar />
        {/* Header with Edit/Delete */}
        <BackButtonTwo onPress={onBack} />
        <View style={styles.header}>
          <ThemedText variant="title" style={styles.title}>
            {expense.name}
          </ThemedText>
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
              <Icon name="edit-2" size={20} color="#1C1C1E" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete} style={styles.iconButton}>
              <Icon name="trash-2" size={20} color="#FF3B30" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {[
            { label: 'Description', value: expense.description },
            { label: 'Category', value: expense.category },
            { label: 'Amount', value: `₦${expense.amount.toLocaleString()}` },
            { label: 'Paid by', value: expense.paidBy },
            { label: 'Time', value: expense.time },
            { label: 'Date', value: expense.date },
          ].map((item, index) => (
            <View key={index} style={styles.infoRow}>
              <ThemedText style={styles.label}>{item.label}</ThemedText>
              <ThemedText style={styles.value}>{item.value}</ThemedText>
            </View>
          ))}

          <Text style={styles.label}>Receipt</Text>
          {expense.receipt && expense.receipt.uri ? (
            <Image
              key={expense.receipt.uri} // Adding a key forces a rerender if the URI changes
              source={{ uri: expense.receipt.uri }}
              style={styles.receiptImage}
              onLoad={() => console.log('Image loaded successfully')}
              onError={e =>
                console.log('Image load error:', e.nativeEvent.error)
              }
            />
          ) : (
            <View style={styles.noReceiptBox}>
              <Icon
                name="image"
                size={24}
                color="#C7C7CC"
                style={{ marginBottom: 8 }}
              />
              <ThemedText style={styles.noReceiptText}>
                No receipt attached
              </ThemedText>
            </View>
          )}
        </ScrollView>
      </View>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 30,
  },
  headerIcons: { flexDirection: 'row' },
  iconButton: { marginLeft: 20, padding: 5 },

  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  infoRow: { marginBottom: 20 },
  label: { fontSize: 13, color: '#8E8E93', marginBottom: 4 },
  value: { fontSize: 16, color: '#1C1C1E', fontWeight: '500' },
  receiptImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginTop: 10,
    resizeMode: 'contain',
    backgroundColor: '#F9FAFF',
  },
  noReceiptBox: {
    height: 100,
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  noReceiptText: { color: '#8E8E93' },
});

export default ExpenseDetails;
