import React, { useEffect } from 'react';
import {Engine} from "../Engine";
import {Box} from "@mui/material";
import { initDevtools } from '@pixi/devtools';

const pageStyle = {
    margin: 0,
    padding: 0,
    backgroundColor: '#f5e3e1',
    height: '100vh', width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    'justify-content':'center',
}

export const GameView = () => {
    useEffect(() => {

        Engine.initMainApp().then((result) => {
            initDevtools({
                app: Engine.getMainApp(),
            });
            (window as any)['__PIXI_APP__'] = Engine.getMainApp();
        });
    }, []);

    return (
        <Box sx={pageStyle}>
            <div id='gameCanvas'/>
        </Box>
    );
}
