import React from 'react'
import ChangePassword from './ChangePassword'
import EditProfile from './EditProfile'
import DeleteAccount from './DeleteAccount'

const index = () => {
  return (
    <div >
      <h1 className = "text-white text-4xl font-semibold">Jai Shree Ram</h1>

      <EditProfile />
      <ChangePassword />
      <DeleteAccount />

    </div>
  )
}

export default index
