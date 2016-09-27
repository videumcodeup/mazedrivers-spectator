import React from 'react'
import './Result.css'
import {filter, sortBy} from 'lodash'

function Result ({ players }) {
  const finished = sortBy(filter(players, p => p.finished), p => p.timeEnd - p.timeStart)
  return (
    <div className='Result'>
      {finished.map((p, n) => <div key={p.nickname}>{n + 1}. {p.nickname} ({(p.timeEnd - p.timeStart) / 1000})</div>)}
    </div>
  )
}

export default Result
