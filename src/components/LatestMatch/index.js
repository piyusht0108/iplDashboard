// Write your code here
import './index.css'

const LatestMatch = props => {
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
    <div className="latest-match-container">
      <div>
        <p>{newFormatDetails.competingTeam}</p>
        <p>{newFormatDetails.date}</p>
        <p>{newFormatDetails.venue}</p>
        <p>{newFormatDetails.result}</p>
      </div>
      <img
        src={newFormatDetails.competingTeamLogo}
        alt={`latest match ${newFormatDetails.competingTeam}`}
        className="competing-team-img"
      />
      <div className="match-details">
        <p>First Innings</p>
        <p>{newFormatDetails.firstInnings}</p>
        <p>Second Innings</p>
        <p>{newFormatDetails.secondInnings}</p>
        <p>Man of the Match</p>
        <p>{newFormatDetails.manOfTheMatch}</p>
        <p>Umpires</p>
        <p>{newFormatDetails.umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
