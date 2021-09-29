import React from 'react';
import './App.css';
import { Switch,Route} from 'react-router-dom';
// import { Link } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

// const Hatspage = (props)=>(
//   <div>
//     <button onClick={()=> props.history.push("/")}>HomePage</button>
//     <h1>HatsPage</h1>
//   </div>
// )
// const Menspage = (props)=>(
//   <div>
//     <Link to="/">Homepage</Link>
//     <h1>MensPage</h1>
//   </div>
// )
class App extends React.Component 
{
  constructor()
  {
    super();

    this.state = 
    {
      currentUser : null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async user=>{
      if(user)
      {
        const userRef = await createUserProfileDocument(user);

        userRef.onSnapshot(snapshot=>{
          this.setState({
              currentUser:{
              id : snapshot.id,
              ...snapshot.data()}
            })
          })
      }
      else{
        this.setState({
          currentUser : user
        })
      }
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
    console.log("componentWillMount");
  }

  componentDidUpdate(){
    console.log("componentDidUpdate");
  }

  shouldComponentUpdate(){
    console.log("shouldComponentUpdate");
    return true;
  }

  render(){
    return(
      <div>
        <Header currentUser = {this.state.currentUser}/>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    )
  }
  }

export default App;
