import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import PageTitle from '../components/PageTitle';
import Col from 'react-bootstrap/Col';
import {Link} from "react-router-dom";

function Register() {


    let regFirstName;
    let regLastName;
    let regEmail;
    let regUsername;
    let regPassword;

    const [message, setMessage] = useState("");

    function buildPath(route)
    {
        if (process.env.NODE_ENV === 'production') 
        {
            return 'https://cop4331-ucaf1.herokuapp.com/' + route;
        }
        else
        {        
            return 'http://localhost:5000/' + route;
        }
    }

    const doRegister = async (event) => {

        event.preventDefault();

        let temp = {
            FirstName: regFirstName.value,
            LastName: regLastName.value,
            login: regUsername.value,
            password: regPassword.value,
            Email: regEmail.value
        }

        if(temp.FirstName === "" || temp.LastName === "" || temp.login === "" || temp.password === "" || temp.Email === "") {
            setMessage("Please fill in empty fields");
            return;
        }
        
        let js = JSON.stringify(temp);
        
        try {
                const response = await fetch(buildPath('user/register'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
    
                var res = JSON.parse(await response.text());
                
            if(res.id <= 0) {
                setMessage("Registration Error");
            }
            else {      
                setMessage('');
                window.location.href = '/';
            }
        }
        catch (e) {
            alert(e.toString());
            return;
        }
    };


        return(

            <Container class="d-flex align-items-center">
                <Row>
                    <Col>
                        <div id="registerDiv" class="registerDiv">
                            <PageTitle/>
                            <form class="form-inline" onSubmit={doRegister}>
                                <h4 className="d-flex justify-content-center mt-2">Register</h4>
                                <span class="d-flex justify-content-center pt-1" id="inner-title"></span><br/>
                                <div class="form-group mx-sm-5 mb-1">
                                    <input class="form-control" type="text" id="regFirstName" placeholder="First Name" ref={(c) => regFirstName = c}/><br/>
                                </div>
                                <div class="form-group mx-sm-5 mb-1">
                                    <input class="form-control" type="text" id="regLastName" placeholder="Last Name" ref={(c) => regLastName = c}/><br/>
                                </div>
                                <div class="form-group mx-sm-5 mb-1">
                                    <input class="form-control" type="text" id="regEmail" placeholder="Email" ref={(c) => regEmail = c}/><br/>
                                </div>
                                <div class="form-group mx-sm-5 mb-1">
                                    <input class="form-control" type="text" id="regUsername" placeholder="Username" ref={(c) => regUsername = c}/><br/>
                                </div>
                                <div class="form-group mx-sm-5 mb-1">
                                    <input class="form-control" type="text" id="regPassword" placeholder="Password" ref={(c) => regPassword = c}/><br/>
                                </div>
                                <div class="d-flex justify-content-center pt-2 pb-4">
                                <input class="btn btn-warning" type="submit" id="registerButton" value = "Register" onClick={doRegister}/>
                                </div>
                                
                            </form>
                            <span class="d-flex justify-content-center" id="registerResult">{message}</span>
                            <div class="row pt-3 pb-1 d-flex justify-content-center">
                                <div class="col-md-auto">Already have an account?</div>
                                <div class="col-md-auto"><Link to='/'>Login Here.</Link></div>
                            </div>
                        </div>
                    </Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
            </Container>




            );
        
};

export default Register;
