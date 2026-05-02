'use client'

import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { createClient } from '@/lib/supabase-client'

function formatVND(value: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value)
}

export function SectionCards() {
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [thisMonthRevenue, setThisMonthRevenue] = useState(0)
  const [growthRate, setGrowthRate] = useState(0)
  const [growthTrend, setGrowthTrend] = useState<'up' | 'down'>('up')

  const supabase = createClient()

  useEffect(() => {
    async function fetchMetrics() {
      const { data, error } = await supabase
        .from('histories')
        .select('price, created_at')

      if (error || !data) return

      const now = new Date()
      const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
      const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)
      const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0)

      let total = 0
      let thisMonth = 0
      let lastMonth = 0

      for (const row of data) {
        total += row.price
        const d = new Date(row.created_at)
        if (d >= thisMonthStart) {
          thisMonth += row.price
        } else if (d >= lastMonthStart && d <= lastMonthEnd) {
          lastMonth += row.price
        }
      }

      setTotalRevenue(total)
      setThisMonthRevenue(thisMonth)

      if (lastMonth > 0) {
        const rate = ((thisMonth - lastMonth) / lastMonth) * 100
        setGrowthRate(rate)
        setGrowthTrend(rate >= 0 ? 'up' : 'down')
      } else if (thisMonth > 0) {
        setGrowthRate(100)
        setGrowthTrend('up')
      }
    }

    fetchMetrics()
  }, [supabase.from])

  const trendColor = growthTrend === 'up' ? 'text-green-700' : 'text-red-700'
  const trendBorder = growthTrend === 'up' ? 'border-green-800/40' : 'border-red-800/40'
  const TrendIcon = growthTrend === 'up' ? TrendingUpIcon : TrendingDownIcon

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-gray-400">
            Tổng doanh thu
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums text-green-700 @[250px]/card:text-3xl">
            {formatVND(totalRevenue)}
          </CardTitle>
          <CardAction>
            <Badge className="border-green-800/40 bg-transparent text-green-700">
              <TrendingUpIcon className="mr-1 size-3" />
              {growthRate >= 0 ? '+' : ''}{growthRate.toFixed(1)}%
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
            Doanh thu tháng này
          </CardDescription>
          <CardTitle className={`text-2xl font-semibold tabular-nums @[250px]/card:text-3xl ${trendColor}`}>
            {formatVND(thisMonthRevenue)}
          </CardTitle>
          <CardAction>
            <Badge className={`${trendBorder} bg-transparent ${trendColor}`}>
              <TrendIcon className="mr-1 size-3" />
              {growthRate >= 0 ? '+' : ''}{growthRate.toFixed(1)}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-gray-300">
            {growthTrend === 'up' ? 'Tăng trưởng ổn định' : 'Đang giảm'}{' '}
            <TrendIcon className={`size-4 ${trendColor}`} />
          </div>
          <div className="text-gray-500">So với tháng trước</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-gray-400">
            Tỷ lệ tăng trưởng
          </CardDescription>
          <CardTitle className={`text-2xl font-semibold tabular-nums @[250px]/card:text-3xl ${trendColor}`}>
            {growthRate >= 0 ? '+' : ''}{growthRate.toFixed(1)}%
          </CardTitle>
          <CardAction>
            <Badge className={`${trendBorder} bg-transparent ${trendColor}`}>
              <TrendIcon className="mr-1 size-3" />
              {growthRate >= 0 ? '+' : ''}{growthRate.toFixed(1)}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-gray-300">
            {growthTrend === 'up' ? 'Tăng trưởng ổn định' : 'Đang giảm'}{' '}
            <TrendIcon className={`size-4 ${trendColor}`} />
          </div>
          <div className="text-gray-500">So với tháng trước</div>
        </CardFooter>
      </Card>
    </div>
  )
}
