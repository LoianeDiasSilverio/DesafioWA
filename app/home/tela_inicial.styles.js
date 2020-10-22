import { StyleSheet, Dimensions } from "react-native";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e4d6'
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15
  },
  contentContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  card: {
    marginVertical: 10,
    padding: 20,
    backgroundColor: '#FFFFFF'
  },
  row: {
    flexDirection: 'row'
  },
  tinyLogo: {
    width: 70,
    height: 70,
  },
  cardDescription: {
    marginHorizontal: 10
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  textInformative: {
    fontSize: 14,
    fontWeight: 'normal',
    marginTop: 3,
    marginLeft: 5
  },
  button: {
    width: 120,
    height: 10
  },
  iconDelete:{
    alignItems: 'flex-end'
  }
});


export default Styles;
