import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

// import api from './services/api';

// Menor que 10 reais
// const productsURL = 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5bbd6fdd-abae-411d-96cc-1a5d76d3803b/abaixo-10-reais.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201017%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201017T180643Z&X-Amz-Expires=86400&X-Amz-Signature=e769358d48c4acc8ee0341637f42ca3fd05baf7f2e651af1e2c84c3569957a11&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22abaixo-10-reais.json%22'
// Maior que 10 reais
const productsURL = 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/11b895d0-bc64-4f3a-bfa9-7c652be8d415/acima-10-reais.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201017%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201017T180354Z&X-Amz-Expires=86400&X-Amz-Signature=4d00a6762a0f29da47dc1685109b9d4774ff9c6a821e8e91130b4d213f0eeec3&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22acima-10-reais.json%22'



export default function App(){
    // const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [value, setValue] = useState([]);
    
    useEffect(() => {
      axios
        .get(productsURL)
        .then(response => {
          setData(response.data.items)
          setValue(response.data.value)
        })
        .catch(error => alert(error))
    }, [])

    return(
        <View style={styles.container}>
          <View style={styles.topBarContainer}>
            <Text style={styles.topBarTitle}>Meu carrinho</Text>
          </View>
            <View style={styles.content}>
              <FlatList 
                  data={data}
                  keyExtractor={(item) => item.productId}
                  renderItem={({item}) => {
                    return(
                      <TouchableOpacity>
                        <View style={styles.itemContainer}>
                          <Image source={{uri: item.imageUrl}} style={styles.productImage}/>
                          <View style={styles.productDetailsContainer}>
                            <Text style={styles.productTitle}>{item.name}</Text>
                            <Text style={styles.productPrice}>R$ {(item.price * 0.01).toPrecision(3)}</Text>
                            <Text style={styles.productSellingPrice}>R$ {item.sellingPrice * 0.01}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )
                  }
                }
              />
            </View>

            <View style={styles.priceContainer}>
              <Text style={styles.totalTitle}>Total: </Text>
              <Text style={styles.totalPrice}>R$ {value * 0.01}</Text>
            </View>
            {(value * 0.01 > 10) ? 
              <>
                <Text style={styles.freeShippingText}>Parabéns, sua compra tem frete grátis!</Text>
              </>
              :
              <></>
            }
            <View style={styles.buttonContainer}>
                <TouchableOpacity activeOpacity={0.7} style={styles.button} >
                    <Text style={styles.buttonText}>Finalizar Compra</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    topBarContainer: {
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#EEE',
    },
    topBarTitle: {
      fontFamily: 'Poppins-Bold',
      fontSize: 24
    },
    content: {
      flex: 1,
      paddingLeft: 12,
      paddingRight: 12
    },
    itemContainer: {
      padding: 4,
      flexDirection: 'row',
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#e6e6e6',
    },
    productImage: {
      width: 120,
      height: 120,
    },
    productTitle: {
      maxWidth: '80%',
      fontFamily: 'Poppins-Bold',
      fontSize: 18,
      color: "#000",
      marginLeft: 8,
      marginTop: 8,
    },
    productPrice: {
      fontFamily: 'Poppins-Medium',
      fontSize: 16,
      color: "#9c9c9c",
      marginLeft: 8,
    },
    productSellingPrice:{
      fontFamily: 'Poppins-Medium',
      color: "#000",
      marginLeft: 8,
      fontSize: 16,
    },
    priceContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      borderTopWidth: 1,
      borderTopColor: '#EEE'
    },
    totalTitle: {
      fontSize: 22,
      fontFamily: 'Poppins-Bold',
    },
    totalPrice: {
      fontSize: 22,
      fontFamily: 'Poppins-Bold',
    },
    freeShippingText: {
      fontFamily: 'Poppins-Medium',
      alignSelf: 'center',
      padding: 10,
      marginBottom: 10,
      backgroundColor: '#8eff8a',
      borderRadius: 20,
      color: '#06c300'
    },
    buttonContainer: {
        borderTopWidth: 1,
        borderTopColor: '#6666',
    },
    button: {
        margin: 16,
        padding: 10,
        backgroundColor: '#1c5cff',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'Poppins-Bold'
    },
})