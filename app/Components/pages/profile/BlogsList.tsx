import {useQuery} from "@tanstack/react-query"
import axios from "../../../../libs/axios"
import {useEffect, useState} from "react"
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from "../../ui/card"

const StoriesList = ({user}: {user: any}) => {
  return (
    <div className="flex justify-center gap-10 w-full p-6 mx-auto flex-wrap">
      {user?.blogs.map((blog: any) => {
        return (
          <Card className="flex flex-col gap-4 w-[30%] p-3">
            <CardContent>
              <CardTitle>{blog.title}</CardTitle>
              <CardDescription>{blog.content}</CardDescription>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default StoriesList
