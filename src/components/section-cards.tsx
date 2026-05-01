'use client'

import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-gray-400">
            Tổng doanh thu
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums text-green-700 @[250px]/card:text-3xl">
            31.250.000đ
          </CardTitle>
          <CardAction>
            <Badge className="border-green-800/40 bg-transparent text-green-700">
              <TrendingUpIcon className="mr-1 size-3" />
              +12,5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-gray-300">
            Tăng trưởng trong tháng{' '}
            <TrendingUpIcon className="size-4 text-green-700" />
          </div>
          <div className="text-gray-500">Lượt khách trong 6 tháng qua</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-gray-400">
            Khách hàng mới
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums text-red-700 @[250px]/card:text-3xl">
            1,234
          </CardTitle>
          <CardAction>
            <Badge className="border-red-800/40 bg-transparent text-red-700">
              <TrendingDownIcon className="mr-1 size-3" />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-gray-300">
            Giảm 20% so với kỳ trước{' '}
            <TrendingDownIcon className="size-4 text-red-700" />
          </div>
          <div className="text-gray-500">Cần cải thiện thu hút khách hàng</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-gray-400">
            Tài khoản hoạt động
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums text-green-700 @[250px]/card:text-3xl">
            45,678
          </CardTitle>
          <CardAction>
            <Badge className="border-green-800/40 bg-transparent text-green-700">
              <TrendingUpIcon className="mr-1 size-3" />
              +12,5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-gray-300">
            Tỷ lệ giữ chân khách hàng cao{' '}
            <TrendingUpIcon className="size-4 text-green-700" />
          </div>
          <div className="text-gray-500">Mức độ tương tác vượt mục tiêu</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-gray-400">
            Tỷ lệ tăng trưởng
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums text-green-700 @[250px]/card:text-3xl">
            4,5%
          </CardTitle>
          <CardAction>
            <Badge className="border-green-800/40 bg-transparent text-green-700">
              <TrendingUpIcon className="mr-1 size-3" />
              +4,5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-gray-300">
            Tăng trưởng ổn định{' '}
            <TrendingUpIcon className="size-4 text-green-700" />
          </div>
          <div className="text-gray-500">Đạt chỉ tiêu tăng trưởng đề ra</div>
        </CardFooter>
      </Card>
    </div>
  )
}
