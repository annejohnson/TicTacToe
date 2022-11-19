import React from 'react';
import Player from './Player';

interface Props {
    winningPlayer: Player;
}

function WinnerAnnouncement({ winningPlayer }: Props) {
    return (
        <p>Congratulations, Player {Player[winningPlayer]}, you've won!</p>
    );
}

export default WinnerAnnouncement;