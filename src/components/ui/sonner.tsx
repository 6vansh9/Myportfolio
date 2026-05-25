import { Toaster as Sonner, type ToasterProps } from "sonner"

function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      style={
        {
          "--normal-bg": "#18181b",
          "--normal-text": "#e4e4e7",
          "--normal-border": "rgba(63,63,70,0.5)",
          "--success-bg": "#18181b",
          "--success-text": "#e4e4e7",
          "--success-border": "rgba(63,63,70,0.5)",
          "--info-bg": "#18181b",
          "--info-text": "#e4e4e7",
          "--info-border": "rgba(63,63,70,0.5)",
          "--error-bg": "#18181b",
          "--error-text": "#e4e4e7",
          "--error-border": "rgba(63,63,70,0.5)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
