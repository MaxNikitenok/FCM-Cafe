import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  StatusBar,
  Button,
} from 'react-native';
import axios from 'axios';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const [orders, setOrders] = useState([]);

  const getOrders = () => {
    axios
      .get(
        'https://dev.fcm.by/client/horeca_info?telegram_horeca_id=5884559465&active=true'
      )
      .then((res) => {
        setOrders(res.data);
        console.log(res);
      })
      .catch((error) => {
        throw new Error('error');
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  const order = () => (
    <View style={styles.order}>
      <View style={styles.orderInfo}></View>
      <View style={styles.orderButtons}>
        <Pressable onPress={() => console.log('button')}>
          <Text style={{ color: '#fff', backgroundColor: '#85868B' }}>
            Готовится
          </Text>
        </Pressable>
        <Pressable onPress={() => console.log('button')}>
          <Text style={{ color: '#85868B', backgroundColor: 'transparent' }}>
            Не забрали
          </Text>
        </Pressable>
        <Pressable onPress={() => console.log('button')}>
          <Text style={{ color: '#202021', backgroundColor: '#00FBF4' }}>
            Выдан
          </Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => console.log('Все заказы')}>
            <View style={styles.menuItem}>
              <Image
                source={require('@/assets/images/1.png')}
                style={styles.menuItemImg}
              />
              <Text style={styles.menuTitle}>Все заказы</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => console.log('Все заказы')}>
            <Text style={styles.plusButton}>+</Text>
          </Pressable>
          <Pressable onPress={() => console.log('Все заказы')}>
            <View style={styles.menuItemRight}>
              <View style={styles.menuItemImg}>
                <Image source={require('@/assets/images/2(1).png')} />
                <Image
                  source={require('@/assets/images/2(2).png')}
                  style={{
                    position: 'absolute',
                    top: 1,
                    left: 1,
                  }}
                />
              </View>

              <Text style={styles.menuTitle}>Все типы</Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.orderTypes}>
          <View style={styles.line}></View>
          <Text style={styles.orderTypesText}>Новые</Text>
          <View style={styles.line}></View>
        </View>
        <View style={styles.orderTypes}>
          <View style={styles.line}></View>
          <Text style={styles.orderTypesText}>Готовы</Text>
          <View style={styles.line}></View>
        </View>
        {order()}
        <View style={styles.orderTypes}>
          <View style={styles.line}></View>
          <Text style={styles.orderTypesText}>Готовятся</Text>
          <View style={styles.line}></View>
        </View>
        <View style={styles.orderTypes}>
          <View style={styles.line}></View>
          <Text style={styles.orderTypesText}>Получены</Text>
          <View style={styles.line}></View>
        </View>

        <View style={styles.footer}>
          <Pressable onPress={() => console.log('Все заказы')}>
            <View style={styles.menuItem}>
              <Image
                source={require('@/assets/images/3.png')}
                style={styles.menuItemImg}
              />
              <Text style={styles.menuTitle}>Все пути</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => console.log('Все заказы')}>
            <View style={styles.qr}>
              <Image source={require('@/assets/images/qr.png')} />
            </View>
          </Pressable>
          <Pressable onPress={() => console.log('Все заказы')}>
            <View style={styles.menuItemRight}>
              <Image
                source={require('@/assets/images/4(1).png')}
                style={styles.menuItemImg}
              />
              <Text style={styles.menuTitle}>Сегодня</Text>
              <Image
                source={require('@/assets/images/4(2).png')}
                style={{
                  marginLeft: 8,
                }}
              />
            </View>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 84,
    paddingHorizontal: 16,
    backgroundColor: '#202021',
  },
  header: {
    position: 'absolute',
    top: 18,
    left: 16,
    right: 16,
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 18,
    left: 16,
    right: 16,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: 120,
  },
  menuItemRight: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 120,
  },
  menuItemImg: {
    marginRight: 8,
  },
  menuTitle: {
    color: '#ffffff',
    fontFamily: 'RobotoRegular',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 19.2,
  },
  plusButton: {
    color: '#00FBF4',
    fontFamily: 'RobotoRegular',
    fontSize: 18,
    fontWeight: 500,
    lineHeight: 22,
    borderWidth: 1,
    borderColor: '#00FBF4',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 4,
  },
  orderTypes: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  line: {
    width: 80,
    borderBottomWidth: 1,
    borderColor: '#85868B',
  },
  orderTypesText: {
    minWidth: 58,
    textAlign: 'center',
    color: '#85868B',
    fontFamily: 'RobotoRegular',
    fontSize: 12,
    fontWeight: 200,
    lineHeight: 14.4,
  },
  order: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 6,
    borderStyle: 'solid',
    borderColor: '#00FBF4',
    padding: 10,
  },
  orderInfo: {},
  orderButtons: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
