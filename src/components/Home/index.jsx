import React, { Component } from "react";
import PlayerRow from "../PlayerRow";
import axios from "axios";

import "./Home.css";
import PlayerRowHeader from "../PlayerRowHeader";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPlayers: [],
      currentPlayers: [],
      keyHeaders: [],
      showPos: false
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

      this.setState({ allPlayers: offensivePlayers, currentPlayers: offensivePlayers, keyHeaders: keySet });
      // console.log('setstateplayerdata', this.state.players)
    } catch (error) {
      console.log("Home - render players error");
      console.error(error);
    }
  };

  showQb = async () => {
    const currentPlayers = this.state.allPlayers
    const filterByPos = currentPlayers.filter(player => {
      return (
        player.position === "QB"
      )
    })
    this.setState({currentPlayers: filterByPos})
  }

  showRb = async () => {
    const currentPlayers = this.state.allPlayers
    const filterByPos = currentPlayers.filter(player => {
      return (
        player.position === "RB"
      )
    })
    this.setState({currentPlayers: filterByPos})
  }

  showWr = async () => {
    const currentPlayers = this.state.allPlayers
    const filterByPos = currentPlayers.filter(player => {
      return (
        player.position === "WR"
      )
    })
    this.setState({currentPlayers: filterByPos})
  }

  showTe = async () => {
    const currentPlayers = this.state.allPlayers
    const filterByPos = currentPlayers.filter(player => {
      return (
        player.position === "TE"
      )
    })
    this.setState({currentPlayers: filterByPos})
  }

  showK = async () => {
    const currentPlayers = this.state.allPlayers
    const filterByPos = currentPlayers.filter(player => {
      return (
        player.position === "K"
      )
    })
    this.setState({currentPlayers: filterByPos})
  }

  showDef = async () => {
    const currentPlayers = this.state.allPlayers
    const filterByPos = currentPlayers.filter(player => {
      return (
        player.position === "DEF"
      )
    })
    this.setState({currentPlayers: filterByPos})
  }

  showAll = async () => {
    const currentPlayers = this.state.allPlayers
    this.setState({currentPlayers: currentPlayers})
  }

  showPos = async (e) => {
    e.preventDefault()
    this.setState({ showPos: true }, () => {
      document.addEventListener('click', this.hidePos);
    });
  }

  hidePos = async (e) => {
    if (!this.dropdownPos.contains(e.target)) {
      this.setState({ showPos: false }, () => {
        document.removeEventListener('click', this.hidePos);
      });
    }
  }

  render() {
    // console.log('setstateplayerdata', this.state)
    return (
      <div className="player-table-container">
        <tr className="header-row">
          <td className="header-player-name">Player Name</td>
          <td className="header-player-position">
            <button onClick={this.showPos}>Pos</button>
            {
              this.state.showPos
                ? (
                  <div
                    className="header-pos"
                    ref={(element) => {
                      this.dropdownPos = element;
                    }}
                  >
                    <button onClick={this.showAll}>All</button>
                    <button onClick={this.showQb}>QB</button>
                    <button onClick={this.showRb}>RB</button>
                    <button onClick={this.showWr}>WR</button>
                    <button onClick={this.showTe}>TE</button>
                    <button onClick={this.showK}>K</button>
                    <button onClick={this.showDef}>DEF</button>
                  </div>
                )
                : (
                  null
                )
            }
          </td>
          <td className="header-player-teamAbbr">Team</td>
          <td className="header-player-seasonPts">Season Pts</td>
          <td className="header-player-seasonProjectedPts">Proj Total Pts</td>
          <td className="header-player-weekPts">Week's Pts</td>
          <td className="header-player-weekProjectedPts">Week Proj</td>
          {this.state.keyHeaders.map(header => {
            return <PlayerRowHeader key={header.id} header={header} />;
          })}
        </tr>
        <div className="player-table-data">
          {this.state.currentPlayers.map(player => {
            return (
              <PlayerRow
                key={player.id}
                id={player.id}
                name={player.name}
                position={player.position}
                teamAbbr={player.teamAbbr}
                seasonPts={player.seasonPts}
                seasonProjectedPts={player.seasonProjectedPts}
                weekPts={player.weekPts}
                weekProjectedPts={player.weekProjectedPts}
                player={player}
                stats={player.stats}
                statsHolder={this.state.keyHeaders}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Home;
