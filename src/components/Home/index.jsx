import React, { Component } from "react";
import PlayerRow from "../PlayerRow";
import axios from "axios";

import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      keyHeaders: []
    };
  }

  componentDidMount = () => {
    this.getData();
  };

  getData = async () => {
    try {
      const playerSeasonStatsApiCall = await axios.get(
        "https://api.fantasy.nfl.com/v1/players/stats?statType=seasonStats&season=2019&format=json"
      );
      const seasonStatsNineteen = playerSeasonStatsApiCall.data;
      const playerStatsArray = seasonStatsNineteen.players.sort(function(a, b) {
        return b.seasonPts - a.seasonPts;
      });
      const playerStatsKeys = await axios.get(
        "https://api.fantasy.nfl.com/v1/game/stats?format=json"
      );
      const keySet = playerStatsKeys.data.stats;

      // matching the missing stats headers
      // from playerStats.data.players[x].stats
      // to appropriate key "title/name" so that
      // columns in rendered table can be named
      // https://stackoverflow.com/questions/53941112/match-key-values-in-json-object

      const offensivePlayers = playerStatsArray.filter(player => {
        return (
          (player.position === "QB" && player.seasonPts > 0) ||
          (player.position === "RB" && player.seasonPts > 0) ||
          (player.position === "WR" && player.seasonPts > 0) ||
          (player.position === "TE" && player.seasonPts > 0) ||
          (player.position === "K" && player.seasonPts > 0) ||
          (player.position === "DEF" && player.seasonPts > 0)
        );
      });

      this.setState({ players: offensivePlayers, keyHeaders: keySet });
      console.log('setstateplayerdata', this.state.players)
    } catch (error) {
      console.log("Home - render players error");
      console.error(error);
    }
  };

  // renderTable = async () => {
  //   this.state.players.forEach(player => {
  //     const tableDiv = document.querySelector(".player-table-container");
  //     tableDiv.appendChild(
  //       <PlayerRow
  //         key={player.id}
  //         name={player.name}
  //         position={player.position}
  //         teamAbbr={player.teamAbbr}
  //         seasonPts={player.seasonPts}
  //         seasonProjectedPts={player.seasonProjectedPts}
  //         weekPts={player.weekPts}
  //         weekProjectedPts={player.weekProjectedPts}
  //       />
  //     );
  //   });
  // };

  render() {
    return (
      <div className="player-table-container">
        {this.state.players.forEach(player => {
          return (
            <PlayerRow
              key={player.id}
              name={player.name}
              position={player.position}
              teamAbbr={player.teamAbbr}
              seasonPts={player.seasonPts}
              seasonProjectedPts={player.seasonProjectedPts}
              weekPts={player.weekPts}
              weekProjectedPts={player.weekProjectedPts}
            />
          )
        })}
      </div>
    );
  }
}

export default Home;

// import React, { Component } from "react";
// import Button from "../Button";
// import axios from "axios";

// import "./Home.css";

// class Home extends Component {

//   componentDidMount = () => {
//     this.renderPlayersTable()
//   }

//   renderPlayersTable = async () => {
//     try {
//       const playerSeasonStatsApiCall = await axios.get(
//         "https://api.fantasy.nfl.com/v1/players/stats?statType=seasonStats&season=2019&format=json"
//       );
//       const seasonStatsNineteen = playerSeasonStatsApiCall.data;
//       const playerStatsArray = seasonStatsNineteen.players.sort(function(a,b){return b.seasonPts - a.seasonPts})
//       const playerStatsKeys = await axios.get("https://api.fantasy.nfl.com/v1/game/stats?format=json");
//       const keySet = playerStatsKeys.data.stats

//       // matching the missing stats headers
//       // from playerStats.data.players[x].stats
//       // to appropriate key "title/name" so that
//       // columns in rendered table can be named
//       // https://stackoverflow.com/questions/53941112/match-key-values-in-json-object

//       const offensivePlayers = playerStatsArray.filter(player => {
//         return (player.position == "QB" && player.seasonPts > 0)||
//           (player.position === "RB" && player.seasonPts > 0)||
//           (player.position === "WR" && player.seasonPts > 0)||
//           (player.position === "TE" && player.seasonPts > 0)||
//           (player.position === "K" && player.seasonPts > 0)||
//           (player.position === "DEF"&& player.seasonPts > 0)
//       })

//       console.log(offensivePlayers)

//       const tableBodyDiv = document.querySelector('#contentArea')
//       const tableBodyRow = document.createElement('TR')
//       const tableBodyRowData = document.createElement('TD')

//       offensivePlayers.map(player=>{
//         // const textName = tableBodyRowData.appendChild(document.createTextNode(`${player.name}`))
//         // const textPosition= tableBodyRowData.appendChild(document.createTextNode(`${player.position}`))
//         // const textTeam= tableBodyRowData.appendChild(document.createTextNode(`${player.teamAbbr}`))
//         // const textSeasonPts= tableBodyRowData.appendChild(document.createTextNode(`${player.seasonPts}`))
//         // const textSeasonProjectedPts= tableBodyRowData.appendChild(document.createTextNode(`${player.seasonProjectedPts}`))
//         // const textWeekPts= tableBodyRowData.appendChild(document.createTextNode(`${player.weekPts}`))
//         // const textWeekProjectedPts= tableBodyRowData.appendChild(document.createTextNode(`${player.weekProjectedPts}`))

