import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { theme } from '@/styles/theme';
import { useAuthStore } from '@/store/authStore';
import { LoginForm } from '@/components/LoginForm';
import { Calendar, ChartBar as BarChart3, Layers, CircleArrowDown as ArrowDownCircle, TrendingUp, DollarSign, ShoppingBag } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';

// Mock data for sales
const salesData = {
  today: 1250.75,
  weekly: 8425.30,
  monthly: 32150.80,
  itemsSold: 145,
  transactions: 42,
  averageOrder: 29.78,
};

// Mock data for popular items
const popularItems = [
  { id: 1, name: 'Product 1', sold: 32, revenue: 319.68 },
  { id: 2, name: 'Menu Item 3', sold: 28, revenue: 363.72 },
  { id: 3, name: 'Product 7', sold: 24, revenue: 239.76 },
  { id: 4, name: 'Menu Item 1', sold: 22, revenue: 284.90 },
  { id: 5, name: 'Product 3', sold: 18, revenue: 179.82 },
];

export default function ReportsScreen() {
  const { isAuthenticated } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'daily' | 'monthly'>('overview');
  
  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.authContainer}>
        <LoginForm />
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reports & Analytics</Text>
        <TouchableOpacity style={styles.dateSelector}>
          <Calendar size={18} color={theme.colors.primary[600]} />
          <Text style={styles.dateText}>Today</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
          onPress={() => setActiveTab('overview')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'overview' && styles.activeTabText,
            ]}
          >
            Overview
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'daily' && styles.activeTab]}
          onPress={() => setActiveTab('daily')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'daily' && styles.activeTabText,
            ]}
          >
            Daily Sales
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'monthly' && styles.activeTab]}
          onPress={() => setActiveTab('monthly')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'monthly' && styles.activeTabText,
            ]}
          >
            Monthly Report
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.statsGrid}>
          <Card style={styles.statsCard}>
            <View style={styles.statsIconContainer}>
              <DollarSign size={24} color={theme.colors.primary[600]} />
            </View>
            <Text style={styles.statsTitle}>Today's Sales</Text>
            <Text style={styles.statsValue}>${salesData.today.toFixed(2)}</Text>
            <Text style={styles.statsTrend}>+15.2% from yesterday</Text>
          </Card>
          
          <Card style={styles.statsCard}>
            <View style={[styles.statsIconContainer, styles.iconBlue]}>
              <BarChart3 size={24} color={theme.colors.primary[600]} />
            </View>
            <Text style={styles.statsTitle}>Weekly Sales</Text>
            <Text style={styles.statsValue}>${salesData.weekly.toFixed(2)}</Text>
            <Text style={styles.statsTrend}>+8.5% from last week</Text>
          </Card>
          
          <Card style={styles.statsCard}>
            <View style={[styles.statsIconContainer, styles.iconGreen]}>
              <TrendingUp size={24} color={theme.colors.green[600]} />
            </View>
            <Text style={styles.statsTitle}>Monthly Sales</Text>
            <Text style={styles.statsValue}>${salesData.monthly.toFixed(2)}</Text>
            <Text style={styles.statsTrend}>+12.3% from last month</Text>
          </Card>
          
          <Card style={styles.statsCard}>
            <View style={[styles.statsIconContainer, styles.iconPurple]}>
              <ShoppingBag size={24} color="#9333EA" />
            </View>
            <Text style={styles.statsTitle}>Items Sold</Text>
            <Text style={styles.statsValue}>{salesData.itemsSold}</Text>
            <Text style={styles.statsTrend}>+5.7% from yesterday</Text>
          </Card>
        </View>
        
        <Card style={styles.popularItemsCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Popular Items</Text>
            <TouchableOpacity style={styles.exportButton}>
              <ArrowDownCircle size={16} color={theme.colors.primary[600]} />
              <Text style={styles.exportButtonText}>Export</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { flex: 3 }]}>Item</Text>
            <Text style={[styles.tableHeaderText, { flex: 1, textAlign: 'center' }]}>Sold</Text>
            <Text style={[styles.tableHeaderText, { flex: 2, textAlign: 'right' }]}>Revenue</Text>
          </View>
          
          {popularItems.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.tableRow,
                index === popularItems.length - 1 && styles.lastTableRow,
              ]}
            >
              <Text style={[styles.tableCell, { flex: 3 }]} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={[styles.tableCell, { flex: 1, textAlign: 'center' }]}>
                {item.sold}
              </Text>
              <Text style={[styles.tableCell, { flex: 2, textAlign: 'right' }]}>
                ${item.revenue.toFixed(2)}
              </Text>
            </View>
          ))}
        </Card>
        
        <Card style={styles.transactionsCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Transactions Summary</Text>
          </View>
          
          <View style={styles.transactionStats}>
            <View style={styles.transactionStat}>
              <Text style={styles.transactionStatLabel}>Total Transactions</Text>
              <Text style={styles.transactionStatValue}>{salesData.transactions}</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.transactionStat}>
              <Text style={styles.transactionStatLabel}>Average Order</Text>
              <Text style={styles.transactionStatValue}>${salesData.averageOrder.toFixed(2)}</Text>
            </View>
          </View>
          
          <View style={styles.transactionMethodsContainer}>
            <Text style={styles.transactionMethodsTitle}>Payment Methods</Text>
            
            <View style={styles.paymentMethods}>
              <View style={styles.paymentMethod}>
                <View style={[styles.paymentIcon, { backgroundColor: theme.colors.primary[100] }]}>
                  <DollarSign size={16} color={theme.colors.primary[600]} />
                </View>
                <View style={styles.paymentInfo}>
                  <Text style={styles.paymentName}>Cash</Text>
                  <Text style={styles.paymentPercentage}>35%</Text>
                </View>
              </View>
              
              <View style={styles.paymentMethod}>
                <View style={[styles.paymentIcon, { backgroundColor: theme.colors.green[100] }]}>
                  <Layers size={16} color={theme.colors.green[600]} />
                </View>
                <View style={styles.paymentInfo}>
                  <Text style={styles.paymentName}>Credit Card</Text>
                  <Text style={styles.paymentPercentage}>55%</Text>
                </View>
              </View>
              
              <View style={styles.paymentMethod}>
                <View style={[styles.paymentIcon, { backgroundColor: '#fee2e2' }]}>
                  <Layers size={16} color={theme.colors.red[600]} />
                </View>
                <View style={styles.paymentInfo}>
                  <Text style={styles.paymentName}>Mobile Payment</Text>
                  <Text style={styles.paymentPercentage}>10%</Text>
                </View>
              </View>
            </View>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.gray[100],
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing[4],
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  title: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.size['2xl'],
    color: theme.colors.gray[900],
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary[50],
    paddingVertical: theme.spacing[1],
    paddingHorizontal: theme.spacing[3],
    borderRadius: theme.radius.full,
  },
  dateText: {
    fontFamily: theme.typography.fontFamily.bodyMedium,
    fontSize: theme.typography.size.sm,
    color: theme.colors.primary[600],
    marginLeft: theme.spacing[1],
  },
  tabs: {
    flexDirection: 'row',
    padding: theme.spacing[2],
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  tab: {
    paddingVertical: theme.spacing[2],
    paddingHorizontal: theme.spacing[3],
    borderRadius: theme.radius.full,
    marginRight: theme.spacing[2],
  },
  activeTab: {
    backgroundColor: theme.colors.primary[600],
  },
  tabText: {
    fontFamily: theme.typography.fontFamily.bodyMedium,
    fontSize: theme.typography.size.sm,
    color: theme.colors.gray[600],
  },
  activeTabText: {
    color: theme.colors.white,
  },
  content: {
    flex: 1,
    padding: theme.spacing[3],
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: theme.spacing[4],
  },
  statsCard: {
    width: '48%',
    marginBottom: theme.spacing[3],
    padding: theme.spacing[3],
  },
  statsIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing[2],
  },
  iconBlue: {
    backgroundColor: theme.colors.primary[100],
  },
  iconGreen: {
    backgroundColor: theme.colors.green[100],
  },
  iconPurple: {
    backgroundColor: '#f3e8ff',
  },
  statsTitle: {
    fontFamily: theme.typography.fontFamily.bodyMedium,
    fontSize: theme.typography.size.sm,
    color: theme.colors.gray[600],
    marginBottom: theme.spacing[1],
  },
  statsValue: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.size.xl,
    color: theme.colors.gray[900],
    marginBottom: theme.spacing[1],
  },
  statsTrend: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.xs,
    color: theme.colors.green[600],
  },
  popularItemsCard: {
    marginBottom: theme.spacing[4],
    padding: theme.spacing[3],
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing[3],
  },
  cardTitle: {
    fontFamily: theme.typography.fontFamily.bodySemiBold,
    fontSize: theme.typography.size.lg,
    color: theme.colors.gray[900],
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary[50],
    paddingVertical: theme.spacing[1],
    paddingHorizontal: theme.spacing[2],
    borderRadius: theme.radius.md,
  },
  exportButtonText: {
    fontFamily: theme.typography.fontFamily.bodyMedium,
    fontSize: theme.typography.size.xs,
    color: theme.colors.primary[600],
    marginLeft: 4,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: theme.spacing[2],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  tableHeaderText: {
    fontFamily: theme.typography.fontFamily.bodyMedium,
    fontSize: theme.typography.size.sm,
    color: theme.colors.gray[600],
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: theme.spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[100],
  },
  lastTableRow: {
    borderBottomWidth: 0,
  },
  tableCell: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.base,
    color: theme.colors.gray[800],
  },
  transactionsCard: {
    marginBottom: theme.spacing[4],
    padding: theme.spacing[3],
  },
  transactionStats: {
    flexDirection: 'row',
    marginBottom: theme.spacing[4],
  },
  transactionStat: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: theme.colors.gray[200],
    marginHorizontal: theme.spacing[2],
  },
  transactionStatLabel: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.sm,
    color: theme.colors.gray[600],
    marginBottom: theme.spacing[1],
  },
  transactionStatValue: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.size.xl,
    color: theme.colors.gray[900],
  },
  transactionMethodsContainer: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
    paddingTop: theme.spacing[3],
  },
  transactionMethodsTitle: {
    fontFamily: theme.typography.fontFamily.bodyMedium,
    fontSize: theme.typography.size.base,
    color: theme.colors.gray[800],
    marginBottom: theme.spacing[3],
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing[2],
  },
  paymentInfo: {},
  paymentName: {
    fontFamily: theme.typography.fontFamily.bodyMedium,
    fontSize: theme.typography.size.sm,
    color: theme.colors.gray[800],
  },
  paymentPercentage: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.xs,
    color: theme.colors.gray[600],
  },
});