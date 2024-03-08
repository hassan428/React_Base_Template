import React from 'react'
import { Button, Fade, Tooltip, Zoom, tooltipClasses } from '@mui/material'

const Btn = (props) => {
    const { tooltip_text, onclick, text, sx, type, startIcon } = props
    return (
        <Tooltip
            TransitionComponent={Zoom}
            arrow
            title={tooltip_text}
            placement='bottom'
            slotProps={{
                popper: {
                    sx: {
                        [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
                        {
                            marginTop: 0,
                            bgcolor: "black",
                            fontWeight: "bold"
                        },
                        [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
                        {
                            marginBottom: '1px',
                            bgcolor: "black"

                        },
                        [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]:
                        {
                            marginLeft: '0px',
                            bgcolor: "black"

                        },
                        [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]:
                        {
                            marginRight: '0px',
                            bgcolor: "black"

                        },
                    },
                },
            }}
        >

            <Button onClick={onclick} type={type} size='small' startIcon={startIcon} variant="contained"
                sx={{
                    bgcolor: "rgb(134 239 172)",
                    color: "black",
                    p: 0.5,
                    fontSize: "x-large",
                    ml: 1,
                    ":hover": { bgcolor: "rgb(74, 222, 128)" },
                    "@media(max-width: 500px)": {
                        fontSize: "large",
                        ml: 0.5,
                    },
                    ...sx,
                }}>{text}</Button>
        </Tooltip>
    )
}

export { Btn }