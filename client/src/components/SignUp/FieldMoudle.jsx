import React from 'react';

export default function FieldMoudle({fieldDivId,fieldP,fieldType,fieldName,onChange}) {
  return (
    <div id={fieldDivId}>
      <p>
        {fieldP}
      </p>
      <br />
      <input type={fieldType} name={fieldName} id={fieldName} autoComplete='off' onChange={(e) => {onChange(e)}}/>
      <br />
    </div>
  )
}
