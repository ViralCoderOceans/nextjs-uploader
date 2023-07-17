import React from 'react'

const page = () => {
  return (
    <main className="flex min-h-screen flex-col">
      <div className='flex justify-center'>
        <div className='flex flex-col justify-between rounded-2xl shadow-xl border p-5 h-[400px] w-full'>
          <h1 className='text-3xl font-medium'>Create post</h1>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">What's on your mind?</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
          </div>
          <div>
            <label className="label">
              <span className="label-text">{'Import files (.jpeg, .jpg, .png)'}</span>
            </label>
            <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
          </div>
          <button className="btn w-full">Post</button>
        </div>
      </div>
    </main>
  )
}

export default page