
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth, useUser, useFirestore } from "@/firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Store, Loader2, UserPlus, LogIn } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useLanguage } from "@/lib/store"

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  
  const auth = useAuth()
  const db = useFirestore()
  const { user, isUserLoading } = useUser()
  const router = useRouter()
  const { t } = useLanguage()

  useEffect(() => {
    if (user && !isUserLoading) {
      router.push("/")
    }
  }, [user, isUserLoading, router])

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (isRegister) {
        // Registration Flow
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const newUser = userCredential.user
        
        // Update Firebase Auth profile
        await updateProfile(newUser, { displayName: name })

        // Create UserProfile document in Firestore (Required for Security Rules)
        const profileRef = doc(db, "userProfiles", newUser.uid)
        await setDoc(profileRef, {
          id: newUser.uid,
          name: name,
          email: email,
          role: "Cashier" // Default role
        })

        toast({
          title: "Registration Successful",
          description: `Account created for ${name}`,
        })
      } else {
        // Login Flow
        await signInWithEmailAndPassword(auth, email, password)
        toast({
          title: "Login Successful",
          description: "Welcome back to SaleFlow POS",
        })
      }
      router.push("/")
    } catch (error: any) {
      console.error(error)
      toast({
        variant: "destructive",
        title: isRegister ? "Registration Failed" : "Login Failed",
        description: error.message || "An error occurred during authentication",
      })
    } finally {
      setLoading(false)
    }
  }

  if (isUserLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md shadow-xl border-none">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary p-3 rounded-2xl">
              <Store className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-headline font-bold">
            {isRegister ? "Staff Registration" : "SaleFlow POS"}
          </CardTitle>
          <CardDescription>
            {isRegister 
              ? "Create a new employee account" 
              : "Enter your employee credentials to access the system"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleAuth}>
          <CardContent className="space-y-4">
            {isRegister && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="staff@saleflow.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full h-11 text-lg font-bold" type="submit" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : (
                isRegister ? <UserPlus className="w-5 h-5 mr-2" /> : <LogIn className="w-5 h-5 mr-2" />
              )}
              {isRegister ? "Register Staff" : "Sign In"}
            </Button>
            <Button 
              variant="ghost" 
              type="button" 
              className="w-full"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "Already have an account? Sign In" : "New Staff? Register here"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
