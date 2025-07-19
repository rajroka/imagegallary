"use client"
import React, { useRef, useState, useEffect } from 'react'

const Page = () => {
  const [files, setFiles] = useState<File[]>([])
  const [previewUrl, setPreviewUrl] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement | null>(null)

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileArray = Array.from(event.target.files || [])
    if (fileArray.length === 0) return

    console.log(fileArray)

// Append new files to existing files
  setFiles(prevFiles => [...prevFiles, ...fileArray])

   

    const urls = fileArray.map(file => URL.createObjectURL(file))
     // Append new URLs to existing preview URLs
  setPreviewUrl(prevUrls => [...prevUrls, ...urls])
  }

  const clearFile = () => {
    setFiles([])
    setPreviewUrl([])

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

const removeImage = (index : number)=>{
 
  setFiles((prev)=> prev.filter((_ , i)=> i!== index ))
    setPreviewUrl(prev => {
      // Revoke URL of removed image
      URL.revokeObjectURL(prev[index])
      return prev.filter((_, i) => i !== index)
    })
      if (inputRef.current) {
    inputRef.current.value = ""
  }


}

  useEffect(() => {
    return () => {
      previewUrl.forEach(url => URL.revokeObjectURL(url))
    }
  }, [previewUrl])

  return (
    <div className="space-y-4 p-4    bg-amber-500 ">
      <input type="file" multiple onChange={onChangeFile} ref={inputRef} />

      <button onClick={clearFile} className="bg-red-500 text-white px-3 py-1 rounded">
        Clear
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {previewUrl.map((url, index) => (

            <div key={index} className="relative">
          <img
          
            src={url}
            alt={`Preview ${index}`}
            className="w-48 h-48 object-cover rounded shadow"
          />

        <button
        
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-red-600 text-white rounded-full px-2"
              title="Remove Image"
            >
              &times;
            </button>

          </div>
          
        ))}
      </div>
    </div>
  )
}

export default Page
