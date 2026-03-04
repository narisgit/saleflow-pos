
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
  Lock
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

  // ดึงข้อมูลโปรไฟล์ของผู้ที่ล็อกอินอยู่ เพื่อเช็คสิทธิ์
  const currentUserRef = useMemoFirebase(() => user ? doc(db, 'userProfiles', user.uid) : null, [db, user])
  const { data: currentUserProfile } = useDoc(currentUserRef)
  
  const isAdmin = currentUserProfile?.role === 'Admin'

  const [formData, setFormData] = useState<Partial<Staff>>({
    id: '',
    name: '',
    role: 'Cashier',
    active: true,
    email: ''
  })

  const generateSimpleId = () => {
    const num = Math.floor(100 + Math.random() * 900);
    setFormData(prev => ({ ...prev, id: `EMP-${num}` }));
  }

  const resetForm = () => {
    setFormData({ id: '', name: '', role: 'Cashier', active: true, email: '' })
    setEditingStaff(null)
  }

  const handleOpenDialog = (staff?: Staff) => {
    if (!isAdmin) {
      toast({ title: "ถูกปฏิเสธ", description: "เฉพาะ Admin เท่านั้นที่จัดการพนักงานได้", variant: "destructive" })
      return
    }
    if (staff) {
      setEditingStaff(staff)
      setFormData(staff)
    } else {
      resetForm()
      generateSimpleId()
    }
    setIsDialogOpen(true)
  }

  const handleSave = () => {
    if (!formData.name || !formData.id) {
      toast({ title: "ข้อผิดพลาด", description: "กรุณาระบุชื่อและรหัสพนักงาน", variant: "destructive" })
      return
    }

    const staffData: Staff = {
      id: formData.id.trim().toUpperCase(),
      name: formData.name!,
      role: (formData.role as any) || 'Cashier',
      active: true,
      email: formData.email || ''
    }

    if (editingStaff && editingStaff.id !== staffData.id) {
      deleteStaff(editingStaff.id);
    }
    
    addStaff(staffData)
    setIsDialogOpen(false)
    resetForm()
    toast({ 
      title: t.completed, 
      description: editingStaff ? `บันทึกข้อมูล ${staffData.name} เรียบร้อยแล้ว` : `เพิ่มพนักงาน ${staffData.name} เรียบร้อยแล้ว` 
    })
  }

  const confirmDelete = () => {
    if (staffToDelete) {
      deleteStaff(staffToDelete.id)
      toast({ title: "ลบพนักงานแล้ว", description: `พนักงาน ${staffToDelete.name} ถูกนำออกจากระบบแล้ว` })
      setStaffToDelete(null)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">{t.staff}</h1>
          <p className="text-muted-foreground">จัดการข้อมูลและสิทธิ์เข้าใช้งานของพนักงาน</p>
        </div>
        {isAdmin && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()} className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-md">
                <Plus className="w-4 h-4 mr-2" />
                {t.addStaff}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{editingStaff ? "แก้ไขข้อมูลพนักงาน" : t.addStaff}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="staff-id">รหัสพนักงาน (ID)</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        id="staff-id" 
                        placeholder="เช่น EMP-01"
                        value={formData.id} 
                        onChange={e => setFormData(f => ({ ...f, id: e.target.value.toUpperCase() }))}
                        className="pl-10 font-mono" 
                      />
                    </div>
                    <Button variant="outline" size="icon" onClick={generateSimpleId} title="สุ่มรหัสใหม่">
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">{t.staffName}</Label>
                  <Input 
                    id="name" 
                    placeholder="ชื่อ-นามสกุล"
                    value={formData.name} 
                    onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">อีเมล (Email)</Label>
                  <Input 
                    id="email" 
                    type="email"
                    placeholder="example@mail.com"
                    value={formData.email} 
                    onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">{t.role}</Label>
                  <Select 
                    value={formData.role} 
                    onValueChange={v => setFormData(f => ({ ...f, role: v as any }))}
                  >
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
                <Button onClick={handleSave}>{editingStaff ? "บันทึกการแก้ไข" : t.saveStaff}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {!isAdmin && (
        <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg flex items-center gap-3 text-orange-800 text-sm">
          <Lock className="w-5 h-5" />
          <span>คุณอยู่ในฐานะ {currentUserProfile?.role || 'พนักงาน'} คุณสามารถดูรายชื่อได้เท่านั้น แต่ไม่สามารถแก้ไขหรือลบพนักงานได้</span>
        </div>
      )}

      <div className="bg-card rounded-xl shadow-sm border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[120px]">รหัสพนักงาน</TableHead>
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
                  ไม่พบรายชื่อพนักงานในระบบ
                </TableCell>
              </TableRow>
            ) : (
              staffList.map((staff) => (
                <TableRow key={staff.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-mono text-xs font-bold text-primary">
                    {staff.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {staff.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {staff.name}
                          {staff.id === user?.uid && <span className="ml-2 text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full uppercase">Me</span>}
                        </span>
                        <span className="text-xs text-muted-foreground">{staff.email || '-'}</span>
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
                    <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 border-none">
                      Active
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      {isAdmin && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 hover:text-primary"
                            onClick={() => handleOpenDialog(staff)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          {/* ป้องกันการลบตัวเอง */}
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive hover:bg-destructive/10"
                            disabled={staff.id === user?.uid}
                            onClick={() => setStaffToDelete(staff)}
                            title={staff.id === user?.uid ? "ไม่สามารถลบตัวเองได้" : "ลบพนักงาน"}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      {!isAdmin && <Lock className="w-4 h-4 text-muted-foreground mr-3" />}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!staffToDelete} onOpenChange={(open) => !open && setStaffToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการลบพนักงาน?</AlertDialogTitle>
            <AlertDialogDescription>
              คุณต้องการนำพนักงานชื่อ <strong>{staffToDelete?.name}</strong> (ID: {staffToDelete?.id}) ออกจากระบบใช่หรือไม่? การดำเนินการนี้ไม่สามารถย้อนกลับได้
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              ยืนยันการลบ
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
