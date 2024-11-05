// components/GameDetail.tsx
'use client'
import React, { useEffect } from 'react';
// import { useGameStore } from '@/stores/gameStore';

type Props = {
  initialGameData: Game | null;
};

const GameDetail = ({ initialGameData }: Props) => {
    console.log(initialGameData)
//   const { game, setGame } = useGameStore();

//   useEffect(() => {
//     if (!game && initialGameData) {
//       setGame(initialGameData);
//     }
//   }, [game, initialGameData, setGame]);

  return (
    <div>
        Detail
      {/* {game ? (
        <>
          <h1>{game.name}</h1>
          <p>{game.description}</p>
        </>
      ) : (
        <p>Cargando...</p>
      )} */}
    </div>
  );
};

export default GameDetail;
