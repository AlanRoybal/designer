import "../global.css";
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const _layout = () => {
  return (
    <View>
      <Text style={styles.title}>Drivo</Text>
      <Text style={styles.text}>Ready to start driving?</Text>
      <Text style={styles.start}>Start</Text>
    </View>
  )
}

export default _layout

const styles = StyleSheet.create({
  title: {
    flex: 1,
    fontSize: 96,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingTop: 66,
    color: '#433BFF',
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  text: {
    fontSize: 24,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 7,
    color: '#433BFF',
    fontWeight: 'bold',
  },
  start: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 150,
    backgroundColor: '#433BFF',
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingVertical: 111,
    paddingHorizontal: 91,
    fontSize: 40,
    color: 'white',
    marginTop: 150,
    fontWeight: 'bold',
  }

})

// import "../global.css";
// import { StyleSheet, Text, View } from "react-native";
// import React from "react";
// import { Car, MessageCircleMore, Blocks, ChevronLeft } from "lucide-react";

// const _layout = () => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.margin}>
//         <View>
//           <Text style={styles.button}> <ChevronLeft style={styles.arrow}/> </Text>
//           <Text style={styles.title}>Choose your output style!</Text>
//           <Text style={styles.subheading}>Required to pick one</Text>
//         </View>
//         <View>
//           <View style={[styles.selection, styles.verticalContainer]}>
//             <Blocks style={styles.icon} />
//             <Text style={styles.buttonText}>Colored Shapes</Text>
//           </View>
//           <View style={[styles.selection, styles.verticalContainer]}>
//             <MessageCircleMore style={styles.icon} />
//             <Text style={styles.buttonText}>Text</Text>
//           </View>
//           <View style={[styles.selection, styles.verticalContainer]}>
//             <Car style={styles.icon} />
//             <Text style={styles.buttonText}>Both</Text>
//           </View>
//         </View>
//         {/* <Text style={styles.bottomBar}> -- </Text> */}
//       </View>
//       <View style={styles.bottomBar}>
//         <Text style={styles.startButton}>Start Driving</Text>
//       </View>
//     </View>
//   );
// };

// export default _layout;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   verticalContainer: {
//     flex: 1,
//     flexDirection: "column",
//   },
//   margin: {
//     margin: 20,
//     flex: 1,
//   },
//   title: {
//     flex: 1,
//     fontSize: 24,
//     alignItems: "center",
//     alignSelf: "flex-start",
//     paddingTop: 50,
//     fontWeight: "bold",
//   },
//   button: {
//     flex: 1,
//     top: 40,
//     maxWidth: 48,
//     minHeight: 36,
//     minWidth: 48,
//     maxHeight: 36,
//     borderRadius: 8,
//     paddingTop:6,
//     justifyContent: "center",
//     textAlign: "center",
//     alignItems: "center",
//     backgroundColor: "#DEDCFF",
//   },
//   subheading: {
//     flex: 1,
//     color: "gray",
//     fontSize: 14,
//     fontWeight: "bold",
//     alignItems: "center",
//     alignSelf: "flex-start",
//     paddingTop: 5,
//     paddingBottom: 25,
//   },
//   selection: {
//     flex: 1,
//     backgroundColor: "#DEDCFF",
//     borderRadius: 12,
//     paddingTop: 25,
//     paddingBottom: 25,
//     paddingLeft: 15,
//     alignSelf: "stretch",
//     justifyContent: "center",
//     textAlign: "center",
//     alignItems: "center",
 
//     marginVertical: 20,
//   },
//   bottomBar: {
//     backgroundColor: "#DEDCFF",
//     height: 120,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   startButton: {
//     flex: 1,
//     alignItems: "center",
//     alignSelf: "center",
//     justifyContent: "center",
//     borderRadius: 15,
//     color: "white",
//     fontSize: 24,
//     fontWeight: "bold",
//     paddingHorizontal: 50,
//     paddingVertical: 15,
//     backgroundColor: "#433BFF",
//     marginVertical: 30,
//   },
//   icon: {
//     backgroundColor: "transparent",
//     color: "black",
//     width: 48,
//     height: 48,
//   },
//   arrow: {
//     backgroundColor: "transparent",
//     color: "black",
//   },
//   buttonText:{
//     fontSize: 20,
//     color: "black",
//     fontWeight: "bold",
//   }
// });
