import React from 'react'

export default function XAxisFormat(date) {
    console.log(moment(date).format("D"))
    if (moment(date).format("D") % 7 === 0) {
      return "A" /* moment(date).format("MMM, d") */
    }
    return ""
}
