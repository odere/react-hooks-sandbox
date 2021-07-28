import React from 'react'
import useOnClickOutside from '../hooks/useOnClickOutside'
import Option from './Option'
import './Select.css'

interface SelectProps {
  options?: string[]
}

const Select: React.FC<SelectProps> = (props) => {
  const { options = ['Option 1', 'Option 2', 'Option 3'] } = props
  const [opened, toggleOpen] = React.useState(false)
  const [selected, setSelectValue] = React.useState<string | null>(null)
  const ref = React.useRef(null)

  const onOutsideClick = () => {
    toggleOpen(false)
  }

  const onSelect = (option: string) => {
    setSelectValue(option)
    toggleOpen(false)
  }

  const { clickOutsideCount } = useOnClickOutside(ref, onOutsideClick)
  
  return (
    <div>
      <p>Outside click hook example</p>
      <p>Click outside count: {clickOutsideCount}</p>

      <div ref={ref} className="select-wrapper">
        <div className="select" onClick={() => toggleOpen(true)}>
          <span>{selected || 'null'}</span>
        </div>

        {opened && (
          <div className="ul-wrapper">
            <ul>
              { options.map((item, index) => (
                <Option
                  key={index}
                  option={item}
                  onSelect={onSelect}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Select
