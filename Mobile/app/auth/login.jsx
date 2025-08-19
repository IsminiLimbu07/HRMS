import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-web";
import axios from "axios";

const login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");


  const handleLogin  =async (e) => {
    // Clear any previous errors
    setError("");
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!formData.email || !formData.password){
     setError("Please fill in all fields")
      return;

    }
    if (!emailRegex.test(formData.email)) {
      setError("Invalid email format");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/auth", formData);
      if(response.status === 200) {
        console.log(response.data);
        // Clear error on successful login
        setError("");
      }
      
    } catch (error) {
      console.log(error.response?.data?.message);
      // Set error message from backend response or generic message
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.status === 401) {
        setError("Invalid email or password");
      } else if (error.response?.status === 404) {
        setError("User not found");
      } else {
        setError("Login failed. Please try again.");
      }
    }

  };

  return (
    <View className="flex-1 flex-col items-center gap-4 px-6">
      <Text className="text-xl font-bold color-red-900 ">Welcome Back</Text>
      <View className="flex flex-col gap-2 w-full">
        <Text className="text-lg">Email</Text>
        <TextInput
          className="border p-2 rounded-md"
          placeholder="Email"
          autoCapitalize={false}
          keyboardType="email-address"
          onChangeType={(text) =>
            setFormData((prev) => ({ ...prev, email: text }))
          }
        ></TextInput>

        <Text className="text-lg">Password</Text>
        <TextInput
          className="border p-2 rounded-md"
          placeholder="*******"
          autoCapitalize={false}
          secureTextEntry={true}
          onChangeType={(text) =>
            setFormData((prev) => ({ ...prev, password: text }))
          }
        ></TextInput>

        {error && <Text className="text-red-800">{error}</Text>}
        

      </View>

      <TouchableOpacity 
        className="bg-red-200 p-1 rounded-md w-full"
        onPress={handleLogin}
      >
        <Text className="text-center text-lg font-semibold color-red-950"> Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default login;
