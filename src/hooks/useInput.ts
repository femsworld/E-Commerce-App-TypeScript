import React, { useState } from 'react'

const useInput = () => {
    const [value, setValue] = useState("")
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
  return { value, onChange, setValue}
}

export default useInput
