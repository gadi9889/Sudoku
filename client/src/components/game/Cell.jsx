import React, { useState } from 'react';
import { motion } from 'framer-motion';
// import { checkCol,checkCube,checkRow } from './BoardValidation';

export default function Cell({cell,colStart,rowStart,isReadOnly,value}) {
    const [wasValueChanged, setWasValueChanged] = useState('')

    const inputControl = (e) => {
        if (e.target.value % 10 == 0) return
        setWasValueChanged(e.target.value%10)
        value[colStart+cell+rowStart-1] = wasValueChanged
        console.log(value[colStart+cell+rowStart-1])
    }

    const inputType = (isReadOnly) => {
        if (isReadOnly) {
            return <motion.input type="number" name={'cell-'+(cell+colStart+rowStart)} id={(colStart+cell+rowStart)} readOnly value={value[colStart+cell+rowStart-1]} style={{backgroundColor:'rgba(255, 255, 255, 0.3)'}}
                initial={{rotate:0}}
                whileHover={{rotate:[0,-45,45,0]}}
            />
        }
        return <motion.input type="number" name={'cell-'+(cell+colStart+rowStart)} id={(colStart+cell+rowStart)} min={1} max={9} value={wasValueChanged} onChange={(e) => inputControl(e)} onKeyPress={(e) => (!/[1-9]/.test(e.key)) ? e.preventDefault():null}
            whileHover={{scale:1.1}}
            whileTap={{scale:0.95}}
        />
    }
  return (
      <>
        {inputType(isReadOnly)}
      </>
  )
}
