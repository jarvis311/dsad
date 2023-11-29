import React, { useState } from 'react'
import { Button, Container, Card, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { UserPasswordChange } from '../Auth/Api';
import { useNavigate, useParams } from 'react-router-dom';

const ChangePassword = () => {

    const Redirect = useNavigate()
    const [eye, seteye] = useState(true);
    const [password, setpassword] = useState("password");
    const { id } = useParams()
    const [newpassword, Setnewpassword] = useState({
        NewPassword: "",
        ConfirmPassword: ""
    })

    const Changepassword = async (e) => {
        e.preventDefault()
        if (newpassword.NewPassword === "") {
            toast.error("New Password Field Is Required")
        }
        else if (newpassword.ConfirmPassword === "") {
            toast.error("Confirm Password Field Is Required")
        }
        else if (newpassword.NewPassword !== newpassword.ConfirmPassword) {
            toast.error("New Password And Confirm Password Field Is Not Match")
        }
        else {
            const Result = await UserPasswordChange(id, newpassword.ConfirmPassword.trim())
            if (Result.data.Status === true) {
                Redirect('/success')
            }
            else {
                toast.error(Result.data.Response_Message)
            }
        }
    }

    const InputData = async (e) => {
        Setnewpassword({ ...newpassword, [e.target.name]: e.target.value })
    }

    const Eye = () => {
        if (password === "password") {
            setpassword("text");
            seteye(false);
        }
        else {
            setpassword("password");
            seteye(true);
        }
    }

    return (
        <>
            <Container>
                <div className="auth">
                    <div className="auth-box">
                        <Card>
                            <Card.Header className="pb-0">
                                <div className='auth-logo'>
                                    <img src='../logo/Appicon.jpg' className='logo-mini' alt='Sau' />
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Form method='post' onSubmit={Changepassword} >
                                    <h1 className='auth-title'>Change Password</h1>
                                    <h2 className='auth-subtitle'>Saumya Yoga</h2>
                                    <Form.Group className="mb-3">
                                        <Form.Label>New Password</Form.Label>
                                        <Form.Control type="text" className="my-2" name="NewPassword" placeholder="Enter Your New Password" onChange={(e) => { InputData(e) }} />
                                    </Form.Group>
                                    <Form.Group className="mb-4 input-prefix">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control type={password} className="my-2" name="ConfirmPassword" placeholder="Enter Confirm Password" onChange={(e) => { InputData(e) }} />
                                        <i onClick={Eye} className={`bx ${eye ? "bx-hide" : "bx-show"}`}></i>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="w-100 ">Submit</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default ChangePassword