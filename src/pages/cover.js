import docicon from './image/fileIcon/docicon.png'
import excel from './image/fileIcon/excelicon.png'
import jpg from './image/fileIcon/jpgicon.png'
import other from './image/fileIcon/othericon.png'
import pdf from './image/fileIcon/pdficon.png'
import png from './image/fileIcon/pngicon.png'
import ppt from './image/fileIcon/ppticon.png'
import txt from './image/fileIcon/txticon.png'
import zip from './image/fileIcon/zipicon.png'
export function getCover(extension) {
  const cover = {
    doc: docicon,
    excel: excel,
    jpg: jpg,
    jpeg: jpg,
    other: other,
    pdf: pdf,
    png: png,
    ppt: ppt,
    txt: txt,
    zip: zip
  }
  if (extension in cover) {
    return cover[extension.toLowerCase()]
  } else {
    return cover.other
  }
}

export function checkFileName(fileName) {
  const acceptable = ['jpg', 'jpeg', 'png']
  const extension = fileName.split('.')[1]
  console.log(fileName)
  if (acceptable.includes(extension)) {
    return process.env.REACT_APP_GOOGLE_STORAGE_NFT + fileName
  } else {
    return getCover(extension)
  }
}

export function checkURL(url) {
  const acceptable = ['jpg', 'jpeg', 'png']
  const extension = url.split(';')[0].split('/')[1]
  if (acceptable.includes(extension)) {
    return url
  } else {
    return getCover(extension)
  }
}
