import React from 'react';
import './App.css';
import { Switch,Route} from 'react-router-dom';
// import { Link } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

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
function App() {
    return(
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    )
  }

export default App;
