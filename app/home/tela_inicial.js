import React, { Component } from "react";
import { View, Image, Text, ScrollView, Button, Linking, TouchableOpacity  } from "react-native";
import Styles from '../home/tela_inicial.styles';
import UsersService from '../services/usersService';
import FollowService from '../services/followService'
import Icon from 'react-native-vector-icons/MaterialIcons'

Icon.loadFont();
let listRemoved = [];

class TelaInicial extends Component {
  constructor(props){
    super(props)

    this.state = {
      listUsers: [],
      listUsersRemove: []
    }

    this.doRequest();
  }
  
  doRequest(){
    this.getUsers();
  }

  async getUsers(){
    const users = await new UsersService().getUsersRequest();
    let list = [];
    users.data.forEach((user, index) => {
      if(index < 10){
        debugger;
        const follower = new FollowService().getUserFollowerRequest(user.followers_url);
        const following = new FollowService().getUserFollowerRequest(user.following_url);

        const userObj = {
          follower,
          following,
          ...user
        }
        
        list.push(userObj);
      }
    })
    this.setState({listUsers: list});
  }

  removeUser(item){
    const newListUsers = this.state.listUsers.filter(
      (user) =>
        user.id !== item.id
    );

    listRemoved.push(item);
    this.setState({listUsersRemove: listRemoved, listUsers: newListUsers});
  }

  renderCard(){
    return(
      this.state.listUsers.map((item)=> (
        <View style={Styles.card}>
          <TouchableOpacity onPress={ ()=> this.removeUser(item)}>
            <View style={Styles.iconDelete}>
              <Icon name="delete" size={20} color="red" />
            </View>
          </TouchableOpacity>
          <View style={Styles.row}>
            <Image
              style={Styles.tinyLogo}
              source={{
                uri: item.avatar_url,
              }}
            />
            <View style={Styles.cardDescription}>
              <View style={Styles.row}>
                <Text style={Styles.title}>Login:</Text>
                <Text style={Styles.textInformative}>{item.login}</Text>
              </View>
              <View style={Styles.row}>
                <Text style={Styles.title}>NodeId:</Text>
                <Text style={Styles.textInformative}>{item.node_id}</Text>
              </View>
              <View style={Styles.row}>
                <Text style={Styles.title}>UserId:</Text>
                <Text style={Styles.textInformative}>{item.id}</Text>
              </View>
            </View>
          </View>
          <Button
            onPress={ ()=>{ Linking.openURL(item.url)}}
            title="Ir para github"
            color="#0047BA"
            accessibilityLabel="Ir para github"
          />
        </View>
      ))
    );
  }

  render() {
    return(
      <View style={Styles.container}>
        <ScrollView>
          {this.renderCard()}
        </ScrollView>
      </View>
    );
  }
}

export default TelaInicial;
