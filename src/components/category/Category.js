//CATEGORIA
import React, { useState } from 'react';
import './category.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import {Tool} from '../tool/Tool';

export const Category = () => {
    // herramientas
    const [tools, setTools] = useState(true);
    // consumibles
    const [consumable, setConsumable] = useState(false);
    // EPP
    const [epp, setEpp] = useState(false);
    // activo fijo
    const [fixedAssets, setFixedAssets] = useState(false);
    // mobiliario
    const [furniture, setFurniture] = useState(false);

    const btntool = () => {
        setTools(true);
        setConsumable(false);
        setEpp(false);
        setFixedAssets(false);
    }

    const btnconsumable=()=>{
        setConsumable(true);
        setTools(false);
        setEpp(false);
        setFixedAssets(false);
    }

    const btnepp=()=>{
        setEpp(true);
        setConsumable(false);
        setTools(false);
        setFixedAssets(false);
    }

    const btnfixedassets=()=>{
        setFixedAssets(true);
        setEpp(false);
        setConsumable(false);
        setTools(false);
    }

    const btnfurniture=()=>{
        setFurniture(true);
        setFixedAssets(false);
        setEpp(false);
        setConsumable(false);
        setTools(false);
    }



    return (
        <div className='category-container'>
            <div className='subcategory-container'>
                {tools ? (
                    <button className='btntool'><u style={{color:'cornflowerblue'}}>Herramientas  <FontAwesomeIcon icon={faScrewdriverWrench}/></u></button>
                ) : (
                    <button onClick={btntool} className='btntool'>Herramientas</button>
                )}

                {consumable ? (
                    <button className='btnconsumable'><u style={{color:'cornflowerblue'}}>Consumibles</u></button>
                ) : (
                    <button onClick={btnconsumable} className='btnconsumable'>Consumibles</button>
                )}

                {epp ? (
                    <button className='btnepp'><u style={{color:'cornflowerblue'}}>EPP</u></button>
                ) : (
                    <button onClick={btnepp} className='btnepp'>EPP</button>
                )}

                {fixedAssets ? (
                    <button className='btnfixedassets'><u style={{color:'cornflowerblue'}}>Activo fijo</u></button>
                ) : (
                    <button onClick={btnfixedassets} className='btnfixedassets'>Activo fijo</button>
                )}

                {furniture ? (
                    <button className='btnfurniture'><u style={{color:'cornflowerblue'}}>Mobiliario</u></button>
                ) : (
                    <button onClick={btnfurniture} className='btnfurniture'>Mobiliario</button>
                )}

            </div>
            <div className='table-container'>
                {tools ? (<Tool/>):<></>}
            </div>

        </div>
    )
}
