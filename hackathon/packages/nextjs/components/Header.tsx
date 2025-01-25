"use client"

import type React from "react"
import { useCallback, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bars3Icon, BugAntIcon } from "@heroicons/react/24/outline"
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth"
import { useOutsideClick } from "~~/hooks/scaffold-eth"
import { Navbar } from "./Navbar/Navbar"

type HeaderMenuLink = {
label: string
href: string
icon?: React.ReactNode
}

export const menuLinks: HeaderMenuLink[] = [
{
	label: "Home",
	href: "/",
},
{
	label: "Debug Contracts",
	href: "/debug",
	icon: <BugAntIcon className="h-4 w-4" />,
},
]

export const HeaderMenuLinks = () => {
const pathname = usePathname()

return (
	<>
	{menuLinks.map(({ label, href, icon }) => {
		const isActive = pathname === href
		return (
		<li key={href}>
			<Link
			href={href}
			passHref
			className={`${
				isActive ? "bg-secondary shadow-md" : ""
			} hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
			>
			{icon}
			<span>{label}</span>
			</Link>
		</li>
		)
	})}
	</>
)
}

export const Header = () => {
const [isDrawerOpen, setIsDrawerOpen] = useState(false)
const burgerMenuRef = useRef<HTMLDivElement>(null)

useOutsideClick(
	burgerMenuRef,
	useCallback(() => setIsDrawerOpen(false), []),
)

return (
	<header>
	<Navbar />
	<div ref={burgerMenuRef} className="md:hidden">
		<button onClick={() => setIsDrawerOpen(!isDrawerOpen)} className="p-2 text-gray-600">
		<Bars3Icon className="h-6 w-6" />
		</button>

		{isDrawerOpen && (
		<div className="absolute top-full left-0 w-full bg-white shadow-lg">
			<ul className="flex flex-col space-y-2 p-4">
			<HeaderMenuLinks />
			</ul>
		</div>
		)}
	</div>
	</header>
)
}

export default Header