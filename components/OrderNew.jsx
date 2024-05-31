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

export const OrderNew = ({ username, goods }) => {
  return (
    <View style={styles.order}>
      <View style={styles.orderInfo}>
        <View style={styles.orderStatus}>
          <Image
            source={require('@/assets/images/online.svg')}
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
            <Text style={styles.orderPayment}>Нал, не опл.</Text>
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
          {/* <Text style={styles.orderNumber}>№201</Text> */}
        </View>
      </View>
      <View style={styles.orderButtons}>
        <Pressable
          style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}
          onPress={() => console.log('button')}
        >
          <View style={[styles.button, styles.greyButton]}><Text style={styles.greyButtonText}>Готовится</Text></View>
        </Pressable>
        {/* <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]} onPress={() => console.log('button')}>
          <View style={[styles.button, styles.transparentButton]}>
            <Text style={styles.transparentButtonText}>Не забрали</Text>
          </View>
        </Pressable> */}
        <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]} onPress={() => console.log('button')}>
          <View style={[styles.button, styles.greenButton]}><Text style={styles.greenButtonText}>Принять</Text></View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  order: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 6,
    borderStyle: 'solid',
    borderColor: '#fff',
    padding: 10,
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    borderRadius: 3,
    height: 26,
    fontFamily: 'RobotoRegular',
    fontSize: 14,
    fontWeight: 400,
  },
  greyButton: {
    backgroundColor: '#85868B',
  },
  greyButtonText: {
    color: '#fff',
  },
  // transparentButton: {
  //   backgroundColor: 'transparent',
  // },
  // transparentButtonText: {
  //   color: '#85868B',
  //   textDecorationLine: 'underline',
  // },
  greenButton: {
    backgroundColor: '#00FBF4',
  },
  greenButtonText: {
    color: '#202021',
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
    color: '#fff',
    fontFamily: 'RobotoRegular',
    fontSize: 14,
    fontWeight: 400,
  },
  orderSum: {
    color: '#fff',
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
    color: '#85868B',
    fontFamily: 'RobotoRegular',
    fontSize: 12,
    fontWeight: 200,
  },
  orderPayment: {
    color: '#fff',
    fontFamily: 'RobotoRegular',
    fontSize: 12,
    fontWeight: 200,
    backgroundColor: '#FD0202',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
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
    color: '#fff',
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

