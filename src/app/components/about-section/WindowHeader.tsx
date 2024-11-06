interface WindowHeaderProps {
  title: string;
}

function WindowHeader(item: WindowHeaderProps) {
  return (
    <div className="flex items-center justify-between pb-2 mb-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-[#FF5F56] rounded-full border border-[#E0443E] dark:border-[#AF3732]" />
        <div className="w-3 h-3 bg-[#FFBD2E] rounded-full border border-[#DEA123] dark:border-[#9D7B1C]" />
        <div className="w-3 h-3 bg-[#27C93F] rounded-full border border-[#1AAB29] dark:border-[#1C8326]" />
      </div>
      <div className="text-[#1E1E1E] dark:text-gray-400 text-sm font-medium">
        {item.title}
      </div>
      <div className="w-16" />
    </div>
  );
}

export default WindowHeader;
