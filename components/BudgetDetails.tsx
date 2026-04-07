'use client';
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Feather';
import ExpenseItem from './ExpenseItem';
import AddExpenseModal from './AddExpenseModal';
import AddBudgetModal from './AddBudgetModal';
import DeleteBudgetModal from './DeleteBudgetModal';
import BackButtonTwo from './BackButtonTwo';
import ExpensesBar from './ExpensesBar';

const BudgetDonut = ({ total, spent }: { total: number; spent: number }) => {
  const size = 160;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const spentPercent = total > 0 ? spent / total : 0;
  const spentDash = circumference * spentPercent;

  return (
    <View style={detailsStyles.donutContainer}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#F2F2F7"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#2C247A"
          strokeWidth={strokeWidth}
          strokeDasharray={`${spentDash} ${circumference}`}
          strokeLinecap="round"
          fill="none"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={detailsStyles.donutCenter}>
        <Text style={detailsStyles.centerLabel}>Total budget</Text>
        <Text style={detailsStyles.centerAmount}>
          ₦{total.toLocaleString()}
        </Text>
      </View>
    </View>
  );
};

const BudgetDetails = ({
  budget,
  onAddExpense,
  onDelete,
  onBack,

  onUpdateBudget,
}: any) => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [isExpenseModalVisible, setExpenseModalVisible] = useState(false);
  const expenses = budget.expenses || [];
  const [selectedExpense, setSelectedExpense] = useState<any>(null); // Track item to edit
  const [isEditBudgetModalVisible, setEditBudgetModalVisible] = useState(false);
  // NEW: State for Delete Modal
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  // Calculate Top Categories and Members
  const analytics = useMemo(() => {
    const categoryMap: any = {};
    const memberMap: any = {};

    expenses.forEach(exp => {
      categoryMap[exp.category] = (categoryMap[exp.category] || 0) + exp.amount;
      memberMap[exp.paidBy] = (memberMap[exp.paidBy] || 0) + exp.amount;
    });

    const sortAndSlice = (map: any) =>
      Object.entries(map)
        .map(([name, amount]: any) => ({ name, amount }))
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 2);

    return {
      topCategories: sortAndSlice(categoryMap),
      topMembers: sortAndSlice(memberMap),
    };
  }, [expenses]);

  const handleSaveExpense = (expenseData: any) => {
    // 1. Get the current list (ensure it's an array)
    const currentExpenses = budget.expenses || [];

    // 2. Determine if we are editing or creating
    const exists = currentExpenses.find((e: any) => e.id === expenseData.id);

    let updatedExpenses;
    if (exists) {
      // EDIT: Update specific expense
      updatedExpenses = currentExpenses.map((e: any) =>
        e.id === expenseData.id ? expenseData : e,
      );
    } else {
      // CREATE: Add new expense with unique ID and current timestamps
      const newExpense = {
        ...expenseData,
        id: Date.now().toString(),
        date: expenseData.date || new Date().toLocaleDateString('en-GB'),
        time:
          expenseData.time ||
          new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
      };
      updatedExpenses = [newExpense, ...currentExpenses];
    }

    // 3. Calculate new spend totals
    const totalSpent = updatedExpenses.reduce(
      (sum: number, exp: any) => sum + exp.amount,
      0,
    );

    // 4. Update the Parent State (This triggers AsyncStorage save)
    onUpdateBudget({
      ...budget,
      expenses: updatedExpenses,
      spend: totalSpent,
      remaining: budget.total - totalSpent,
    });

    setExpenseModalVisible(false);
    setSelectedExpense(null);
  };

  const openCreateModal = () => {
    setSelectedExpense(null);
    setExpenseModalVisible(true);
  };

  // Logic to handle saving the edited budget
  const handleUpdateBudget = (name: string, amount: number) => {
    // Pass the data back up to your main state handler
    onUpdateBudget({
      ...budget,
      name: name,
      total: amount,
      remaining: amount - budget.spend, // recalculate remaining
    });
    setEditBudgetModalVisible(false);
  };

  // NEW: Function to handle the actual deletion
  const confirmDelete = () => {
    setDeleteModalVisible(false);
    onDelete(); // Triggers the deletion logic in the parent (Expenses.tsx)
  };

  return (
    <View style={detailsStyles.container}>
      <View>
        <ExpensesBar />
      </View>

      <BackButtonTwo onPress={onBack} />

      <View style={detailsStyles.header}>
        <Text style={detailsStyles.title}>{budget.name}</Text>
        <View style={detailsStyles.headerIcons}>
          {/* TRIGGER FOR EDIT BUDGET */}
          <TouchableOpacity onPress={() => setEditBudgetModalVisible(true)}>
            <Icon name="edit-2" size={18} color="#8E8E93" />
          </TouchableOpacity>
          {/* Trigger the Delete Confirmation Modal */}
          <TouchableOpacity
            onPress={() => setDeleteModalVisible(true)}
            style={{ marginLeft: 15 }}
          >
            <Icon name="trash-2" size={18} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <BudgetDonut total={budget.total} spent={budget.spend} />

        <View style={detailsStyles.statsRow}>
          <View style={detailsStyles.statItem}>
            <View
              style={[detailsStyles.indicator, { backgroundColor: '#2C247A' }]}
            />
            <View>
              <Text style={detailsStyles.statLabel}>Spent</Text>
              <Text style={detailsStyles.statValue}>
                ₦{budget.spend.toLocaleString()}
              </Text>
            </View>
          </View>
          <View style={detailsStyles.verticalDivider} />
          <View style={detailsStyles.statItem}>
            <View
              style={[detailsStyles.indicator, { backgroundColor: '#C5CAE9' }]}
            />
            <View>
              <Text style={detailsStyles.statLabel}>Remaining</Text>
              <Text style={detailsStyles.statValue}>
                ₦{budget.remaining.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        <View style={detailsStyles.tabContainer}>
          <TabButton
            label="Overview"
            active={activeTab === 'Overview'}
            onPress={() => setActiveTab('Overview')}
          />
          <TabButton
            label={`Expenses(${expenses.length})`}
            active={activeTab === 'Expenses'}
            onPress={() => setActiveTab('Expenses')}
          />
        </View>

        {activeTab === 'Overview' ? (
          <View style={detailsStyles.overviewContent}>
            <Text style={detailsStyles.sectionTitle}>Top Categories</Text>
            {analytics.topCategories.length > 0 ? (
              analytics.topCategories.map((cat, i) => (
                <View key={i} style={detailsStyles.categoryItem}>
                  <View style={detailsStyles.rowBetween}>
                    <Text style={detailsStyles.itemName}>{cat.name}</Text>
                    <Text style={detailsStyles.itemAmount}>
                      (₦{cat.amount.toLocaleString()})
                    </Text>
                  </View>
                  <View style={detailsStyles.progressBg}>
                    <View
                      style={[
                        detailsStyles.progressFill,
                        { width: `${(cat.amount / budget.total) * 100}%` },
                      ]}
                    />
                  </View>
                </View>
              ))
            ) : (
              <Text style={detailsStyles.emptyText}>No category data</Text>
            )}

            <Text style={[detailsStyles.sectionTitle, { marginTop: 30 }]}>
              Family Spending
            </Text>
            {analytics.topMembers.length > 0 ? (
              analytics.topMembers.map((mem, i) => (
                <View key={i} style={detailsStyles.familyRow}>
                  <Text style={detailsStyles.itemName}>{mem.name}</Text>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={detailsStyles.familyAmount}>
                      ₦{mem.amount.toLocaleString()}
                    </Text>
                    <Text style={detailsStyles.familyPercent}>
                      {((mem.amount / budget.spend) * 100).toFixed(0)}% of total
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <Text style={detailsStyles.emptyText}>No member data</Text>
            )}
          </View>
        ) : (
          <View style={detailsStyles.expenseListContainer}>
            {expenses.map((item: any, index: number) => (
              <View key={item.id || index}>
                <ExpenseItem
                  {...item}
                  title={item.name}
                  onViewDetails={() => {
                    setSelectedExpense(item);
                    setExpenseModalVisible(true);
                  }}
                />
              </View>
            ))}
          </View>
        )}
        <View style={{ height: 100 }} />
      </ScrollView>

      <TouchableOpacity style={detailsStyles.fab} onPress={openCreateModal}>
        <Icon name="plus" size={18} color="#1C1C1E" />
        <Text style={detailsStyles.fabText}>New expense</Text>
      </TouchableOpacity>

      <AddExpenseModal
        isVisible={isExpenseModalVisible}
        initialData={selectedExpense} // Pass the data here
        onClose={() => {
          setExpenseModalVisible(false);
          setSelectedExpense(null);
        }}
        onSave={handleSaveExpense}
      />

      <AddBudgetModal
        isVisible={isEditBudgetModalVisible}
        initialData={budget} // Pass current budget to pre-fill inputs
        onClose={() => setEditBudgetModalVisible(false)}
        onSave={handleUpdateBudget}
      />

      {/* NEW: Implementation of the Delete Budget Modal */}
      <DeleteBudgetModal
        isVisible={isDeleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onDelete={confirmDelete}
      />
    </View>
  );
};

const TabButton = ({ label, active, onPress }: any) => (
  <TouchableOpacity
    style={[detailsStyles.tab, active && detailsStyles.activeTab]}
    onPress={onPress}
  >
    <Text
      style={[detailsStyles.tabText, active && detailsStyles.activeTabText]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const detailsStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 10 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  title: { fontSize: 22, fontWeight: '700', color: '#1C1C1E' },
  headerIcons: { flexDirection: 'row' },
  donutContainer: {
    alignItems: 'center',
    marginVertical: 30,
    position: 'relative',
  },
  donutCenter: { position: 'absolute', top: '38%', alignItems: 'center' },
  centerLabel: { fontSize: 12, color: '#8E8E93' },
  centerAmount: { fontSize: 18, fontWeight: '700' },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  statItem: { flexDirection: 'row', alignItems: 'center' },
  indicator: { width: 4, height: 35, borderRadius: 2, marginRight: 10 },
  statLabel: { fontSize: 12, color: '#8E8E93' },
  statValue: { fontSize: 16, fontWeight: '700' },
  verticalDivider: { width: 1, backgroundColor: '#F2F2F7', height: '100%' },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 4,
    marginBottom: 25,
  },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 10 },
  activeTab: { backgroundColor: '#2C247A' },
  tabText: { color: '#8E8E93', fontWeight: '600' },
  activeTabText: { color: '#fff' },
  sectionTitle: { fontSize: 14, color: '#8E8E93', marginBottom: 15 },
  overviewContent: { paddingBottom: 20 },
  categoryItem: { marginBottom: 20 },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemName: { fontSize: 18, fontWeight: '600', color: '#1C1C1E' },
  itemAmount: { fontSize: 14, color: '#8E8E93' },
  progressBg: { height: 6, backgroundColor: '#F2F2F7', borderRadius: 3 },
  progressFill: { height: 6, backgroundColor: '#2C247A', borderRadius: 3 },
  familyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  familyAmount: { fontSize: 16, color: '#8E8E93' },
  familyPercent: { fontSize: 12, color: '#8E8E93' },
  emptyText: { textAlign: 'center', color: '#8E8E93', marginVertical: 10 },
  expenseListContainer: { marginTop: 10 },
  fab: {
    position: 'absolute',
    bottom: 10,
    right: 0,

    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    elevation: 5,
    shadowOpacity: 0.1,
    alignItems: 'center',
  },
  fabText: { marginLeft: 8, fontWeight: '600', fontSize: 16 },
  itemEditIcon: {
    position: 'absolute',
    right: 15,
    top: 20,
    padding: 10,
  },
});

export default BudgetDetails;
