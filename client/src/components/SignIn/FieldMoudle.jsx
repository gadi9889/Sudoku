import React from 'react';

export default function FieldMoudle({fieldDivId,fieldP,fieldType,fieldName}) {
  return (
    <div id={fieldDivId}>
      <p>
        {fieldP}
      </p>
      <br />
      <input type={fieldType} name={fieldName} id={fieldName} autoComplete='off'/>
      <br />
    </div>
  )
}
