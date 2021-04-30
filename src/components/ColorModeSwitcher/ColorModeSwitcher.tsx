import * as React from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useColorMode, useColorModeValue, IconButton, IconButtonProps } from '@chakra-ui/react'

type ColorModeSwitcherProps = Omit<IconButtonProps, 'aria-label'>

const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = props => {
  const { toggleColorMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)

  return (
    <IconButton
      top="2"
      size="md"
      right="2"
      fontSize="lg"
      variant="ghost"
      color="current"
      position="fixed"
      icon={<SwitchIcon />}
      onClick={toggleColorMode}
      aria-label={`Switch to ${text} mode`}
      {...props}
    />
  )
}

export default ColorModeSwitcher
