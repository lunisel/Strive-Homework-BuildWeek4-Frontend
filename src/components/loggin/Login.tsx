import React from "react"
import { Button, Form } from "react-bootstrap"
import { Link, RouteComponentProps } from "react-router-dom"
import {handleSubmit} from "./Login"
import "./styles.css"

const Login = ({history, location,match}:RouteComponentProps) => {
    return(
        <div className="loggin-cont">
            <div className="content-loggin-cont">
                <h1 className="loggin-header py-4">LOGIN</h1>
                <Form onSubmit={(e: React.FormEvent)=>{handleSubmit(e)}}>
                    <Form.Control type="text" placeholder="Email" className="email-input my-3"/>
                    <Form.Control type="password" placeholder="Password" className="password-input my-3"/>
                    <Form.Check type="checkbox" label="Remember me" className="check-input my-3"/>
                    <Button type="submit" className="log-in-btn my-2">LOGIN</Button>
                </Form>
                <p className="parag-login py-3 m-0">Or login with</p>
                <Button className="OAuth-btn my-2">OAuth</Button>
                <p className="not-a-member-p py-4 m-0">Not a member? <Link to="/signup" className="link-register">Sign up now!</Link></p>
            </div>
        </div>
    )
}

export default Login