import React, { Component, Fragment } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './scanStyle'
import {
    TouchableOpacity,
    Text,
    StatusBar,
    Linking,
    View
} from 'react-native';

class Scan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scan: false,
            ScanResult: false,
            result: null
        };
    }

    onSuccess = (e) => {
        // need to check if it works for a link that opens app store
        const check = e.data.substring(0, 4);
        console.log('scanned data' + check);
        this.setState({
            result: e,
            scan: false,
            ScanResult: true
        })
        if (check === 'http') {
            Linking
                .openURL(e.data)
                .catch(err => console.error('An error occured', err));


        } else {
            this.setState({
                result: e,
                scan: false,
                ScanResult: true
            })
        }

    }

    activeQR = () => {
        this.setState({
            scan: true
        })
    }
    scanAgain = () => {
        this.setState({
            scan: true,
            ScanResult: false
        })
    }
    render() {
        const { scan, ScanResult, result } = this.state
        return (
            <View style={styles.scrollViewStyle}>
                <Fragment>
                    <StatusBar barStyle="dark-content" />
                    <Text style={styles.textTitle}>QR Scanner</Text>
                    {!scan && !ScanResult &&
                            <TouchableOpacity onPress={this.activeQR} style={styles.buttonTouchable}>
                                <Text style={styles.buttonTextStyle}>Begin Scan</Text>
                            </TouchableOpacity>
                    }

                    {ScanResult &&
                        <Fragment>
                            <Text style={styles.textTitle1}>Result!</Text>
                            <View style={styles.scanCardView}>
                                {/* style={ScanResult ? styles.scanCardView : styles.cardView} */}
                                <Text>Type : {result.type}</Text>
                                <Text>Result : {result.data}</Text>
                                <Text numberOfLines={1}>RawData: {result.rawData}</Text>
                                <TouchableOpacity onPress={this.scanAgain.bind(this)} style={styles.buttonTouchable}>
                                    <Text style={styles.buttonTextStyle}>Sccan Again!!!!</Text>
                                </TouchableOpacity>

                            </View>
                        </Fragment>
                    }


                    {scan &&
                        <QRCodeScanner
                            reactivate={true}
                            showMarker={true}
                            ref={(node) => { this.scanner = node }}
                            onRead={this.onSuccess}
                            bottomContent={
                                <View>
                                    <TouchableOpacity style={styles.buttonTouchable} onPress={() => this.setState({ scan: false })}>
                                        <Text style={styles.buttonTextStyle}>Stop Scan</Text>
                                    </TouchableOpacity>
                                </View>

                            }
                        />
                    }
                </Fragment>
            </View>

        );
    }
}



export default Scan;