const ScrollArea = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={`overflow-y-auto h-full ${className}`}>{children}</div>;
};

export default ScrollArea;
