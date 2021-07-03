import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Chessground as NativeChessground } from 'chessground'


export default function Chessground(props) {

  let propTypes = {
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fen: PropTypes.string,
    orientation: PropTypes.string,
    turnColor: PropTypes.string,
    check: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    lastMove: PropTypes.array,
    selected: PropTypes.string,
    coordinates: PropTypes.bool,
    autoCastle: PropTypes.bool,
    viewOnly: PropTypes.bool,
    disableContextMenu: PropTypes.bool,
    resizable: PropTypes.bool,
    addPieceZIndex: PropTypes.bool,
    highlight: PropTypes.object,
    animation: PropTypes.object,
    movable: PropTypes.object,
    premovable: PropTypes.object,
    predroppable: PropTypes.object,
    draggable: PropTypes.object,
    selectable: PropTypes.object,
    onChange: PropTypes.func,
    onMove: PropTypes.func,
    onDropNewPiece: PropTypes.func,
    onSelect: PropTypes.func,
    items: PropTypes.object,
    drawable: PropTypes.object
  }

  let defaultProps = {
    coordinates: true,
    resizable: true,
    highlight: {
      lastMove: true,
      check: true
    }
  }

  let buildConfigFromProps = (props) => {
    const config = { events: {} }
    Object.keys(propTypes).forEach(k => {
      const v = props[k]
      if (typeof v !== 'undefined') {
        const match = k.match(/^on([A-Z]\S*)/)
        if (match) {
          config.events[match[1].toLowerCase()] = v
        } else {
          config[k] = v
        }
      }
    })
    return config
  }

    let el = useRef();
     let [cg, setCg] = useState()

    useEffect(() => {
        console.log("useEffect ran")
     setCg(NativeChessground(el.current, buildConfigFromProps(props)))
    }, [el, setCg, props])



  
    const comprops = { style: { ...props.style } }
    if (props.width) {
      comprops.style.width = props.width
    }
    if (props.height) {
      comprops.style.height = props.height
    }
    return (<div ref={el} {...comprops} />)
}