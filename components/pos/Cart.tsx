import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Trash2, Plus, Minus, DollarSign, Search, User, Ticket } from 'lucide-react-native';
import { theme } from '@/styles/theme';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { User as UserType } from '@/types/api';

// Mock user data - Replace with API call later
const mockUsers: UserType[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '555-123-4567',
    birthday: '1990-01-15',
    address: '123 Main St',
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '555-987-6543',
    birthday: '1985-05-20',
    address: '456 Oak Ave',
    created_at: new Date().toISOString(),
  },
];

export function Cart() {
  const { cart, updateItemQuantity, removeItem, clearCart, getSubtotal, getDiscount, getTotal, setCustomer, setNotes, setPointsToUse } = useCartStore();
  
  const [showCustomerSearch, setShowCustomerSearch] = useState(false);
  const [customerQuery, setCustomerQuery] = useState('');
  const [usePointsValue, setUsePointsValue] = useState('0');
  
  const handleQuantityChange = (id: number, type: 'product' | 'menu', change: -1 | 1) => {
    const item = cart.items.find(i => i.id === id && i.type === type);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      updateItemQuantity(id, type, newQuantity);
    }
  };
  
  const handleRemoveItem = (id: number, type: 'product' | 'menu') => {
    removeItem(id, type);
  };
  
  const handleSelectCustomer = (customer: UserType) => {
    setCustomer(customer);
    setShowCustomerSearch(false);
  };
  
  const handleUsePoints = () => {
    const pointsNumber = parseInt(usePointsValue, 10);
    if (!isNaN(pointsNumber) && pointsNumber >= 0) {
      setPointsToUse(pointsNumber);
    }
  };
  
  const handleCheckout = () => {
    if (cart.items.length === 0) {
      Alert.alert('Cart Empty', 'Please add products to cart before checkout');
      return;
    }
    
    // In a real app, would process payment and create order here
    Alert.alert(
      'Order Processed',
      `Total: $${getTotal().toFixed(2)}`,
      [
        {
          text: 'OK',
          onPress: () => clearCart(),
        },
      ]
    );
  };
  
  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View style={styles.cartItemInfo}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>${item.price.toFixed(2)}</Text>
      </View>
      
      <View style={styles.cartItemActions}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleQuantityChange(item.id, item.type, -1)}
        >
          <Minus size={16} color={theme.colors.gray[600]} />
        </TouchableOpacity>
        
        <Text style={styles.quantityText}>{item.quantity}</Text>
        
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleQuantityChange(item.id, item.type, 1)}
        >
          <Plus size={16} color={theme.colors.gray[600]} />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveItem(item.id, item.type)}
        >
          <Trash2 size={16} color={theme.colors.red[500]} />
        </TouchableOpacity>
      </View>
    </View>
  );
  
  const filteredCustomers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(customerQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(customerQuery.toLowerCase()) ||
    user.phone.includes(customerQuery)
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Current Order</Text>
        
        <View style={styles.customerSection}>
          {cart.customer ? (
            <View style={styles.selectedCustomer}>
              <Text style={styles.customerName}>{cart.customer.name}</Text>
              <Text style={styles.customerDetail}>{cart.customer.phone}</Text>
              <TouchableOpacity 
                style={styles.changeCustomerButton}
                onPress={() => setShowCustomerSearch(true)}
              >
                <Text style={styles.changeCustomerText}>Change</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Button
              title="Add Customer"
              variant="outline"
              size="sm"
              icon={<User />}
              onPress={() => setShowCustomerSearch(true)}
            />
          )}
        </View>
      </View>
      
      {showCustomerSearch && (
        <Card style={styles.customerSearch} variant="outlined">
          <View style={styles.searchInputContainer}>
            <Search size={18} color={theme.colors.gray[500]} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search customers..."
              value={customerQuery}
              onChangeText={setCustomerQuery}
              autoFocus
            />
            <TouchableOpacity onPress={() => setShowCustomerSearch(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={filteredCustomers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.customerItem}
                onPress={() => handleSelectCustomer(item)}
              >
                <View>
                  <Text style={styles.customerItemName}>{item.name}</Text>
                  <Text style={styles.customerItemDetail}>{item.phone}</Text>
                </View>
              </TouchableOpacity>
            )}
            style={styles.customerList}
          />
        </Card>
      )}
      
      <View style={styles.cartItems}>
        {cart.items.length > 0 ? (
          <FlatList
            data={cart.items}
            keyExtractor={(item) => `${item.type}-${item.id}`}
            renderItem={renderCartItem}
          />
        ) : (
          <View style={styles.emptyCart}>
            <Text style={styles.emptyCartText}>Cart is empty</Text>
            <Text style={styles.emptyCartSubtext}>Add products to get started</Text>
          </View>
        )}
      </View>
      
      <View style={styles.notesSection}>
        <Text style={styles.sectionTitle}>Order Notes</Text>
        <TextInput
          style={styles.notesInput}
          placeholder="Add notes about this order..."
          multiline
          value={cart.notes}
          onChangeText={setNotes}
        />
      </View>
      
      <View style={styles.pointsSection}>
        <Text style={styles.sectionTitle}>Use Points</Text>
        <View style={styles.pointsRow}>
          <TextInput
            style={styles.pointsInput}
            placeholder="0"
            keyboardType="numeric"
            value={usePointsValue}
            onChangeText={setUsePointsValue}
          />
          <Button
            title="Apply"
            variant="outline"
            size="sm"
            onPress={handleUsePoints}
          />
        </View>
      </View>
      
      <View style={styles.couponSection}>
        <Button
          title="Apply Coupon"
          variant="outline"
          size="sm"
          icon={<Ticket />}
          // This would open a coupon search/entry modal
          onPress={() => {}}
        />
      </View>
      
      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>${getSubtotal().toFixed(2)}</Text>
        </View>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Discount</Text>
          <Text style={styles.summaryValue}>-${getDiscount().toFixed(2)}</Text>
        </View>
        
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${getTotal().toFixed(2)}</Text>
        </View>
      </View>
      
      <View style={styles.actions}>
        <Button
          title="Cancel"
          variant="outline"
          onPress={() => clearCart()}
          style={styles.cancelButton}
        />
        
        <Button
          title="Checkout"
          icon={<DollarSign />}
          onPress={handleCheckout}
          style={styles.checkoutButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderLeftWidth: 1,
    borderLeftColor: theme.colors.gray[200],
  },
  header: {
    padding: theme.spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  title: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.size['2xl'],
    color: theme.colors.gray[900],
    marginBottom: theme.spacing[2],
  },
  customerSection: {
    marginTop: theme.spacing[2],
  },
  selectedCustomer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing[3],
    backgroundColor: theme.colors.gray[100],
    borderRadius: theme.radius.md,
  },
  customerName: {
    fontFamily: theme.typography.fontFamily.bodySemiBold,
    fontSize: theme.typography.size.base,
    color: theme.colors.gray[800],
  },
  customerDetail: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.sm,
    color: theme.colors.gray[600],
  },
  changeCustomerButton: {
    padding: theme.spacing[1],
  },
  changeCustomerText: {
    fontFamily: theme.typography.fontFamily.bodyMedium,
    fontSize: theme.typography.size.sm,
    color: theme.colors.primary[600],
  },
  customerSearch: {
    position: 'absolute',
    top: theme.spacing[20],
    left: theme.spacing[4],
    right: theme.spacing[4],
    zIndex: 10,
    padding: 0,
    maxHeight: 300,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  searchInput: {
    flex: 1,
    marginHorizontal: theme.spacing[2],
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.base,
  },
  cancelText: {
    fontFamily: theme.typography.fontFamily.bodyMedium,
    fontSize: theme.typography.size.base,
    color: theme.colors.primary[600],
  },
  customerList: {
    maxHeight: 200,
  },
  customerItem: {
    padding: theme.spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  customerItemName: {
    fontFamily: theme.typography.fontFamily.bodyMedium,
    fontSize: theme.typography.size.base,
    color: theme.colors.gray[800],
  },
  customerItemDetail: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.sm,
    color: theme.colors.gray[600],
  },
  cartItems: {
    flex: 1,
    padding: theme.spacing[2],
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing[6],
  },
  emptyCartText: {
    fontFamily: theme.typography.fontFamily.bodyMedium,
    fontSize: theme.typography.size.lg,
    color: theme.colors.gray[500],
    marginBottom: theme.spacing[2],
  },
  emptyCartSubtext: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.base,
    color: theme.colors.gray[400],
    textAlign: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontFamily: theme.typography.fontFamily.bodyMedium,
    fontSize: theme.typography.size.base,
    color: theme.colors.gray[800],
  },
  cartItemPrice: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.sm,
    color: theme.colors.gray[600],
    marginTop: 2,
  },
  cartItemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.gray[200],
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontFamily: theme.typography.fontFamily.bodyMedium,
    fontSize: theme.typography.size.base,
    color: theme.colors.gray[800],
    marginHorizontal: theme.spacing[2],
    minWidth: 24,
    textAlign: 'center',
  },
  removeButton: {
    marginLeft: theme.spacing[3],
    padding: theme.spacing[1],
  },
  notesSection: {
    padding: theme.spacing[4],
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
  },
  sectionTitle: {
    fontFamily: theme.typography.fontFamily.bodyMedium,
    fontSize: theme.typography.size.sm,
    color: theme.colors.gray[700],
    marginBottom: theme.spacing[2],
  },
  notesInput: {
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: theme.radius.md,
    padding: theme.spacing[2],
    height: 80,
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.sm,
    textAlignVertical: 'top',
  },
  pointsSection: {
    padding: theme.spacing[4],
    paddingTop: 0,
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: theme.radius.md,
    padding: theme.spacing[2],
    marginRight: theme.spacing[2],
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.base,
  },
  couponSection: {
    paddingHorizontal: theme.spacing[4],
    paddingBottom: theme.spacing[4],
  },
  summary: {
    backgroundColor: theme.colors.gray[50],
    padding: theme.spacing[4],
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing[2],
  },
  summaryLabel: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.base,
    color: theme.colors.gray[600],
  },
  summaryValue: {
    fontFamily: theme.typography.fontFamily.bodyMedium,
    fontSize: theme.typography.size.base,
    color: theme.colors.gray[800],
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing[3],
    paddingTop: theme.spacing[3],
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[300],
  },
  totalLabel: {
    fontFamily: theme.typography.fontFamily.bodySemiBold,
    fontSize: theme.typography.size.lg,
    color: theme.colors.gray[900],
  },
  totalValue: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.size.xl,
    color: theme.colors.primary[600],
  },
  actions: {
    flexDirection: 'row',
    padding: theme.spacing[4],
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
  },
  cancelButton: {
    flex: 1,
    marginRight: theme.spacing[2],
  },
  checkoutButton: {
    flex: 2,
  },
});