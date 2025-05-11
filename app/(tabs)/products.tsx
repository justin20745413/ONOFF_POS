import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, TextInput, Image } from 'react-native';
import { theme } from '@/styles/theme';
import { useAuthStore } from '@/store/authStore';
import { LoginForm } from '@/components/LoginForm';
import { Search, Plus, CreditCard as Edit, Trash2, Tag, Package, Filter } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { Product, MenuItem } from '@/types/api';
import { Button } from '@/components/ui/Button';

// Mock product data for display
const mockProducts: Product[] = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  description: `Description for product ${i + 1}. This is a high-quality item that will meet all your needs.`,
  price: 9.99 + i,
  stock: 100 - i * 3,
  category: i % 3 === 0 ? 'Food' : i % 3 === 1 ? 'Drinks' : 'Desserts',
  image_url: `https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=600`,
  is_available_online: i % 4 !== 0,
  is_available_in_store: true,
  created_at: new Date().toISOString(),
}));

const mockMenuItems: MenuItem[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 100,
  name: `Menu Item ${i + 1}`,
  description: `Special in-store menu item. A delicious option for our customers.`,
  price: 12.99 + i,
  category: i % 3 === 0 ? 'Main Course' : i % 3 === 1 ? 'Sides' : 'Specials',
  is_available_in_store: true,
  created_at: new Date().toISOString(),
}));

