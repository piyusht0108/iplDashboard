// Write your code here
import {Component} from 'react'
import {Link} from 'react-router-dom'
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

let matchWon = 0
let matchLost = 0
let matchDraw = 0

class TeamMatches extends Component {
  state = {
    id: '',
    latestMatchDetails: [],
    recentMatches: [],
    teamBannerUrl: '',
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamMatches()
  }

  getTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    console.log(data)
    const formattedData = {
      latestMatchDetails: data.latest_match_details,
      recentMatches: data.recent_matches,
      teamBannerUrl: data.team_banner_url,
    }
    const {latestMatchDetails, recentMatches, teamBannerUrl} = formattedData
    recentMatches.map(eachItem => {
      if (eachItem.match_status === 'Won') {
        matchWon += 1
      } else if (eachItem.match_status === 'Losts') {
        matchLost += 1
      } else {
        matchDraw += 1
      }
      return eachItem
    })
    this.setState({
      id,
      latestMatchDetails,
      recentMatches,
      teamBannerUrl,
      isLoading: false,
    })
  }

  render() {
    // prettier-ignore
    const {id, latestMatchDetails, recentMatches, teamBannerUrl, isLoading} =
      this.state
    const data = [
      {
        count: matchWon,
        language: 'Won',
      },
      {
        count: matchLost,
        language: 'Lost',
      },
      {
        count: matchDraw,
        language: 'Draw',
      },
    ]
    return (
      <div className={`team-matches-container ${id}`}>
        {isLoading ? (
          <div>
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div className="team-matches-container">
            <Link className="back-link" to="/">
              <button className="back-button" type="button">
                Back
              </button>
            </Link>
            <img
              src={teamBannerUrl}
              alt="team banner"
              className="team-banner"
            />

            <div>
              <p>Latest Matches</p>
              <LatestMatch details={latestMatchDetails} />
            </div>

            <ResponsiveContainer
              className="piechart-container"
              width="70%"
              height={300}
            >
              <PieChart>
                <Pie
                  cx="50%"
                  cy="50%"
                  data={data}
                  startAngle={0}
                  endAngle={360}
                  innerRadius="40%"
                  outerRadius="70%"
                  dataKey="count"
                >
                  <Cell name="Won" fill="#fecba6" />
                  <Cell name="Draw" fill="#b3d23f" />
                  <Cell name="Lost" fill="#a44c9e" />
                </Pie>
                <Legend
                  iconType="circle"
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                />
              </PieChart>
            </ResponsiveContainer>

            <ul className="match-card-list-container">
              {recentMatches.map(eachItem => (
                <MatchCard details={eachItem} key={eachItem.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
