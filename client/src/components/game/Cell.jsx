import React, { useState } from 'react';
import { motion } from 'framer-motion';
// import { checkCol,checkCube,checkRow } from './BoardValidation';

export default function Cell({cell,colStart,rowStart,isReadOnly,values,setValues,initialValue}) {
    const [wasValueChanged, setWasValueChanged] = useState(initialValue)

    const inputControl = (e,values) => {
        if (e.target.value%10 == 0) return setWasValueChanged('')
        setWasValueChanged(e.target.value%10)
        values[cell+colStart+rowStart-1] = e.target.value%10
        setValues(values)
    }

    const inputType = (isReadOnly) => {
        if (isReadOnly) {
            return <motion.input type="number" name={'cell-'+(cell+colStart+rowStart)} id={(colStart+cell+rowStart)} readOnly value={values[colStart+cell+rowStart-1]} style={{backgroundColor:'rgba(255, 255, 255, 0.3)'}}
                initial={{rotate:0}}
                whileHover={{rotate:[0,-45,45,0]}}
            />
        }
        return <motion.input type="number" name={'cell-'+(cell+colStart+rowStart)} id={(colStart+cell+rowStart)} min={1} max={9} value={wasValueChanged} onChange={(e) => inputControl(e,values)} onKeyPress={(e) => (!/[1-9]/.test(e.key)) ? e.preventDefault():1}
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