//         // const newRow = tableBodyRowData.appendChild(textName, textPosition, textTeam, textSeasonPts, textSeasonProjectedPts, textWeekPts, textWeekProjectedPts)
//         // tableBodyDiv.appendChild(newRow)

//         const textName = tableBodyRowData.setAttribute('innerHTML', `${player.name}`)
//         const newRow = tableBodyRow.appendChild(textName)
//         tableBodyDiv.appendChild(newRow)
//       })

//     } catch (error) {
//       console.log("Home - render players error");
//       console.error(error);
//     }
//   };

//   render() {
//     return (
//       <div class="clusterize">
//         <table>
//           <thead>
//             <tr>
//               {/* <th>Headers</th> */}
//             </tr>
//           </thead>
//         </table>
//         <div id="scrollArea" class="clusterize-scroll">
//           <table>
//             <tbody id="contentArea" class="clusterize-content">
//               {/* <tr class="clusterize-no-data">
//                 <td>Loading data…</td>
//               </tr> */}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     );
//   }
// }

// export default Home;

// class Home extends Component {
// fetchPlayers = () => {

// }

// componentDidMount = () => {
//   this.renderPlayersTable();
// };

// renderPlayersTable = async () => {
//   try {
//     const playerStats = await axios.get(
//       "https://api.fantasy.nfl.com/v1/players/stats?statType=seasonStats&season=2019&format=json"
//     );
//     const dataSet = playerStats.data;
//     console.log("player stats render", dataSet);
//     document.querySelector("#player-table").DataTable({
//       data: dataSet,
//       columns: [
//         { title: "Name" },
//         { title: "Position" },
//         { title: "Office" },
//         { title: "Extn." },
//         { title: "Start date" },
//         { title: "Salary" }
//       ]
//     });
//   } catch (error) {
//     console.log("Home - render players error");
//     console.error(error);
//   }
// };

// render() {
//   return (
//     <div className="homepage">
//       <Button href="/" className="send-button" buttonText="Back to Main" />
//       <p>data</p>
//       <table id="player-table" className="display" width="100%"></table>
//       <Button href="/" className="send-button" buttonText="Back to Main" />
//     </div>
//   );
// }

// render() {
//   return (
//     <div class="clusterize">
//       <table>
//         <thead>
//           <tr>
//             <th>Player Stats (column names): </th>
//             <th>Name</th>
//             <th>Yards</th>
//             <th>etc</th>
//           </tr>
//         </thead>
//       </table>
//       <div id="scrollArea" class="clusterize-scroll">
//         <table>
//           <tbody id="contentArea" class="clusterize-content">
//             <tr class="clusterize-no-data">
//               <td>Loading data…</td>
//               <td>second</td>
//             </tr>
//             <tr>
//               <td>1st Player</td>
//             </tr>
//             <tr>
//               <td>2nd Player</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// }

// deepEquals = (a, b, depth = 5) => {
//   // below code is found from
//   // nfl fantasy league players page
//   // sources tab in dev tools
//   // top/raw.githubusercontent.com/ampproject/amphtml/1911070201440/
//   // next level down is src,
//   // then utils then json.js
//     if (!isFinite(depth) || depth < 0) {
//       throw new Error('Invalid depth: ' + depth);
//     }
//     if (a === b) {
//       return true;
//     }
//     const queue = [{a, b, depth}];
//     while (queue.length > 0) {
//       const {a, b, depth} = queue.shift();
//       if (depth > 0) {
//         if (typeof a !== typeof b) {
//           return false;
//         } else if (Array.isArray(a) && Array.isArray(b)) {
//           if (a.length !== b.length) {
//             return false;
//           }
//           for (let i = 0; i < a.length; i++) {
//             queue.push({a: a[i], b: b[i], depth: depth - 1});
//           }
//           continue;
//         } else if (a && b && typeof a === 'object' && typeof b === 'object') {
//           const keysA = Object.keys(/** @type {!Object} */ (a));
//           const keysB = Object.keys(/** @type {!Object} */ (b));
//           if (keysA.length !== keysB.length) {
//             return false;
//           }
//           for (let i = 0; i < keysA.length; i++) {
//             const k = keysA[i];
//             queue.push({a: a[k], b: b[k], depth: depth - 1});
//           }
//           continue;
//         }
//       }
//       if (a !== b) {
//         return false;
//       }
//     }
//     return true;
// }

// playerStatsArray.forEach(player=> {
//   player.stats.forEach(statkey=> {
//     if ( statkey.key === JSON.stringify(keySet.id)) {
//       return (
//         <tr>
//           <td></td>
//         </tr>
//       )
//     } else {console.log('recheck the stat key check')}
//   })
// })

// renderTable = () => {
//   const data = [];
//   const clusterize = new Clusterize({
//     rows: data,
//     scrollId: 'scrollArea',
//     contentId: 'contentArea'
//   });
// }
