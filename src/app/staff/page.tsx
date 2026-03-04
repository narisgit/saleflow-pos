
"use client"

import { useState, useMemo } from 'react'
import { useStaff, useLanguage } from '@/lib/store'
import { Staff } from '@/lib/types'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { 
  Plus, 
  Trash2, 
  ShieldCheck,
  UserCheck,
  Briefcase,
  Fingerprint,
  Edit,
  RefreshCw,
  Lock,
  Key,
  Info,
  UserPlus,
  Hash,
  ShieldAlert
} from 'lucide-react'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Label } from '@/components/ui/label'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { toast } from '@/hooks/use-toast'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase'
import { doc } from 'firebase/firestore'

export default function StaffPage() {
  const { staffList, addStaff, deleteStaff } = useStaff()
  const { t } = useLanguage()
  const { user } = useUser()
  const db = useFirestore()
  
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null)
  const [staffToDelete, setStaffToDelete] = useState<Staff | null>(null)

  const currentUserRef = useMemoFirebase(() => user ? doc(db, 'userProfiles', user.uid) : null, [db, user])
  const { data: profile, isLoading: isProfileLoading } = useDoc(currentUserRef)
  
  const isAdmin = profile?.role === 'Admin'

  const [formData, setFormData] = useState<Partial<Staff>>({
    id: '',
    employeeCode: '',
    name: '',
    role: 'Cashier',
    active: true,
    email: ''
  })

  const resetForm = () => {
    setFormData({ id: '', employeeCode: '', name: '', role: 'Cashier', active: true, email: '' })
    setEditingStaff(null)
  }

  const handleOpenDialog = (staff: Staff) => {
    setEditingStaff(staff)
    const code = staff.employeeCode || `EMP-${staff.id.slice(-3).toUpperCase()}`
    setFormData({ ...staff, employeeCode: code })
    setIsDialogOpen(true)
  }

  const handleSave = () => {
    if (!formData.name || !formData.id) {
      toast({ title: "ข้อผิดพลาด", description: "ข้อมูลไม่ครบถ้วน", variant: "destructive" })
      return
    }
    const finalCode = formData.employeeCode || `EMP-${formData.id.slice(-3).toUpperCase()}`
    const staffData: Staff = {
      id: formData.id,
      employeeCode: finalCode,
      name: formData.name!,
      role: (formData.role as any) || 'Cashier',
      active: true,
      email: formData.email || ''
    }
    addStaff(staffData)
    setIsDialogOpen(false)
    resetForm()
    toast({ title: t.completed, description: `บันทึกข้อมูล ${staffData.name} เรียบร้อยแล้ว` })
  }

  const handleClaimAdmin = () => {
    if (!user) return;
    const adminData: Staff = {
      id: user.uid,
      employeeCode: 'EMP-001',
      name: user.displayName || user.email?.split('@')[0] || 'System Admin',
      role: 'Admin',
      active: true,
      email: user.email || ''
    }
    addStaff(adminData)
    toast({ title: "กู้คืนสิทธิ์สำเร็จ", description: "คุณได้รับสิทธิ์ Admin เรียบร้อยแล้ว" })
  }

  const confirmDelete = () => {
    if (staffToDelete) {
      deleteStaff(staffToDelete.id)
      toast({ title: "ลบพนักงานแล้ว", description: `พนักงาน ${staffToDelete.name} ถูกนำออกจากระบบแล้ว` })
      setStaffToDelete(null)
    }
  }

  if (isProfileLoading) {
    return (
      <div className="h-full flex items-center justify-center p-20">
        <ShieldAlert className="w-8 h-8 animate-pulse text-muted-foreground" />
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="bg-destructive/10 p-6 rounded-full">
          <Lock className="w-12 h-12 text-destructive" />
        </div>
        <h2 className="text-2xl font-bold">Access Denied</h2>
        <p className="text-muted-foreground">เฉพาะ Admin เท่านั้นที่สามารถจัดการข้อมูลพนักงานได้</p>
        <Button onClick={handleClaimAdmin} variant="outline" className="mt-4">
          <Key className="w-4 h-4 mr-2" />
          กู้คืนสิทธิ์ Admin
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">{t.staff}</h1>
          <p className="text-muted-foreground">จัดการสิทธิ์เข้าใช้งานสำหรับ Admin</p>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-sm border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[150px]">{t.employeeCode}</TableHead>
              <TableHead>{t.staffName}</TableHead>
              <TableHead>{t.role}</TableHead>
              <TableHead>{t.active}</TableHead>
              <TableHead className="text-right">{t.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-muted-foreground italic">
                  ยังไม่มีพนักงานสมัครสมาชิกเข้ามาในระบบ
                </TableCell>
              </TableRow>
            ) : (
              staffList.map((staff) => (
                <TableRow key={staff.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell>
                    <Badge variant="outline" className="font-mono text-primary border-primary/30">
                      {staff.employeeCode || `EMP-${staff.id.slice(-3).toUpperCase()}`}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {staff.name.charAt(0)}
                      </div>
                      <div className="flex flex-col text-sm">
                        <span className="font-medium">{staff.name}</span>
                        <span className="text-xs text-muted-foreground">{staff.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {staff.role === 'Admin' ? <ShieldCheck className="w-4 h-4 text-red-500" /> : 
                       staff.role === 'Manager' ? <Briefcase className="w-4 h-4 text-blue-500" /> :
                       <UserCheck className="w-4 h-4 text-green-500" />}
                      <span className="text-sm">{staff.role}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 border-none text-[10px]">
                      Active
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpenDialog(staff)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" disabled={staff.id === user?.uid} onClick={() => setStaffToDelete(staff)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>แก้ไขข้อมูลพนักงาน</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="employeeCode">{t.employeeCode}</Label>
              <Input id="employeeCode" className="font-mono" value={formData.employeeCode} onChange={e => setFormData(f => ({ ...f, employeeCode: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">{t.staffName}</Label>
              <Input id="name" value={formData.name} onChange={e => setFormData(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">{t.role}</Label>
              <Select value={formData.role} onValueChange={v => setFormData(f => ({ ...f, role: v as any }))}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="เลือกตำแหน่ง" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin (ผู้ดูแลระบบ)</SelectItem>
                  <SelectItem value="Manager">Manager (ผู้จัดการ)</SelectItem>
                  <SelectItem value="Cashier">Cashier (พนักงานขาย)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>{t.cancel}</Button>
            <Button onClick={handleSave}>บันทึกการแก้ไข</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!staffToDelete} onOpenChange={(o) => !o && setStaffToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการลบพนักงาน?</AlertDialogTitle>
            <AlertDialogDescription>คุณต้องการลบ <strong>{staffToDelete?.name}</strong> ใช่หรือไม่?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">ยืนยันการลบ</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
