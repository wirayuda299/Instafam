import { AiOutlineInstagram } from "react-icons/ai";

export default function Entrance() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="text-9xl  ">
        <svg width="1em" height="1em">
          <linearGradient
            id="blue-gradient"
            x1="100%"
            y1="100%"
            x2="0%"
            y2="0%"
          >
            <stop stopColor="#db2777" offset="0%" />
            <stop stopColor="#fb923c" offset="100%" />
          </linearGradient>
          <AiOutlineInstagram style={{ fill: "url(#blue-gradient)" }} />
        </svg>
      </div>

    </div>
  )
}
