// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

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
    const formattedData = {
      latestMatchDetails: data.latest_match_details,
      recentMatches: data.recent_matches,
      teamBannerUrl: data.team_banner_url,
    }
    const {latestMatchDetails, recentMatches, teamBannerUrl} = formattedData
    this.setState({
      id,
      latestMatchDetails,
      recentMatches,
      teamBannerUrl,
      isLoading: false,
    })
  }

  render() {
    const {id, latestMatchDetails, recentMatches, teamBannerUrl, isLoading} =
      this.state
    return (
      <div className={`team-matches-container ${id}`}>
        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div>
            <img
              src={teamBannerUrl}
              alt="team banner"
              className="team-banner"
            />
            <div>
              <p>Latest Matches</p>
              <LatestMatch details={latestMatchDetails} />
            </div>
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
