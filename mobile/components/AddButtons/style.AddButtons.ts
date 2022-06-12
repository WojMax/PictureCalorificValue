import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";


export const styles=StyleSheet.create({
    mainView:{
        flex: 1,
        flexDirection: "row",
        justifyContent:'space-around',
        backgroundColor:Colors.general.accent
    },
    View:{
        width:"30%",
        backgroundColor:Colors.general.accent
    },
    Button:{
        marginVertical:'5%',
        alignItems: 'center',
        paddingVertical:12,
        borderRadius: 15
    },
    Text:{
        color:Colors.general.accent,
        fontWeight:'bold'
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "transparent",
      },
      buttonContainer: {
        flex: 0,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
      },
      caloriesTopContainer: {
        flex: 28,
        backgroundColor: "transparent",
      },
      caloriesMidContainer: {
        flex: 4,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(40, 40, 40, 0.6)",
      },
      caloriesBottomContainer: {
        flex: 5,
        flexDirection: "row",
        justifyContent: "space-evenly",
        backgroundColor: Colors.dark.surface,
      },
      text: {
        flex: 0,
        fontSize: 35,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        color: "white",
        textAlign: "center",
      },
})