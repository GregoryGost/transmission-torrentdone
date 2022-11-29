import{createLogger,format,transports}from"winston";const addColorsOption={levels:{trace:4,debug:3,info:2,warn:1,error:0},colors:{trace:"gray",debug:"white",info:"green",warn:"yellow",error:"red"}},formatMeta=r=>{r=r[Symbol.for("splat")];return void 0!==r[0]&&0<r.length?1===r.length?` - [${JSON.stringify(r[0])}]`:` - [${JSON.stringify(r)}]`:""},formatter=format.combine(format.timestamp({format:"DD.MM.YYYY HH:mm:ss"}),format.printf(r=>{const{level:t,message:e,timestamp:o,...s}=r;return`[${o}] : [${t}] : `+e+formatMeta(s)}));class Logger{logger;transportConsole;transportFile;constructor(r,t){this.transportConsole=new transports.Console({format:formatter}),this.transportFile=new transports.File({filename:t,format:formatter}),this.logger=createLogger({level:r,levels:addColorsOption.levels,transports:[this.transportConsole,this.transportFile]})}trace(r,t){this.logger.log("trace",r,t)}debug(r,t){this.logger.debug(r,t)}info(r,t){this.logger.info(r,t)}warn(r,t){this.logger.warn(r,t)}error(r,t){this.logger.error(r,t)}normalizeError(r){var t={err:r,message:"",isError:!1,toString(){return this.message}};return r instanceof TypeError?(t.error=r,t.message=r.message,t.stack=r.stack,t.isError=!0,t.toString=()=>r.toString()):"string"==typeof r?(t.error=new Error(r),t.message=r,t.stack=t.error.stack):r instanceof Error?(t.error=r,t.message=r.message,t.stack=r.stack,t.isError=!0,t.toString=()=>r.toString()):this.error("UNKNOWN ERROR TYPE: "+typeof r),t}}export{Logger};