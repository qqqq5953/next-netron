'use client'

import { cn } from '@/lib/utils';
import CountUp, { CountUpProps } from 'react-countup';
type Props = {
  end: number,
  decimals?: number
  scrollSpyDelay?: number
  enableScrollSpy?: boolean
  className?: string
} & CountUpProps

export default function CountUpNumber({
  end,
  decimals,
  scrollSpyDelay,
  enableScrollSpy,
  className,
  ...rest
}: Props) {
  return (
    <div className={cn('text-netron text-6xl font-medium', className)}>
      <CountUp
        end={end ?? 100}
        decimals={decimals ?? 0}
        scrollSpyDelay={scrollSpyDelay ?? 500}
        enableScrollSpy={!!enableScrollSpy}
        {...rest}
      />
    </div>
  );
}