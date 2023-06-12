//HERRAMIENTAS
import React, { useState, useEffect } from 'react'
import './tool.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

export const Tool = () => {

    // almacenar los datos recibidos de la bdd de herramientas
    const [datos, setDatos] = useState([]);
    // almacenar los datos a editar de la herramienta dentro del modal
    const [selectedTool, setSelectedTool] = useState([]);
    // almacenar la imagen para previsualizar
    const [previewImage, setPreviewImage] = useState(null);

    // modal de edit
    const [modalOpen, setModalOpen] = useState(false);
    // modal de info
    const [modalOpenInfo, setModalOpenInfo] = useState(false);
    // modal de delete
    const [modalOpenDelete, setModalOpenDelete] = useState(false);


    // obtener los datos de la bdd consumiendo la api

    // función para obtener info de las herramientas y mostrar en tabla
    useEffect(() => {
        fetch('http://localhost:4000/api/tools')
            .then(response => response.json())
            .then(data => setDatos(data))
            .catch(error => console.error(error));
    }, []);

    //función para obtener info de la herramienta en específico y editar
    const handleEditClick = tool => {
        if (tool.id) {
            fetch(`http://localhost:4000/api/tools/${tool.id}`)
                .then(response => response.json())
                .then(data => {
                    setSelectedTool(data);
                    setModalOpen(true);
                })
                .catch(error => console.log(error));
        }
        console.log('Editar: ',selectedTool);
    }
    // función para hacer la actualización de la información de la herramienta
    const handleSaveChanges = () => {
        const {id,name,inventoryQuantity,description,image}=selectedTool;
        // convertir imagen a cadena de texto para almacenarla en la BDD de tipo varchar
        const reader = new FileReader();
        reader.onload=()=>{
            const base64Image=reader.result.split(',')[1];
            const updateTool={
                name,
                image: base64Image,
                description,
                inventoryQuantity
            };
            fetch(`http:localhost:4000/api/tools/${id}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(updateTool)
            })
            .then(response=>response.json())
            .then(data=>{
                console.log('Respuesta del servidor: ',data);
                setModalOpen(false);
            })
            .catch(error=>console.error(error));
        }
        if (image && image.file) {
            reader.readAsDataURL(image.file);
          }
    }


    // función para obtener info de herramienta específica y mostrar
    const handleInfoClick = tool => {
        if (tool.id) {
            fetch(`http://localhost:4000/api/tools/${tool.id}`)
                .then(response => response.json())
                .then(data => { setSelectedTool(data); setModalOpenInfo(true); })
                .catch(error => console.log(error));
        }
    }



    const handleDeleteClick = tool => {
        if (tool.id) {
            fetch(`http://localhost:4000/api/tools/${tool.id}`, {
            })
                .then(response => response.json())
                .then(data => { setSelectedTool(data); setModalOpenDelete(true); })
                .catch(error => console.log(error));
        }
        console.log('DATOS PARA ELIMINAR: ', selectedTool)
    }
    //función para eliminar herramienta en específico mediante su id
    const deleteClick = () => {
        fetch(`http://localhost:4000/api/tools/${selectedTool[0].id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                setSelectedTool(data);
                setModalOpenDelete(false);
                fetch('http://localhost:4000/api/tools')
                    .then(response => response.json())
                    .then(data => setDatos(data))
                    .catch(error => console.error(error));
            })
            .catch(error => console.log(error));

    }

    // función para cambiar la imagen de una herramienta
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload=()=>{
            const imageUrl = reader.result;
            setSelectedTool({...selectedTool,image:file, imagePreview:imageUrl});
            setPreviewImage(imageUrl);
        };

        if (file) {
            reader.readAsDataURL(file);
          }
          console.log('Nueva imagen: ',previewImage)
    }

    // función para cerrar modales
    const handleModalClose = () => {
        setPreviewImage(null);
        setModalOpen(false);
        setModalOpenInfo(false);
        setModalOpenDelete(false);
    }

    // asignar un color al status
    const colorstatus = (status, invetoryQuantity) => {
        if (invetoryQuantity === 1) {
            if (status === 1) {
                return 'green';
            } else if (status === 2) {
                return 'orange';
            } else if (status === 3) {
                return 'red';
            }
        } else {
            return 'gray';
        }
    }


    return (
        <div>
            <div>
                <div style={{ display: 'flex', justifyContent: 'center', fontFamily: 'Nunito' }}>
                    <h2>Tabla de herramientas</h2>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Estatus</th>
                            <th>Clave</th>
                            <th>Nombre</th>
                            <th>Cantidad disponible</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datos.map((dato, index) => (
                            <tr key={index}>

                                <td>
                                    <button style={{ padding: '10px', borderRadius: '20px', backgroundColor: colorstatus(dato.status, dato.inventoryQuantity) }}></button>
                                </td>
                                <td>{dato.code}</td>
                                <td>{dato.name}</td>
                                <td>{dato.quantityAvailable}</td>
                                <td>
                                    <button onClick={() => handleEditClick(dato)} className='btnedit'><FontAwesomeIcon icon={faPenToSquare} /></button>
                                    <button onClick={() => handleDeleteClick(dato)} className='btndelete'><FontAwesomeIcon icon={faTrash} /></button>
                                    <button onClick={() => handleInfoClick(dato)} className='btninfo'><FontAwesomeIcon icon={faCircleInfo} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


                {/* modal para editar */}
                {modalOpen && selectedTool && (
                    <div className="modal">
                        <div className="modal-content">
                            <h3>Editar herramienta</h3>
                            <label>Clave:</label>
                            <input style={{ backgroundColor: 'rgba(208, 208, 208, 0.5)' }} type="text" value={selectedTool[0].code} disabled />
                            <label>Nombre:</label>
                            <input
                                type="text"
                                value={selectedTool.name}
                                onChange={e => setSelectedTool({ ...selectedTool, name: e.target.value })}
                            />
                            <label>Cantidad en inventario:</label>
                            <input
                                type="number"
                                value={selectedTool.inventoryQuantity}
                                onChange={e => setSelectedTool({ ...selectedTool, inventoryQuantity: e.target.value })}
                            />
                            <label>Descripción:</label>
                            <input
                                type="text"
                                value={selectedTool.description}
                                onChange={e => setSelectedTool({ ...selectedTool, description: e.target.value })}
                            />
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div>
                                    <label>Imagen de la herramienta:</label>
                                    <input style={{borderColor:'transparent'}} type='file' accept='image/*' onChange={handleImageChange} />
                                </div>
                                <div>
                                    {previewImage===null?(<img style={{ height: '130px' }} src={selectedTool[0].image} alt="Imagen de la herramienta"/>):(<img style={{ height: '130px' }} src={previewImage} alt="Previsualización de la imagen"/>)}
                                {/* // {previewImage && <img style={{ height: '130px' }} src={previewImage} alt="Previsualización de la imagen" />} */}
                                </div>
                            </div>
                            <div className="modal-buttons">
                                <button className="modal-save" onClick={handleSaveChanges}>
                                    Guardar cambios
                                </button>
                                <button className="modal-close" onClick={handleModalClose}>
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* modal para mostrar info */}
                {modalOpenInfo && selectedTool && (
                    <div className="modal">
                        <div className="modal-content">
                            <div className="row">
                                <div className="col-md-6">
                                    <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'cornflowerblue', borderRadius: '5px' }}>
                                        <h3>Información de la herramienta</h3>
                                    </div>
                                    <p>Clave: {selectedTool[0].code}</p>
                                    <p>Nombre: {selectedTool[0].name}</p>
                                    <p>Categoría: {selectedTool[0].category}</p>
                                    <p>Descripción: {selectedTool[0].description}</p>
                                    <p>Cantidad en inventario: {selectedTool[0].inventoryQuantity}</p>
                                    <p>Cantidad disponible: {selectedTool[0].quantityAvailable}</p>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <div>
                                        <h4>Imagen de la herramienta:</h4>
                                        <img style={{ height: '130px' }} src={selectedTool[0].image} alt="Imagen de la herramienta" />
                                    </div>
                                    <div>
                                        <h4>Código QR:</h4>
                                        <img style={{ width: '120px' }} src={selectedTool[0].qr} alt="Código QR" />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-buttons">
                                <button className="modal-close" onClick={handleModalClose}>
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                )}





                {/* modal para eliminar */}
                {modalOpenDelete && selectedTool && (
                    <div className="modal">
                        <div className="modal-content">
                            <h3>Eliminar</h3>
                            <label>¿Desea eliminar esta herramienta?</label>
                            <label>{ }</label>
                            <div className="modal-buttons">
                                <button className="modal-save" onClick={deleteClick}>
                                    Eliminar
                                </button>
                                <button className="modal-close" onClick={handleModalClose}>
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}