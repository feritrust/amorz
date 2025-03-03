import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import React from 'react'

const ProfilePage = () => {
  return (
    <div className='flex flex-col p-4'>
      <Card className='p-5 flex flex-col justify-center items-center space-y-2'>
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
        <p>برای مشاهده پروفایل وارد شوید</p>
      </Card>
    </div>
  )
}

export default ProfilePage