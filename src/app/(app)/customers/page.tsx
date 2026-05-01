'use client'

import { Loader2Icon, PhoneIcon, PlusIcon, UserIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { createClient } from '@/lib/supabase-client'

type Customer = {
  id: number
  user_name: string
  phone_number: string
}

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [saving, setSaving] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    async function fetchCustomers() {
      setLoading(true)
      const { data, error } = await supabase
        .from('users')
        .select('id, user_name, phone_number')
        .order('id', { ascending: true })

      if (!error && data) {
        setCustomers(data)
      }
      setLoading(false)
    }

    fetchCustomers()
  }, [supabase.from])

  async function handleCreate() {
    if (!name.trim() || !phone.trim()) return
    setSaving(true)

    const trimmedName = name.trim()
    const trimmedPhone = phone.trim()

    // Check for existing name or phone
    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .or(`user_name.eq.${trimmedName},phone_number.eq.${trimmedPhone}`)
      .maybeSingle()

    if (existing) {
      toast.warning('Tên hoặc số điện thoại đã tồn tại')
      setSaving(false)
      return
    }

    const { data, error } = await supabase
      .from('users')
      .insert({ user_name: trimmedName, phone_number: trimmedPhone })
      .select('id, user_name, phone_number')
      .single()

    if (error) {
      toast.error(error.message || 'Không thể lưu khách hàng')
    } else if (data) {
      setCustomers((prev) => [...prev, data])
      setName('')
      setPhone('')
      setOpen(false)
      toast.success('Đã thêm khách hàng')
    }
    setSaving(false)
  }

  return (
    <div className="flex flex-col gap-6 px-4 py-4 md:gap-8 md:py-6 lg:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Khách hàng</h2>
          <p className="text-muted-foreground">
            Quản lý danh sách khách hàng của salon
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="mr-2 size-4" />
              Thêm khách hàng
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm khách hàng mới</DialogTitle>
              <DialogDescription>
                Nhập thông tin khách hàng để thêm vào danh sách
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Họ tên</Label>
                <Input
                  id="name"
                  placeholder="Nhập họ tên khách hàng"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  placeholder="Nhập số điện thoại"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                  Họ tên
                </span>
              </TableHead>
              <TableHead>
                <span className="inline-flex items-center gap-2">
                  <PhoneIcon className="size-3.5" />
                  Số điện thoại
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  <Loader2Icon className="mx-auto size-5 animate-spin text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : customers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="h-24 text-center text-muted-foreground"
                >
                  Chưa có khách hàng nào
                </TableCell>
              </TableRow>
            ) : (
              customers.map((customer, index) => (
                <TableRow key={customer.id}>
                  <TableCell className="text-muted-foreground">
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {customer.user_name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .toUpperCase()
                            .slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{customer.user_name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {customer.phone_number}
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
