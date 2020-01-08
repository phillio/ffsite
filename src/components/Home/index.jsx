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
      showPos: false,
      rssFeed: null,
      teamPlayersArray: []
    };
  }

  componentDidMount = () => {
    this.getData();
    // this.rssFeed();
    // this.tryApi("Miles", "Sanders")
    this.getPlayerNews("Miles", "Sanders")
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

      this.setState({
        allPlayers: offensivePlayers,
        currentPlayers: offensivePlayers,
        keyHeaders: keySet
      });
      // console.log('setstateplayerdata', this.state.players)
    } catch (error) {
      console.log("Home - render players error");
      console.error(error);
    }
  };

  showQb = async () => {
    const currentPlayers = this.state.allPlayers;
    const filterByPos = currentPlayers.filter(player => {
      return player.position === "QB";
    });
    this.setState({ currentPlayers: filterByPos });
  };

  showRb = async () => {
    const currentPlayers = this.state.allPlayers;
    const filterByPos = currentPlayers.filter(player => {
      return player.position === "RB";
    });
    this.setState({ currentPlayers: filterByPos });
  };

  showWr = async () => {
    const currentPlayers = this.state.allPlayers;
    const filterByPos = currentPlayers.filter(player => {
      return player.position === "WR";
    });
    this.setState({ currentPlayers: filterByPos });
  };

  showTe = async () => {
    const currentPlayers = this.state.allPlayers;
    const filterByPos = currentPlayers.filter(player => {
      return player.position === "TE";
    });
    this.setState({ currentPlayers: filterByPos });
  };

  showK = async () => {
    const currentPlayers = this.state.allPlayers;
    const filterByPos = currentPlayers.filter(player => {
      return player.position === "K";
    });
    this.setState({ currentPlayers: filterByPos });
  };

  showDef = async () => {
    const currentPlayers = this.state.allPlayers;
    const filterByPos = currentPlayers.filter(player => {
      return player.position === "DEF";
    });
    this.setState({ currentPlayers: filterByPos });
  };

  showAll = async () => {
    const currentPlayers = this.state.allPlayers;
    this.setState({ currentPlayers: currentPlayers });
  };

  showPos = async e => {
    e.preventDefault();
    this.setState({ showPos: true }, () => {
      document.addEventListener("click", this.hidePos);
    });
  };

  hidePos = async e => {
    if (!this.dropdownPos.contains(e.target)) {
      this.setState({ showPos: false }, () => {
        document.removeEventListener("click", this.hidePos);
      });
    }
  };

  handleClick = async e => {
    e.preventDefault();
    const parentDivId = e.target.parentElement.id;
    const grabDivById = document.querySelector(`#${parentDivId}`);
    console.log(
      "clicked:",
      parentDivId,
      grabDivById,
      grabDivById.style.backgroundColor
    );
    // use this later to "disappear" the div
    // grabDivById.style.display = 'none';
    let prevColor0;
    let prevColor1;
    let rowColor0;
    let rowColor1;
    if (grabDivById.className.includes("player-color-0")) {
      rowColor0 = "rgba(30, 44, 82, 0.74)";
      prevColor0 = grabDivById.style.backgroundColor;
      if (prevColor0 === rowColor0) {
        grabDivById.style.backgroundColor = "rgba(251,255,40,0.527)";
      } else {
        grabDivById.style.backgroundColor = rowColor0;
      }
    } else if (grabDivById.className.includes("player-color-1")) {
      rowColor1 = "rgba(53, 65, 100, 0.9)";
      prevColor1 = grabDivById.style.backgroundColor;
      if (prevColor1 === rowColor1) {
        grabDivById.style.backgroundColor = "rgba(251,255,40,0.527)";
      } else {
        grabDivById.style.backgroundColor = rowColor1;
      }
    }

    // if (grabDivById.style.backgroundColor === 'rgba(251,255,40,0.527)') {
    //   grabDivById.style.backgroundColor = prevColor
    // } else {
    //   grabDivById.style.backgroundColor = 'rgba(251,255,40,0.527)'
    // }

    // grabDivById.style.backgroundColor = 'rgba(251,255,40,0.527)'
  };

  rssFeed = async () => {
    // try {
    //   const rss = await axios.get("http://premium.rotoworld.com/rss/feed.aspx?sport=nfl&ftype=news&count=12&format=rss");
    //   this.setState({rssFeed: rss})
    //   console.log(this.state.rssFeed)
    // } catch (error) {
    //     console.log('err')
    // }

    // code above had cors issue
    // code below found online
    // https://github.com/axios/axios/issues/1358

    const testURL =
      "http://premium.rotoworld.com/rss/feed.aspx?sport=nfl&ftype=news&count=100&format=rss";
    const myInit = {
      method: "HEAD",
      mode: "no-cors"
    };

    const myRequest = new Request(testURL, myInit);

    fetch(myRequest)
      .then(function(response) {
        return response;
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(e) {
        console.log(e);
      });
  };

  // below function tryApi is from searching a player on rotoworld,
  // opening network and clicking playersearch.aspx

  // tryApi = async (firstName, lastName) => {
  //   try {
  //     const playerData = await fetch(
  //       `http://premium.rotoworld.com/content/playersearch.aspx?searchname=${lastName},%${firstName}&sport=`,
  //       {
  //         credentials: "include",
  //         headers: {
  //           "accept":
  //             "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
  //           "accept-language": "en-US,en;q=0.9",
  //           "cache-control": "max-age=0",
  //           "upgrade-insecure-requests": "1",
  //           "Access-Control-Allow-Origin": "*"
  //         },
  //         referrer: "http://premium.rotoworld.com/rss/default.aspx",
  //         referrerPolicy: "no-referrer-when-downgrade",
  //         body: null,
  //         method: "GET",
  //         mode: "no-cors"
  //       }
  //     );
  //     console.log('miles', playerData)
  //   } catch (error) {
  //     console.log('we tried, folks')
  //   }
  // };



  // below function is a query on rotoworlds website
  // to do later:
  // when highlighting players in yellow,
  // store their names in an array and then for each element
  // make a query and display combined results
  // sorted by date

  getPlayerNews = async (firstName, lastName) => {
    try {
      const response = await axios.get(`https://search.rotoworld.com/players?query=${firstName}%20${lastName}&league=NFL`, {
        headers: {
          'X-Api-Key': process.env.REACT_APP_ROTO_API_KEY
        }
       })
      const playerNews = response.data.responses[0].hits.hits[0]
      console.log('playernews',response)
      console.log('and here is player', playerNews)
      this.setState({teamPlayersArray: playerNews._source.player_id})
      console.log("your team",this.state.teamPlayersArray)
    } catch (error) {
      console.log('no player news')
    }
  }



  render() {
    // console.log('setstateplayerdata', this.state)
    return (
      <div className="player-table-container">
        <tr className="header-td header-row">
          <td className="header-td header-player-name">Player Name</td>
          <td className="header-td header-player-position">
            <button onClick={this.showPos}>Pos</button>
            {this.state.showPos ? (
              <div
                className="header-td header-pos"
                ref={element => {
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
            ) : null}
          </td>
          <td className="header-td header-player-teamAbbr">Team</td>
          <td className="header-td header-player-seasonPts">Season Pts</td>
          <td className="header-td header-player-seasonProjectedPts">
            Proj Total Pts
          </td>
          <td className="header-td header-player-weekPts">Week's Pts</td>
          <td className="header-td header-player-weekProjectedPts">
            Week Proj
          </td>
          {this.state.keyHeaders.map(header => {
            return <PlayerRowHeader key={header.id} header={header} />;
          })}
        </tr>
        <div className="player-table-data">
          {this.state.currentPlayers.map((player, index) => {
            let colorRow;
            let style;
            if (index % 2 === 0) {
              colorRow = 0;
              style = {
                "background-color": "rgba(30, 44, 82, 0.74)"
              };
            } else {
              colorRow = 1;
              style = {
                "background-color": "rgba(53, 65, 100, 0.9)"
              };
            }
            return (
              <PlayerRow
                key={player.id}
                id={player.id}
                index={colorRow}
                style={style}
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
                onClick={this.handleClick}
              />
            );
          })}
        </div>
        <div className="rss-feed">
          <noscript>
            <a href="http://www.vanderbilt.edu/asset/feed/feed2js.php?src=http%3A%2F%2Fpremium.rotoworld.com%2Frss%2Ffeed.aspx%3Fsport%3Dnfl%26ftype%3Dnews%26count%3D100%26format%3Drss&amp;num=100&amp;desc=50&gt;1&amp;targ=y&amp;html=y">
              View RSS feed
            </a>
          </noscript>
        </div>
      </div>
    );
  }
}

export default Home;
