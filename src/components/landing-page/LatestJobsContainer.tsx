import React from 'react'
import JobCard from '../shared/JobCard'
import { Button } from '../ui/button'

const LatestJobsContainer = () => {
  const arr = [1,2,3,4,5,6]
  return (
    <div className='my-12 generalContainer'>
        <div className='text-center py-7'>
            <h2 className='font-semibold text-xl'>Latest Jobs</h2>
        </div>
        <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 '>
            {
              arr.map((job) => (
                <JobCard key={job} />
              ))
            }
        </div>

        <div className='flex py-8 justify-center items-center '>
          <Button size={'lg'} className='bg-brandBlue'>
            View Latest Jobs
          </Button>
        </div>
    </div>
  )
}

export default LatestJobsContainer