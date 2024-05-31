import React, { useEffect, useState } from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  StatusBar,
  ScrollView,
  FlatList,
} from 'react-native';
import axios from 'axios';
import { Order } from '../../components/Order';
import { OrderNew } from '../../components/OrderNew';
import { OrderReady } from '../../components/OrderReady';
import { OrderInProgress } from '../../components/OrderInProgress';
import { OrderReceived } from '../../components/OrderReceived';

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
      })
      .catch((error) => {
        throw new Error('error');
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    console.log(orders);
  }, [orders]);

  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}
            onPress={() => console.log('Все заказы')}
          >
            <View style={styles.menuItem}>
              <Image
                source={require('@/assets/images/1.png')}
                style={styles.menuItemImg}
              />
              <Text style={styles.menuTitle}>Все заказы</Text>
            </View>
          </Pressable>
          <Pressable
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}
            onPress={() => console.log('Все заказы')}
          >
            <Text style={styles.plusButton}>+</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}
            onPress={() => console.log('Все заказы')}
          >
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
        <ScrollView>
          <View style={styles.orderTypes}>
            <View style={styles.line}></View>
            <Text style={styles.orderTypesText}>Новые</Text>
            <View style={styles.line}></View>
          </View>

          <FlatList
            data={orders}
            renderItem={({ item, index }) => {
              // if (item.status === 'payment_process')
              if (index === 0)
                return (
                  <OrderNew
                    username={item.username}
                    goods={item.order_description}
                  />
                );
            }}
            // keyExtractor={(item) => item.order_id}
          />

          <View style={styles.orderTypes}>
            <View style={styles.line}></View>
            <Text style={styles.orderTypesText}>Готовы</Text>
            <View style={styles.line}></View>
          </View>
          <FlatList
            data={orders}
            renderItem={({ item, index }) => {
              // if (item.status === 'placed')
              if (index === 1)
                return (
                  <OrderReady
                    username={item.username}
                    goods={item.order_description}
                  />
                );
            }}
            keyExtractor={(item) => item.order_id}
          />
          <View style={styles.orderTypes}>
            <View style={styles.line}></View>
            <Text style={styles.orderTypesText}>Готовятся</Text>
            <View style={styles.line}></View>
          </View>

          <FlatList
            data={orders}
            renderItem={({ item, index }) => {
              // if (item.status === 'in_progress')
              if (index === 2)
                return (
                  <OrderInProgress
                    username={item.username}
                    goods={item.order_description}
                  />
                );
            }}
            keyExtractor={(item) => item.order_id}
          />

          <View style={styles.orderTypes}>
            <View style={styles.line}></View>
            <Text style={styles.orderTypesText}>Получены</Text>
            <View style={styles.line}></View>
          </View>

          <FlatList
            data={orders}
            renderItem={({ item, index }) => {
              // if (item.status === 'ready')
              if (index === 3)
                return (
                  <OrderReceived
                    username={item.username}
                    goods={item.order_description}
                  />
                );
            }}
            keyExtractor={(item) => item.order_id}
          />
        </ScrollView>

        <View style={styles.footer}>
          <Pressable
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}
            onPress={() => console.log('Все заказы')}
          >
            <View style={styles.menuItem}>
              <Image
                source={require('@/assets/images/3.png')}
                style={styles.menuItemImg}
              />
              <Text style={styles.menuTitle}>Все пути</Text>
            </View>
          </Pressable>
          <Pressable
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}
            onPress={() => console.log('Все заказы')}
          >
            <View style={styles.qr}>
              <Image source={require('@/assets/images/qr.png')} />
            </View>
          </Pressable>
          <Pressable
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}
            onPress={() => console.log('Все заказы')}
          >
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
    top: 26,
    left: 18,
    right: 18,
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 18,
    left: 18,
    right: 18,
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
});
