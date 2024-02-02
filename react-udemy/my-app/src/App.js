import './App.css';
import Login from './Components/Login';

function App() {
  return (
    <div className="App">
      <table>
        <tr>
          <td>
          <img src='http://192.168.10.49:3000/static/media/tech-modern.a553ccae5ff5233e82a2.png' alt='tech-modern' />
          </td>
          <td>
            <Login></Login>
          </td>
        </tr>
      </table>
      
    </div>
  );
}

export default App;
