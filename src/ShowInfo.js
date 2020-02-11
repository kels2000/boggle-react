/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { Button } from '@material-ui/core';
import Board from './Board.js';
 
function ShowInfo({collectionName}) {
 
  const [dataList, setDataList] = useState(/* initial state= */ []);
  const [grid, setGrid] = useState([]);
  const [foundSolutions, setFoundSolutions] = useState([]);

  useEffect(
    () => {
      const unsubscribe = firebase.firestore().collection("challenges")
      .onSnapshot((querySnapshot) => {
          var firestoreData = [];
          querySnapshot.forEach(function(doc) {
            firestoreData.push({name: doc.data().name, highscore: doc.data().highscore, grid: doc.data().grid});
          });
          setDataList(firestoreData);
        });
      return () => unsubscribe()
    },
    []
  )

  function showBoard() {
    dataList.map((data) => {
      if (data.name === "Challenge 1") {
        setGrid(data.grid)
        return (<Board board={grid} />)
      }

    })
    
  }

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