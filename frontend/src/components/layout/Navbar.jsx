import { formatPaise } from '@/lib/money'

const Navbar = ({total}) => {
  return (
     <header className="border-b border-rule px-4">
        <div className="container flex items-center justify-between py-6">
          <div className="flex items-baseline gap-3">
            <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
             Smart Budget
            </h1>
            <span className="hidden text-sm uppercase tracking-[0.2em] text-muted-foreground sm:inline">
              personal expenses
            </span>
          </div>
          <div className="text-right">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Total
            </p>
            <p className="font-mono-num text-xl font-semibold text-ink tabular-nums">
              {formatPaise(total)}
            </p>
          </div>
        </div>
      </header>
  )
}

export default Navbar