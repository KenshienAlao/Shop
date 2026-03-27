import React from "react";
import { Loader2, ShoppingBag } from "lucide-react";

const Loading = () => {
    return (
        <div className="fixed inset-0 z-9999 flex h-screen w-full flex-col items-center justify-center bg-white/80 backdrop-blur-md transition-all duration-700 ease-in-out">
            <div className="relative flex items-center justify-center">
                <div className="absolute h-24 w-24 animate-[ping_2s_linear_infinite] rounded-full border-2 border-accent/20" />
                <div className="absolute h-20 w-20 animate-[ping_1.5s_linear_infinite] rounded-full border-2 border-accent/40" />
                <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-accent" />
                <div className="absolute flex h-12 w-12 animate-pulse items-center justify-center rounded-full bg-accent shadow-[0_0_20px_rgba(245,74,0,0.4)]">
                    <ShoppingBag className="text-white" size={24} strokeWidth={2.5} />
                </div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-2 px-10 text-center">
                <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin text-accent" size={14} />
                    <span className="text-xs font-medium tracking-wide text-gray-400 uppercase">
                        please wait...
                    </span>
                </div>
            </div>

            <div className="mt-10 h-0.5 w-48 overflow-hidden rounded-full bg-gray-100">
                <div className="h-full w-full origin-left animate-[loading_2s_ease-in-out_infinite] bg-accent shadow-[0_0_10px_#f54a00]" />
            </div>


        </div>
    );
};

export default Loading;
