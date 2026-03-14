import useProfile from "@/app/hooks/useProfile";
import { User2 } from "lucide-react";

export default function Account() {
    const { username } = useProfile();

    return (
        <>
            <div className="container-parent">
                {/* header */}
                <div className="bg-accent">
                    <div className="mt-5 py-5 px-7 flex items-center gap-2">
                        <div className="bg-white rounded-full p-5">
                            <User2 className="text-accent" size={50} />
                        </div>
                        <span className="text-lg font-semibold">{username}</span>
                    </div>
                </div>
                <div className="container-child flex-1">
                    <div>hi</div>
                </div>
            </div>
        </>
    );
}
