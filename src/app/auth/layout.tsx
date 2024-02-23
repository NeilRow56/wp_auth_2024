const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="flex h-full items-center justify-center bg-slate-100 
        
        text-center"
    >
      {children}
    </div>
  )
}

export default AuthLayout
