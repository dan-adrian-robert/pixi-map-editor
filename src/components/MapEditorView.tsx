import React, { useEffect } from 'react';
import {Box, Button} from "@mui/material";
import {gameEngine} from "../App";
import {loadAllTextures} from "../utils";
import {initDevtools} from "@pixi/devtools";

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
    useEffect( () => {

        loadAllTextures().then((textureList)=>{
            gameEngine.initGameCanvas().then(() => {
                document.getElementById('gameCanvas')?.appendChild(gameEngine.mainApp.canvas);
                gameEngine.textureSystem.addTexture(textureList);
                gameEngine.initSystems();

                initDevtools({
                    app: gameEngine.mainApp,
                });

                (window as any)['__PIXI_APP__'] = gameEngine.mainApp.stage;
            })
        })
    }, []);

    return (
        <Box sx={pageStyle}>
            <Button onClick={()=> {
                console.log(gameEngine.containerMap)
            }} variant={'contained'}>LOG ALL</Button>
            <div id='gameCanvas'/>
        </Box>
    );
}
