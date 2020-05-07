import { Alert } from "react-native";

export const onError= (error)=>{
    Alert.alert('Error',error.message);
  }