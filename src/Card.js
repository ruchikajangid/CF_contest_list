import React from 'react'

const baseurl = "https://codeforces.com/contests/"
const ContestCard = ({id, name, type, phase, duration, startTime}) => (
    <div class="card">
      <div class="card-body">
        <h1 class="card-title"><strong>{name}</strong></h1>
        <h3><span class="label label-primary">{type}</span></h3>
        <span><p class="card-text">Phase {phase}</p></span>
        <p class="card-text">Duration {duration} hrs</p>
        <a href= {baseurl + id} class="btn btn-primary">Register</a>
      </div>
    </div>

)

export default ContestCard