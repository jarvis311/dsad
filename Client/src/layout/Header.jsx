import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DarkMode from "../Component/DarkMode";
import { Button, Dropdown } from 'react-bootstrap';
import LogoMini from '../Component/Logo-mini';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { LogoutApi } from '../Auth/Api';

const Header = ({ openSidebar }) => {

    const Redireact = useNavigate()

    const Logout = async () => {
        const Result = await LogoutApi()
        if (Result.data.Status === true) {
            toast.success(Result.data.Response_Message)
            Cookies.remove('jwt-Somiya')
            Redireact('/')
        }
        else {
            toast.error(Result.data.Response_Message)
        }
    }


    return (
        <>
            <header className="sidebar-header">
                <div className="header-left-menu">
                    <Link to="/" className='d-xl-none'>
                        <LogoMini />
                    </Link>
                </div>
                <div className="header-right-menu">
                    <DarkMode />
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-autoclose-true">
                            <div className="user-menu">
                                <div className="user-img">
                                    <img src="../../logo/Appicon.jpg" alt='Saumya Yoga' />
                                </div>
                                <div className="user-name ms-2">
                                    <h6>Saumya Yoga</h6>
                                    <p>Admin</p>
                                </div>
                            </div>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="dropdown-menu dropdown-menu-end">
                            <Dropdown.Item onClick={Logout} >
                                Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button className="burger-btn d-xl-none" onClick={openSidebar}>
                        <i className='bx bx-menu fs-3'></i>
                    </Button>
                </div>
            </header>
        </>
    )
}

export default Header