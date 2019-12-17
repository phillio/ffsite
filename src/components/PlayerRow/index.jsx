import React from "react";

import "./PlayerRow.css";

const PlayerRow = (props) => {
    // console.log('props',props)
    const playerStats = props.stats
    const playerStatsKeys = Object.keys(playerStats)
    const statsHolder = props.statsHolder
    return(
        <tr className="player-card" id={`player-${props.id}`}>
            <td className="player-name" >{props.name}</td>
            <td className="player-position" >{props.position}</td>
            <td className="player-teamAbbr" >{props.teamAbbr}</td>
            <td className="player-seasonPts" >{props.seasonPts}</td>
            <td className="player-seasonProjectedPts" >{props.seasonProjectedPts}</td>
            <td className="player-weekPts" >{props.weekPts}</td>
            <td className="player-weekProjectedPts" >{props.weekProjectedPts}</td>

            {statsHolder.map(stat => {
                if (playerStats[stat.id] !== undefined) {
                    return <td className={`player-stats player-stats-${stat.id} col-${stat.id}`} >{playerStats[stat.id]}</td>
                } else {
                    return <td className={`player-stats player-stats-${stat.id} col-${stat.id}`} >-</td>
                }
            })}

            {/* {props.statsHolder.map(stat => {
                return (
                    <td className={`player-stats-${stat.id}`}>-</td>
                )
            })}
            {props.stats.map(stat => {
                const statDiv = document.querySelector(`player-stats-${stat.id}`)
                return statDiv.innerHTML(`${stat.value}`)
            })} */}


            {/* {props.statsHolder.map(stat => {
                return (
                    <td className="player-stats">-</td>
                )
            })} */}
        </tr>
    )
}

export default PlayerRow;
