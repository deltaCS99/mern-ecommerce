import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import {Navbar,Nav, Container, NavDropdown } from 'react-bootstrap'
import { logOut } from '../reducers/userReducer'

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.user)

  const {userInfo} = userLogin

  const logoutHandler = () =>{
    dispatch(logOut())
  }

  return (
    <Navbar bg="dark" variant='dark' expand="lg" sticky='top' collapseOnSelect>
      <Container>
        <LinkContainer to='/'>
        <Navbar.Brand className='me-auto'>YoShop</Navbar.Brand>
        </LinkContainer>
          <Nav
            className="flex-row my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <LinkContainer to="/cart">
              <Nav.Link ><i className='fas fa-shopping-cart'></i></Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown className='ms-3' title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                
              </NavDropdown>
            ):
            <LinkContainer to="/login">
              <Nav.Link ><i className='ms-3 fas fa-user'></i></Nav.Link>
            </LinkContainer>
            }
          </Nav>
      </Container>
    </Navbar>
  )
}

export default Header
