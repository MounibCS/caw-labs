"use client"

import { Monitor, Smartphone } from "lucide-react"

export default function MobileWarning() {
    return (
        <div className="lg:hidden fixed inset-0 z-[9999] bg-slate-950 flex flex-col items-center justify-center p-8 text-center transition-opacity duration-500">
            <div className="max-w-md space-y-8 p-8 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
                <div className="relative w-20 h-20 mx-auto">
                    <Smartphone className="w-20 h-20 text-slate-700 absolute top-0 left-0" />
                    <div className="absolute -bottom-2 -right-2 bg-slate-900 p-1.5 rounded-full border border-slate-700">
                        <Monitor className="w-8 h-8 text-sky-400" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white tracking-wide">Desktop Recommended</h2>
                    <p className="text-slate-400 leading-relaxed text-sm">
                        This interactive 3D portfolio is designed for a larger display.
                        Please verify you are on a desktop environment for the intended experience.
                    </p>
                </div>

                <div className="pt-4 border-t border-slate-800">
                    <p className="text-xs text-slate-500 uppercase tracking-widest">
                        System Requirement: Desktop / Landscape
                    </p>
                </div>
            </div>
        </div>
    )
}
