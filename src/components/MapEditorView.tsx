import React, { useEffect } from 'react';
import {Box, Button, MenuItem, Select} from "@mui/material";
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
    justifyContent:'center',
}

const states = ['ogre_idle', 'atac1', 'death', 'walk', 'atac2/tile', 'atac3/a', 'walk_2']

export const GameView = () => {
    const [animationState, setAnimationState] = React.useState<string>(states[0])

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

    const handleStateChange = (event: any) => {
        setAnimationState(event.target.value)
        gameEngine.handleStateChange(event.target.value)
    }

    return (
        <Box sx={pageStyle}>
            <Box display={'flex'} flexDirection={'row'} gap={'1em'} alignItems={'center'}>
                <Box>
                    <Button onClick={()=> {
                        console.log(gameEngine.containerMap)
                    }} variant={'contained'}>LOG ALL</Button>

                </Box>
                <Box>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={animationState}
                        onChange={(event)=> {
                            handleStateChange(event)
                        }}
                        label="EnemyState"
                    >
                        {states.map((item, index)=> {
                            return  <MenuItem value={item} key={index}>{item}</MenuItem>
                        })}
                    </Select>
                </Box>
            </Box>
            <div id='gameCanvas'/>
        </Box>
    );
}
