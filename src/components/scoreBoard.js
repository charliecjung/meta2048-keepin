import React from 'react';
import PropTypes from 'prop-types';
import { useGameState } from '../Context/gameState';
import constants from '../constants';
import GameNav from './gameNav'

class ScoreBoard extends React.Component {
  constructor (props) {
    super(props)

  }
  componentDidMount() {

  }
//const ScoreBoard = ({ setTopic }) => {


  highlightPlayer() {
  for (let i = 0; i < constants.testData.dummyUsers.length; i++) {
    if (constants.testData.dummyUsers[i].name.toLowerCase() === constants.testData.username.toLowerCase()) {
      //We are at username
      if (constants.testData.myName === "DEFAULT_NAME" && constants.testData.myRank === "DEFAULT_RANK" && constants.testData.myScore === "DEFAULT_SCORE") {
      constants.testData.dummyUsers[i].name = constants.testData.dummyUsers[i].name.toUpperCase()
      constants.testData.myName = constants.testData.dummyUsers[i].name
      constants.testData.myRank = constants.testData.dummyUsers[i].name.rank
      constants.testData.myScore = constants.testData.dummyUsers[i].name.score
    } else if (constants.testData.myName !== "DEFAULT_NAME" && constants.testData.myRank !== "DEFAULT_RANK" && constants.testData.myScore !== "DEFAULT_SCORE") {
      }
   }
  }
  }
  registerScore() {

  }
  shareInformation() {

  }
  resetList() {
    for (let i = 0; i < constants.testData.dummyUsers.length; i++) {
      if (constants.testData.dummyUsers[i].name === constants.testData.dummyUsers[i].name.toUpperCase()) {
        constants.testData.dummyUsers[i].name = constants.testData.dummyUsers[i].name.charAt(0).toUpperCase() + constants.testData.dummyUsers[i].name.slice(1).toLowerCase()
      }
    }
  }

  getRankTable () {
    if (constants.testData.auth) {
    this.highlightPlayer();
    } else {
      this.resetList();
    }
    return  constants.testData.dummyUsers.map(( user,index) => (

      <React.Fragment>

      <div id="test">
        <table>
      {constants.testData.auth === true && user.name.toUpperCase() === constants.testData.username.toUpperCase() ? (
        <tr key={index} style={{textAlignVertical: "center",textAlign: "center", padding: "0px"} }>
        <td style={{textAlignVertical: "center",textAlign: "center"}}><mark>{user.rank}</mark></td>
        <br />
        <td style={{textAlignVertical: "center",textAlign: "center"}}><mark>{user.name}</mark></td>
        <br />
        <td style={{textAlignVertical: "center",textAlign: "center"}}><mark>{user.score}</mark></td>

      </tr>
      ) : (
        <tr key={index} style={{textAlignVertical: "center",textAlign: "center", padding: "0px"} }>
        <td style={{textAlignVertical: "center",textAlign: "center"}}>{user.rank}</td>
        <br />
        <td style={{textAlignVertical: "center",textAlign: "center"}}>{user.name}</td>
        <br />
        <td style={{textAlignVertical: "center",textAlign: "center"}}>{user.score}</td>
      </tr>
      )}
      </table>
      </div>
      </React.Fragment>
    ));
  }

  render () {
    let data = constants.testData
    if (constants.testData.auth) {
      return (
      <div>
        <h2>Your Ranking</h2>
        <table className='padding-table-columns' align='center'>
          <thead key='head'>
            <tr>
              <th align="left">Rank </th>
              <th align="left"> Player </th>
              <th align="left"> Score </th>

            </tr>
          </thead>
          <tbody>{this.getRankTable()}</tbody>
        </table>
        {/*
        <span className='register-rankboard btn' ref={ref => { this.buttons.push(ref) }} onClick={() => this.registerScore()}>Register Score</span>
        <span className='share btn' ref={ref => { this.buttons.push(ref) }} onClick={() => this.shareInformation()}>Share with the World!</span>
        */}
        <h2> Your Name: {constants.testData.myName}</h2>
        <h2> Your Rank: {constants.testData.myRank} </h2>
        <h2> Your Score: {constants.testData.myScore} </h2>
        <h2> Your MetaID: {constants.testData.metaID} </h2>
        </div>
      )
    }
    return (
      <div>
        <h2>Rankings</h2>
        <table className='padding-table-columns' align='center'>
          <thead key='head'>
            <tr>
            <th align="left">Rank </th>
              <th align="left"> Player </th>
              <th align="left"> Score </th>
            </tr>
          </thead>
          <tbody>{this.getRankTable()}</tbody>
        </table>
      {/*  <span className='register-rankboard btn' ref={ref => { this.buttons.push(ref) }} onClick={() => this.registerScore()}>Register Score</span>
        <span className='share btn' ref={ref => { this.buttons.push(ref) }} onClick={() => this.shareInformation()}>Share with the World!</span>
*/}
      </div>

    )
  }
}



ScoreBoard.propTypes = {
  setTopic: PropTypes.func.isRequired,
};

export default useGameState(({ actions }) => ({
  setTopic: actions.setTopic,
}))(ScoreBoard);
