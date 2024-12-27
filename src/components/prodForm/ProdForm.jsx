import React, { useState } from 'react';
import f from './ProdForm.module.css';
import axios from 'axios';

const ProdForm = () => {

    const [inputs, setInputs] = useState({ image: '', name: '', description: '', stock: '', minStock: '', price: '', distribuidor: [], category: [] })

    const handleUploadImage = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'assistt_file');

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/dkx6y2e2z/image/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            // Actualiza el estado 'image' con la URL de la imagen procesada
            setInputs({ ...inputs, image: response.data.secure_url });

            // Limpia el input de carga de imagen
            event.target.value = '';
        } catch (error) {
            console.error('Error al cargar la imagen:', error);
            // Muestra un mensaje de error al usuario
            alert('Error al cargar la imagen. Inténtalo de nuevo.');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("Formulario enviado");
    };

    return (
        <div className={f.addProd}>
            <h2>Ingresar Producto</h2>
            <div className={f.infoContainer}>
                <div className={f.divImage}>
                    {inputs.image
                        ? <img src={inputs.image} alt="" />
                        :
                        <p>Vista previa de imagen</p>}

                </div>

                <form className={f.inputsContainer} onSubmit={handleSubmit}>
                    <input className={``} type="file"
                        name="image"
                        onChange={handleUploadImage} />
                    <input type="text" placeholder="Nombre del producto" required />
                    <input placeholder="Descripción" required rows="3"></input>
                    <input type="number" placeholder="Stock" min="0" required />
                    <input type="number" placeholder="Stock mínimo" min="0" required />
                    <input type="number" placeholder="Precio" min="0" step="0.01" required />
                    {/* <input type="text" placeholder="Distribuidor" required /> */}
                    <select name="" id="">
                        <option value="">Categoria</option>
                    </select>
                    <select name="" id="">
                        <option value="">Distribuidor</option>
                    </select>
                    {/* <input type="text" placeholder="Categoría" required /> */}
                    <button type="submit">Guardar Producto</button>
                </form>
            </div>
        </div>
    );
};

export default ProdForm;

