import {fire} from '../Firebase/configuracion';
import * as firebase from 'firebase';

class Datos{
    HudedadTR(){
        var starCountRef = fire.database().ref('automatizacionincubadora-default-rtdb.firebaseio.com/FirebaseIncubadora/humedadInst]');
        starCountRef.on('humedadInst', (snapshot) => {
            const data = snapshot.val();
            updateStarCount(postElement, data);
        });
    }

    TemperaturaTR(){
        var starCountRef = fire.database().ref('automatizacionincubadora-default-rtdb.firebaseio.com/FirebaseIncubadora/temperaturaInst');
        starCountRef.on('temperaturaInst', (snapshot) => {
            const data = snapshot.val();
            updateStarCount(postElement, data);
        });
    }

    TablaTemp(){
        var starCountRef = fire.database().ref('automatizacionincubadora-default-rtdb.firebaseio.com/FirebaseIncubadora/humedadInst');
        starCountRef.get().then('humedadInst', (snapshot) => {
            const data = snapshot.val();
            updateStarCount(postElement, data);
        });

        fire.database.child("users").child(userId).get().then(function(snapshot) {
            if (snapshot.exists()) {
              console.log(snapshot.val());
            }
            else {
              console.log("No data available");
            }
          }).catch(function(error) {
            console.error(error);
          });
    }
}


export default new Datos()