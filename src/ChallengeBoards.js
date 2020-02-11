import React from 'react';
import firebase from 'firebase';
import 'firebase/firestore'


var allChars = {}; //map containing challenge boards
export function ChallengeBoards(){

  const db = firebase.firestore();
  var challengeBoard = [];

  var docRef = db.collection("challenges").doc("grids");
  docRef.get().then(function(doc) {
      if (doc.exists) {
          allChars= doc.data();
      } else {
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });

  var allChallengeBoards = [];

    for (let challenge in allChars){
      let chars = allChars[challenge];

      if(chars.length >=  24) {
        const SIZE = 5;
        for (let row = 0; row < SIZE; row++) {
          challengeBoard[row] = [];
          for (let col = 0; col < SIZE; ++col) {
            challengeBoard[row][col] = chars[SIZE * row + col];
            if (challengeBoard[row][col] === "Q") {challengeBoard[row][col] = "Qu";}
          }
        }
        allChallengeBoards.push(challengeBoard);
        challengeBoard = [];
      }
    }
    //console.log(allChallengeGrids);

  return allChallengeBoards;
}