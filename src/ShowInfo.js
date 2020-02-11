/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { Button } from '@material-ui/core';

function ShowInfo({collectionName}) {
 
  const [dataList, setDataList] = useState(/* initial state= */ []);

  useEffect(
    () => {
      const unsubscribe = firebase.firestore().collection("challenge-info")
      .onSnapshot((querySnapshot) => {
          var firestoreData = [];
          querySnapshot.forEach(function(doc) {
            firestoreData.push({name: doc.data().name, highscore: doc.data().highscore});
          });
          setDataList(firestoreData);
        });
      return () => unsubscribe()
    },
    []
  )

  return (
    <div>
       <ul> 
        {dataList.map((data) => {
          return (<Button key={data.id}onClick={() => showBoard()}>{data.name} | Highscore: {data.highscore}</Button>)
        })}
      </ul>
    </div>);
 };
 
export default ShowInfo;