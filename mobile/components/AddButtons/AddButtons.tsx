import { TouchableOpacity, StyleSheet} from "react-native";
import { Text, View, useThemeColor} from "../Themed";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 


type Props = {
    AddFoodOnPress: () => void;
    CameraOnPress: () => void;
  };

export default function AddButtons(props: Props) {
    const colorScheme = useColorScheme();
    const backgroundColor=useThemeColor(
        { light: Colors.light.background, dark: Colors.dark.background },
        "background");
    return (
        <View style={styles.mainView}>
            <View style={styles.View} >
                <TouchableOpacity 
                    style={[{backgroundColor},styles.Button]} 
                    onPress={props.CameraOnPress}
                >
                <MaterialIcons 
                    name="add-a-photo" 
                    size={40} 
                    color={Colors.general.accent} 
                    style={{paddingBottom:2.9}}
                />
                <Text style={styles.Text}>Take photo</Text>
                </TouchableOpacity> 
            </View>
            <View style={styles.View} >
                <TouchableOpacity 
                    style={[{backgroundColor},styles.Button]} 
                    onPress={props.AddFoodOnPress}
                >
                <Ionicons 
                    name="md-add-circle-sharp" 
                    size={40} 
                    color={Colors.general.accent}  
                />
                <Text style={styles.Text}>Add meal</Text>
                </TouchableOpacity> 
            </View>
            
        </View>
      
    );}

    const styles=StyleSheet.create({
        mainView:{
            flex: 1,
            flexDirection: "row",
            justifyContent:'space-around',
            backgroundColor:Colors.general.accent
        },
        View:{
            width:"46%",
            backgroundColor:Colors.general.accent
        },
        Button:{
            marginVertical:'3%',
            alignItems: 'center',
            paddingTop:10,
            paddingBottom:10
        },
        Text:{
            color:Colors.general.accent,
            fontWeight:'bold'
        }
    })