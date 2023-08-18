import{normalize,extname,basename,dirname}from"node:path";import{lstatSync,readdirSync,existsSync,mkdirSync,copyFileSync}from"node:fs";import{execSync}from"node:child_process";class Torrentdone{config;logger;connect;TR_APP_VERSION;TR_TORRENT_ID;TR_TORRENT_NAME;TR_TORRENT_DIR;TR_TORRENT_HASH;TR_TIME_LOCALTIME;TR_TORRENT_LABELS;TR_TORRENT_BYTES_DOWNLOADED;TR_TORRENT_TRACKERS;DIR_FLAG;RELEASER;DIR_NAME;regexSerial_Base=/(serial|season|[sS][0-9]{2}[\.\_\-]{0,1}[eE][0-9]{2})/i;regexFilm_Base=/[.(_\-\s](19|20)[0-9]{2}[.)_\-\s]/i;regexSerial_Lostfilm=/(s[0-9]{2}e[0-9]{2}).+(lostfilm\.tv)/i;regexSerial_Novafilm=/(s[0-9]{2}e[0-9]{2}).+(novafilm\.tv)/i;regexFilm_Releaser=/^((?!s[0-9]{2}e[0-9]{2}).)*$/i;regexNameSeason=/(.+)\.([sS]([0-9]{2}))/i;regexNameYear=/^(.+)\s{0,1}([.(_\-\s]((19|20)[0-9]{2})[.)_\-\s]).+$/i;constructor(e,i){this.config=e,this.logger=i,this.connect=this.connectCommandCreate(),this.TR_APP_VERSION=this.config.trAppVersion,this.TR_TORRENT_ID=this.config.trTorrentId,this.TR_TORRENT_NAME=this.config.trTorrentName,this.TR_TORRENT_DIR=this.config.trTorrentDir,this.TR_TORRENT_HASH=this.config.trTorrentHash,this.TR_TIME_LOCALTIME=this.config.trTimeLocaltime,this.TR_TORRENT_LABELS=this.config.trTorrentLabels,this.TR_TORRENT_BYTES_DOWNLOADED=this.config.trTorrentBytesDownloaded,this.TR_TORRENT_TRACKERS=this.config.trTorrentTrackers,this.DIR_FLAG=!1,this.DIR_NAME=void 0,this.RELEASER=void 0}connectCommandCreate(){return`transmission-remote ${this.config.ipAddress}:${this.config.port} --auth ${this.config.login}:`+this.config.password}moveCommandCreate(e){return`${this.connect} --torrent ${this.TR_TORRENT_ID} --move "${e}"`}async checkSerialOrFilm(e,i){try{var t,r;this.logger.debug("RELEASER: "+this.RELEASER),this.logger.debug("Base processing"),this.logger.debug(`Check Serial or Film: "${e}"`),this.regexSerial_Base.test(e)?(this.logger.info(`File "${e}" is a SERIAL`),this.logger.debug(`File check is regex: "${this.regexSerial_Base}"`),t=this.extractSerialData(e),await this.serialProcess(e,i,t)):this.regexFilm_Base.test(e)?(this.logger.info(`File "${e}" is a FILM`),this.logger.debug(`File check is regex: "${this.regexFilm_Base}"`),r=this.extractFilmData(e),await this.filmProcess(e,i,r)):this.logger.info(`File "${e}" is not Serial or Film. NO ACTION`)}catch(e){throw e}}async checkSerialOrFilm_Lostfilm(e,i){try{var t,r;this.logger.debug("RELEASER: "+this.RELEASER),this.logger.debug(`Check Serial or Film: "${e}"`),this.regexSerial_Lostfilm.test(e)?(this.logger.info(`File "${e}" is a SERIAL`),this.logger.debug(`File check is regex: "${this.regexSerial_Lostfilm}"`),t=this.extractSerialData(e),await this.serialProcess(e,i,t)):this.regexFilm_Releaser.test(e)?(this.logger.info(`File "${e}" is a FILM`),this.logger.debug(`File check is regex: "${this.regexFilm_Releaser}"`),r=this.extractFilmData_Lostfilm(e),await this.filmProcess(e,i,r)):this.logger.info(`File "${e}" is not Serial or Film. NO ACTION`)}catch(e){throw e}}async checkSerialOrFilm_Novafilm(e,i){try{var t,r;this.logger.debug("RELEASER: "+this.RELEASER),this.logger.debug(`Check Serial or Film: "${e}"`),this.regexSerial_Novafilm.test(e)?(this.logger.info(`File "${e}" is a SERIAL`),this.logger.debug(`File check is regex: "${this.regexSerial_Novafilm}"`),t=this.extractSerialData(e),await this.serialProcess(e,i,t)):this.regexFilm_Releaser.test(e)?(this.logger.info(`File "${e}" is a FILM`),this.logger.debug(`File check is regex: "${this.regexFilm_Releaser}"`),r=this.extractFilmData(e),await this.filmProcess(e,i,r)):this.logger.info(`File "${e}" is not Serial or Film. NO ACTION`)}catch(e){throw e}}extractSerialData(e){var i=this.regexNameSeason.exec(e);if(null===i)throw new Error(`No data extracted for file "${e}"`);var e=Torrentdone.capitalize(i[1]),t=e.replace(/(\.|\s|\_)/g," "),e={name:e,dirName:t,season:"Season "+i[3]};return this.logger.debug(`Extracted data (${this.RELEASER}): name="${e.name}" dirName="${e.dirName}" season="${e.season}"`),this.logger.debug(`Extracted serial data regex: "${this.regexNameSeason}"`),e}extractFilmData(e){var i=this.regexNameYear.exec(e);if(null===i)throw new Error(`No data extracted for file "${e}"`);e=Torrentdone.capitalize(i[1]),i={name:e,year:i[3],three_d:/\_3D\_/i.test(e)};return this.logger.debug(`Extracted data (${this.RELEASER}): name="${i.name}" year="${i.year}" three_d="${i.three_d}"`),this.logger.debug(`Extracted film data regex: "${this.regexNameYear}"`),i}extractFilmData_Lostfilm(e){var i=/^(.+).+(1080|720).+(lostfilm).+$/i.exec(e);if(null===i)throw new Error(`No data extracted for file "${e}"`);e={name:Torrentdone.capitalize(i[1]),year:(new Date).getFullYear().toString(),three_d:!1};return this.logger.debug(`Extracted data (${this.RELEASER}): name="${e.name}" year="${e.year}" only 2D`),e}async savingPathPrepare(e){try{if(existsSync(e))this.logger.debug("Saving path is exists");else{if(this.logger.debug("Saving path does not exist. Create the missing folders."),mkdirSync(e,{recursive:!0}),!existsSync(e))throw new Error("Saving path is can not be created");this.logger.debug("Saving path directories is created")}}catch(e){throw e}}async serialProcess(e,i,t){try{this.logger.debug(`Processing serial file: "${e}"`);var r,s=normalize(`${this.config.mediaPath}/${this.config.serialsRootDir}/${t.dirName}/`+t.season);this.logger.debug(`Saving path: "${s}"`),await this.savingPathPrepare(s),this.DIR_FLAG?(this.logger.info(`COPY file "${e}" to saving path "${s}"`),await this.copyFile(e,i,s)):(this.logger.info(`MOVE file "${e}" to saving path "${s}"`),r=this.moveCommandCreate(s),this.logger.debug(`Move command: "${r}"`),await this.transmissionMoveFile(r,e,s))}catch(e){throw e}}async filmProcess(i,t,r){try{this.logger.debug(`Processing film file: "${i}"`);let e=this.config.mediaPath;var s;r.three_d?e+=`/${this.config.filmsRootDir}/3D/`+r.year:e+=`/${this.config.filmsRootDir}/2D/`+r.year,e=normalize(e),this.logger.debug(`Saving path: "${e}"`),await this.savingPathPrepare(e),this.DIR_FLAG?(this.logger.info(`COPY file "${i}" to saving path "${e}"`),await this.copyFile(i,t,e)):(this.logger.info(`MOVE file "${i}" to saving path "${e}"`),s=this.moveCommandCreate(e),this.logger.debug(`Move command: "${s}"`),await this.transmissionMoveFile(s,i,e))}catch(e){throw e}}async copyFile(e,i,t){try{this.logger.debug("Start copying file...");var r=normalize(t+"/"+e);if(copyFileSync(i,r),!existsSync(r))throw new Error(`Error. Failed to copy file "${e}"`);this.logger.info(`File "${e}" copied successfully. => END`),this.logger.debug(`File final path: "${r}"`)}catch(e){throw e}}async transmissionMoveFile(i,t,r){try{this.logger.debug("Start moving file...");var s=normalize(r+"/"+t),o=/success/i;let e=await Torrentdone.command(i);if(e=e.replace(/(\r\n|\n|\r)/gm,""),this.logger.debug("execResult: "+e),!o.test(e))throw new Error(`Error. Failed to move file "${t}". Reason: Negative result of exec command: `+e);if(!existsSync(s))throw new Error(`Error. Failed to move file "${t}". Reason: file not found after move`);this.logger.info(`File "${t}" moving successfully. => END`),this.logger.debug(`File final path: "${s}"`)}catch(e){throw e}}startInfo(){this.logger.info("##############################################################################################"),this.logger.info(`transmission-torrentdone: "${this.config.appVersion}"`),this.logger.info(`TORRENT ID: "${this.TR_TORRENT_ID}" FINISH: START PROCESS ...`),this.logger.info("=============================================================================================="),this.logger.info(`VER:   "Transmission version - ${this.TR_APP_VERSION}"`),this.logger.info(`DIR:   "${this.TR_TORRENT_DIR}"`),this.logger.info(`NAME:  "${this.TR_TORRENT_NAME}"`),this.logger.info(`DTIME: "${this.TR_TIME_LOCALTIME}"`),this.logger.info(`HASH:  "${this.TR_TORRENT_HASH}"`),0<this.TR_TORRENT_LABELS.length&&this.logger.info(`LABELS:  "${this.TR_TORRENT_LABELS}"`),void 0!==this.TR_TORRENT_BYTES_DOWNLOADED&&0<this.TR_TORRENT_BYTES_DOWNLOADED&&this.logger.info(`BYTES:  "${this.TR_TORRENT_BYTES_DOWNLOADED}"`),void 0!==this.TR_TORRENT_TRACKERS&&0<this.TR_TORRENT_TRACKERS.length&&this.logger.info(`TRACKERS:  "${this.TR_TORRENT_TRACKERS}"`),this.logger.info("==============================================================================================")}endInfo(e=!1){this.logger.info("=============================================================================================="),e?this.logger.error(`TORRENT ID: "${this.TR_TORRENT_ID}" ERROR END PROCESS`):this.logger.info(`TORRENT ID: "${this.TR_TORRENT_ID}" END PROCESS`),this.logger.info("##############################################################################################\n")}async checkReleaser(e,i){try{this.logger.debug(`Check Releaser for: "${e}"`);var t=new RegExp("lostfilm","i"),r=new RegExp("novafilm","i");t.test(e)?(this.logger.info('Releaser found: "LostFilm"'),this.logger.debug(`Releaser regex: "${t}"`),this.RELEASER="lostfilm",await this.checkSerialOrFilm_Lostfilm(e,i)):r.test(e)?(this.logger.info('Releaser found: "NovaFilm"'),this.logger.debug(`Releaser regex: "${r}"`),this.RELEASER="novafilm",await this.checkSerialOrFilm_Novafilm(e,i)):(this.logger.debug("Releaser not found"),await this.checkSerialOrFilm(e,i))}catch(e){throw e}}async directoryForeach(e){try{this.logger.info(`Directory process: "${e}"`);var i=readdirSync(e);this.logger.debug(`All elements in dir: "${i}"`);for(const r of i){var t=normalize(`${this.TR_TORRENT_DIR}/${this.TR_TORRENT_NAME}/`+r);await this.checkFileOrDirectory(t)}}catch(e){throw e}}async checkFileOrDirectory(e){try{var i,t,r,s=await Torrentdone.isFileOrDirectoryOrUnknown(e);this.logger.info("================================"),!0===s?(i=extname(e),t=basename(e,i),this.logger.info(`Element: "${t+i}" is a FILE`),this.logger.debug(`Element: file extension: "${i}"`),this.config.allowedMediaExtensions.test(i)?(this.logger.debug(`Element: full path: "${e}"`),await this.checkReleaser(t+i,e)):(this.logger.debug(`Element: file extension "${i}" does not match allowed extensions regex: "${this.config.allowedMediaExtensions}"`),this.logger.info("Element does not match allowed extensions. NO ACTION"))):!1===s?(this.DIR_FLAG=!0,this.DIR_NAME=this.TR_TORRENT_NAME,r=dirname(e),this.logger.info(`Element: "${r}" is a DIRECTORY`),this.logger.debug(`DIR_FLAG: "${this.DIR_FLAG}"`),this.logger.debug(`Element: full path: "${e}"`),await this.directoryForeach(e)):(this.logger.debug(`TR_TORRENT_NAME: "${this.TR_TORRENT_NAME}" is neither a file or a directory`),this.logger.debug(`Element: full path: "${e}"`),this.logger.info("Element is not File or Directory. NO ACTION"))}catch(e){throw e}}async main(){try{this.startInfo();var e=normalize(this.TR_TORRENT_DIR+"/"+this.TR_TORRENT_NAME);await this.checkFileOrDirectory(e),this.endInfo()}catch(e){this.config.devmode?this.logger.trace(e.message,e.stack):this.logger.error(e.message),this.endInfo(!0)}}static async command(e){try{return execSync(e,{timeout:2e3,encoding:"utf8"})}catch(e){throw e}}static async isFileOrDirectoryOrUnknown(e){try{var i=lstatSync(e),t=i.isFile(),r=i.isDirectory();return t?!0:!r&&void 0}catch(e){throw e}}static capitalize(e){return e[0].toUpperCase()+e.slice(1)}}export{Torrentdone};