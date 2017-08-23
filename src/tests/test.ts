import { WarcReader, WarcHeaders, WarcRecord } from "../index"

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