import React from 'react';

interface OptionProps {
  option: string
  onSelect(option: string): void
}

const Option : React.FC<OptionProps> = (props) => {
  const { onSelect, option } = props

  const onSelectHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    onSelect(option)
  }

  return (
    <li onClick={onSelectHandler}>{option}</li>
  )
}

export default Option
