import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { theme } from '@/styles/theme';
import { useAuthStore } from '@/store/authStore';
import { LoginForm } from '@/components/LoginForm';
import { Settings as SettingsIcon, User, Store, Bell, Shield, LogOut, ChevronRight } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';

export default function SettingsScreen() {
  const { isAuthenticated, user, logout } = useAuthStore();
  
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
        <Text style={styles.title}>Settings</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <User size={24} color={theme.colors.white} />
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.username || 'User'}</Text>
            <Text style={styles.profileRole}>{user?.role || 'Staff'}</Text>
          </View>
        </View>
        
        <Card style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <View style={[styles.settingsIconContainer, styles.blueIcon]}>
                <User size={18} color={theme.colors.primary[600]} />
              </View>
              <Text style={styles.settingsItemText}>Profile Information</Text>
            </View>
            <ChevronRight size={18} color={theme.colors.gray[400]} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <View style={[styles.settingsIconContainer, styles.purpleIcon]}>
                <Shield size={18} color="#9333EA" />
              </View>
              <Text style={styles.settingsItemText}>Security</Text>
            </View>
            <ChevronRight size={18} color={theme.colors.gray[400]} />
          </TouchableOpacity>
        </Card>
        
        <Card style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Store Settings</Text>
          
          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <View style={[styles.settingsIconContainer, styles.greenIcon]}>
                <Store size={18} color={theme.colors.green[600]} />
              </View>
              <Text style={styles.settingsItemText}>Store Information</Text>
            </View>
            <ChevronRight size={18} color={theme.colors.gray[400]} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <View style={[styles.settingsIconContainer, styles.orangeIcon]}>
                <SettingsIcon size={18} color="#ea580c" />
              </View>
              <Text style={styles.settingsItemText}>POS Configuration</Text>
            </View>
            <ChevronRight size={18} color={theme.colors.gray[400]} />
          </TouchableOpacity>
        </Card>
        
        <Card style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          
          <View style={styles.settingsToggleItem}>
            <View style={styles.settingsItemLeft}>
              <View style={[styles.settingsIconContainer, styles.redIcon]}>
                <Bell size={18} color={theme.colors.red[600]} />
              </View>
              <Text style={styles.settingsItemText}>Order Notifications</Text>
            </View>
            <Switch
              trackColor={{ false: theme.colors.gray[300], true: theme.colors.primary[500] }}
              thumbColor={theme.colors.white}
              ios_backgroundColor={theme.colors.gray[300]}
              value={true}
            />
          </View>
          
          <View style={styles.settingsToggleItem}>
            <View style={styles.settingsItemLeft}>
              <View style={[styles.settingsIconContainer, styles.redIcon]}>
                <Bell size={18} color={theme.colors.red[600]} />
              </View>
              <Text style={styles.settingsItemText}>Inventory Alerts</Text>
            </View>
            <Switch
              trackColor={{ false: theme.colors.gray[300], true: theme.colors.primary[500] }}
              thumbColor={theme.colors.white}
              ios_backgroundColor={theme.colors.gray[300]}
              value={false}
            />
          </View>
        </Card>
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={logout}
        >
          <LogOut size={20} color={theme.colors.red[600]} />
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>Version 1.0.0</Text>
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
  content: {
    flex: 1,
    padding: theme.spacing[3],
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing[4],
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.primary[600],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing[3],
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: theme.typography.fontFamily.bodySemiBold,
    fontSize: theme.typography.size.lg,
    color: theme.colors.gray[900],
    marginBottom: theme.spacing[1],
  },
  profileRole: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.base,
    color: theme.colors.gray[600],
  },
  settingsSection: {
    marginBottom: theme.spacing[4],
    padding: theme.spacing[3],
  },
  sectionTitle: {
    fontFamily: theme.typography.fontFamily.bodySemiBold,
    fontSize: theme.typography.size.base,
    color: theme.colors.gray[800],
    marginBottom: theme.spacing[3],
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  settingsToggleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing[3],
  },
  blueIcon: {
    backgroundColor: theme.colors.primary[100],
  },
  purpleIcon: {
    backgroundColor: '#f3e8ff',
  },
  greenIcon: {
    backgroundColor: theme.colors.green[100],
  },
  orangeIcon: {
    backgroundColor: '#ffedd5',
  },
  redIcon: {
    backgroundColor: theme.colors.red[100],
  },
  settingsItemText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.base,
    color: theme.colors.gray[800],
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing[4],
    marginVertical: theme.spacing[4],
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.red[200],
  },
  logoutButtonText: {
    fontFamily: theme.typography.fontFamily.bodySemiBold,
    fontSize: theme.typography.size.base,
    color: theme.colors.red[600],
    marginLeft: theme.spacing[2],
  },
  versionText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.sm,
    color: theme.colors.gray[500],
    textAlign: 'center',
    marginBottom: theme.spacing[6],
  },
});