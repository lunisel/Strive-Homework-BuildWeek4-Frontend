import { Button, Form } from "react-bootstrap"
import { Link, RouteComponentProps } from "react-router-dom"
import "./styles.css"

const Loggin = ({history, location,match}:RouteComponentProps) => {
    const handleSubmit = () => {
        console.log("Submitted")
    }
    return(
        <div className="loggin-cont">
            <div className="content-loggin-cont">
                <h1 className="loggin-header py-4">LOGIN</h1>
                <Form onSubmit={()=>{handleSubmit()}}>
                    <Form.Control type="text" placeholder="Email" className="email-input"/>
                    <Form.Control type="password" placeholder="Password" className="password-input"/>
                    <Form.Check type="checkbox" label="Remember me" className="check-input"/>
                    <Button type="submit" className="log-in-btn">LOGIN</Button>
                </Form>
                <p className="parag-login">Or login with</p>
                <Button className="OAuth-btn">OAuth</Button>
                <p className="not-a-member-p">Not a member? <Link to="/signup" className="link-register">Sign up now!</Link></p>
            </div>
        </div>
    )
}

export default Loggin