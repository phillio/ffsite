import React from "react";

import "./PlayerRowHeader.css";

const PlayerRowHeader = (props) => {
    // console.log('props',props)
    return(
            <td className={`header-td header-abbr col-${props.header.id}`} id={`header-abbr-${props.header.id}`} >{props.header.abbr}</td>
    )
}

export default PlayerRowHeader;


            // {this.props.statsHolder.map(stat => {
            //     return (
            //         <td className="player-stats"></td>
            //     )
            // })}


        // <div className="header-card" id={`header-${props.id}`}>
        //     <td className="header-position" >{props.position}</td>
        //     <td className="header-teamAbbr" >{props.teamAbbr}</td>
        //     <td className="header-seasonPts" >{props.seasonPts}</td>
        //     <td className="header-seasonProjectedPts" >{props.seasonProjectedPts}</td>
        //     <td className="header-weekPts" >{props.weekPts}</td>
        //     <td className="header-weekProjectedPts" >{props.weekProjectedPts}</td>
        // </div>