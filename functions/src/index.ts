import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

import * as admin from 'firebase-admin';
admin.initializeApp();

exports.addMessage = functions.https.onRequest((req, res) => {

  // console.log('tes ye gan addMessage!!')
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  return admin.database().ref('/messages').push({ original: original }).then((snapshot) => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.redirect(303, snapshot.ref.toString());
  });
});

// exports.newSubscriberNotification = functions.firestore
//   .document('listMessages/{msg}')
//   .onCreate(async event => {

//     console.log('cek ye gan :: ', event);

//     const data = event.data();

//     const vTitle = data!.title;
//     const vMessage = data!.message;

//     // Notification content
//     const payload = {
//       notification: {
//         title: vTitle,
//         body: vMessage,
//         icon: 'https://image.freepik.com/free-vector/lazy-panda-cartoon_42750-177.jpg'
//       }
//     }

//     // ref to the device collection for the user
//     const db = admin.firestore()
//     const devicesRef = db.collection('devices').where('userId', '==', 'testUser')


//     // get the user's tokens and send notifications
//     const devices = await devicesRef.get();

//     const tokens: Array<string> = [];

//     // send a notification to each device token
//     devices.forEach(result => {
//       const token = result.data().token;

//       tokens.push(token)
//     })

//     return admin.messaging().sendToDevice(tokens, payload)

//   });

exports.pushNewMessage = functions.firestore
  .document('listMessages/{messageId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();
    const message = data!.message;
    const title = data!.title;

    // console.log(' 1 **** ', data);

    const payload = {
      notification: {
        title: title,
        body: message,
        icon: 'https://goo.gl/Fz9nrQ'
      }
    }

    // console.log('cek dl gans :: ', payload);

    // ref to the device collection for the user
    const db = admin.firestore()
    const devicesRef = db.collection('devices')


    // get the user's tokens and send notifications
    const devices = await devicesRef.get();

    const tokens: Array<string> = [];

    // send a notification to each device token
    devices.forEach(result => {
      const token = result.data().token;
      tokens.push(token)
    })

    return admin.messaging().sendToDevice(tokens, payload)
  });
