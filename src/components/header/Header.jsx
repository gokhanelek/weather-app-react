import React from 'react'
import './header.scss';
import Search from '../search/Search';
import logo from '../../assets/images/logo.svg';
// import { Col, Row, Button } from "react-bootstrap";
import { Card } from "react-bootstrap";


export default function Header() {
  return (
    <div>
      <Card className="header">
        <Card.Body>
          <div className="logo">
            <img src={logo} alt="" />
            <span>WeatherApp</span>
          </div>
          <Search />
        </Card.Body>
      </Card>
    </div>
  )
}
