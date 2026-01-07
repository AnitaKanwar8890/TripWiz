import React, { useEffect, useState } from 'react'
import { getTrips, deleteTrip } from '../api'
import TripForm from './TripForm'
import TripDetails from './TripDetails'

export default function TripList({ user }){
  const [trips, setTrips] = useState([])
  const [editing, setEditing] = useState(null)
  const [selected, setSelected] = useState(null)

  async function load(){
    const data = await getTrips(!!user);
    setTrips(data);
  }

  useEffect(()=>{ load() },[user])

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl">Your Trips</h2>
      </div>

      {user ? <TripForm onSaved={load} editing={editing} onCancel={()=>setEditing(null)} /> : <div className="mb-4 text-sm text-gray-600">Login to create trips</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trips.map(t => (
          <div key={t.id} className="p-3 border rounded shadow-sm">
            <h3 className="font-semibold">{t.title}</h3>
            <p className="text-sm text-gray-600">{t.destination}</p>
            <p className="text-xs text-gray-500">{t.start_date} → {t.end_date}</p>
            {t.image_url && <img src={(import.meta.env.VITE_API_URL||'http://localhost:4000/api').replace('/api','')+t.image_url} alt="trip" className="mt-2 w-full h-40 object-cover rounded" />}
            <p className="mt-2">{t.notes?.slice(0,120)}</p>
            <div className="mt-2 flex gap-2">
              <button onClick={()=>setSelected(t)} className="px-3 py-1 border rounded">View</button>
              {user && <button onClick={()=>setEditing(t)} className="px-3 py-1 border rounded">Edit</button>}
              {user && <button onClick={async ()=>{ if(confirm('Delete?')){ await deleteTrip(t.id); load(); } }} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>}
            </div>
          </div>
        ))}
      </div>

      {selected && <TripDetails trip={selected} onClose={()=>setSelected(null)} />}
    </div>
  )
}
