import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'

const Header = () => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => console.log('menu')}>
        <Ionicons name="menu" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('profile')}>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbgk0yfCOe55931lf6q0osfhGRU-fnH8Im1g&s',
          }}
          style={{ width: 32, height: 32, borderRadius: 20 }}
          resizeMode="cover"
          alt="profile"
        />
      </TouchableOpacity>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
})