export default function ProductsScreen() {
  const { isAuthenticated } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'menu'>('products');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.authContainer}>
        <LoginForm />
      </SafeAreaView>
    );
  }
  
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  const filteredMenuItems = mockMenuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  const productCategories = Array.from(new Set(mockProducts.map(p => p.category)));
  const menuCategories = Array.from(new Set(mockMenuItems.map(m => m.category)));
  const categories = activeTab === 'products' ? productCategories : menuCategories;
  
  const renderProductItem = ({ item }: { item: Product }) => (
    <Card style={styles.productCard} variant="outlined">
      <Image
        source={{ uri: item.image_url }}
        style={styles.productImage}
        resizeMode="cover"
      />
      
      <View style={styles.productContent}>
        <View style={styles.productHeader}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        </View>
        
        <Text style={styles.productDescription} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.productMeta}>
          <View style={styles.categoryTag}>
            <Tag size={14} color={theme.colors.primary[600]} />
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          
          <Text style={styles.stockText}>
            Stock: {item.stock}
          </Text>
        </View>
        
        <View style={styles.productDetails}>
          <View style={styles.availabilityContainer}>
            <Text style={styles.availabilityLabel}>Available:</Text>
            <View style={styles.availabilityTags}>
              {item.is_available_online && (
                <View style={styles.availabilityTag}>
                  <Text style={styles.availabilityTagText}>Online</Text>
                </View>
              )}
              {item.is_available_in_store && (
                <View style={styles.availabilityTag}>
                  <Text style={styles.availabilityTagText}>In-store</Text>
                </View>
              )}
            </View>
          </View>
        </View>
        
        <View style={styles.productActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Edit size={16} color={theme.colors.primary[600]} />
            <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Trash2 size={16} color={theme.colors.red[600]} />
            <Text style={[styles.actionText, styles.actionTextDanger]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
  
  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <Card style={styles.productCard} variant="outlined">
      <View style={styles.menuItemImage}>
        <Package size={32} color={theme.colors.gray[400]} />
      </View>
      
      <View style={styles.productContent}>
        <View style={styles.productHeader}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        </View>
        
        <Text style={styles.productDescription} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.productMeta}>
          <View style={styles.categoryTag}>
            <Tag size={14} color={theme.colors.primary[600]} />
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        </View>
        
        <View style={styles.productActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Edit size={16} color={theme.colors.primary[600]} />
            <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Trash2 size={16} color={theme.colors.red[600]} />
            <Text style={[styles.actionText, styles.actionTextDanger]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {activeTab === 'products' ? 'Products' : 'Menu Items'}
        </Text>
        <Button 
          title={`Add ${activeTab === 'products' ? 'Product' : 'Menu Item'}`} 
          icon={<Plus />} 
          onPress={() => {/* Add item logic */}} 
        />
      </View>
      
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'products' && styles.activeTab]}
          onPress={() => {
            setActiveTab('products');
            setSelectedCategory(null);
          }}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'products' && styles.activeTabText,
            ]}
          >
            Products
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'menu' && styles.activeTab]}
          onPress={() => {
            setActiveTab('menu');
            setSelectedCategory(null);
          }}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'menu' && styles.activeTabText,
            ]}
          >
            Menu Items
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.filterSection}>
        <View style={styles.searchContainer}>
          <Search size={20} color={theme.colors.gray[500]} />
          <TextInput
            style={styles.searchInput}
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <View style={styles.categoryFilters}>
          <View style={styles.filterHeader}>
            <Filter size={16} color={theme.colors.gray[600]} />
            <Text style={styles.filterTitle}>Filter by Category</Text>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={[
                styles.categoryFilter,
                selectedCategory === null && styles.activeCategoryFilter,
              ]}
              onPress={() => setSelectedCategory(null)}
            >
              <Text
                style={[
                  styles.categoryFilterText,
                  selectedCategory === null && styles.activeCategoryFilterText,
                ]}
              >
                All
              </Text>
            </TouchableOpacity>
            
            {categories.map(category => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryFilter,
                  selectedCategory === category && styles.activeCategoryFilter,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryFilterText,
                    selectedCategory === category && styles.activeCategoryFilterText,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
      
      <FlatList
        data={activeTab === 'products' ? filteredProducts : filteredMenuItems}
        keyExtractor={item => `${activeTab}-${item.id}`}
        renderItem={activeTab === 'products' ? renderProductItem : renderMenuItem}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

import { ScrollView } from 'react-native-gesture-handler';

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
  tabs: {
    flexDirection: 'row',
    padding: theme.spacing[2],
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  tab: {
    paddingVertical: theme.spacing[2],
    paddingHorizontal: theme.spacing[4],
    borderRadius: theme.radius.full,
    marginRight: theme.spacing[2],
  },
  activeTab: {
    backgroundColor: theme.colors.primary[600],
  },
  tabText: {
    fontFamily: theme.typography.fontFamily.bodyMedium,
    fontSize: theme.typography.size.base,
    color: theme.colors.gray[600],
  },
  activeTabText: {
    color: theme.colors.white,
  },
  filterSection: {
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
    paddingBottom: theme.spacing[2],
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing[3],
  },
  searchInput: {
    flex: 1,
    marginLeft: theme.spacing[2],
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.base,
    color: theme.colors.gray[800],
  },
  categoryFilters: {
    paddingHorizontal: theme.spacing[3],
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing[2],
  },
  filterTitle: {
    fontFamily: theme.typography.fontFamily.bodyMedium,
    fontSize: theme.typography.size.sm,
    color: theme.colors.gray[600],
    marginLeft: theme.spacing[1],
  },
  categoryFilter: {
    paddingVertical: theme.spacing[1],
    paddingHorizontal: theme.spacing[3],
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.gray[200],
    marginRight: theme.spacing[2],
    marginBottom: theme.spacing[2],
  },
  activeCategoryFilter: {
    backgroundColor: theme.colors.primary[100],
  },
  categoryFilterText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.sm,
    color: theme.colors.gray[700],
  },
  activeCategoryFilterText: {
    color: theme.colors.primary[600],
    fontFamily: theme.typography.fontFamily.bodyMedium,
  },
  list: {
    padding: theme.spacing[3],
  },
  productCard: {
    marginBottom: theme.spacing[3],
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 160,
  },
  menuItemImage: {
    width: '100%',
    height: 120,
    backgroundColor: theme.colors.gray[200],
    justifyContent: 'center',
    alignItems: 'center',
  },
  productContent: {
    padding: theme.spacing[3],
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing[2],
  },
  productName: {
    fontFamily: theme.typography.fontFamily.bodySemiBold,
    fontSize: theme.typography.size.lg,
    color: theme.colors.gray[900],
    flex: 1,
  },
  productPrice: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.size.lg,
    color: theme.colors.primary[600],
    marginLeft: theme.spacing[2],
  },
  productDescription: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.base,
    color: theme.colors.gray[600],
    marginBottom: theme.spacing[3],
  },
  productMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing[3],
  },
  categoryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary[50],
    paddingVertical: theme.spacing[1],
    paddingHorizontal: theme.spacing[2],
    borderRadius: theme.radius.full,
  },
  categoryText: {
    fontFamily: theme.typography.fontFamily.bodyMedium,
    fontSize: theme.typography.size.xs,
    color: theme.colors.primary[600],
    marginLeft: 4,
  },
  stockText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.sm,
    color: theme.colors.gray[600],
  },
  productDetails: {
    marginBottom: theme.spacing[3],
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityLabel: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.sm,
    color: theme.colors.gray[600],
    marginRight: theme.spacing[2],
  },
  availabilityTags: {
    flexDirection: 'row',
  },
  availabilityTag: {
    backgroundColor: theme.colors.green[100],
    paddingVertical: 2,
    paddingHorizontal: theme.spacing[2],
    borderRadius: theme.radius.sm,
    marginRight: theme.spacing[1],
  },
  availabilityTagText: {
    fontFamily: theme.typography.fontFamily.bodyMedium,
    fontSize: theme.typography.size.xs,
    color: theme.colors.green[600],
  },
  productActions: {
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
    color: theme.colors.primary[600],
  },
  actionTextDanger: {
    color: theme.colors.red[600],
  },
});