import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Cell({cell,colStart,rowStart,isReadOnly,values,setValues,initialValue,blankedPositions,setIsFilled,difficulty}) {
    const [wasValueChanged, setWasValueChanged] = useState(initialValue)

    const inputControl = (e,values) => {
        if (e.target.value%10 == 0){
            setIsFilled(false)
            return setWasValueChanged('')
        }
        setWasValueChanged(e.target.value%10)
        values[cell+colStart+rowStart-1] = e.target.value%10
        setValues(values)
        isFilled(values,blankedPositions,setIsFilled,difficulty)
    }

    const isFilled = (values,blankedPositions,setIsFilled,difficulty) => {
        for (let i = 0; i < blankedPositions.length; i+=difficulty) {
            if (values[blankedPositions[i]] == 0 || values[blankedPositions[i]] == '') {
                return setIsFilled(false)
            }
        }
        console.log('aa')
        return setIsFilled(true)
    }

    const inputType = (isReadOnly) => {
        if (isReadOnly) {
            return <motion.input type="number" 
                    name={'cell-'+(cell+colStart+rowStart)} 
                    id={(colStart+cell+rowStart)} readOnly 
                    value={values[colStart+cell+rowStart-1]} 
                    style={{backgroundColor:'rgba(255, 255, 255, 0.3)'}}
                initial={{rotate:0}}
                whileHover={{
                    rotate:[0,-45,45,0],
                    transition:{delay:0.5,repeat:Infinity,repeatDelay:0.8}
                }}
            />
        }
        return <motion.input type="number"
                name={'cell-'+(cell+colStart+rowStart)}
                id={(colStart+cell+rowStart)} min={1} max={9}
                value={wasValueChanged} onChange={(e) => inputControl(e,values)} 
                onKeyPress={(e) => (!/[1-9]/.test(e.key)) ? e.preventDefault():1}
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
