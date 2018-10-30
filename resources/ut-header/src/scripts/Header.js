import React, { Component } from "react";
import ReactDOM from "react-dom";

import successKid from '../media/success-kid.png';

class Header extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <img src={successKid} />
                Lets see
            </div>
        )
    }
}
export default Header;