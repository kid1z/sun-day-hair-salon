'use client'

import {
  DollarSignIcon,
  Loader2Icon,
  PlusIcon,
  ScissorsIcon,
  UserIcon,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { createClient } from '@/lib/supabase-client'

type User = {
  id: number
  user_name: string
}

type History = {
  id: number
  user_id: number
  type: string
  price: number
  created_at: string
  users: {
    user_name: string
  }
}

export default function Histories() {
  const [histories, setHistories] = useState<History[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [userId, setUserId] = useState('')
  const [type, setType] = useState('')
  const [price, setPrice] = useState('')
  const [saving, setSaving] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    async function fetchData() {
      setLoading(true)

      const [historiesRes, usersRes] = await Promise.all([
        supabase
          .from('histories')
          .select('id, user_id, type, price, created_at, users(user_name)')
          .order('created_at', { ascending: false }),
        supabase
          .from('users')
          .select('id, user_name')
          .order('user_name', { ascending: true }),
      ])

      if (!historiesRes.error && historiesRes.data) {
        setHistories(historiesRes.data as unknown as History[])
      }
      if (!usersRes.error && usersRes.data) {
        setUsers(usersRes.data as unknown as User[])
      }

      setLoading(false)
    }

    fetchData()
  }, [supabase.from])

  async function handleCreate() {
    if (!userId || !type.trim() || !price.trim()) return
    setSaving(true)

    const { data, error } = await supabase
      .from('histories')
      .insert({
        user_id: Number(userId),
        type: type.trim(),
        price: Number(price),
      })
      .select('id, user_id, type, price, created_at, users(user_name)')
      .single()

    if (error) {
      toast.error(error.message || 'Không thể lưu lịch sử')
    } else if (data) {
      setHistories((prev) => [data as unknown as History, ...prev])
      setUserId('')
      setType('')
      setPrice('')
      setOpen(false)
      toast.success('Đã thêm lịch sử')
    }
    setSaving(false)
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  function formatPrice(value: number) {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value)
  }

  return (
    <div className="flex flex-col gap-6 px-4 py-4 md:gap-8 md:py-6 lg:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Lịch sử</h2>
          <p className="text-muted-foreground">
            Lịch sử dịch vụ khách hàng đã sử dụng
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="mr-2 size-4" />
              Thêm lịch sử
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm lịch sử dịch vụ</DialogTitle>
              <DialogDescription>
                Nhập thông tin dịch vụ khách hàng đã sử dụng
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="user-id">Khách hàng</Label>
                <Select value={userId} onValueChange={setUserId}>
                  <SelectTrigger id="user-id">
                    <SelectValue placeholder="Chọn khách hàng" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((u) => (
                      <SelectItem key={u.id} value={String(u.id)}>
                        {u.user_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Loại dịch vụ</Label>
                <Input
                  id="type"
                  placeholder="Ví dụ: Cắt tóc, Nhuộm, Uốn..."
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Giá (VNĐ)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="Nhập giá dịch vụ"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Hủy
              </Button>
              <Button onClick={handleCreate} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2Icon className="mr-2 size-4 animate-spin" />
                    Đang lưu...
                  </>
                ) : (
                  'Lưu'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>
                <span className="inline-flex items-center gap-2">
                  <UserIcon className="size-3.5" />
                  Tên khách hàng
                </span>
              </TableHead>
              <TableHead>
                <span className="inline-flex items-center gap-2">
                  <ScissorsIcon className="size-3.5" />
                  Loại dịch vụ
                </span>
              </TableHead>
              <TableHead>
                <span className="inline-flex items-center gap-2">
                  <DollarSignIcon className="size-3.5" />
                  Giá
                </span>
              </TableHead>
              <TableHead className="text-right">Ngày tạo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <Loader2Icon className="mx-auto size-5 animate-spin text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : histories.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  Chưa có lịch sử nào
                </TableCell>
              </TableRow>
            ) : (
              histories.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-muted-foreground">
                    {index + 1}
                  </TableCell>
                  <TableCell className="font-medium">
                    {item.users?.user_name}
                  </TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{formatPrice(item.price)}</TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {formatDate(item.created_at)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
