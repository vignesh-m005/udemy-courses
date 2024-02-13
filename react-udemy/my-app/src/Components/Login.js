import './Login.css'

export default function Login() {
    return (
        <div className='login'>
            <div className='header'>
                <img src="http://192.168.10.49:3000/static/media/new-logo.ca58c79ce9bac95a55b6.png" alt="mks-vision" />
                <p>Skill Management System</p>
            </div>
            <form class="col-md-5 d-flex align-items-center">
                <label>Email address</label> <br />
                <input type='email' name='email' placeholder='Enter Email address'/> <p></p>
                <label>Password</label> <br />
                <input type='password' name='password' placeholder='Enter Password'/> <p></p>
                <button type='submit'>Login</button>
            </form>
        </div>
    );
}