import React, { useState } from 'react';
import f from './ProdForm.module.css';
import axios from 'axios';

const ProdForm = () => {
    const [inputs, setInputs] = useState({
        image: '',
        name: '',
        description: '',
        stock: '',
        minStock: '',
        price: '',
        iva: false,
        profit: '',
        distributor: [], // Ahora es un array
        category: [] // Ahora es un array
    });
    console.log(inputs.distributor);
    console.log(inputs.category);

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    };

    const handleSelect = (e, type) => {
        const { name, value } = e.target;
        if (name === 'distributor') {
            if (inputs.distributor.includes(value)) {
                alert(`Distribuidor: ${value} existe!`);
                return;
            } else {
                setInputs({
                    ...inputs,
                    distributor: [...inputs.distributor, value]
                });

            }
        } else if (name === 'category') {
            if (inputs.category.includes(value)) {
                alert(`Categoria: ${value} existe!`);
                return;
            } else {
                setInputs({
                    ...inputs,
                    category: [...inputs.category, value]
                });

            }
        }
    };

    const handleDeleteC = (el) => {
        setInputs({
            ...inputs,
            category: inputs.category.filter(item => item !== el)
        })
    };
    const handleDeleteD = (el) => {
        setInputs({
            ...inputs,
            category: inputs.category.filter(item => item !== el)
        })
    };






    const handleUploadImage = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'assistt_file');

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/dkx6y2e2z/image/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setInputs({ ...inputs, image: response.data.secure_url });
        } catch (error) {
            console.error('Error al cargar la imagen:', error);
            alert('Error al cargar la imagen. Inténtalo de nuevo.');
        }
    };

    const validateInputs = () => {
        const errors = {};
        if (!inputs.name) errors.name = 'El nombre es obligatorio';
        if (!inputs.description) errors.description = 'La descripción es obligatoria';
        if (inputs.price <= 0) errors.price = 'El precio debe ser mayor a 0';
        if (inputs.stock < 0) errors.stock = 'El stock no puede ser negativo';
        if (inputs.category.length === 0) errors.category = 'Selecciona al menos una categoría';
        if (inputs.distributor.length === 0) errors.distributor = 'Selecciona al menos un distribuidor';
        return errors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validateInputs();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        console.log("Formulario enviado", inputs);
        alert('Producto guardado con éxito.');
        setInputs({
            image: '',
            name: '',
            description: '',
            stock: '',
            minStock: '',
            price: '',
            iva: '',
            profit: '',
            distributor: [],
            category: []
        });
    };

    return (
        <div className={f.addProd}>
            <h2>Ingresar Producto</h2>
            <div className={f.infoContainer}>
                <div className={f.divImage}>
                    {inputs.image ? (
                        <img src={inputs.image} alt="Vista previa del producto" />
                    ) : (
                        <p>Vista previa de imagen</p>
                    )}
                </div>

                <form className={`${f.inputsContainer} ${f.responsiveForm}`} onSubmit={handleSubmit}>
                    <div className={f.row}>
                        <div className={f.column}>
                            <label className={f.label}>Imagen</label>
                            <input type="file" name="image" onChange={handleUploadImage} />

                            <label htmlFor="name" className={f.label}>Nombre del producto</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Nombre del producto"
                                value={inputs.name}
                                onChange={handleChange}
                            />
                            {errors.name && <p className={f.error}>{errors.name}</p>}

                            <label htmlFor="description" className={f.label}>Descripción</label>
                            <textarea
                                name="description"
                                id="description"
                                placeholder="Descripción"
                                rows="2"
                                value={inputs.description}
                                onChange={handleChange}
                            ></textarea>
                            {errors.description && <p className={f.error}>{errors.description}</p>}
                        </div>

                        <div className={f.column}>
                            <label htmlFor="price" className={f.label}>Costo</label>
                            <input
                                type="number"
                                name="price"
                                id="price"
                                placeholder="Costo"
                                value={inputs.price}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                            />
                            {errors.price && <p className={f.error}>{errors.price}</p>}

                            {/* <div className={f.itemInputs}> */}
                            <label htmlFor="iva">IVA:</label>
                            <input
                                type="number"
                                name="iva"
                                id="iva"
                                value={inputs.iva}
                                onChange={handleChange}
                            />
                            {/* </div> */}

                            <label htmlFor="profit" className={f.label}>Ganancia</label>
                            <input
                                type="number"
                                name="profit"
                                id="profit"
                                placeholder="Ganancia"
                                value={inputs.profit}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                            />

                            <label htmlFor="stock" className={f.label}>Stock</label>
                            <input
                                type="number"
                                name="stock"
                                id="stock"
                                placeholder="Stock"
                                value={inputs.stock}
                                onChange={handleChange}
                                min="0"
                            />
                            {errors.stock && <p className={f.error}>{errors.stock}</p>}

                            <label htmlFor="minStock" className={f.label}>Stock mínimo</label>
                            <input
                                type="number"
                                name="minStock"
                                id="minStock"
                                placeholder="Stock mínimo"
                                value={inputs.minStock}
                                onChange={handleChange}
                                min="0"
                            />
                        </div>
                        {/* --------------------------select----------------------------------- */}
                        <div className={f.column}>
                            <label htmlFor="category" className={f.label}>Categoría</label>
                            <select
                                name="category"
                                id="category"
                                // value={inputs.category}
                                onChange={handleSelect}
                            // multiple
                            >
                                <option value="category1">Categoría </option>
                                <option value="category2">Categoría 2</option>
                                <option value="category3">Categoría 3</option>
                                <option value="otros">Categoría Otros</option>
                            </select>
                            {errors.category && <p className={f.error}>{errors.category}</p>}

                            <label htmlFor="distributor" className={f.label}>Distribuidor</label>
                            <select
                                name="distributor"
                                id="distributor"
                                // value={inputs.distributor}
                                onChange={handleSelect}
                            // multiple
                            >
                                <option value="distributor1">Distribuidor </option>
                                <option value="distributor2">Distribuidor 2</option>
                                <option value="distributor3">Distribuidor 3</option>
                                <option value="otros">Distribuidor Otro</option>
                            </select>
                            {errors.distributor && <p className={f.error}>{errors.distributor}</p>}
                            {/* --------------------------select----------------------------------- */}
                            <div className={f.itemsCategoryAndDistribuitor}>
                                <div className={f.itemsCategory}>
                                    {
                                        inputs.category.map((el, index) =>
                                            <div >
                                                <p className={f.textD} key={index} >{el + " "} <button className={f.botonX} onClick={() => { handleDeleteC(el) }} > x </button> </p>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className={f.itemDistribuitor}>
                                    {
                                        inputs.distributor.map((el, index) =>
                                            <div >
                                                <p className={f.textD} key={index} >{el + " "} <button className={f.botonX} onClick={() => { handleDeleteD(el) }} > x </button> </p>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>

                            <button type="submit">Guardar Producto</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProdForm;
