import React from 'react'
import {TextInput, View, Button,FlatList,Text} from  'react-native'
import {useState} from 'react'
type Product ={
    id: number;
    title: string;
    price: number;
}

export default function ProductSearchAPI() {
const [keyword,setKeyword]  = useState<string>("");
const [product,setProduct] = useState<Product[]>([]);
const fetchProducts =  async(keyword: string,limit: number) =>{
    const response = await fetch(
        `https://dummyjson.com/products/search?q=${keyword}&limit=${limit}`
    );
    const data = await response.json();
    setProduct(data.products);
};
    

  return (
    <View style={{ padding: 20 }}>
      <Text>Tìm kiếm sản phẩm</Text>

      <TextInput
        placeholder="Nhập tên sản phẩm"
        value={keyword}
        onChangeText={setKeyword}
      />

      <Button
        title="Tìm kiếm"
        onPress={() => fetchProducts(keyword, 10)}
      />

      <FlatList
        data={product}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>
            {item.title} - ${item.price}
          </Text>
        )}
      />
    </View>
  );
}