import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { Search, Tag } from 'lucide-react-native';
import { theme } from '@/styles/theme';
import { Product, MenuItem } from '@/types/api';
import { useCartStore } from '@/store/cartStore';

// Mock data - Replace with API call later
const mockProducts: Product[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  description: `Description for product ${i + 1}`,
  price: 9.99 + i,
  stock: 100,
  category: i % 3 === 0 ? 'Food' : i % 3 === 1 ? 'Drinks' : 'Desserts',
  image_url: `https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=600`,
  is_available_online: true,
  is_available_in_store: true,
  created_at: new Date().toISOString(),
}));

const mockMenuItems: MenuItem[] = Array.from({ length: 15 }, (_, i) => ({
  id: i + 100,
  name: `Menu Item ${i + 1}`,
  description: `Description for menu item ${i + 1}`,
  price: 12.99 + i,
  category: i % 3 === 0 ? 'Main Course' : i % 3 === 1 ? 'Sides' : 'Specials',
  is_available_in_store: true,
  created_at: new Date().toISOString(),
}));

const categories = ['All', 'Food', 'Drinks', 'Desserts', 'Main Course', 'Sides', 'Specials'];

export function ProductsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState<'products' | 'menu'>('products');
  
  const { addItem } = useCartStore();
  
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  const filteredMenuItems = mockMenuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  const handleProductPress = (product: Product) => {
    addItem({
      id: product.id,
      type: 'product',
      name: product.name,
      price: product.price,
    });
  };
  
  const handleMenuItemPress = (menuItem: MenuItem) => {
    addItem({
      id: menuItem.id,
      type: 'menu',
      name: menuItem.name,
      price: menuItem.price,
    });
  };
  
  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => handleProductPress(item)}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: item.image_url }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
  
  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => handleMenuItemPress(item)}
      activeOpacity={0.7}
    >
      <View style={[styles.productImage, styles.menuItemPlaceholder]}>
        <Tag size={24} color={theme.colors.gray[400]} />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'products' && styles.activeTab]}
            onPress={() => setActiveTab('products')}
          >
            <Text style={[styles.tabText, activeTab === 'products' && styles.activeTabText]}>
              Products
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'menu' && styles.activeTab]}
            onPress={() => setActiveTab('menu')}
          >
            <Text style={[styles.tabText, activeTab === 'menu' && styles.activeTabText]}>
              Menu Items
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.searchContainer}>
          <Search size={20} color={theme.colors.gray[500]} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      
      <View style={styles.categoryContainer}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === item && styles.selectedCategoryButton,
              ]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === item && styles.selectedCategoryText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      
      <FlatList
        data={activeTab === 'products' ? filteredProducts : filteredMenuItems}
        keyExtractor={(item) => `${activeTab}-${item.id}`}
        renderItem={activeTab === 'products' ? renderProductItem : renderMenuItem}
        numColumns={3}
        contentContainerStyle={styles.productGrid}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[100],
  },
  header: {
    padding: theme.spacing[4],
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: theme.spacing[4],
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.gray[100],
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[2],
  },
  searchInput: {
    flex: 1,
    marginLeft: theme.spacing[2],
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.base,
    color: theme.colors.gray[800],
  },
  categoryContainer: {
    paddingVertical: theme.spacing[3],
    backgroundColor: theme.colors.white,
  },
  categoryButton: {
    paddingVertical: theme.spacing[2],
    paddingHorizontal: theme.spacing[4],
    borderRadius: theme.radius.full,
    marginHorizontal: theme.spacing[1],
    backgroundColor: theme.colors.gray[200],
  },
  selectedCategoryButton: {
    backgroundColor: theme.colors.primary[100],
  },
  categoryText: {
    fontFamily: theme.typography.fontFamily.bodyMedium,
    fontSize: theme.typography.size.sm,
    color: theme.colors.gray[600],
  },
  selectedCategoryText: {
    color: theme.colors.primary[600],
  },
  productGrid: {
    padding: theme.spacing[2],
  },
  productCard: {
    flex: 1,
    margin: theme.spacing[2],
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    ...theme.shadows.sm,
  },
  productImage: {
    width: '100%',
    height: 120,
    backgroundColor: theme.colors.gray[200],
  },
  menuItemPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    padding: theme.spacing[2],
  },
  productName: {
    fontFamily: theme.typography.fontFamily.bodyMedium,
    fontSize: theme.typography.size.base,
    color: theme.colors.gray[800],
    marginBottom: theme.spacing[1],
  },
  productPrice: {
    fontFamily: theme.typography.fontFamily.bodySemiBold,
    fontSize: theme.typography.size.base,
    color: theme.colors.primary[600],
  },
});