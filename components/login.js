import React, { Component } from 'react'
import {checkLogin, checkSignup} from './common/requests'
import '../style/login.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

// Notify Loader APIcomponents/

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login_details:{
                email:"",
                password:""
            },
            signup_details:{
                userName:"",
                email:"",
                password:"",
                conf_password:"",
                age:"",
                gender:"",
                phone:"",
            }
            // fieldType: "",
            // fieldValue: "",
        }
    }

    addToLoginState=(e)=>{
        var object=this.state.login_details
        // this.validate({[e.target.name]:e.target.value})
        object[e.target.id] = e.target.value
        this.setState({
            login_details:object
        })
        console.log("addToLoginState:",this.state)
    }
    
    addToSignupState=(e)=>{
        var object = this.state.signup_details
        object[e.target.id] = e.target.value
        this.setState({
            signup_details:object
        })
        console.log("addToSignupState:",this.state)
    }

    validate = (field) => {
        let msg = ''
        if (field.id === 'userame' && field.value.trim() == '') {
            msg = 'Empty Username'
            document.getElementById(field.id+"_span").innerHTML=msg
        }
        else if (field.id === "email") {
            var re = /\S+@\S+\.\S+\S+/;
            if (re.test(field.value) === false) { msg = 'Invalid Email' }
            console.log("Validate Email: ", msg)
        }
        else if (field.id === 'password' && field.value.trim() === '') {
            msg = 'Empty Password'
        }
        // else if(field.id==='confirmpassword' && field.value!==)
        if (msg !== '') {
            this.setState({
                fieldType: field.id,
                fieldValue: msg
            })
        }
        else {
            this.setState({
                fieldType: '',
                fieldValue: ''
            })
        }
    }

    loginSequence=()=>{
        var ch = checkLogin(this.state.login_details,"http://192.168.1.22:3009/auth/login/").then((res)=>{
            if(res.access_token!=null){
                if(res['msg']==='Login Successful'){
                    console.log("REsult login ",res)
                    this.props.history.push('/dashboard')
                    // toast.success(res['msg'],{position: toast.POSITION.TOP_LEFT})
                }
                else{
                    // toast.error(res['msg'],{position: toast.POSITION.TOP_LEFT})
                }
            }
        })
    }

    signupSequence =()=>{
        var ch = checkSignup(this.state.signup_details,"http://192.168.1.22:3009/auth/register/").then((res)=>{
            console.log("Result: ",res)
            if(res!=null){
                if(res['message']==='User created successfully'){
                    console.log("SignUP: ",res)
                    this.props.history.push('/dashboard')
                    // toast.success(res['msg'],{position: toast.POSITION.TOP_LEFT})
                }
                else{
                    // toast.error(res['msg'],{position: toast.POSITION.TOP_LEFT})
                }
            }
        })
    }

    render() {
        return (
            <div className="login-wrap">
                <div className="login-html">
                    <input id="tab-1" type="radio" name="tab" className="sign-in" /><label htmlFor="tab-1" className="tab">Sign In</label>
                    <input id="tab-2" type="radio" name="tab" className="sign-up" /><label htmlFor="tab-2" className="tab">Sign Up</label>
                    
                    <div className="login-form">
                        <form className="sign-in-htm">
                            <div className="group">
                                <label htmlFor="email" className="label">Email</label>
                                <input id="email" name="email" type="text" className="input" onChange={this.addToLoginState}/>
                                <span name="email_span">Testing...</span>
                            </div>
                            <div className="group">
                                <label htmlFor="password" className="label">Password</label>
                                <input id="password" name="password" type="password" className="input" data-type="password" 
                                    onChange={this.addToLoginState}/>
                            </div>
                            <div className="group">
                                <input id="check" type="checkbox" className="check"  onChange={null}/>
                                <label htmlFor="check"><span className="icon"></span> Keep me Signed in</label>
                            </div>
                            <div className="group">
                                <button type="button" className="button" value="Sign In" 
                                onClick={()=>this.loginSequence()}>Sign IN</button>
                                {/* <input type="submit" className="button" value="Sign In" onSubmit={testCheckLogin(this.state.login_details)}/> */}
                            </div>
                            <div className="hr"></div>
                            <div className="foot-lnk">
                                <a href="#forgot">Forgot Password?</a>
                            </div>
                        </form>

                        <form className="sign-up-htm">
                            <div className="group">
                                <label htmlFor="userName" className="label">Username</label>
                                <input id="userName" name="userName" type="text" className="input"  onChange={this.addToSignupState}/>
                            </div>
                            <div className="group">
                                <label htmlFor="age" className="label">Age</label>
                                <input id="age" name="age" type="text" className="input"  onChange={this.addToSignupState}/>
                            </div>
                            <div className="group">
                                <label htmlFor="gender" className="label">Gender</label>
                                <label htmlFor='radio-male'>Male</label>
                                <input type='radio' name='gender' id='gender' value='Male' onChange={this.addToSignupState}/>
                                <label htmlFor='radio-female'>Female</label>
                                <input type='radio' name='gender' id='gender' value='Female' onChange={this.addToSignupState}/>
                            </div>
                            <div className="group">
                                <label htmlFor="email" className="label">Email</label>
                                <input id="email" name="email" type="text" className="input" onChange={this.addToSignupState} />
                            </div>
                            <div className="group">
                                <label htmlFor="phone" className="label">Phone Number</label>
                                <input id="phone" name="phone" type="text" className="input" onChange={this.addToSignupState} />
                            </div>
                            <div className="group">
                                <label htmlFor="password" className="label">Password</label>
                                <input id="password" name="password" type="password" className="input" data-type="password"
                                    onChange={this.addToSignupState}/>
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">Confirm Password</label>
                                <input id="pass" type="password" className="input" data-type="password"  onChange={this.addToSignupState}/>
                            </div>
                            <div className="group">
                                <input type="submit" className="button" value="Sign Up" onClick={this.signupSequence}/>
                            </div>
                            <div className="hr"></div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login