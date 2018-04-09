import React, { Component } from 'react';
import foulstuff from './foulstuff.js';
export class Foulstuff extends Component {
    constructor(props) {
        super(props);
        this.foul = this.foul.bind(this);
        this.unfoul = this.unfoul.bind(this);
    }
    foul(e){
        switch(e){
            case 1:   
                var tempfoul = this.state.redfouls;
                 this.setState({
                    redfouls: tempfoul + 1,
                    thisfoul: this.state.redfouls
                  })
            break;
            case 2:   
                tempfoul = this.state.yellowfouls;
                this.setState({
                    yellowfouls: tempfoul + 1,
                    thisfoul: this.state.yellowfouls
                  })
            break;
            case 3:   
                tempfoul = this.state.greenfouls;
                this.setState({
                    greenfouls: tempfoul + 1,
                    thisfoul: this.state.greenfouls
                  })
            break;
        }
    }
    unfoul(e){
        switch(e){
            case 'red':   
                var tempfoul = this.state.redfouls;
                this.setState({
                    redfouls: tempfoul + 1,
                    thisfoul: this.state.redfouls
                  })
            break;
            case 'yellow':   
                tempfoul = this.state.yellowfouls;
                this.setState({
                    yellowfouls: tempfoul + 1,
                    thisfoul: this.state.yellowfouls
                  })
            break;
            case 'green':   
                const tempfoul = this.state.greenfouls;
                this.setState({
                    greenfouls: tempfoul + 1,
                    thisfoul: this.state.greenfouls
                  })
            break;
        }
    }
    render() {
        return (
            <div><button className="foulbutton button" onClick={this.foul.foul}>Foul</button> <sp>:</sp> <button className="foulbutton button" onClick={this.foul.unfoul}> {this.state.thisfoul}</button></div>
        )}
    }