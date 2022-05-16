import * as React from "react"
import { SVGProps } from "react"

const MicrophoneOn = (props: SVGProps<SVGSVGElement>) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5" 
        viewBox="0 0 16 16"
        fill="currentColor"
    >
        <path d="M8,11c1.657,0,3-1.343,3-3V3c0-1.657-1.343-3-3-3S5,1.343,5,3v5C5,9.657,6.343,11,8,11z"/>
        <path d="M13,8V6h-1l0,1.844c0,1.92-1.282,3.688-3.164,4.071C6.266,12.438,4,10.479,4,8V6H3v2c0,2.414,1.721,4.434,4,4.899V15H5v1h6  v-1H9v-2.101C11.279,12.434,13,10.414,13,8z"/>
    </svg>
)

export default MicrophoneOn
