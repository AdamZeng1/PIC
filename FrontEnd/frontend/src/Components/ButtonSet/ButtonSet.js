import React, {Component} from 'react';
import './ButtonSet.model.css';

class ButtonSet extends Component {
  constructor (props) {
    super(props)
    this.state = {
      is_show: true
    }
  }
  HandleClick(event) {
    this.setState({is_show:!this.state.is_show})
  }
  render () {
    return (
      <div >
        <div class="ball-set">
      			<div class="temp"></div>
      			<div class="fly" className={this.state.is_show == true? 'fly-show':null } >
      				<div class="ball">
      					<svg class="center" viewBox="0 0 24 24">
                  <path fill="#ffffff" d="M14,14H7V16H14M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M17,10H7V12H17V10Z" />
      					</svg>
      				</div>
      			</div>
      			<div class="fly" className={this.state.is_show == true? 'fly-show':null }>
      				<div class="ball">
      					<svg class="center"viewBox="0 0 24 24">
                  <path fill="#ffffff" d="M21,14H3V4H21M21,2H3C1.89,2 1,2.89 1,4V16A2,2 0 0,0 3,18H10L8,21V22H16V21L14,18H21A2,2 0 0,0 23,16V4C23,2.89 22.1,2 21,2Z" />
      					</svg>
      				</div>
      			</div>
      			<div class="fly" className={this.state.is_show == true? 'fly-show':null }>
      				<div class="ball">
      					<svg class="center third" viewBox="-1 -1 23 23">
                  <path fill="#ffffff" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
      					</svg>
      				</div>
      			</div>
      			<div class="fly"className={this.state.is_show == true? 'fly-show':null } onClick={this.HandleClick}>
      				<div class="ball" >
      					<svg class="center" viewBox="0 0 24 24">
    			        <path fill="#ffffff" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
      					</svg>
      				</div>
      			</div>
      	</div>
      </div>
    )
  }
}

export default ButtonSet;
