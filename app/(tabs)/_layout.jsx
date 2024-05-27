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
  ScrollView,
  FlatList,
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

  const Order = ({ username, goods }) => {
    return (
      <View style={styles.order}>
        <View style={styles.orderInfo}>
          <View style={styles.orderStatus}>
            <Image
              source={require('@/assets/images/ready.svg')}
              // style={styles.menuItemImg}
            />
            <Text style={styles.orderTime}>11.03</Text>
          </View>

          <View style={styles.orderDetails}>
            <View style={styles.orderNameSum}>
              <Text style={styles.orderName}>{username}</Text>
              <Text style={styles.orderSum}>8,42 BYN</Text>
            </View>
            <View style={styles.orderTelPayment}>
              <Text style={styles.orderTel}>+37529-123-45-67</Text>
              <Text style={styles.orderPayment}>Онлайн, опл</Text>
            </View>
            <View style={styles.orderGoods}>
              <FlatList
                data={goods}
                renderItem={({ item }) => {
                  if (item.Напиток)
                    return (
                      <Text style={styles.orderProduct}>
                        {item.Напиток} - {item.Количество} шт
                      </Text>
                    );
                  if (item.Еда)
                    return (
                      <Text style={styles.orderProduct}>
                        {item.Еда} - {item.Количество} шт
                      </Text>
                    );
                  if (item.Продукт)
                    return (
                      <Text style={styles.orderProduct}>
                        {item.Продукт} - {item.Количество} шт
                      </Text>
                    );
                }}
                keyExtractor={(item, i) => i}
              />
            </View>
          </View>

          <View style={styles.orderTypeNumber}>
            <Text style={styles.orderType}>На месте</Text>
            <Text style={styles.orderWhen}>Сейчас</Text>
            <Text style={styles.orderPaymentNumber}>№123456</Text>
            <Text style={styles.orderNumber}>№201</Text>
          </View>
        </View>
        <View style={styles.orderButtons}>
          <Pressable
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}
            onPress={() => console.log('button')}
          >
            <Text style={[styles.button, styles.greyButton]}>Готовится</Text>
          </Pressable>
          <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]} onPress={() => console.log('button')}>
            <Text style={[styles.button, styles.transparentButton]}>
              Не забрали
            </Text>
          </Pressable>
          <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]} onPress={() => console.log('button')}>
            <Text style={[styles.button, styles.greenButton]}>Выдан</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]} onPress={() => console.log('Все заказы')}>
            <View style={styles.menuItem}>
              <Image
                source={require('@/assets/images/1.png')}
                style={styles.menuItemImg}
              />
              <Text style={styles.menuTitle}>Все заказы</Text>
            </View>
          </Pressable>
          <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]} onPress={() => console.log('Все заказы')}>
            <Text style={styles.plusButton}>+</Text>
          </Pressable>
          <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]} onPress={() => console.log('Все заказы')}>
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
            renderItem={({ item }) => {
              if (item.status === 'payment_process')
                return (
                  <Order
                    username={item.username}
                    goods={item.order_description}
                  />
                );
            }}
            keyExtractor={(item) => item.order_id}
          />

          <View style={styles.orderTypes}>
            <View style={styles.line}></View>
            <Text style={styles.orderTypesText}>Готовы</Text>
            <View style={styles.line}></View>
          </View>
          {/* <FlatList
            data={orders}
            renderItem={({ item }) => {
              if ((item.status = 'placed')) return <Order />;
            }}
            keyExtractor={(item) => item.order_id}
          /> */}
          <View style={styles.orderTypes}>
            <View style={styles.line}></View>
            <Text style={styles.orderTypesText}>Готовятся</Text>
            <View style={styles.line}></View>
          </View>

          {/* <FlatList
            data={orders}
            renderItem={({ item }) => {
              if ((item.status = 'in_progress')) return <Order />;
            }}
            keyExtractor={(item) => item.order_id}
          /> */}

          <View style={styles.orderTypes}>
            <View style={styles.line}></View>
            <Text style={styles.orderTypesText}>Получены</Text>
            <View style={styles.line}></View>
          </View>

          {/* <FlatList
            data={orders}
            renderItem={({ item }) => {
              if ((item.status = 'ready')) return <Order />;
            }}
            keyExtractor={(item) => item.order_id}
          /> */}
        </ScrollView>

        <View style={styles.footer}>
          <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]} onPress={() => console.log('Все заказы')}>
            <View style={styles.menuItem}>
              <Image
                source={require('@/assets/images/3.png')}
                style={styles.menuItemImg}
              />
              <Text style={styles.menuTitle}>Все пути</Text>
            </View>
          </Pressable>
          <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]} onPress={() => console.log('Все заказы')}>
            <View style={styles.qr}>
              <Image source={require('@/assets/images/qr.png')} />
            </View>
          </Pressable>
          <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]} onPress={() => console.log('Все заказы')}>
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
    marginBottom: 10,
  },
  orderInfo: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
  },
  orderButtons: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 90,
    borderRadius: 3,
    height: 26,
    fontFamily: 'RobotoRegular',
    fontSize: 14,
    fontWeight: 400,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greyButton: {
    color: '#fff',
    backgroundColor: '#85868B',
  },
  transparentButton: {
    color: '#85868B',
    backgroundColor: 'transparent',
    textDecorationLine: 'underline',
  },
  greenButton: {
    color: '#202021',
    backgroundColor: '#00FBF4',
  },
  orderStatus: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  orderTime: {
    color: '#85868B',
    fontFamily: 'RobotoRegular',
    fontSize: 12,
    fontWeight: 200,
  },
  orderDetails: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    marginLeft: 10,
    marginRight: 20,
    gap: 6,
  },
  orderNameSum: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderName: {
    color: '#00FBF4',
    fontFamily: 'RobotoRegular',
    fontSize: 14,
    fontWeight: 400,
  },
  orderSum: {
    color: '#00FBF4',
    fontFamily: 'RobotoRegular',
    fontSize: 14,
    fontWeight: 400,
  },
  orderTelPayment: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderTel: {
    color: '#00FBF4',
    fontFamily: 'RobotoRegular',
    fontSize: 12,
    fontWeight: 200,
  },
  orderPayment: {
    color: '#00FBF4',
    fontFamily: 'RobotoRegular',
    fontSize: 12,
    fontWeight: 200,
  },
  orderGoods: {},
  orderTypeNumber: {
    display: 'flex',
    gap: 7,
  },
  orderProduct: {
    color: '#85868B',
    fontFamily: 'RobotoRegular',
    fontSize: 14,
    fontWeight: 400,
  },
  orderType: {
    color: '#00FBF4',
    fontFamily: 'RobotoRegular',
    fontSize: 16,
    fontWeight: 400,
    textAlign: 'right',
  },
  orderWhen: {
    color: '#00FBF4',
    fontFamily: 'RobotoRegular',
    fontSize: 16,
    fontWeight: 400,
    textAlign: 'right',
  },
  orderPaymentNumber: {
    color: '#85868B',
    fontFamily: 'RobotoRegular',
    fontSize: 10,
    fontWeight: 400,
    textAlign: 'right',
  },
  orderNumber: {
    color: '#00FBF4',
    fontFamily: 'RobotoRegular',
    fontSize: 16,
    fontWeight: 400,
    textAlign: 'right',
  },
});
