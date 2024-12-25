// Write your code here
import './index.css'

const MatchCard = props => {
  const {details} = props
  const newFormatDetails = {
    umpires: details.umpires,
    result: details.result,
    manOfTheMatch: details.man_of_the_match,
    id: details.id,
    date: details.date,
    venue: details.venue,
    competingTeam: details.competing_team,
    competingTeamLogo: details.competing_team_logo,
    firstInnings: details.first_innings,
    secondInnings: details.second_innings,
    matchStatus: details.match_status,
  }
  return (
    <li className="match-card-container">
      <img
        src={newFormatDetails.competingTeamLogo}
        alt={`competing team ${newFormatDetails.competingTeam}`}
        className="match-card-team-logo"
      />
      <p>{newFormatDetails.competingTeam}</p>
      <p>{newFormatDetails.result}</p>
      <p className={newFormatDetails.matchStatus}>
        {newFormatDetails.matchStatus}
      </p>
    </li>
  )
}

export default MatchCard
