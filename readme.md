# warc-reader

- ### Intro  
   **warc-reader** is a ES6 Class which returns an iterable to iterater over content in a `.warc` or `.warc.gz` file member by member using `.next()` method or `for..of` loop.

- ### Install  
   `npm install git+https://github.com/Vikasg7/warc-reader.git`  

- ### Syntax  
   ````javascript  
   const reader: WarcReader = new WarcReader(_fileOrFd: string | number, _isGzip?: boolean, _startAt?: number, _chunkSize?: number)
   const iterable = reader.entries()
   ````

- ### Usage (in TypeScript)  
   ````javascript  
   import { WarcReader, WarcHeaders, WarcRecord } from "warc-reader"

   const file = process.argv[2]
   const reader = new WarcReader(file).entries()

   const loop = setInterval(() => {
      const {done, value} = reader.next()
      if (!done) {
         const {version, headers: WarcHeaders, content} = <WarcRecord>value
         process.stdout.write(value.content)
      } else {
         clearInterval(loop)
      }
   }, 1)
   ````

- ### Example
   Check the tests folder in src folder for an example.