import { Loader2Icon } from "lucide-react";

export default function Loader() {
    return (
      <>
        <div className='c-header min-h-screen flex flex-col items-center'>
                <Loader2Icon className="animate-spin text-aero-pink-200"/>
        </div>
      </>
    )
  }