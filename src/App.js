import './App.css';
import logo from './kle_logo.png';

function App() {
  return (
    <body>
      <div class='parent'>

        <div class='child1'>
          <img src={require('./kle_logo2.png')} class='logo'></img>
        </div>

        <div class='child2'>
          <h1>Community Website For Students</h1>
          <h1>Login page:</h1>
        </div>

      </div>

      <form>
        <label>Username: </label><input type='text' class='text'/>
        <br/>
        <label>Password: </label><input type='password' class='text'/>
        <br/><br/>
        <input type='button' value='Login' class='button'/>
      </form>

    </body>
  );
}

export default App;
