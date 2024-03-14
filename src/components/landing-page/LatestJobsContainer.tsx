'use client'
import React from 'react'
import JobCard from '../shared/JobCard'
import { Button } from '../ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LatestJobsContainer = () => {
  const arr = [1, 2, 3, 4, 5, 6]
  const pathName = usePathname()
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
        {
          pathName !== '/latest' && (
            <Link
              className='bg-brandBlue text-white py-3 rounded-md font-medium px-5'
              href={'/latest'}>
              View All Latest Jobs
            </Link>
          )
        }

      </div>
    </div>
  )
}

export default LatestJobsContainer