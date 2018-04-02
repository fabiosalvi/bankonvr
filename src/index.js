import 'aframe';
import 'aframe-gif-shader';
import 'aframe-gif-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);

    var expired = false;
    //expirytime is 1514764799000 - 31 Dic, here it is divided by two
    //var expirytime = 757382399500;
    //if (new Date().getTime() > expirytime*2) expired = true;

    this.state = {isExpired: expired,
                  isActiveSaldo: false,
                  isActiveConfronta: false,
                  isActiveFirma: false,
                  isActiveOTP: false,
                  isLoadingOTP: false,
                  firmato: false,
                  selected1: false,
                  selected2: false,
                  selected3: false,
                  selected4: false,
                  selected5: false,
                  selected6: false,
                  selected7: false,
                  selected8: false,
                  selected9: false,
                  selected0: false,
                  selectedConferma: false,
                  codiceOTPstring: "width:2; align: center; color: black; value: _ _ _  _ _ _",
                };

    this.buttonsHeight = "0.11";
    this.buttonsWidth = "0.07";
    this.buttonTimes = 500 //milliseconds

    this.onClickDigitOne = function() {
      this.setState({selected1: true});
      setTimeout(function() {this.setState({selected1: false}) }.bind(this), this.buttonTimes);
      this.onClickDigit('1')
    }
    this.onClickDigitTwo = function() {
      this.setState({selected2: true});
      setTimeout(function() {this.setState({selected2: false}) }.bind(this), this.buttonTimes);
      this.onClickDigit('2')
    }
    this.onClickDigitThree = function() {
      this.setState({selected3: true});
      setTimeout(function() {this.setState({selected3: false}) }.bind(this), this.buttonTimes);
      this.onClickDigit('3')
    }
    this.onClickDigitFour = function() {
      this.setState({selected4: true});
      setTimeout(function() {this.setState({selected4: false}) }.bind(this), this.buttonTimes);
      this.onClickDigit('4')
    }
    this.onClickDigitFive = function() {
      this.setState({selected5: true});
      setTimeout(function() {this.setState({selected5: false}) }.bind(this), this.buttonTimes);
      this.onClickDigit('5')
    }
    this.onClickDigitSix = function() {
      this.setState({selected6: true});
      setTimeout(function() {this.setState({selected6: false}) }.bind(this), this.buttonTimes);
      this.onClickDigit('6')
    }
    this.onClickDigitSeven = function() {
      this.setState({selected7: true});
      setTimeout(function() {this.setState({selected7: false}) }.bind(this), this.buttonTimes);
      this.onClickDigit('7')
    }
    this.onClickDigitEight = function() {
      this.setState({selected8: true});
      setTimeout(function() {this.setState({selected8: false}) }.bind(this), this.buttonTimes);
      this.onClickDigit('8')
    }
    this.onClickDigitNine = function() {
      this.setState({selected9: true});
      setTimeout(function() {this.setState({selected9: false}) }.bind(this), this.buttonTimes);
      this.onClickDigit('9')
    }
    this.onClickDigitZero = function() {
      this.setState({selected0: true});
      setTimeout(function() {this.setState({selected0: false}) }.bind(this), this.buttonTimes);
      this.onClickDigit('0')
    }

    this.onClickDigit = function(digit) {
      var s = this.state.codiceOTPstring;
      var index = this.state.codiceOTPstring.indexOf('_');
      if (index === -1) {
        s = "width:2; align: center; color: black; value: _ _ _  _ _ _"
        index = s.indexOf('_');
      }
      s = s.substr(0, index) + digit + s.substr(index + 1);
      this.setState({codiceOTPstring: s});
    }

    this.onClickConferma = function() {
      this.setState({selectedConferma: true});
      setTimeout(function() {this.setState({selectedConferma: false}) }.bind(this), this.buttonTimes);

      if (this.state.codiceOTPstring.localeCompare("width:2; align: center; color: black; value: 8 6 0  9 1 7") === 0) {
        this.setState({firmato: true, isActiveOTP: false});
      } else {
        this.setState({codiceOTPstring: "width:2; align: center; color: black; value: _ _ _  _ _ _"});
      }
    }

    this.onClickSaldo = function() {
      this.setState({isActiveSaldo: !this.state.isActiveSaldo, isActiveConfronta: false, isActiveFirma: false, isActiveOTP: false});
    };

    this.onClickConfronta = function() {
      this.setState({isActiveSaldo: false, isActiveConfronta: !this.state.isActiveConfronta, isActiveFirma: false,isActiveOTP: false});
    };

    this.onClickFirma = function() {
      this.setState({isActiveSaldo: false, isActiveConfronta: false, isActiveFirma: !this.state.isActiveFirma, isActiveOTP: false});
    };

    this.showOTP = function() {
      this.setState({isActiveOTP: true, isLoadingOTP: true});
      this.setState({codiceOTPstring: "width:2; align: center; color: black; value: _ _ _  _ _ _"});
      setTimeout(function() {this.setState({isLoadingOTP: false}) }.bind(this), 3000);
    };
  }

  render () {
    return (
      <Scene universal-controls visible={!this.state.isExpired}>
        <a-assets>
          {/* https://3dwarehouse.sketchup.com/model/8399366b1dbe22edcb349a60fd15aa15/Computer-Monitor */}
          <a-asset-item id="asset_monitor-dae" src="_monitor.dae"></a-asset-item>
          <a-asset-item id="asset_office-chair-dae" src="_office-chair.dae"></a-asset-item>
          <video id="office-video" loop="true" src="video.mp4"></video>
        </a-assets>

        <Entity primitive="a-camera">
          <Entity primitive="a-cursor"/>
        </Entity>
        {/* <Entity primitive="a-camera" position="0 0 0" rotation="0 0 0">
          <Entity primitive="a-cursor" animation__click={{property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150}}/>
        </Entity> */}

        <Entity primitive="a-sky" color="#aaf"/>
        <Entity primitive="a-light" type="point" color="white" angle="90" position="0 5 0"/>
        <Entity primitive="a-light" type="ambient" color="#333"/>

        <Entity primitive="a-box" id="floor" static-body width="8"   height="0.1" depth="8"   position="0 0 0"   />
        <Entity primitive="a-box" id="ceiling" static-body width="8"   height="0.1" depth="8"   position="0 3.2 0" />
    		<Entity primitive="a-box" id="leftWall" static-body width="0.1" height="8"   depth="9"   position="-4.1 1 0"/>
    		<Entity primitive="a-box" id="rightWall" static-body width="0.1" height="8"   depth="9"   position="4.1 1 0" />
    		<Entity primitive="a-box" id="frontWall" static-body width="9"   height="8"   depth="0.1" position="0 1 4.1" />
    		<Entity primitive="a-box" id="backWall" static-body width="9"   height="8"   depth="0.1" position="0 1 -4.1"/>

        <Entity primitive="a-image" src="_logoBankOnVR.png" position="0 2.7 -4" width="5" height="1.2" />
        {/* <Entity primitive="a-image" src="_logoBNPP_reversed.png" position="0 2 4" width="5" height="1" /> */}
        {/* <Entity primitive="a-image" src="_logoBNL_reversed.png" position="0 2 4" width="4.5" height="1" /> */}

        <Entity primitive="a-box" id="table" position="0 1 -1.9" width="2" height="0.05" depth="0.75" color="grey"/>
  			<Entity primitive="a-box" id="tableFootLeft" position="-1 0.5 -1.9" width="0.02" height="1" depth="0.3" color="grey"/>
  			<Entity primitive="a-box" id="tableFootRight" position="1 0.5 -1.9" width="0.02" height="1" depth="0.3" color="grey"/>

        <Entity id="mesh_office-chair1" collada-model="#asset_office-chair-dae" position="-1 0.1 -2.1" scale="1.5 1.5 1.5" rotation="0 150 0" />
        <Entity id="mesh_office-chair2" collada-model="#asset_office-chair-dae" position="-1 0.1 -1.7" scale="1.5 1.5 1.5" rotation="0 0 0" />

        {/* for a video in 16:9, (height = 0,56 * width) and (width = 1,78 * height) */}
        <Entity id="mesh_monitor" collada-model="#asset_monitor-dae" position="0 1 -1.9" scale="2.2 2.2 2.2" rotation="0 180 0" />
        {/* <a-entity
          geometry="primitive: plane;
          height: 0.645; width: 1.155"
          position="0.01 1.52 -1.87"
          rotation="0 0 0"
          material="shader:gif;src:url(_videogif_320x176.gif)" gif="">
        </a-entity> */}
        <a-video
          src="_videomp4_320x176.mp4"
          autoplay="false"
          height="0.645" width="1.155"
          position="0.01 1.52 -1.87">
        </a-video>

        <Entity primitive="a-image" src="_iconaSaldo.png" position="-1 1.8 -1.9" width="0.3" height="0.3" rotation="0 15 0" visible={!this.state.isActiveSaldo} events={{click: this.onClickSaldo.bind(this)}}/>
        <Entity primitive="a-image" src="_iconaSaldo_selected.png" position="-1 1.8 -1.9" width="0.3" height="0.3" rotation="0 15 0" visible={this.state.isActiveSaldo} events={{click: this.onClickSaldo.bind(this)}}/>
        <Entity primitive="a-image" src="_iconaConfronta.png" position="-1 1.5 -1.9" width="0.3" height="0.3" rotation="0 15 0" visible={!this.state.isActiveConfronta} events={{click: this.onClickConfronta.bind(this)}}/>
        <Entity primitive="a-image" src="_iconaConfronta_selected.png" position="-1 1.5 -1.9" width="0.3" height="0.3" rotation="0 15 0" visible={this.state.isActiveConfronta} events={{click: this.onClickConfronta.bind(this)}}/>
        <Entity primitive="a-image" src="_iconaFirmaDigitale.png" position="-1 1.2 -1.9" width="0.3" height="0.3" rotation="0 15 0" visible={!this.state.isActiveFirma} events={{click: this.onClickFirma.bind(this)}}/>
        <Entity primitive="a-image" src="_iconaFirmaDigitale_selected.png" position="-1 1.2 -1.9" width="0.3" height="0.3" rotation="0 15 0" visible={this.state.isActiveFirma} events={{click: this.onClickFirma.bind(this)}}/>

        <Entity primitive="a-curvedimage" src="_toolContoCorrente.png" scale="1 1 1" height="0.9" radius="1" theta-length="45" rotation="0 115 0" position="0 1.47 0" visible={this.state.isActiveSaldo} />

        <Entity primitive="a-curvedimage" src="_toolConfrontoInvestimenti.png" scale="1 1 1" height="0.9" radius="0.7" theta-length="175" rotation="0 16 0" position="0 1.52 0" visible={this.state.isActiveConfronta} />

        <Entity primitive="a-curvedimage" src="_toolFirmaModulo.png" scale="1.30 1.5 1" height="1" radius="1.025" theta-length="80" rotation="0 78 0" position="0 1.40 0" visible={this.state.isActiveFirma} />
        <Entity primitive="a-curvedimage" src="_toolFirmaDaFirmare.png" scale="1.30 1.5 1" height="0.15" radius="1" theta-length="20" rotation="0 81 0" position="0 0.86 0" visible={this.state.isActiveFirma && !this.state.firmato} events={{click: this.showOTP.bind(this)}}/>
        <Entity primitive="a-curvedimage" src="_toolFirmaFirmato.png" scale="1.30 1.5 1" height="0.15" radius="1" theta-length="20" rotation="0 81 0" position="0 0.86 0" visible={this.state.isActiveFirma && this.state.firmato}/>

        <Entity primitive="a-image" src="_otp.png" position="1.001 1.6 0" width="0.8" height="0.6" rotation="0 -90 0" visible={this.state.isActiveOTP} />
        <a-entity
          geometry="primitive: plane;
          height: 0.10; width: 0.265"
          position="1 1.826 0.225"
          rotation="0 -90 0"
          visible={this.state.isActiveOTP && this.state.isLoadingOTP}
          material="shader:gif;src:url(_otp_loader.gif)" gif="">
        </a-entity>
        <a-entity position="1 1.65 0" text={this.state.codiceOTPstring} rotation="0 -90 0" visible={this.state.isActiveOTP}></a-entity>

        <Entity primitive="a-image" src="_1.png" position="1 1.52 -0.340" width={this.buttonsWidth} height={this.buttonsHeight} rotation="0 -90 0" visible={!this.state.selected1 && this.state.isActiveOTP} events={{click: this.onClickDigitOne.bind(this)}}/>
        <Entity primitive="a-image" src="_2.png" position="1 1.52 -0.265" width={this.buttonsWidth} height={this.buttonsHeight} rotation="0 -90 0" visible={!this.state.selected2 && this.state.isActiveOTP} events={{click: this.onClickDigitTwo.bind(this)}}/>
        <Entity primitive="a-image" src="_3.png" position="1 1.52 -0.190" width={this.buttonsWidth} height={this.buttonsHeight} rotation="0 -90 0" visible={!this.state.selected3 && this.state.isActiveOTP} events={{click: this.onClickDigitThree.bind(this)}}/>
        <Entity primitive="a-image" src="_4.png" position="1 1.52 -0.115" width={this.buttonsWidth} height={this.buttonsHeight} rotation="0 -90 0" visible={!this.state.selected4 && this.state.isActiveOTP} events={{click: this.onClickDigitFour.bind(this)}}/>
        <Entity primitive="a-image" src="_5.png" position="1 1.52 -0.040" width={this.buttonsWidth} height={this.buttonsHeight} rotation="0 -90 0" visible={!this.state.selected5 && this.state.isActiveOTP} events={{click: this.onClickDigitFive.bind(this)}}/>
        <Entity primitive="a-image" src="_6.png" position="1 1.52  0.035" width={this.buttonsWidth} height={this.buttonsHeight} rotation="0 -90 0" visible={!this.state.selected6 && this.state.isActiveOTP} events={{click: this.onClickDigitSix.bind(this)}}/>
        <Entity primitive="a-image" src="_7.png" position="1 1.52  0.110" width={this.buttonsWidth} height={this.buttonsHeight} rotation="0 -90 0" visible={!this.state.selected7 && this.state.isActiveOTP} events={{click: this.onClickDigitSeven.bind(this)}}/>
        <Entity primitive="a-image" src="_8.png" position="1 1.52  0.185" width={this.buttonsWidth} height={this.buttonsHeight} rotation="0 -90 0" visible={!this.state.selected8 && this.state.isActiveOTP} events={{click: this.onClickDigitEight.bind(this)}}/>
        <Entity primitive="a-image" src="_9.png" position="1 1.52  0.260" width={this.buttonsWidth} height={this.buttonsHeight} rotation="0 -90 0" visible={!this.state.selected9 && this.state.isActiveOTP} events={{click: this.onClickDigitNine.bind(this)}}/>
        <Entity primitive="a-image" src="_0.png" position="1 1.52  0.335" width={this.buttonsWidth} height={this.buttonsHeight} rotation="0 -90 0" visible={!this.state.selected0 && this.state.isActiveOTP} events={{click: this.onClickDigitZero.bind(this)}}/>
        <Entity primitive="a-image" src="_Conferma.png" position="1 1.39 -0.00" width={this.buttonsWidth * 2.4} height={this.buttonsHeight} rotation="0 -90 0" visible={!this.state.selectedConferma && this.state.isActiveOTP} events={{click: this.onClickConferma.bind(this)}}/>

        <Entity primitive="a-image" src="_1y.png" position="1 1.52 -0.340" width={this.buttonsWidth} height={this.buttonsHeight} rotation="0 -90 0" visible={this.state.selected1 && this.state.isActiveOTP} />
        <Entity primitive="a-image" src="_2y.png" position="1 1.52 -0.265" width={this.buttonsWidth} height={this.buttonsHeight} rotation="0 -90 0" visible={this.state.selected2 && this.state.isActiveOTP} />
        <Entity primitive="a-image" src="_3y.png" position="1 1.52 -0.190" width={this.buttonsWidth} height={this.buttonsHeight} rotation="0 -90 0" visible={this.state.selected3 && this.state.isActiveOTP} />
        <Entity primitive="a-image" src="_4y.png" position="1 1.52 -0.115" width={this.buttonsWidth} height={this.buttonsHeight} rotation="0 -90 0" visible={this.state.selected4 && this.state.isActiveOTP} />
        <Entity primitive="a-image" src="_5y.png" position="1 1.52 -0.040" width={this.buttonsWidth} height={this.buttonsHeight} rotation="0 -90 0" visible={this.state.selected5 && this.state.isActiveOTP} />
        <Entity primitive="a-image" src="_6y.png" position="1 1.52  0.035" width={this.buttonsWidth} height={this.buttonsHeight} rotation="0 -90 0" visible={this.state.selected6 && this.state.isActiveOTP} />
        <Entity primitive="a-image" src="_7y.png" position="1 1.52  0.110" width={this.buttonsWidth} height={this.buttonsHeight} rotation="0 -90 0" visible={this.state.selected7 && this.state.isActiveOTP} />
        <Entity primitive="a-image" src="_8y.png" position="1 1.52  0.185" width={this.buttonsWidth} height={this.buttonsHeight} rotation="0 -90 0" visible={this.state.selected8 && this.state.isActiveOTP} />
        <Entity primitive="a-image" src="_9y.png" position="1 1.52  0.260" width={this.buttonsWidth} height={this.buttonsHeight} rotation="0 -90 0" visible={this.state.selected9 && this.state.isActiveOTP} />
        <Entity primitive="a-image" src="_0y.png" position="1 1.52  0.335" width={this.buttonsWidth} height={this.buttonsHeight} rotation="0 -90 0" visible={this.state.selected0 && this.state.isActiveOTP} />
        <Entity primitive="a-image" src="_Confermay.png" position="1 1.39 -0.00" width={this.buttonsWidth * 2.4} height={this.buttonsHeight} rotation="0 -90 0" visible={this.state.selectedConferma && this.state.isActiveOTP} />

      </Scene>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('#sceneContainer'));
