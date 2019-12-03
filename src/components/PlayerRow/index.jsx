import React from "react";

import "./PlayerRow.css";

const PlayerRow = (props) => {
    console.log('props', props)
    return(
        <ul className={props.id}>
            <li>{props.name}</li>
            <li>{props.position}</li>
            <li>{props.teamAbbr}</li>
            <li>{props.seasonPts}</li>
            <li>{props.seasonProjectedPts}</li>
            <li>{props.weekPts}</li>
            <li>{props.weekProjectedPts}</li>
        </ul>
    )
}

export default PlayerRow;
