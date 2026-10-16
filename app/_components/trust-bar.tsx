import { d } from './delay'
import { Reveal } from './motion'
import { Container } from './primitives'

const items = [
  { lead: 'Member', value: 'FINRA / SIPC' },
  { lead: 'Cleared by', value: 'Apex Clearing' },
  { lead: 'FINRA', value: 'BrokerCheck' },
]

export function TrustBar() {
  return (
    <Container className="mt-8">
      <Reveal>
        <ul className="flex flex-wrap justify-center gap-x-10 gap-y-2 text-[12px] leading-[1.3] text-white/50">
          {items.map((item, i) => (
            <li key={item.value} className="r" style={d(i * 90)}>
              {item.lead} <span className="text-white">{item.value}</span>
            </li>
          ))}
        </ul>
        <div className="r-draw mt-8 h-px bg-line" style={d(150)} />
      </Reveal>
    </Container>
  )
}
