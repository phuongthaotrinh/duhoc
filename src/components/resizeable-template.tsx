"use client"
import * as React from "react"
import {
    AlertCircle,
    Archive,
    MessagesSquare,
    ShoppingCart,
    Users2,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import {Nav} from "@/layouts/admin/nav";
import {Navigation} from "@/types";

interface MailProps {

    defaultLayout: number[] | undefined
    defaultCollapsed?: boolean
    navCollapsedSize: number,
    children:React.ReactNode,
    navigation:Navigation[]
}

export function ResizableTemplate({

                                      defaultLayout = [20,70],
                                      defaultCollapsed = false,
                                      navCollapsedSize, children,
                                      navigation
                                  }: MailProps) {
    const [size, setSize] = React.useState<number>()
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)

    React.useLayoutEffect(() => {
        if(size && size <= 10) setIsCollapsed(true)
        else setIsCollapsed(false)
    },[size])

    return (
        <TooltipProvider delayDuration={0}>
            <ResizablePanelGroup
                direction="horizontal"
                onLayout={(sizes: number[]) => {
                    setSize(sizes[0])
                }}
                className="min-h-screen  items-stretch"
            >
                <ResizablePanel
                    defaultSize={defaultLayout[0]}
                    collapsedSize={navCollapsedSize}
                    collapsible={true}
                    minSize={15}
                    className={cn(isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out")}
                >
                    <div className={cn("flex h-[52px] items-center justify-center", isCollapsed ? 'h-[52px]': 'px-2')}>
                        {/*<AccountSwitcher isCollapsed={isCollapsed} accounts={[]} />*/}
                        Store Switcher
                    </div>
                    <Separator />
                    <Nav
                        isCollapsed={isCollapsed}
                        links={navigation}
                    />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel >
                    {children}
                </ResizablePanel>

            </ResizablePanelGroup>
        </TooltipProvider>
    )
}