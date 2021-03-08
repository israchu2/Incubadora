import { fire } from "../Firebase/configuracion";
// import * as firebase from "firebase";

class Datos {
  HudedadTR() {
    let starCountRef = fire.database().ref("FirebaseIncubadora/humedadInst");
    return starCountRef;
  }

  TemperaturaTR() {
    let starCountRef = fire
      .database()
      .ref("FirebaseIncubadora/temperaturaInst");
    return starCountRef;
  }

  ValvulaTR() {
    let starCountRef = fire.database().ref("FirebaseIncubadora/valvula");
    return starCountRef;
  }

  LucesTR() {
    let starCountRef = fire.database().ref("FirebaseIncubadora/luces");
    return starCountRef;
  }

  VentiladorTR() {
    let starCountRef = fire.database().ref("FirebaseIncubadora/ventilador");
    return starCountRef;
  }
  // TablaTemp(){
  //     var starCountRef = fire.database().ref('automatizacionincubadora-default-rtdb.firebaseio.com/FirebaseIncubadora/humedadInst');
  //     starCountRef.get().then('humedadInst', (snapshot) => {
  //         const data = snapshot.val();
  //         // updateStarCount(postElement, data);
  //     });

  //     fire.database.child("users").child(userId).get().then(function(snapshot) {
  //         if (snapshot.exists()) {
  //           console.log(snapshot.val());
  //         }
  //         else {
  //           console.log("No data available");
  //         }
  //       }).catch(function(error) {
  //         console.error(error);
  //       });
  // }
}

export default new Datos();