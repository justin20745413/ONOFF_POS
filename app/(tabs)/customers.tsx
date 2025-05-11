import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { theme } from '@/styles/theme';
import { useAuthStore } from '@/store/authStore';
import { LoginForm } from '@/components/LoginForm';
import { Search, Plus, User, CreditCard as Edit, Trash2 } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { User as UserType } from '@/types/api';
import { Button } from '@/components/ui/Button';

// Mock user data for display
const mockUsers: UserType[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Customer ${i + 1}`,
  email: `customer${i + 1}@example.com`,
  phone: `555-${100 + i}-${1000 + i}`,
  birthday: new Date(1980 + i, i % 12, (i % 28) + 1).toISOString().split('T')[0],
  address: `${i + 100} Main St, City ${i + 1}`,
  created_at: new Date(2022, i % 12, (i % 28) + 1).toISOString(),
}));

export default function CustomersScreen() {
  const { isAuthenticated } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  
  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.authContainer}>
        <LoginForm />
      </SafeAreaView>
    );
  }
  
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone.includes(searchQuery)
  );
  
  const renderUserItem = ({ item }: { item: UserType }) => (
    <Card style={styles.userCard} variant="outlined">
      <View style={styles.userHeader}>
        <View style={styles.userIcon}>
          <User size={20} color={theme.colors.primary[600]} />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userPhone}>{item.phone}</Text>
        </View>
      </View>
      
      <View style={styles.userDetails}>
        <Text style={styles.userEmail}>{item.email}</Text>
        {item.birthday && (
          <Text style={styles.userBirthday}>
            Birthday: {new Date(item.birthday).toLocaleDateString()}
          </Text>
        )}
        {item.address && (
          <Text style={styles.userAddress} numberOfLines={2}>
            {item.address}
          </Text>
        )}
      </View>
      
      <View style={styles.userActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Edit size={18} color={theme.colors.gray[700]} />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Trash2 size={18} color={theme.colors.red[600]} />
          <Text style={[styles.actionText, styles.actionTextDanger]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Customers</Text>
        <Button 
          title="Add Customer" 
          icon={<Plus />} 
          onPress={() => {/* Add customer logic */}} 
        />
      </View>
      
      <View style={styles.searchContainer}>
        <Search size={20} color={theme.colors.gray[500]} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search customers..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id.toString()}
        renderItem={renderUserItem}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    padding: theme.spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  searchInput: {
    flex: 1,
    marginLeft: theme.spacing[2],
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.base,
    color: theme.colors.gray[800],
  },
  list: {
    padding: theme.spacing[3],
  },
  userCard: {
    flex: 1,
    margin: theme.spacing[2],
    padding: theme.spacing[3],
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing[3],
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing[2],
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontFamily: theme.typography.fontFamily.bodySemiBold,
    fontSize: theme.typography.size.base,
    color: theme.colors.gray[900],
  },
  userPhone: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.sm,
    color: theme.colors.gray[600],
  },
  userDetails: {
    marginBottom: theme.spacing[3],
  },
  userEmail: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.sm,
    color: theme.colors.gray[700],
    marginBottom: theme.spacing[1],
  },
  userBirthday: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.sm,
    color: theme.colors.gray[700],
    marginBottom: theme.spacing[1],
  },
  userAddress: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.sm,
    color: theme.colors.gray[700],
  },
  userActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
    paddingTop: theme.spacing[2],
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing[2],
    marginLeft: theme.spacing[2],
  },
  actionText: {
    marginLeft: theme.spacing[1],
    fontFamily: theme.typography.fontFamily.bodyMedium,
    fontSize: theme.typography.size.sm,
    color: theme.colors.gray[700],
  },
  actionTextDanger: {
    color: theme.colors.red[600],
  },
});