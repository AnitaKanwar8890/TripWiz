import React from 'react'
import TripList from '../components/TripList'

export default function Home({ user }){
  return (
    <div>
      <TripList user={user} />
    </div>
  )
}
