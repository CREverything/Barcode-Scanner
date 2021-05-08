import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Permissions from "expo-permissions";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      permissions: null,
      scanned: false,
      scannedData: "",
      buttonState: "normal",
    };
  }

  render() {
    const hasCameraPermission = this.state.permissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if (buttonState == "clicked" && hasCameraPermission) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarcodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>
            {hasCameraPermission
              ? this.state.scannedData
              : "Request camera permission."}
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.getCameraPermission();
            }}
          >
            <Text>Scan the QR Code</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
  getCameraPermission = async (id) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      permissions: status === "granted",
      buttonState: "clicked",
      scanned: false,
    });
  };
  handleBarcodeScanned = async ({ type, data }) => {
    const buttonState = this.state.buttonState;
    this.setState({
      scanned: true,
      scannedData: data,
      buttonState: "normal",
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
