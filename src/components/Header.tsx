import { FaBell } from "react-icons/fa";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white shadow-sm px-4 sm:px-6 py-3 flex justify-between items-center w-full sticky top-0 z-50">
      {/* Left: Search */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search here"
            className="bg-gray-100 pl-10 pr-4 py-2 rounded-full text-sm outline-none w-[180px] sm:w-[250px]"
          />
          <svg
            className="absolute left-3 top-2.5 text-gray-400"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 10-1.397 1.397h-.001l3.85 3.85a1 1 0 001.415-1.415l-3.85-3.85zM12 6.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" />
          </svg>
        </div>
      </div>

      {/* Right: Bell Icon + Avatar */}
      <div className="flex items-center gap-4">
        <IconWithBadge icon={<FaBell />} count={4} />

        <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full gap-2">
          {/* <Image
            src=""
            alt="User"
            width={32}
            height={32}
            className="rounded-full"
          /> */}
          {/* Hidden on mobile, visible on lg+ */}
          <div className="text-sm hidden lg:block">
            <p className="font-medium">Wiliam</p>
            <p className="text-xs text-gray-500">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}

function IconWithBadge({
  icon,
  count,
}: {
  icon: React.ReactNode;
  count?: number;
}) {
  return (
    <div className="relative text-gray-600 text-lg hover:text-blue-600 cursor-pointer">
      {icon}
      {count ? (
        <span className="absolute -top-2 -right-2 text-xs bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center">
          {count}
        </span>
      ) : null}
    </div>
  );
}
