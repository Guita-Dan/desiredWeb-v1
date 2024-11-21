'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { User } from '@supabase/supabase-js'
import { CreditCard, Home, Heart, LogOut, Package, UserIcon, UserRoundCog } from 'lucide-react'

import { Button } from '@/src/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Input } from '@/src/components/ui/input'

import { cn } from '@/src/lib/utils'
import { Label } from '@/src/components/ui/label'
import { Separator } from '@/src/components/ui/separator'
import { redirect } from 'next/navigation'
import { RedirectType } from 'next/navigation'

interface AccountSettingsProps {
    user: User
    isAdmin: boolean
}

export default function AccountSettings({ user, isAdmin }: AccountSettingsProps) {


    const [isLoading, setIsLoading] = useState(false)
    console.log(isAdmin, "in setting");
    const menuItems = [
        { icon: UserIcon, label: 'Account', href: '#', active: true },
        { icon: UserRoundCog, label: "Shop Edit", href: '/admin', disabled: !isAdmin },
        { icon: Home, label: 'Address', href: '#' },
        { icon: Package, label: 'Orders', href: '#' },
        { icon: Heart, label: 'Wishlist', href: '#' },
        { icon: CreditCard, label: 'Billing', href: '#' },
    ]


    return (
        <div className="container mx-auto py-10">
            <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
                <div className="hidden lg:block">
                    <div className="flex flex-col items-center space-y-4 pb-8">
                        <div className="relative h-24 w-24">
                            <Image
                                src="/placeholder.svg?height=96&width=96"
                                alt="Profile"
                                className="rounded-full border-4 border-background"
                                fill
                            />
                        </div>
                        <div className="text-center">
                            <h2 className="text-lg font-medium">{user.user_metadata.display_name}</h2>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                    </div>
                    <Separator className="mb-6" />
                    <nav className="space-y-2">
                        {menuItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.disabled ? "#" : item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                                    item.active
                                        ? "bg-secondary text-secondary-foreground"
                                        : "",

                                    item.disabled
                                        ? " hover:none text-red-500 cursor-not-allowed"
                                        : "hover:bg-secondary/50"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        ))}
                        <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive">
                            <LogOut className="h-4 w-4" />
                            Log Out
                        </Button>
                    </nav>
                </div>
                <div className="space-y-8">
                    <Card className="border-none shadow-none">
                        <CardHeader>
                            <CardTitle>Account Details</CardTitle>
                            <CardDescription>Update your account information.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First name</Label>
                                    <Input
                                        id="firstName"
                                        defaultValue={user.user_metadata.first_name}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last name</Label>
                                    <Input
                                        id="lastName"
                                        defaultValue={user.user_metadata.last_name}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="displayName">Display name</Label>
                                <Input
                                    id="displayName"
                                    defaultValue={user.user_metadata.display_name}
                                />
                                <p className="text-xs text-muted-foreground">
                                    This will be how your name will be displayed in the account section and in reviews
                                </p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    defaultValue={user.email}
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-none">
                        <CardHeader>
                            <CardTitle>Password</CardTitle>
                            <CardDescription>Change your password.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword">Current password</Label>
                                <Input id="currentPassword" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="newPassword">New password</Label>
                                <Input id="newPassword" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm new password</Label>
                                <Input id="confirmPassword" type="password" />
                            </div>
                        </CardContent>
                    </Card>
                    <div className="flex justify-end">
                        <Button disabled={isLoading}>
                            {isLoading ? 'Saving...' : 'Save changes'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}